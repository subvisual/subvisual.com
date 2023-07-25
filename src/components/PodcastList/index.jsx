import Slider from "react-slick"
import React from "react"
import PropTypes from "prop-types"

import { NextArrow, PrevArrow } from "../Arrows"
import SectionTitle from "../SectionTitle"
import Link from "../Link"

import * as styles from "./index.module.scss"

function PodcastList({ podcasts }) {
  return (
    <div className={styles.root}>
      <div className={styles.sectionTitle}>
        <SectionTitle>Podcasts</SectionTitle>
      </div>
      <Slider
        {...{
          arrows: true,
          dots: false,
          infinite: false,
          nextArrow: <NextArrow label="Next Podcast" />,
          prevArrow: <PrevArrow label="Previous Podcast" />,
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          variableWidth: true,
          speed: 500,
        }}
      >
        {podcasts.map((podcast) => (
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={podcast.url}
              className={styles.item}
              key={podcast.url}
            >
              <img
                className={styles.image}
                alt=""
                src={podcast.image}
                aria-hidden="true"
              />
              <p className={styles.title}>{podcast.title}</p>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  )
}

PodcastList.propTypes = {
  podcasts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
}

export default PodcastList
