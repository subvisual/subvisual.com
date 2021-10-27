module.exports = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = [
    `
      interface Author {
        key: String!,
        name: String!,
        email: String,
      }

      type BlogContributorYaml implements Author & Node @dontInfer {
        key: String!,
        bio: String,
        email: String,
        name: String!,
        social: Social,
      }

      type Frontmatter {
        author: Author! @link(by: "key"),
        cover: String,
        date: Date!,
        path: String!,
        tags: [String]!,
        title: String!,
        seoDescription: String,
        seoImage: String,
      }

      type MarkdownRemark implements Node {
        frontmatter: Frontmatter!,
      }

      type Photo {
        horizontal: File! @fileByRelativePath,
        vertical: File! @fileByRelativePath,
      }

      type Social {
        behance: String,
        dribbble: String,
        github: String,
        linkedin: String,
        medium: String,
        twitter: String,
        web: String,
      }

      type TeamMemberYaml implements Author & Node @dontInfer {
        key: String!,
        email: String,
        name: String!,
        photo: Photo!,
        role: String!,
        bio: String,
        social: Social,
      }
    `,
  ]

  createTypes(typeDefs)
}
