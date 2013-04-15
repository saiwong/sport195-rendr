// Takes a ISO Time and returns a formated date string
Handlebars.registerHelper('formatDate', function ( time ) {
	var dateTime = new Date( Date.parse(time) ),
		formatDate = dateTime.toDateString();

	return formatDate;
});

// Takes a ISO Time and returns a formated time string
Handlebars.registerHelper('formatTime', function ( time ) {
	var dateTime = new Date( Date.parse(time) ),
		formatDate = dateTime.toTimeString();

	return formatDate;
});

// Takes a ISO Time and returns a formated locale date string
Handlebars.registerHelper('formatLocaleDate', function ( time ) {
	var dateTime = new Date( Date.parse(time) ),
		formatDate = dateTime.toLocaleDateString();

	return formatDate;
});

// Takes a ISO Time and returns a formated locale time string
Handlebars.registerHelper('formatLocaleDate', function ( time ) {
	var dateTime = new Date( Date.parse(time) ),
		formatDate = dateTime.toLocaleTimeString();

	return formatDate;
});
