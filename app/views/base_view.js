var RendrView = require('rendr/shared/base/view');

// include all view helpers
require('../helpers');


var superWrapper = function ( func, superFunc ) {
		// create a function that has the superFunc as a closure and
		// temporarily expose it as _super on the class.
		// Lifted partially from Ember.js (http://emberjs.com/).
		var newFunc = function () {
			var ret, sup = this._super;
			this._super = superFunc || function(){};
			ret = func.apply( this, arguments );
			this._super = sup;
			return ret;
		};
		return newFunc;
	},
	ExtendMethod = RendrView.extend,
	SuperClass = {
		//=====================================
		// Initialize
		//=====================================

		initialize: function () {
			// wrap each function to support _super
			var superClass = this,
				options = arguments[ 0 ];

			_.each( options, function ( value, key ) {
				if ( _.isFunction( value ) ) {
					var func = value,
						superFunc = superClass[ key ];

					options[ key ] = superWrapper( func, superFunc );
				}
			});

			_.extend( this, options );
		},

		//=====================================
		// Common extend method
		//=====================================

		extend: function ( protoProps, classProps ) {
			var superClass = this.prototype;
			_.each( protoProps, function ( value, key ) {
				if ( _.isFunction( value ) && !_.has( value, '__super__' ) ) {
					var func = value,
						superFunc = superClass[ key ];

					protoProps[ key ] = superWrapper( func, superFunc );
				}
			});
			return ExtendMethod.call( this, protoProps, classProps );
		}
	},

	// create the super versions of all base classes
	SuperView = RendrView.extend( _.clone( SuperClass ) );

SuperView.extend = SuperClass.extend;

// Create a base view, for adding common extensions to our
// application's views.
module.exports = SuperView.extend({
	prepareModels: function(){},

	render: function(){
		this.prepareModels();

		return this._super();
	},

	hydrate: function(){
		var ret = this._super();

		this.prepareModels();
		return ret;
	}
});
