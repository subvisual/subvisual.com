---
highlight: true
path: building-cosmicwaves
title: Building CosmicWaves
categories:
  - engineering
author: subvisual
date: 2023-10-27
intro: In the urgency of a Hackathon, everything becomes about how much you
  care, and how personal the problem is to you. So, when we had the chance to
  create the experience of vibing to good music, it was a no-brainer. What
  Freddie Mercury sang was true; radio is yet to have its finest hour.
---
In the urgency of a Hackathon, everything becomes about how much you care, and how personal the problem is to you. So, when we had the chance to create the experience of vibing to good music, it was a no-brainer. What Freddie Mercury sang was true; radio is yet to have its finest hour.

[CosmicWaves](https://github.com/subvisual/CosmicWave) is a free, decentralized, anonymous radio station that allows any music artist to broadcast their content without losing right over it. Anyone who wants to listen can join and enjoy the experience, in sync, with all the other fans.

And this is how we built it in 3 weeks at [ETHGlobal HackFS 2023](https://ethglobal.com/events/hackfs2023).

## Permission-based Access

Our end goal was to allow everyone to add their songs to playlists and broadcast them at some point in the near future, almost like having a queue of playlists from different people. The thing is that this was a complex idea to achieve in a hackathon, so we decided that we would only have one streamer and the rest of the users would be listeners.

Only the streamer is able to add songs and playlists. As well as start and stop broadcasting. Basically, a power user with a custom dashboard with different flows.

All of this is possible due to [Polybase](https://polybase.xyz/), which is a decentralized database powered by zero-knowledge proofs, which allows us to control who can read and write to specific collections, and if we want more granularity, we also can set permissions on records and fields, meaning that only the user that signed a specific record is the only one who's able to access it and modify it.

Because of all of this, we implemented our data model and deployed it into Polybase. If you're curious, you can see the schema [here](https://github.com/subvisual/CosmicWave/blob/main/polybase/src/schema.ts). With this, our frontend can access the data in Polybase to check if the current user is the streamer, and if so, its custom dashboard can be displayed.

The rest of the users are limited to listening to the current stream.

## Rust server

Unfortunately, due to some technical and time constraints, we couldn’t keep everything in this project decentralized. In order to provide a better listening experience for everyone, we wanted a way to sync all the listeners to the song that is currently being played so that, despite joining late to the stream, everyone would be listening to the same exact moment of the song that is currently being played. Kinda like how on a traditional radio, when you tune to a station, you start listening to what is being broadcasted at that moment in time.

On the other hand, this allowed us to play around and build a simple HTTP server in Rust. The server is a simple one, with just one public endpoint. This endpoint returns the list of songs that are currently on the playlist and a timestamp that is the offset of when the stream started and the current time. We know when a stream starts, we know the duration of each song on the playlist, and we know the current time, so we can calculate how far along the song we should be for every instant of time. Along with fetching some metadata from Polybase, this is basically what the server is used for. With this information, we can sync all the frontend clients to the exact timestamp so everyone can enjoy the song at the same time.

## **The Frontend**

The frontend operates most of the mojo for this dApp.
On the streamer side, it’s responsible for managing the file upload to IPFS, through [Helia](https://github.com/ipfs/helia), retrieving the CID, and saving the CID on [Polybase](https://polybase.xyz), with the option of creating a playlist and including that song on it. Finally, the streamer can start the stream, which will commit a status change on Polybase, setting the streaming start time (timestamp).

The start timestamp is the most important piece. Because we were not able to implement a full p2p broadcast (the original idea was to use libp2p to achieve that), we based the sync mechanism on the starting time and current playing song. This way, the player, on the listener's side of the dApp, would be able to start playing the current song of the playlist at the expected time. 

Other than the basic functionality, the dApp was also responsible for managing access to the streamer dashboard, based on Polybase permissions; display the user’s ENS Name and Avatar through [rainbowkit](https://www.rainbowkit.com/), and generate the playlist ID with [drand](https://drand.love/) (fun fact, we left the drand integration commented so technically this is not being used 🤦‍♂️)

The stack we used was the pretty standard React typescript with TailwindCSS.

## The Branding and the User Experience

The branding for Cosmicwaves was inspired by the idea of sound and the universe. We created a logo that resembled sound waves and used other visual elements to give the impression of being within a galaxy in the universe. The landing page's background image was generated using Midjourney.

We used Plus Jakarta Sans for both the logo and the product, a free and open-source font designed in 2020 by Gumpita Rahayu from the foundry Tokotype. Plus Jakarta Sans offers a fresh take on geometric sans serif styles, and it being open-source was ideal for us, given the purpose and overall idea of decentralization for this project.

In terms of UX, we first considered the user flows for both the person uploading files and streaming them, as well as for the listeners. To stream, the user would need to 1. connect their wallet (to be granted the streamer’s access), 2. upload files, 3. create a playlist with those files, and 4. stream the playlist (and could stop streaming whenever they wished).

For the listener, the flow was simpler. They would just need to open the website and click "Tune In". We didn't want the music to start automatically in order to provide a better user experience. They could then start listening to the music immediately without the need to sign in or connect their wallet. They did not have the option to pause the streaming, as it would defeat the purpose of a live stream, but they could silence it at any time.

## Conclusion

We all found something to be proud of on this project, not only because we were [finalists](https://ethglobal.com/showcase/cosmicwaves-20gwo), but also from how cool it looks, to keeping the experience as decentralized and real as possible, to allowing us to play with new exciting tech. We didn't know what we were going to build the moment we applied. Trimming our initial idea to something doable on a hackathon was challenging, but with a clear connection to the problem and with our skillset in developing products building Cosmicwaves was an exciting, fun, and fruitful experience!