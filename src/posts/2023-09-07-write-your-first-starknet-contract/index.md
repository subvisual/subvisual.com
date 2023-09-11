---
highlight: true
path: write-your-first-starknet-contract
title: Write your first Starknet contract
categories:
  - engineering
author: davide-silva
date: 2023-09-11
intro: Are you interested in Cairo and Starknet but need help figuring out where
  to start? Have you been hearing about the new Rust-like Cairo syntax but have
  yet to have the chance to look into it?
---
Are you interested in Cairo and Starknet but need help figuring out where to start? Have you been hearing about the new Rust-like Cairo syntax but have yet to have the chance to look into it?

Follow along, and by the end of this post, you will have written your first Starknet contract.

Our contract will be a very simple one. The contract will store a value and allow you to both get and change that value.
Here is what it looks like in Solidity:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface ICounter {
  function getNumber() external view returns(uint64);
  function setNumber(uint64 newNumber) external;
}

contract Counter is ICounter {
    uint64 public number;

    constructor() {
      number = 1;
    }

    function setNumber(uint64 newNumber) public {
        number = newNumber;
    }

    function getNumber() public view returns(uint64) {
        return number;
    }
}
```

Let's see how we can write this smart contract in Cairo.

## Setup

If you are familiar with Ethereum development, you are aware of Foundry. A [Starknet Foundry](https://github.com/foundry-rs/starknet-foundry) is currently in active development, so we are going to install and use [Scarb](https://github.com/software-mansion/scarb) as a way to create and manage our project.

### Scarb setup

Scarb is a tool that allows us to manage our project dependencies and provides a way to compile and run the tests. If you are familiar with Rust, `scarb` is similar to `cargo`.
You can install it how you prefer by [following the docs](https://docs.swmansion.com/scarb).

After that, we can create a new project by running:
```bash!
scarb new my_first_contract
```

Let's `cd` into the new folder and get ready to write our first Starknet contract.


### Starknet dependency

Since Cairo is a general-purpose language, we need to [make a few changes](https://docs.swmansion.com/scarb/docs/extensions/starknet/contract-target.html) to our project to access Starknet functionality.

Open the `Scarb.toml` file and add the following line:
```
[[target.starknet-contract]]
```

This line tells the compiler that our package is a Starknet contract, and we want the compilation to target that.

We also need to add the Starknet package under the `[dependencies]` section:
```
starknet = ">=2.0.0"
```

### Modules

One final step is needed before we can start writing our contract. In `lib.cairo`, you'll find a function that [calculates the Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_sequence). We don't need it, so we can delete it and replace it with the following:
```
mod my_first_contract;
```

What's this, and why it is needed? In short, Cairo uses a [module system to handle code separation](https://book.cairo-lang.org/ch06-00-managing-cairo-projects-with-packages-crates-and-modules.html), like Rust, and `lib.cairo` is the root module where we can define all the modules of our package.
With this in place, we can create a file `my_first_contract.cairo` in the `src/` folder and start writing our smart contract.

## Writing the contract

### Defining a Trait


A Trait is a way to define and enforce what specific functionality we need to implement. It specifies the signature of the functions we want to implement, and it's essential for developing in Cairo. There are many ways to use Traits, but this Trait will serve as a way to expose the public interface of our smart contract, similar to how an interface works in Solidity.

If this is your first time coming across traits, I recommend [that you get familiar with the concept](https://book.cairo-lang.org/ch07-02-traits-in-cairo.html) as traits feature heavily in Cairo. For now, you can assume a trait is the equivalent of an interface in Solidity.


Let's add this trait declaration at the top of our `my_first_contract.cairo` file:
```rust
// my_first_contract.cairo

#[starknet::interface]
trait IMyFirstContract<ContractState> {
  fn get_value(self: @ContractState) -> u64;
  fn set_value(ref self: ContractState, new_value: u64);
}
```

We create a Trait using the `trait` keyword, followed by a name. Inside the block, we write only the signature of the functions we want to implement. Since this trait is going to [serve as the contract interface](https://book.cairo-lang.org/ch99-02-01-abis-and-interfaces.html#interface), we annotate it with the `#[starknet::interface]` attribute.

Note: You might notice that the trait has a type `ContractState`, and the functions we define receive a `self` parameter. We will look at this in more detail later on when we are implementing the functions, but keep in mind that this is needed because we are accessing the smart contract storage in our functions. Also, we didn't need to realize the type here and could've used a generic `T` instead of `ContractState`.

### Implementing

