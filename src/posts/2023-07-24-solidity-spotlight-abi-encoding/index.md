---
highlight: false
path: solidity-spotlight-abi-encoding
title: "Solidity Spotlight: ABI encoding"
categories:
  - engineering
author: miguel-palhas
date: 2023-07-24
intro: Demystifying the hex format of EVM function call
---

# Solidity Spotlight: The basics of Ethereum ABI encoding

When developing Ethereum apps, a common source of confusion for newcomers to the space is the ABI-encodedd hex that represents function calls in a transactoin

For example, an ERC20 transfer will show up as a blob of hex data on-chain:

```
0xa9059cbb0000000000000000000000004b7f6bfd248f541eb5474f591d54bc29444946db00000000000000000000000000000000000000000000003635c9adc5dea00000
```

## Making sense of bytecode

To understand this blog, we first need to grab the first 8 bytes, which represent the truncated signature of the function being called:

```
0xa9059cbb
```

This is the function selector, used by the called contract to route to the appropriate function, and determined by hashing the corresponding function signature as seen on the contract's ABI:

```
transfer(address,uint256)
```

Hashing this signature with keccak256 gives us a hash, of which we can take the first 4 bytes to get back the same sequence above.
Go ahead, [try it](https://emn178.github.io/online-tools/keccak_256.html).

## Reverting the process

Since hashing is 1-way operations, there is no builtin way to retrieve the original ABI function from its signature.
Furthermore, this process doesn't guarantee uniqueness. In fact, there are many known function headers that hash to the same hex signature.

To reverse the process, the Ethereum community maintains databases of known ABI signatures, allowing developers to do a reverse lookup on them

The handiest way to query these is to use `cast`, part of the Foundry toolkit:

```
$ cast 4byte 0xa9059cbb
transfer(address,uint256)
```

In fact, `cast` can go even further, and decode the entire function call we used above:

```
$ cast 4byte-decode 0xa9059cbb0000000000000000000000004b7f6bfd248f541eb5474f591d54bc29444946db00000000000000000000000000000000000000000000003635c9adc5dea00000
1) "transfer(address,uint256)"
0x4b7f6bfD248f541eB5474f591D54Bc29444946db
1000000000000000000000 [1e21]
```

This will print out the signature first, and a sequential list of each decoded argument

We can also use `cast calldata` to encode a chosen function call:

```
$ cast calldata "transfer(address,uint256)" 0xa9059cbb0000000000000000000000004b7f6bfd248f541eb5474f591d54bc29444946db00000000000000000000000000000000000000000000003635c9adc5dea00000
```

## Conclusion

We've seen how function encoding works for Solidity contracts, and how to use `cast` to make sense of it.
`cast` is a much bigger swiss-army knife of utility functions to interact with EVM chains. Check out [its documentation](https://book.getfoundry.sh/reference/cast/) to learn what else it can do
