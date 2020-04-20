---
path: /posts/145-upsert-statements-with-ecto/
title: "Upsert statements with Ecto"
author: luis-zamith
date: 2020-01-15
cover: https://cdn-images-1.medium.com/max/2400/1*B6YxPvAMw_kx5D-_RQpotw.jpeg
tags:
  - development
intro: >
  Narrator: Update and Insert at the same time? That sounds groovy! In comes the Upsert!

  Ecto: What about me?

  Narrator: You can come too, I guess.
---

From the Postgres documentation we define an upsert as:

> a (…) feature that allows (…) to atomically either insert a row, or on the
> basis of the row already existing, UPDATE that existing row instead, while
> safely giving little to no further thought to concurrency.

Obviously this logic can be implemented at the application level, although you
then need to worry about the concurrency part. However, this sort of operation
is exactly what we should enlist our database to help us with, as they are
exceptionally good at it.

Upsert is a commonly used term to refer to adding an ON CONFLICT clause to an
INSERT statement. As we'll see there are different ways to define the target of
the conflict but it always boils down to some constraint violation.

---

## Ecto

Now that we know what Upserts are, let's see them in action with Ecto. As an
example, let's say that we have bank accounts associated with a customer email,
which should be unique, a balance and a boolean to lock accounts for security
reasons.

```elixir
defmodule CreateAccounts do
  use Ecto.Migration

  def change do
    create table(:accounts) do
      add :email, :string, null: false
      add :balance, :decimal, null: false
      add :locked, :boolean, null: false, default: false

      timestamps()
    end

    create unique_index(:accounts, :email)
  end
end
```

```elixir
defmodule Account do
  use Ecto.Schema
  import Ecto.Changeset

  @fields [:email, :balance, :locked]

  schema "accounts" do
    field :email
    field :balance, :decimal, default: Decimal.new(0)
    field :locked, :boolean, default: false

    timestamps()
  end

  def changeset(account, attrs) do
    account
    |> cast(attrs, @fields)
    |> validate_required(@fields)
    |> unique_constraint(:email)
  end
end
```

With our database set up and schema in place we can go ahead and insert our
first account!

```elixir
%Account{}
|> Account.changeset(%{email: "mike@subvisual.com"})
|> Repo.insert()
```

Nothing fancy so far, however if we try to run the above statement again we'll
get an error from the uniqueness constraint on the email. If we know that the
account is already there, we can use `Repo.update/2`. There is also
`Repo.insert_or_update/2` but it relies on us having an existing struct that might
have been loaded from the DB or not, thus it's not an atomic operation.

## Upserting

Let's imagine a feature on a system used by a bank teller to create an account,
they don't know for sure if the customer is already in the system or not, but
they just got handed $50 to deposit on that account.

We could do it in multiple steps in a non atomic way:

1. Check if the account exists
2. Create one with the balance if not
3. Update the existing one adding to the previous balance if yes

That's too many steps though. Let's do it all in a single step!

```elixir
attrs = %{
  email: "mike@subvisual.com",
  balance: Decimal.new(50)
}

%Account{}
|> Account.changeset(attrs)
|> Repo.insert(
  on_conflict: [inc: [balance: attrs.balance]],
  conflict_target: :email,
  returning: true
)
```

There's a few things of note here, most importantly, the `on_conflict` option
which takes different formats of input. In this case we are passing it an update
like set of operation, namely the `inc` operation, which will do exactly what we
wanted, by incrementing the previous value, instead of replacing.

Secondly, we use the `conflict_target` option, which goes in tandem with
`on_conflict`. We simply state the conflict we care about will happen on the `email`
field if at all, however, we can also specify a constraint by name if we want to
be more specific.

Last but not least, we have the `returning` option. In this specific scenario it
is not needed, as we are not using the return value of the call. In the case we
did use it, we will usually want `returning` to be `true` as it will ensure we got
the value that was persisted and not the struct we were trying to persist but
couldn't. More details on this can be found in the [`Ecto.Repo`
documentation][1].

## Upserts with conditions

So far we've looked at how we can perform an upsert on every conflict,
regardless of the row that conflicted, however, it's a totally valid for us to
want to do things conditionally.

Let's take the previous example, of incrementing the balance, and add another
constraint. We only actually perform the operation if the account is not locked,
otherwise we return an error.

Remember how I said that `on_conflict` takes different types of inputs? Well, one
of them (and the one that gives us more control) is a generic `Ecto.Query` struct,
which we already know how to add conditions to, by using the `where` clause. All
put together it might look something like this:

```elixir
attrs = %{
  email: "mike@subvisual.com",
  balance: Decimal.new(50)
}
balance = attrs.balance

on_conflict = from(
  a in Account,
  where: not a.locked,
  update: [inc: [balance: ^balance]]
)

%Account{}
|> Account.changeset(attrs)
|> Repo.insert(
  on_conflict: on_conflict,
  conflict_target: :email,
  stale_error_field: :email,
  returning: true
)
```

As you can see the `on_conflict` is now a standard `Ecto.Query.` We reuse the
operation keyword list and pass it to `update` and we add the condition we wanted.
There a few important things to have in mind as to how this query will be run,
though.

1. The records from which it will select are the subset that triggered the
conflict, not the entire dataset
2. The updates will be ran via an `update_all`, which do not update autogenerated
fields, for example

Other than that, it should work pretty much as expected. In the example above,
it will successfully increment the balance of the account if it is not locked,
returning the updated value.

If the account is locked, however, it will return an error via an error tuple,
the error will be `stale_entry` and will be applied to the changeset, on the field
specified by `stale_error_field`. The reason this happens is because the insert
didn't actually insert anything, since the `on_conflict` query will return an
empty set. `Ecto` treats these scenarios as a `StaleEntryError` and would generally
raise, but in the upsert scenario we know that it might happen and
`stale_error_field` is how we tell `Ecto` that we are expecting it, so there is no
need to raise.

## Conclusion

Upserts are a powerful tool to have in our database querying tool belt and can
be useful in many situations. We do need to keep in mind that it is not without
it's drawbacks, though. For instance its use is not recommend while also working
with associations, the `insert` call becomes more verbose or if we want to handle
conflicts in more complex ways that involve system parts other than the database
(by losing the atomicity), it might not be the thing for us.

We did not cover the `on_conflict` option extensively and I do recommend reading
the documentation where you'll also see `:nothing` and `{:replace, ...}`.

All in all it's relatively simple to use and it's a good way to handle scenarios
such as the ones described above.

[1]: https://hexdocs.pm/ecto/Ecto.Repo.html#c:insert/2-upserts
