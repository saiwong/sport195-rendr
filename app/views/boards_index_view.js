var BaseView = require('./base_view'),
	Boards = require('../collections/boards'),
	boardTemplate = require('../templates')('board_view');

module.exports = BaseView.extend({
	className: 'boards_index_view',

	isSingleColumn: false,
	columnWidth: 230,
	minimumContainerWidth: 450,

	events: {
		'click .load-more': 'loadNextPage'
	},

	prepareModels: function() {
		// add any model listeners
		this.collection
			.on('add', this.addOne, this);
	},

	postRender: function() {
		this.wall = this.$el.find('.wall');

		this.wall.imagesLoaded(_.bind(this.loadMasonry, this));
	},

	loadMasonry: function() {
		var self = this;

		this.wall.masonry({
			// options
			itemSelector: '.pin',
			gutterWidth: 5,
			isFitWidth: true,
			columnWidth: function(containerWidth) {
				var isCurSingleColumn = containerWidth > self.minimumContainerWidth;

				if (isCurSingleColumn !== self.isSingleColumn) {
					// we are changing from between single/multi column modes
					self.isSingleColumn = isCurSingleColumn;

					// we reload all elements whenever we change modes
					// so that we recalculate the heights correctly
					self.updateWall();
				}

				return self.isSingleColumn ? self.columnWidth : containerWidth;
			}
		});
	},

	addOne: function ( item ) {
		var itemHtml = boardTemplate(item.toJSON());

		this.wall.append(itemHtml);
		this.updateWall();
	},

	updateWall: _.debounce(function () {
		var hasMore = this.collection.hasMore();

		this.wall.masonry('reload');
		this.$el.find('.load-more')
			.attr('disabled', hasMore ? null : 'disabled');
	}, 100),

	loadNextPage: function () {
		this.collection.fetchNextPage();
	}
});
module.exports.id = 'BoardsIndexView';