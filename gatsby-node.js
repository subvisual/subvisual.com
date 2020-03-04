const defaultTo = require("lodash/defaultTo")

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    schema.buildObjectType({
      name: "TeamMemberYaml",
      interfaces: ["Node"],
      extensions: {
        infer: false,
      },
      fields: {
        id: "String!",
        name: "String!",
        photo: "Photo!",
        role: "String!",
        bio: "String",
        social: "Social",
        active: {
          type: "Boolean",
          resolve: ({ active }) => defaultTo(active, true),
        },
      },
    }),
    `
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
        color: File! @fileByRelativePath,
        grey: File! @fileByRelativePath,
        url: String!
      }
    `,
  ]

  createTypes(typeDefs)
}
