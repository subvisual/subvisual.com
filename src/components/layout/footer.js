import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import CallToAction from "../call_to_action"
import Location from "./footer/location"
import Logo from "../logo"
import SocialLinks from "./footer/social_links"
import Text from "../text"

import styles from "./footer.module.css"

const Footer = ({ data }) => (
  <footer className={styles.root}>
    <div className={styles.blue}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo color="white" />
        </div>
        <div className={styles.callToAction}>
          <p>
            <Text color="white">Ready to bring your ideas to life?</Text>{" "}
            <CallToAction color="white">Let&apos;s talk.</CallToAction>
          </p>
        </div>
        <div className={styles.locations}>
          <div className={styles.location}>
            <Location
              align="left"
              name="Braga, Portugal"
              image="braga"
              geoUrl="geo:41.543243,-8.399365"
              mapsUrl="https://goo.gl/maps/ddvtn1Ez8N72"
            />
          </div>
          <div className={styles.location}>
            <Location
              align="right"
              name="Boston, USA"
              image="boston"
              geoUrl="geo:42.356742,-71.057583"
              mapsUrl="https://goo.gl/maps/zouxb7phyLz"
            />
          </div>
        </div>
        <div className={styles.social}>
          <div className={styles.socialLabel}>
            <Text size="small" color="white">
              Follow us
            </Text>
          </div>
          <SocialLinks />
        </div>
        <p>
          <Text size="small" color="purple">
            Handcrafted by Subvisual © {new Date().getFullYear()}
          </Text>
        </p>
      </div>
    </div>
    <div className={styles.white}>
      <div className={styles.content}>
        <a
          href={data.norte2020Doc.publicURL}
          target="_blank"
          rel="noopener noreferrer"
          download={data.norte2020Doc.base}
        >
          <Img fadeIn fluid={data.norte2020Logos.childImageSharp.fluid} />
        </a>
      </div>
    </div>
  </footer>
)

const query = graphql`
  {
    norte2020Logos: file(relativePath: { regex: "/norte-2020-logos.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 650, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    norte2020Doc: file(
      relativePath: { regex: "/ficha-projeto-site-subvisual.pdf/" }
    ) {
      base
      publicURL
    }
  }
`

export default () => (
  <StaticQuery query={query} render={data => <Footer data={data} />} />
)
