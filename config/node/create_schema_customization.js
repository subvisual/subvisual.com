module.exports = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = [
    `
      interface Author {
        key: String!,
        name: String!,
      }

      type BlogContributorYaml implements Author & Node @dontInfer {
        key: String!,
        bio: String,
        name: String!,
        social: Social,
      }

      type Frontmatter {
        author: Author! @link(by: "key"),
        date: Date!,
        path: String!,
        tags: [String]!,
        title: String!,
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
        name: String!,
        photo: Photo!,
        role: String!,
        bio: String,
        social: Social,
      }

      type VentureYaml implements Node @dontInfer {
        name: String!,
        description: String!,
        image: File! @fileByRelativePath,
        url: String!
      }
    `,
  ]

  createTypes(typeDefs)
}
