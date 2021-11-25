module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.yourdomain.tld',
    title: 'My Storyblok Site',
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: 'SpsQWF7qrWUOkusdMzNZWAtt',
        version: 'draft',
      },
    },
  ],
}