With the trait defined, it's finally time to create a module for our contract. We create new modules using the `mod` keyword, followed by the module's name. For now, we can use the same file, `my_first_contract.cairo`, but it is possible to [separate modules into their own files](https://book.cairo-lang.org/ch06-05-separating-modules-into-different-files.html), should the need arise.

Add this module declaration below the trait declaration:
```rust
// my_first_contract.cairo

#[starknet::contract]
mod MyFirstContract {
    #[storage]
    struct Storage {
        value: u64
    }
}
```

Like with the Trait, we annotate the contract module with an attribute, `#[starknet::contract]`, to indicate to the Cairo compiler this is a Starknet smart contract.

We also defined a struct named `Storage` that contains a `value` attribute. It has a `#[storage]` annotation, and the name is an essential part of how we define access to a [smart contract storage space in Starknet](https://book.starknet.io/chapter_2/storage.html).

#### Constructor

We are ready to start using `value` as every slot in [storage is automatically initialized](https://docs.starknet.io/documentation/architecture_and_concepts/Contracts/contract-storage/#storage_layout). Still, if we take a look at the Solidity contract, we see that the `value` attribute is initialized to `1` in the constructor. Let's see how we can do the same thing in Cairo.

Add the following, right after the `Storage` struct declaration, still inside the `mod MyFirstContract` block:

```rust
#[constructor]
fn constructor(ref self: ContractState) {
  self.value.write(1)
}
```

Once again, we annotate the `constructor` function with the `#[constructor]` attribute, and we also receive a reference, denoted by the `ref` keyword, to a `self` parameter of the `ContractState` type.

Every time we want to [make a change to the contract storage](https://book.cairo-lang.org/ch99-01-02-a-simple-contract.html#modifying-with-the-contracts-state), the function that does so needs to receive `ref self: ContractState` as the first parameter to indicate to the compiler that this function changes storage values. Doing so allows us to access storage variables directly using `self` and the variable's name.

Since our variable name is `value`, we can write to it by calling `self.value.write` with the value we want to store. We use the' read' function instead if we're going to read values from storage.

With a reference to the `ContractState`, we can both read and write to variables in storage. But, if we only want to read from storage, we can be more secure and use a snapshot.
A [snapshot is a read-only reference](https://book.cairo-lang.org/ch03-02-references-and-snapshots.html#snapshots) to a variable. We can read the value, but we can't make any changes to it. The compiler enforces this so we can be sure that if we provide a snapshot to some function, there's no way it changes the value that it points to.


#### Trait implementation
Let's finally implement the `get_value` and `set_value` functions we defined in the trait.

A trait implementation consists of the `impl` keyword followed by the implementation name and the `of` keyword followed by the trait we are implementing.

We use `super` to [reference modules defined outside of the current module](https://book.cairo-lang.org/ch06-03-paths-for-referring-to-an-item-in-the-module-tree.html). In this case, we are accessing the `IMyFirstContract` trait definition at the top of the file by using the `super` keyword.

Add the following implementation right below the `constructor` function:

```rust
#[external(v0)]
impl PublicFunctions of super::IMyFirstContract<ContractState> {
    fn get_value(self: @ContractState) -> u64 {
        self.value.read()
    }
    
    fn set_value(ref self: ContractState, new_value: u64) {
        self.value.write(new_value)
    }
}
```

The `set_value` implementation body is essentially what we already did in the `constructor`. The only difference is instead of using a hardcoded value, we pass in a parameter.

The `get_value` function receives a `ContractState` snapshot, denoted by the `@` symbol prepending the type. The implementation is also straightforward. We use the `read` function to obtain the value.


A quick note about function visibility in Cairo: By default, unless stated otherwise, all functions are internal. We use the `[external(v0)]` attribute to specify that a function can be called from the outside. We can use this attribute on a per-function basis, or as we did here, we can also say that all functions implemented by a specific trait implementation are external.

We should now be able to build our project and have a successful compilation.

Let's go back to the terminal and run `scarb build`. If everything goes as expected, we should see an output similar to this:

```
   Compiling my_first_contract v0.1.0 (/Users/davidesilva/blog/my_first_contract/Scarb.toml)
    Finished release target(s) in 1 second
```

## Conclusion

Putting everything together, this is how the full Starknet contract implementation should look like:

```rust
#[starknet::interface]
trait IMyFirstContract<ContractState> {
    fn get_value(self: @ContractState) -> u64;
    fn set_value(ref self: ContractState, new_value: u64);
}

#[starknet::contract]
mod MyFirstContract {
    #[storage]
    struct Storage {
        value: u64
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.value.write(1)
    }

    #[external(v0)]
    impl PublicFunctions of super::IMyFirstContract<ContractState> {
        fn get_value(self: @ContractState) -> u64 {
            self.value.read()
        }

        fn set_value(ref self: ContractState, new_value: u64) {
            self.value.write(new_value)
        }
    }
}
```

If we do a side-by-side comparison with the Solidity code, we can see that, while there are some apparent differences in the syntax, a Cairo contract is not that different from Solidity:
- A `trait` is used in place of the Solidity `interface`, but both serve the same goal of defining function signatures to be later implemented by the contract
- Storage variables are set inside a `struct` named `Storage` instead of being declared at the top of the contract, but this is simply a way to access a contract storage space
- Functions are defined inside the trait implementation block, but this is similar to how, in Solidity, we say a contract is the implementation of an interface

This will help you take your first step into Starknet and contract development in Cairo. Feel free to poke around in the [repo](https://github.com/subvisual/my-first-starknet-contract-demo) if you want to take a closer look at something or [find me on Twitter](https://twitter.com/0xdavidesilva) if you had any doubts.

And if it sparked your interest and you want to learn more, I suggest you read through the [Cairo Book](https://book.cairo-lang.org/) and [Starknet Book](https://book.starknet.io/). These excellent resources go in-depth and will help you with your learning journey.