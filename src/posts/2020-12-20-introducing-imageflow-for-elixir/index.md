---
path: /posts/introducing-imageflow-for-elixir
title: Introducing Imageflow for Elixir: Blazing fast image processing
author: miguel-palhas
date: 2020-12-20
seoImage: ./seo.png
tags:
  - development
  - elixir
  - rust
intro: >
  I fell into a rabbit hole. It all started with quarantine, and too many
  Zoom calls.
---

In the good spirit of [rewriting things in Rust](https://zaiste.net/posts/shell-commands-rust/), I've been playing around with `imageflow` as an alternative to ImageMagick for image processing. It ended up being useful to have Elixir bindings as well.

So, long story short, [here's `imageflow_ex`](https://hexdocs.pm/imageflow/readme.html). Read on for the details.

# Graph-like API

Besides a CLI tool, Imageflow provides lower level APIs, including C/Rust
bindings, and a JSON API.

The JSON API allows users to specify a job in the form of a graph, with multiple
input/output images, and transformations along the way.

A common scenario for web developers is the ability to create multiple versions
of the same image, for a responsive website.

With the `imageflow_tool` CLI command this would be:

```sh
imageflow_tool v1/build \
  --json task.json \
  --in input.jpg \
  --out 1 output_1600.jpg \
        2 output_w1200.jpg \
        3 output_w800.jpg \
        4 output_w400.jpg
```

`task.json` would contain the entire pipeline, which can involve not only
resizing the image, but also doing some pre-processing, such as adjusting
brightness or contrast, blending multiple inputs, or adding watermarks.

You can now do this in Elixir as well.
Here's a simple example, with a single input/output:

```elixir
alias Imageflow.Graph

Graph.new()
|> Graph.decode_file("input.png")     # read input.png
|> Graph.constrain(200, 200)          # constrain image to 200x200
|> Graph.saturation(0.5)              # set saturation to 0.5 (-1..1 range)
|> Graph.encode_to_file("output.png") # specify output file
|> Graph.run()                        # run the job
```

And if you want to generate multiple outputs, all you need is to branch out in
the graph:

```elixir
alias Imageflow.Graph

Graph.new()
|> Graph.decode_file(@input_path)
|> Graph.branch(fn graph ->  # 2160px wide image for retina displays graph
  
  |> Graph.constrain(2160, nil)
  |> Graph.encode_to_file("desktop@2x.png")
end)
|> Graph.branch(fn graph ->  # 1080px wide image for desktop
  graph
  |> Graph.constrain(1080, nil)
  |> Graph.encode_to_file("desktop.png")
end)
|> Graph.branch(fn graph ->  # 720px wide image for tablet
  graph
  |> Graph.constrain(720, nil)
  |> Graph.encode_to_file("tablet.png")
end)
|> Graph.branch(fn graph ->  # 600px wide image for mobile
  graph
  |> Graph.constrain(600, nil)
  |> Graph.encode_to_file("mobile.png")
end)
|> Graph.run()
```

# Connecting to Rust NIFs

[`rustler`] is a suprisingly easy-to-use package that provides the ability to
write Erlang NIFs in Rust. Since Imageflow is a Rust tool, rustler makes all the
work seamless.

In fact, although the latest `0.22` version isn't released yet, `imageflow_ex`
is already being ported to the release candidate, which provides an extremely
ergonomic API that should be readable even to those not fluent in Rust:

```rust
#[rustler::nif]
fn add(a: i64, b: i64) -> i64 {
    a + b
}

rustler::init!("Elixir.Math", [add]);
```

There's a bit more work involved in `imageflow_ex`, though, as error handling
needs to be done properly, and `{:ok, value} | {:error, error}` tuples are the
prefered way of returning results.
