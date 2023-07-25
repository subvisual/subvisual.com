import React from "react"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import SectionTitle from "../SectionTitle"
import Categories from "../Categories"
import Author from "../Author"
import { NextArrow, PrevArrow } from "../Arrows"

import * as styles from "./index.module.scss"

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
          adaptiveHeight: false,
          nextArrow: <NextArrow label="Next Highlight" />,
          prevArrow: <PrevArrow label="Previous Highlight" />,
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
