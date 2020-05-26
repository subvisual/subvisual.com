import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../common/base.scss"
import HeroSection from "../components/careers/hero_section"
import UniverseCultureSection from "../components/careers/universe_culture_section"
import AcademySection from "../components/careers/academy_section"
import OpenPositionsSection from "../components/careers/open_positions_section"

const CareersPage = () => (
  <>
    <SEO
      title="Careers at Subvisual"
      description={`
            Some description to add
          `}
    />
    <Layout currentPath="/careers/">
      <div className="">
        <div className="">
          <HeroSection />
          <UniverseCultureSection />
          <OpenPositionsSection />
          <AcademySection />
        </div>
      </div>
    </Layout>
  </>
)

export default CareersPage
