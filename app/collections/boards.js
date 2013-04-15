var Board = require('../models/board'),
	Base = require('./base'),

Boards = Base.extend({
	model: Board,
	url: '/boards/:page.json',

	defaults: {
		page: 0,
		total_pages: 0
	},

	parse: function ( data ) {
		_.extend(this.params, _.pick(data, 'page', 'total_pages'));

		return data.data;
	},

	hasMore: function(){
		return this.params.page + 1 < this.params.total_pages;
	},

	fetchNextPage: function() {
		return this.fetchPage( this.params.page + 1 );
	},

	fetchPage: function( page ) {
		var self = this,
			newPage = new Boards(null, { page: page })
				.on('sync', function(){
					_.extend(self.params, _.pick(newPage.params, 'page', 'total_pages'));
					self.add(newPage.models);
				});
		return newPage.fetch();
	}
});

module.exports = Boards;
module.exports.id = 'Boards';
