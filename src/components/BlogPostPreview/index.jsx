import React, { useState, useEffect } from "react"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkHtml from "remark-html"

import "~/src/common/base.scss"

import * as styles from "~/src/templates/Post/index.module.scss"
import * as titleStyles from "~/src/components/PostHeader/index.module.css"

import Body from "~/src/components/PostBody"
import Title from "~/src/components/BlogTitle"

function BlogPostPreview(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const md = props.entry.getIn(["data", "body"])
  // eslint-disable-next-line react/destructuring-assignment
  const title = props.entry.getIn(["data", "title"])

  const [html, setHTML] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const { value } = await unified()
          .use(remarkParse)
          .use(remarkHtml)
          .process(md)

        setHTML(value)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    })()
  }, [md])

  return (
    <div className={styles.root} style={{ paddingTop: "10px" }}>
      <link rel="stylesheet" href="https://use.typekit.net/dpm7mos.css" />

      <article className={styles.article}>
        <section>
          <header className={styles.header}>
            <div className={titleStyles.title}>
              <Title>{title}</Title>
            </div>
          </header>
          <Body className={styles.innerWrapper} html={html} />
        </section>
      </article>
    </div>
  )
}

export default BlogPostPreview
