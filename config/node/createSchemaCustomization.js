module.exports = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = [
    `
      interface Author {
        key: String!,
        name: String!,
        initials: String,
        email: String,
        photo: Photo
      }

      interface Category {
        key: String!,
        label: String!
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

      type MarkdownRemark implements Node {
        frontmatter: Frontmatter!,
      }

      type Frontmatter {
        author: Author! @link(by: "key"),
        categories: [Category!] @link(by: "key"),
        cover: String,
        date: Date!,
        path: String!,
        tags: [String]!,
        title: String!,
        seoDescription: String,
        seoImage: String,
      }

      type CategoryYaml implements Category & Node @dontInfer {
        key: String!,
        label: String!  
        initials: String,     
      }

      type BlogContributorYaml implements Author & Node @dontInfer {
        key: String!,
        bio: String,
        email: String,
        name: String!,
        initials: String,     
        social: Social,
        photo: Photo
      }

      type TeamMemberYaml implements Author & Node @dontInfer {
        key: String!,
        email: String,
        name: String!,
        initials: String,
        photo: Photo!,
        role: String!,
        bio: String,
        social: Social,
      }
    `,
  ]

  createTypes(typeDefs)
}
