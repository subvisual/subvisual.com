import CMS from "netlify-cms-app"

import BlogPostPreview from "../components/BlogPostPreview"

CMS.registerPreviewTemplate("post", BlogPostPreview)
