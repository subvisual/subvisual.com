---
highlight: true
path: building-an-hd-wallet-on-aws
title: Building An HD Wallet On AWS
categories:
  - engineering
author: gabriel-poca
date: 2023-05-23
cover: blog-building-and-securing-an-hd-wallet-on-the-cloud.jpg
seoImage: blog-building-and-securing-an-hd-wallet-on-the-cloud.jpg
intro: Let me tell you a short story of how we built the HD Wallet that powers Utrust.
---
Let me tell you a *short* story of how we built the [HD Wallet](https://www.investopedia.com/terms/h/hd-wallet-hierarchical-deterministic-wallet.asp) that powers [Utrust](https://utrust.com/). For context, Utrust is a payment gateway that online stores can integrate to allow buyers to pay with cryptocurrencies. Buyers pick a currency during checkout, and Utrust generates an address for that purchase.

The year was 2017, and we were preparing for the [ICO](https://medium.com/@UTRUST/utrust-ico-guide-1847fbfc40d7). Things were different back then: there weren’t any ICO platforms, smart contracts were dark magic, and people participated in ICOs using Bitcoin.

We had to build our own ICO platform. The plan was to have an address for each person looking to invest and, later, airdrop the tokens to an address of their choosing. Not a very trustless solution, but it made sense back then. To make this work, we didn’t build any on-demand address derivation solution; we pre-generated many addresses for Ethereum and Bitcoin. Simple and efficient. Well, not so simple.

We also had to secure the seed that generated those addresses. We wanted to use technology we could understand and trust. So we used GPG. There were four of us, and we encrypted the seed so any combination of two people could recover it. And now we were done.

Later, in 2018, when we first launched the Utrust merch store, we deployed Utrust with the root public key from a [ledger](https://www.ledger.com/) to create an [HD Wallet](https://www.investopedia.com/terms/h/hd-wallet-hierarchical-deterministic-wallet.asp). This is one of the properties of HD Wallets: it allows one to derive more addresses using just the public key.

Afterwards, we wrote scripts to move funds around and sign transactions with the ledger (my hand still hurts from confirming transactions on it). This approach was more secure than the first one because the private key never left the ledger, but the manual approach wouldn’t work in the near future.

Everything was a bit harder to do back then, and the fact that we had to support non-smart-contract chains added another layer. We had to build a general-purpose solution to receive payments across multiple chains and move those funds around programmatically. For that, we built and deployed a [Hot HD Wallet](https://www.investopedia.com/terms/h/hot-wallet.asp) to AWS.

The HD Wallet would hold a lot of money, so security was our number 1 priority. Somehow, the team in charge of getting this job done was a pack of security freaks (myself included) that argued, researched, consulted with advisors, and devised a strategy. It was an exciting project.

## Seeding ceremony

First, you generate entropy, which is just random noise. Then, you can take a dictionary and transform the entropy into a mnemonic. From the mnemonic, you generate, say, 100000 private keys. You upload those keys to a super-secure bucket on S3, encrypted via [KMS](https://aws.amazon.com/kms/). You encrypt and shard the mnemonic with [Shamir Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) and generate a bunch of new mnemonics. You write them down on paper. These mnemonics can be used to reconstruct the original. For instance, you can specify that someone needs 3 out of 5 to reconstruct the original, and Shamir Secret Sharing will handle that for you.

The computer in charge is running a live CD. The code was written by you using as few libraries as you can (don't implement Sharmir SS yourself). You put everything in a docker container to ensure the build is reproducible. The mnemonics never leave the computer; you erase and turn it off when you have everything on paper. There are no phones or cameras in the room.

![Photo of the label maker](./labelmaker.jpeg "Subvisual Blog Building An HD Wallet On AWS Article - Photo of the label maker")

Once you have the mnemonics on paper, you start carving them out on metal plates. This process will take a few hours. When finished, you quadruple-check them and put the metal plates in different sealed envelopes. Now tear apart the paper and give each person in the room a piece to burn somewhere else (you don't want to start an office fire). Finally, deliver the envelopes to different people and places according to your requirements—the end.

If there's an apocalypse and somehow you lose access to the private keys in S3, you can always reconstruct the mnemonic and generate the private keys again. If someone manages to steal one of the metal plates, they get nothing. If you try and burn down the buildings where they are kept, you get nothing because that metal doesn't burn.

We called this whole process the "seeding ceremony".

## Final touches

The private keys will be used by a service to derive more private keys that sign transactions. We can generate infinite private keys and addresses from this. Ideally, this service will only receive a transaction, sign it, and return the signature. You can call this service from your other services or apps when needed.

When you're done, return to AWS and remove the permissions to upload private keys to the S3 bucket. Then assign a policy that states that only your service, when running with a specific role, can retrieve files from that S3. Deploy your service into a private network with no internet connection that can only be accessed from your public network. The service only signs transactions, so it doesn't need external access. That service is deployed manually, and only a handful of people can do it. Also, use a separate AWS account for production and only give access to a few people.

This story happened in 2018, and I left Utrust more than 3 years ago, so I can't speak for the infrastructure they run now. Technology changed a lot since we've done this, so we would likely have done things differently now. But I can tell you this: I've met others building similar infrastructure, and most had one private key in encrypted storage and a mnemonic in a bank safe. I hope you liked the story! Feel free to [reach out to me](https://gabrielpoca.com) to talk about the article.