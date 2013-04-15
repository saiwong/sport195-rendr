# Sport195 - Rendr Example
The purpose of this little app is to demonstrate the Sport195 site using the [Rendr](https://github.com/airbnb/rendr) engine.

## Running the example

First, make sure to have Node >= 0.8.0 [installed on your system](http://nodejs.org/). Then, clone this repo to a local directory and run `npm install` to install dependencies:

    $ git clone git@github.com:saiwong/sport195-rendr.git
    $ cd sport195-rendr
    $ npm install

Then, start the web server. It defaults to port 3030. This will also run `grunt` to compile assets.

    $ npm start

    > sport195-rendr@0.0.1 start /Users/spike/code/s195-node
	> DEBUG=app:* node index.js

	Running "handlebars:compile" (handlebars) task
	File "app/templates/compiledTemplates.js" created.

	Running "bundle" task
	Compiled /Users/spike/code/sport195-rendr/public/mergedAssets.js

	Running "stylus:compile" (stylus) task
	File public/styles.css created.

	Done, without errors.

	server pid 71878 listening on port 3030 in development mode

Then pull up the app in your web browser:

    $ open http://localhost:3030

You can choose a different port by passing the `PORT` environment variable:

    $ PORT=80 npm start

## Rendr

This example uses the Rendr engine to allow processing both server side and client side HTML utilizing Backbone as the MVC to govern the business logic. Please see [Rendr](https://github.com/airbnb/rendr) for full documentation.
