// Config settings for NODE_ENV=development

exports.config = {
  assets: {
    minify: false,
    cdn: {
      protocol: 'http',
      cnames: ['localhost'],
      pathPrefix: ''
    }
  },

  api: {
    host: "localhost:3030/mockapi",
    protocol: "http"
  },

  rendrApp: {
    someProperty: 'someValue'
  }
};
