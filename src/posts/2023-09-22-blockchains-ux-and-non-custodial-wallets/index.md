---
highlight: true
path: blockchains-ux-non-custodial-wallets
title: Blockchains, UX And Non-Custodial Wallets
categories:
  - engineering
author: gabriel-poca
date: 2023-09-22
intro: If you ever had to build an accounting system, you know that it's not
  easy. Besides the technical difficulties, you must consider the complicated
  legal requirements when dealing with someone else's money. These are some of
  the reasons why many products are looking to build on top of the blockchain.
  If you're a technical co-founder and you're skeptical about using blockchain
  in your product, this blog post may be for you.
---
If you ever had to build an accounting system, you know that it's not easy. Besides the technical difficulties, you must consider the complicated legal requirements when dealing with someone else's money. These are some of the reasons why many products are looking to build on top of the blockchain. If you're a technical co-founder and you're skeptical about using blockchain in your product, this blog post may be for you.

The first reason you may point out for not using a blockchain is that it makes it hard to change: startups iterate quickly, but Blockchains are immutable, so you can't just change some data in the database if you need to. I can't argue with that. To build on a blockchain, you must do things differently from what you're used to. But if you're handling user transactions and holding your users' money, I believe the pros outweigh the cons: Blockchains already solved accounting, and non-custodial wallets simplify many legal requirements.

The second reason you may point out to disregard blockchains is that your users will not understand how to use the product. You tried a bunch of Web3 products, and they have terrible UX. I also can't argue with that, but a lot has changed recently, and some solutions don't introduce those UX issues.

What makes for good UX in Web3?

## Non-Custodial Wallet-As-A-Service

Any Web3 experience starts with a wallet: You open an app, and it asks you to "connect" your wallet. To set up such a wallet, you must write down some words that may be necessary if you lose access to your wallet. But ensure those words don't fall into the wrong hands because you may lose everything! This isn't good, and a custodial wallet is a no-go, so what can we do?

There are now wallet-as-a-service solutions, such as Web3Auth, to solve the issue of creating and securing seed phrases. These services allow users to login with their social accounts to create a wallet. You can easily integrate Web3Auth into your app to create a login experience similar to what you see everywhere else. The infrastructure for these wallets is decentralized, and users are still in control of their private keys (up to a point).

The most recent iterations of these services use Multi-Party Computation (MPC) to allow signing transactions in a secure environment without exposing the private key. The private key doesn't even have to be materialized to sign transactions, so it's never at risk of being leaked.

But will your users trust a social network to secure access to their wallets? Social login is used by many, and if we are going to delegate security, I believe this is the best compromise.

But can users trust a social network not to revoke their access? You can also help them with that. For instance, in Web3Auth, you can require multi-factors for logging in, having users connect with 3 different social network accounts to create a wallet. We can then set a threshold where at least 2 out of 3 are needed to access the wallet. If they lose access to one account, they can still recover using the other two.

## Gasless Transactions

Using Web3Auth, your users have wallets, but what can they do with them? They can sign the terms of service, but what they really want is to trade in that in-game gold they earned for a skin. Unfortunately, for that, they have to first top-up their wallet with ETH to pay for the gas. To get ETH, they must register in a centralized exchange, do KYC, on-ramp EUR, swap for ETH, and send it to their wallet. You can build some of this into your app, but remember that this is an operation where the user exchanges currency, so you need a license. But assuming you have it figured out, asking users to KYC and on-ramp fiat before they can do anything in your app doesn’t sound reasonable. This is where gasless transactions come into play.

[Gasless transactions](https://docs.openzeppelin.com/learn/sending-gasless-transactions#what-is-a-meta-tx), or meta transactions, are a mechanism by which an account can execute transactions on behalf of another. For instance, someone looking not to be exposed to changes in the price of ETH may choose to sell all their ETH for USDC. Now, whenever they want to execute a transaction, they can use the [Gas Station Network (GSN)](https://docs.opengsn.org/) to ask someone else to pay for the gas fee while taking a fee in USDC from their account

Using gasless transactions, you can, for instance, pay the fees for users onboarding into your application, or you can pay the fees for someone putting their NFT up for sale, or you can have users buy a subscription through Stripe before paying their transaction fees. There are many ways to make it so users don’t have to deal with gas, topping up their accounts with ETH, and all the intricacies of sending a transaction.

The best part about using gasless transactions is that you can be very specific about the scenarios in which you are willing to pay the fees for a transaction:

- You can see which contract the transaction is calling and only pay for transactions to your contracts. With this, you can be sure you are only paying fees for interactions relevant to your app.
- If a user executes many transactions, you can rate limit the number of transactions you are willing to pay for in a timeframe, globally or per user.
- You can have users pay for their own transactions off-chain. For instance, users may have to buy a subscription through Stripe before you start paying the fees for their transactions.
- If the user is exchanging something of value, you can take a fee out of it while paying the gas fees. For instance, if the user buys an NFT with USDC, you can take a fee from their USDC amount.

You’ll need to design your business model around the limitations some of the limitations. However, with these examples, I hope you see that there are many ways to leverage gasless transactions to build a rich experience for your users while they are still in control of their wallets.

If you want to build using gasless transactions, integrating with the [Gas Station Network (GSN)](https://docs.opengsn.org/) is the best way to start, as you only have to write the contract to approve or reject a transaction.  And if this all sounds very expensive, there are many ways to lower costs, such as picking a cheaper blockchain: L2, such as [Arbitrum](https://arbitrum.io/) and [zkSync](https://zksync.io/), are the future.

## Conclusion

I only touched the surface of what's possible. Still, hopefully, you can see how adopting these solutions allows you to build an experience similar to any other web and mobile app.