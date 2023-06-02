import { extractFromXml } from "@extractus/feed-extractor"
import React, { useEffect, useState } from "react"
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

const podcastRSSIds = ["_7fv6zD4", "26SKyPM6", "M7Iqz4PG", "jDClsfPu"]

async function getFeed(id) {
  const response = await fetch(`https://feeds.simplecast.com/${id}`)
  const xml = await response.text()

  return xml
}

async function getEpisodes(id) {
  const feed = extractFromXml(await getFeed(id), { normalization: false })

  const episodes = feed.item.map((episode) => ({
    title: episode.title,
    link: episode.link,
    published: episode.pubDate,
    image: feed.image.url,
  }))

  return episodes
}

function Podcasts() {
  const [allEpisodes, setAllEpisodes] = useState([])
  useEffect(() => {
    async function fetchEpisodes() {
      const episodes = await Promise.all(podcastRSSIds.map(getEpisodes))
      setAllEpisodes(episodes.flat())
    }

    fetchEpisodes()
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
          fade: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        }}
      >
        {allEpisodes
          .sort((a, b) => b.published - a.published)
          .map(
            (episode) =>
              episode.published && (
                <div key={episode.title}>
                  <a href={episode.link} target="_blank">
                    <div className={styles.container}>
                      <div className={styles.imageContainer}>
                        <img
                          src={episode.image}
                          alt={episode.title}
                          className={styles.image}
                        />
                      </div>
                      <div className={styles.title}>{episode.title}</div>
                    </div>
                  </a>
                </div>
              )
          )}
      </Slider>
    </div>
  )
}

export default Podcasts
