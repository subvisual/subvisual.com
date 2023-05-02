import React from "react"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import SectionTitle from "../SectionTitle"
import Categories from "../Categories"
import Author from "../Author"

import * as styles from "./index.module.scss"

function NextArrow({ onClick }) {
  return (
    <button
      aria-label="Next Highlight"
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
      aria-label="Previous Highlight"
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

export default function HighlightedPosts({ posts }) {
  return (
    <div className={styles.root}>
      <SectionTitle>highlighted articles</SectionTitle>
      <Slider
        {...{
          dots: false,
          infinite: true,
          arrows: true,
          fade: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        }}
        dotsClass={styles.dots}
      >
        {posts.map(
          ({ path, intro, title, cover, categories, author, date }) => (
            <div>
              <div className={styles.post} key={path}>
                <div className={styles.details}>
                  <Link to={path}>
                    <h3 className={styles.title}>{title}</h3>
                  </Link>
                  <span className={styles.intro}>{intro}</span>
                  <div className={styles.author}>
                    <Author author={author} date={date} />
                  </div>
                  {categories?.length && (
                    <Categories categories={categories || []} />
                  )}
                </div>
                {cover && (
                  <div className={styles.image}>
                    <GatsbyImage
                      alt=""
                      image={cover.childImageSharp.gatsbyImageData}
                      className={styles.cover}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </Slider>
    </div>
  )
}
