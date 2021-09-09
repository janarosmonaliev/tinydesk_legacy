module.exports = {
  pathPrefix: "/project-416",
  siteMetadata: {
    title: `Tiny Desk`,
    description: `Personal homepage that replaces the default startup page. It lets the user manage bookmarks, create to-do lists, and write notes. Start using Tiny Desk and boost your productivity.`,
    author: `Team KGB`,
    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
    image:
      "https://user-images.githubusercontent.com/31612210/113110528-24555100-9242-11eb-9725-a4f8b43fa5d2.png",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Project 416`,
        short_name: `project-416`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
        icons: [
          {
            src: `src/images/icon_128.png`,
            sizes: `128x128`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
};
