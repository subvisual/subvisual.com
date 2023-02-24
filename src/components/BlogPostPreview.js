import Body from "~/src/components/blog/post/body"

const BlogPostPreview = ({ widgetFor }) => {
  return <Body html={widgetFor("body")} />
}

export default BlogPostPreview
