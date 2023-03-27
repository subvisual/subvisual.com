import React from "react"

import * as styles from "./image.module.css"
import footerImg from "../../images/footer.png"

function Image() {
  return (
    <div className={styles.container}>
      <img src={footerImg} alt="footer" className={styles.image} />
      <div className={styles.callToAction}>
        <h1>
          Dig <span>your</span>
          <br /> curiosity with <span>us</span>
        </h1>
        <a className={styles.button} href="/">
          Subscribe our newsletter
        </a>
      </div>
    </div>
  )
}

export default Image
