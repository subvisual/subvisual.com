exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = [
    `
      type TeamMemberYaml implements Node @dontInfer {
        key: String!,
        name: String!,
        photo: Photo!,
        role: String!,
        bio: String,
        social: Social,
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
