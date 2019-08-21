import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax"

import CallToAction from "../CallToAction"
import LoadPlaceholder from "../LoadPlaceholder"
import Text from "../Text"
import Title from "./hero/title"

import styles from "./hero.module.css"

const renderParallaxImage = ({ baseDelay, image, parallaxAmount }) => (
  <ParallaxBanner
    layers={[
      {
        children: (
          <LoadPlaceholder delay={baseDelay}>
            {onLoad => (
              <Img
                fadeIn={false}
                onLoad={onLoad}
                fluid={image}
                imgStyle={{ display: "block" }}
                style={{ height: "100%" }}
              />
            )}
          </LoadPlaceholder>
        ),
        amount: parallaxAmount,
      },
    ]}
  />
)

const Hero = ({ data, planetMorph }) => {
  const baseDelay = 0.3

  return (
    <ParallaxProvider>
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.title}>
            <Title planetMorph={planetMorph} />
          </div>
          <div className={styles.text}>
            <p>
              <Text>
                Building a company from the ground up is hard and stressful,
                particularly in heavy regulated fields such as fintech and
                digital healthcare.
              </Text>
            </p>
            <p>
              <Text>
                Struggling with designing and developing that awesome idea
                you’ve had? We can help you succeed.{" "}
                <CallToAction>Together.</CallToAction>
              </Text>
            </p>
          </div>
          <div className={styles.images}>
            <div className={styles.image}>
              <div className={styles.horizontal}>
                {renderParallaxImage({
                  baseDelay,
                  image: data.hero1_h.childImageSharp.fluid,
                  parallaxAmount: 0.2,
                })}
              </div>
              <div className={styles.vertical}>
                {renderParallaxImage({
                  baseDelay,
                  image: data.hero1_v.childImageSharp.fluid,
                  parallaxAmount: 0.2,
                })}
              </div>
            </div>
            <div className={styles.image}>
              <div className={styles.horizontal}>
                {renderParallaxImage({
                  baseDelay: baseDelay + 0.1,
                  image: data.hero2_h.childImageSharp.fluid,
                  parallaxAmount: 0.2,
                })}
              </div>
              <div className={styles.vertical}>
                {renderParallaxImage({
                  baseDelay: baseDelay + 0.1,
                  image: data.hero2_v.childImageSharp.fluid,
                  parallaxAmount: 0.2,
                })}
              </div>
            </div>
            <div className={styles.image}>
              <div className={styles.horizontal}>
                {renderParallaxImage({
                  baseDelay: baseDelay + 0.2,
                  image: data.hero3_h.childImageSharp.fluid,
                  parallaxAmount: 0.2,
                })}
              </div>
              <div className={styles.vertical}>
                {renderParallaxImage({
                  baseDelay: baseDelay + 0.2,
                  image: data.hero3_v.childImageSharp.fluid,
                  parallaxAmount: 0.2,
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  )
}

Hero.propTypes = {
  planetMorph: PropTypes.func,
}

Hero.defaultTypes = {
  planetMorph: () => {},
}

export default ({ planetMorph }) => (
  <StaticQuery
    query={query}
    render={data => <Hero data={data} planetMorph={planetMorph} />}
  />
)

const query = graphql`
  query {
    hero1_v: file(relativePath: { regex: "/hero-1-vertical.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 452, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    hero1_h: file(relativePath: { regex: "/hero-1-horizontal.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 224, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }

    hero2_v: file(relativePath: { regex: "/hero-2-vertical.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 452, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    hero2_h: file(relativePath: { regex: "/hero-2-horizontal.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 224, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }

    hero3_v: file(relativePath: { regex: "/hero-3-vertical.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 452, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    hero3_h: file(relativePath: { regex: "/hero-3-horizontal.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 320, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`
