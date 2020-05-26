import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"

import CallToAction from "src/components/call_to_action"
import ImageLoader from "src/components/image_loader"
import Text from "src/components/text"
import useWindowSize from "src/utils/use_window_size"
import Title from "./hero_section/title"
import illustration from "../../images/careers/illustration.svg"

import styles from "./hero_section.module.css"

const absoluteStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

const ParallaxImage = ({
  baseDelay,
  alt,
  mobileImage,
  desktopImage,
  objectPosition,
  mobileTopMargin,
  mobileBottomMargin,
  desktopTopMargin,
  desktoBottomMargin,
}) => {
  const size = useWindowSize()

  return (
    <div
      style={{
        overflow: "hidden",
        position: "unset !important",
      }}
    >
      <Parallax
        y={[-15, 15]}
        styleInner={absoluteStyle}
        styleOuter={{
          ...absoluteStyle,
          marginTop: size.width > 400 ? desktopTopMargin : mobileTopMargin,
          marginBottom:
            size.width > 400 ? desktoBottomMargin : mobileBottomMargin,
        }}
      >
        <ImageLoader
          delay={baseDelay}
          imgStyle={{ objectPosition }}
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
          alt={alt}
        />
      </Parallax>
    </div>
  )
}

const HeroSection = ({ data }) => {
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
              <Title />
            </div>
            <div className={styles.heroMessage}>
              <div className={styles.text}>
                <Text as="p">
                  Our universe is always growing and looking for people to grow
                  with it. Whether in Subvisual or in one of our ventures, we
                  are sure that you will find the right space for you.
                </Text>
                <Text as="p">
                  Let’s explore. <CallToAction>Together.</CallToAction>
                </Text>
              </div>
              <div className={styles.illustrationDiv}>
                <img
                  className={styles.illustration}
                  src={illustration}
                  alt="office career illustration"
                />
              </div>
            </div>

            <div className={styles.images}>
              <div className={styles.image}>
                <div className={styles.inside}>
                  <ParallaxImage
                    baseDelay={baseDelay + 0.2}
                    mobileImage={data.hero3_h.childImageSharp.fluid}
                    desktopImage={data.hero3_v.childImageSharp.fluid}
                    mobileTopMargin="-10%"
                    mobileBottomMargin="-8%"
                    desktopTopMargin="-12%"
                    desktoBottomMargin="-18%"
                    objectPosition="20% 100%"
                    alt="People around a table, working"
                  />
                </div>
              </div>
              <div className={styles.image}>
                <div className={styles.inside}>
                  <ParallaxImage
                    baseDelay={baseDelay}
                    mobileImage={data.hero1_h.childImageSharp.fluid}
                    desktopImage={data.hero1_v.childImageSharp.fluid}
                    mobileTopMargin="-10%"
                    mobileBottomMargin="-8%"
                    desktopTopMargin="-23%"
                    desktoBottomMargin="-18%"
                    objectPosition="100% center"
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
                    mobileTopMargin="-10%"
                    mobileBottomMargin="-8%"
                    desktopTopMargin="-23%"
                    desktoBottomMargin="-18%"
                    objectPosition="100% center"
                    alt="People working on a white board"
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

const query = graphql`
  query {
    hero1_v: file(relativePath: { regex: "/hero-1-vertical.jpg/" }) {
      childImageSharp {
        fluid(maxHeight: 700, quality: 95) {
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
        fluid(maxHeight: 700, quality: 95) {
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
        fluid(maxHeight: 700, quality: 85) {
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

export default (props) => (
  <StaticQuery
    query={query}
    render={(data) => <HeroSection data={data} {...props} />}
  />
)
