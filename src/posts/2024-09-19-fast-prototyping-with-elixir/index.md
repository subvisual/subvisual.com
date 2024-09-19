---
highlight: false
path: fast-prototyping-with-elixir
title: Fast prototyping with Elixir
categories:
  - engineering
author: davide-silva
date: 2024-09-19
intro: Recently, I had an interesting problem to solve. I needed to build a
  system that would receive a file on an endpoint and perform some computation
  for each line of the file. The computation requires an external API call and
  the creation of some records in the database. Simple enough, right? The fun
  part starts when we realize we are dealing with a file that can be tens of
  thousands of lines long.
---
Recently, I had an interesting problem to solve. I needed to build a system that would receive a file on an endpoint and perform some computation for each line of the file. The computation requires an external API call and the creation of some records in the database. Simple enough, right? The fun part starts when we realize we are dealing with a file that can be tens of thousands of lines long.

## Requirements

Our file is in a CSV format and looks something like this:

```csv
user_1,1
user_2,1
user_3,2
````

For each line, we have a user id and the number of copies we want of our record for each user. In this example, we want to generate one entry for `user_1` and `user_2` and two entries for `user_3`.

Had there not been a need to call a 3rd party API, we would be able to calculate how many records to generate and do a bulk insert of the records all at once. In this case, however, we need to individually process each line and make the relevant insertions.

The record we need to create in the database contains more information, but the relevant parts for our purposes are the unique `record_id`, so that we can query a record directly, the `user_id`, so we know to which user a records belongs to, a `date` to differentiate between multiple copies for the same user, and an `api_id`, returned from the external API call.

For the example above, we would get something along these lines:
```
1,user_1,20240624,api_1
2,user_2,20240624,api_2
3,user_3,20240624,api_3
4,user_3,20240625,api_4
```

To get the `date` field, we fetch the current date when the request to our service is made. For each additional record for a specific user, we increment one day. 

Calling our service multiple times with the same CSV input should be idempotent, as a way to prevent unnecessary computation for repeated inputs. If we had successfully parsed that CSV, there would be no need to run the entire process again. This means we need to keep track of repeated CSV inputs so we can discard them.

## Rate limits

As we are using Elixir to build this service, our first instinct would be to spawn a process for each line of the CSV and have each process be responsible for the creation of their own record. This would be a good strategy but we are potentially spamming the API with thousands of concurrent requests. We also might hit some rate limits, or worse, cause an accidental shortage, so we need to be careful with our requests. Each request we make to the API takes around 3-5s for a response back, as it also needs to create some data on their end.

It is also crucial we ensure nothing goes wrong between the parsing of the CSV and the final creation of the records in our database, as we might run into some inconsistencies between the external API state and our records. If a request fails to create the external data, we can't allow our service to create a record for it. Likewise, if the external request is successful. However, if we fail the insertion of our own records we will also run into an inconsistent state and we need to recover from it.


## Elixir and OTP

By taking advantage of OTP and the Elixir ecosystem, we can quickly build a prototype to validate our service. We start by creating a Phoenix API-only app. This system only needs to respond to API requests so we can skip all the HTML generation. Then, by using a CSV parser tool, like [NimbleCSV](https://github.com/dashbitco/nimble_csv), we can easily parse our CSV into an Elixir list. Now that we have a way to receive CSV files, we just need to iterate over it and make the required computations. And with the use of [Supervisors](https://hexdocs.pm/elixir/Supervisor.html), [GenServers](https://hexdocs.pm/elixir/GenServer.html), and [Tasks](https://hexdocs.pm/elixir/Task.html), we can quickly build a resilient and fault-tolerant system.

![image](https://hackmd.io/_uploads/HyQSECSaC.png)

The Controller is only responsible for receiving the initial request, parsing the CSV into a list, and responding with a `202 Accepted` response. Given the entire processing of a CSV might take some time, we don't want to leave the HTTP request waiting for a response.

If the parsing of the CSV is successful, a request is made to the Orchestrator process to, among other things, check if this input is not repeated. If it isn't, we then spawn a Batch Orchestrator process. This process is responsible for batching our input into manageable chunks and spawning, for each batch, an execution worker.

It's in this Batch Worker that lies the bulk of the work. This is where we make the calls to the external API and write our records into the database. This is also where we put our reconciliation logic to handle errors when calling the API or when an insert to the database fails.


After some adjustments and additional optimizations, namely improving logging and error recovery, we have our service ready for some initial tests.

## Conclusion

This service was certainly an interesting exploration into how far we can go with just Elixir and OTP, without resorting too much to external dependencies. Being able to test and iterate a product quickly is one crucial aspect of software development. The sooner we can start using our product, the sooner we can find potential problems and make the necessary corrections. By choosing Elixir for this service, we were able to quickly build a prototype that allowed us to verify some of our initial assumptions.

The speed with which we managed to go from idea to production is a testament to the power of Elixir and its ecosystem and one of the reasons [we chose it](https://subvisual.com/blog/posts/elixir-for-startups/) as one of our tools for building products.