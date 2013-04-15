// Takes a ISO Time and returns a formatted time relative to "now"
var sizes = {
		'full': {
			'day': ' day',
			'hour': ' hour',
			'min': ' min',
			'sec': ' sec',
			'ago': ' ago',
			'from_now': ' from now',
			'plural': 's'
		},
		'short': {
			'day': 'd',
			'hour': 'h',
			'min': 'm',
			'sec': 's',
			'ago': '',
			'from_now': '',
			'plural': ''
		}
	};

Handlebars.registerHelper('relativeTime', function ( time, size, pastOnly ) {

	var dateTime,
		secondsDelta,
		absSecondsDelta,
		direction,
		offset, 
		formattedTime,
		now = new Date().getTime();

	if (typeof size !== "string") {
		size = 'full';
	}

	if (typeof pastOnly !== "boolean") {
		pastOnly = false;
	}

	if ( isNaN(dateTime) ) {
		// try to re-parse the date using the ISO date
		// parser
		dateTime = new Date( Date.parse(time) );
	}

	// seconds from "now"
	secondsDelta = (now - dateTime) / 1000;
	absSecondsDelta = Math.abs(secondsDelta);
	if (absSecondsDelta !== 0) {
		direction = secondsDelta/absSecondsDelta;
	} else {
		direction = 1;
	}

	// format
	if(absSecondsDelta >= 86400) {			// day ago

		offset = parseInt(absSecondsDelta / 86400, 10);
		formattedTime = offset + sizes[size].day + ((offset !== 1) ? sizes[size].plural : '');

	} else if (absSecondsDelta >= 3600) {		// hour ago

		offset = parseInt(absSecondsDelta / 3600, 10);
		formattedTime = offset + sizes[size].hour + ((offset !== 1) ? sizes[size].plural : '');

	} else if (absSecondsDelta >= 60) {		// mins ago

		offset = parseInt(absSecondsDelta / 60, 10);
		formattedTime = offset + sizes[size].min + ((offset !== 1) ? sizes[size].plural : '');

	} else {							// sec ago

		formattedTime = parseInt(absSecondsDelta, 10) + sizes[size].sec + ((parseInt(absSecondsDelta, 10) !== 1) ? sizes[size].plural : '');
	}

	if (direction > 0) {
		formattedTime = formattedTime + sizes[size].ago;
	} else {
		if (pastOnly) {
			formattedTime = 'just now';
		} else {
			formattedTime = formattedTime + sizes[size].from_now;
		}
	}

	return formattedTime;			

});