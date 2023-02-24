import { useState } from "react"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkHtml from "remark-html"
import { useEffect } from "react"

import TitleWrapper from "~/src/components/blog/post/wrapper"
import Wrapper from "~/src/components/blog/post/wrapper"
import BodyWrapper from "~/src/components/blog/post/body_wrapper"
import Body from "~/src/components/blog/post/body"
import "~/src/common/base.scss"
import Title from "~/src/components/blog/title"

import * as styles from "~/src/templates/blog/post.module.scss"
import * as titleStyles from "~/src/components/blog/post/header.module.css"

const BlogPostPreview = (props) => {
  const md = props.entry.getIn(["data", "body"])
  const [html, setHTML] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const { value } = await unified()
          .use(remarkParse)
          .use(remarkHtml)
          .process(md)

        setHTML(value)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [md])

  return (
    <div className={styles.root} style={{ paddingTop: "10px" }}>
      <link rel="stylesheet" href="https://use.typekit.net/dpm7mos.css" />

      <article className={styles.article}>
        <section>
          <Wrapper className={styles.outerWrapper}>
            <header className={styles.header}>
              <TitleWrapper padded>
                <div className={titleStyles.title}>
                  <Title>{props.entry.getIn(["data", "title"])}</Title>
                </div>
              </TitleWrapper>
            </header>
            <BodyWrapper className={styles.innerWrapper}>
              <Body html={html} />
            </BodyWrapper>
          </Wrapper>
        </section>
      </article>
    </div>
  )
}

export default BlogPostPreview
