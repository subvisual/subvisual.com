import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"

import CallToAction from "../call_to_action"
import ImageLoader from "../image_loader"
import Text from "../text"
import Title from "./hero_section/title"

import styles from "./hero_section.module.css"

const ParallaxImage = ({ baseDelay, alt, mobileImage, desktopImage }) => {
  return (
    <Parallax y={[-30, 30]}>
      <ImageLoader
        delay={baseDelay}
        fluid={[
          {
            ...mobileImage,
            media: "(max-width: 399px)",
          },
          {
            ...desktopImage,
            media: "(min-width: 400px)",
          },
        ]}
        style={{ height: "100%" }}
        alt={alt}
      />
    </Parallax>
  )
}

const HeroSection = ({ data, planetMorph, hidePlanet }) => {
  const baseDelay = 0.3

  return (
    <section>
      <noscript>
        <style>
          {`
            #hero-title {
              opacity: 1;
              animation: none !important;
            }
          `}
        </style>
      </noscript>

      <ParallaxProvider>
        <div className={styles.root}>
          <div className={styles.content}>
            <div id="hero-title" className={styles.title}>
              <Title planetMorph={planetMorph} hide={hidePlanet} />
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
                <div className={styles.inside}>
                  <ParallaxImage
                    baseDelay={baseDelay}
                    mobileImage={data.hero1_h.childImageSharp.fluid}
                    desktopImage={data.hero1_v.childImageSharp.fluid}
                    alt="Someone on a computer"
                  />
                </div>
              </div>
              <div className={styles.image}>
                <div className={styles.inside}>
                  <ParallaxImage
                    baseDelay={baseDelay + 0.1}
                    mobileImage={data.hero2_h.childImageSharp.fluid}
                    desktopImage={data.hero2_v.childImageSharp.fluid}
                    alt="People working on a white board"
                  />
                </div>
              </div>
              <div className={styles.image}>
                <div className={styles.inside}>
                  <ParallaxImage
                    baseDelay={baseDelay + 0.2}
                    mobileImage={data.hero3_h.childImageSharp.fluid}
                    desktopImage={data.hero3_v.childImageSharp.fluid}
                    alt="People around a table, working"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParallaxProvider>
    </section>
  )
}

HeroSection.propTypes = {
  hidePlanet: PropTypes.bool,
  planetMorph: PropTypes.func,
}

HeroSection.defaultTypes = {
  planetMorph: () => {},
}

const query = graphql`
  query {
    hero1_v: file(relativePath: { regex: "/hero-1-vertical.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 452, quality: 95) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    hero1_h: file(relativePath: { regex: "/hero-1-horizontal.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 224, quality: 95) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }

    hero2_v: file(relativePath: { regex: "/hero-2-vertical.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 452, quality: 95) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    hero2_h: file(relativePath: { regex: "/hero-2-horizontal.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 224, quality: 95) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }

    hero3_v: file(relativePath: { regex: "/hero-3-vertical.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 452, quality: 85) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    hero3_h: file(relativePath: { regex: "/hero-3-horizontal.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 320, quality: 95) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={query}
    render={data => <HeroSection data={data} {...props} />}
  />
)
