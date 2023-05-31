import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Slider from "react-slick"
import SectionTitle from "../SectionTitle"

import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

import * as styles from "./index.module.scss"

function NextArrow({ onClick }) {
  return (
    <button
      aria-label="Next Podcast"
      type="button"
      className={styles.nextArrow}
      onClick={onClick}
    >
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.4176 7.00002H16.7685M16.7685 7.00002L11.0953 1.16669M16.7685 7.00002L11.0953 12.8334"
          stroke="var(--c-blue-1)"
          strokeLinecap="square"
        />
      </svg>
    </button>
  )
}

function PrevArrow({ onClick }) {
  return (
    <button
      aria-label="Previous Podcast"
      type="button"
      className={styles.prevArrow}
      onClick={onClick}
    >
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5824 6.99998L1.23152 6.99998M1.23152 6.99998L6.90467 12.8333M1.23152 6.99998L6.90467 1.16665"
          stroke="var(--c-blue-1)"
          strokeLinecap="square"
        />
      </svg>
    </button>
  )
}

export async function getPodcastsFromSimplecast() {
  const res = await fetch("https://api.simplecast.com/podcasts", {
    headers: {
      Authorization: `Bearer ${process.env.GATSBY_SIMPLECAST_TOKEN}`,
    },
  })
  const data = await res.json()

  const podcasts = data.collection.map((podcast) => ({
    id: podcast.id,
    title: podcast.title,
    image: podcast.image_url,
  }))

  return podcasts
}

function Podcasts() {
  const [podcasts, setPodcasts] = React.useState([])

  React.useEffect(() => {
    async function getPodcasts() {
      const podcasts = await getPodcastsFromSimplecast()
      setPodcasts(podcasts)
    }

    getPodcasts()
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <SectionTitle>podcasts</SectionTitle>
      </div>
      <Slider
        {...{
          infinite: true,
          arrows: true,
          fade: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        }}
      >
        {podcasts.map((podcast) => (
          <div className={styles.container}>
            <div key={podcast.id} className={styles.card}>
              <p>{podcast.title}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Podcasts
