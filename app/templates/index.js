var templateFinder = require('rendr/shared/templateFinder');

module.exports = function( templateName ) {
	return templateFinder.getTemplate( templateName );
}