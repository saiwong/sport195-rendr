module.exports = {
  index: function(params, callback) {
    var spec = {
      collection: {collection: 'Boards', params: { page: 0 }}
    };
    this.app.fetch(spec, function(err, result) {
      callback(err, 'boards_index_view', result);
    });
  }
};
