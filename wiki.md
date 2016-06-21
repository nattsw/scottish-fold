# A react-redux-webpack-karma-mocha-chai-sinon-webdriver-selenium front-end web application

This is post goes into details about how to wire up a simple front-end app with
some nice frameworks, so you don’t have to figure some chore-some things out
yourself.

## Creating the application (basics)

1. Use [IntelliJ] for the greater good. Start a project using the ’Static Web
-> Static Web` component.

1. Next, run `npm init` to generate a `package.json` file in the repository.

    - You don’t have to fill in anything for now for the `test` option
    - Ensure that the `entry point` option is set to `server.js`
    - The `package.json` file should be created.

    [npm], as a package manager, helps us (JS devs) save our code as packages
    for easy reusing. Our `package.json` [file][package.json] contains a list
    of packages that we will be using as dependencies for our application.

    Other developers can install all dependencies we list in the file by simply
    running `npm install`, which is pretty neat. :)

1. We’ll use [Express] to serve our application. Run `npm install express -S`
(same as the `—-save` option) to save it as a dependency.

1. Subsequently we’ll need to create a `server.js` file to point express to.
Set it up like

	```
	// server.js file
	const Express = require('express');
	const app = new Express();

	app.use((req, res) => {
	    res.sendFile(`${__dirname}/index.html`);
	});

	app.listen(port, (error) => {
	    if (error) {
	        console.error(error);
	    } else {
	        console.info('==> 🌎 Open http://localhost:%s/ on your browser.',
	        3000);
	    }
	});
	```

	Essentially, this imports express and uses it to serve the `index.html`
	file for browser requests on `http://localhost:3000`.

1. Create a `index.html` page with some basic html.

1. Add a script in the `package.json` file to run the application:

	```
	"scripts": {
		…
		"start": "node server.js"
	},
	…
	```

1. You can now run the app with `npm start` command which we just defined and
you should see your index page on the browser.

## Getting some karma

We’ll be using karma to unit-test our react components. Let’s get it wired in
before starting on react.

1. Run `npm install karma karma-chrome-launcher —D` (same as the `-—save-dev`
option) to save it as a dev dependency. Generally, test and reporting libraries
are dev dependencies.

    Running `./node_modules/karma/bin/karma start` should get a chrome browser up

1. Run `./node_modules/karma/bin/karma init` for the karma wizard and
	- [`mocha`] as our testing framework
	- `requirejs` *not* needed as we’ll be using babel and webpack
	- choose `chrome` and any other browser you wish
	- add `"components/*.js"` and `"components/*-test.js"` for the location of
	our source and test files
	- skim through the rest
A `karma.conf.js` file should be generated

1. We’d need to add the [`mocha`] (test framework) and [`chai`] (assertion
library) test dependencies manually by running:

    `npm install mocha chai karma-mocha karma-chai -D`

    Edit the `package.json` file to add `chai` to accompany `mocha`.

	```
	…
	frameworks: ['mocha', 'chai']
	…
	```

1. Add a `test` script the `package.json`:
	```
	…
	"test": "karma start",
	…
	```

1. Now run `npm start` for some karma goodness… which will not be useful until
 a bit later. You should see a Chrome window launched. Stop the runner with
 `<ctrl+c>`.

## Webpack-ing /o\

(Urgh)

[Webpack] helps us bundle our javascript modules. It can be a difficult task due
to the various configurations and plugins webpack allows, but not to worry!
Let’s go through what we need.

1. Add `webpack` to your project by running `npm install webpack -S`.

1. We can now create a configuration file `webpack.config.js` and fill it up
with:

	```
	module.exports = {
    entry: "./index.js",
    output: {
        path: `${__dirname}/public`,
        filename: "bundle.js"
		}
	};
	```

	This configuration tells webpack to bundle the `index.js` file and put it
	into the output path with the specified filename `public/bundle.js`.

	If we create a `index.js` file and add some Javascript:

	```
	console.log(‘I love cats!’)
	```

	and run `webpack`, a `public/bundle.js` bundled file should be created.

	If you’d want a more in-depth introduction to webpack, [this][webpack
	tutorial] is a good one.

1. Let’s go back to the `package.json` file to make sure that `webpack` is
invoked whenever we start our application.

	```
	"scripts": {
		…
		"prestart": "webpack -d"
	},
	…
	```

	The `-d` option does `--debug --devtool source-map --output-pathinfo`

	- `--debug` switches your loaders to debug mode
	- `source-map` devtool emits a [sourcemap], which allows us to map our
	compressed JS code back to its original position in a file. We should see
	results at the end of this section
	- `output-pathinfo` include comments with information about the modules and
	should not be used in production

1. After the configuration is set up, we’ll need to (1) use express to serve
the bundled file, and also remember to (2) set the index page to use the file.

	```
	//server.js file
	app.use('/public', Express.static(`${__dirname}/public/`));

	app.use((req, res) => { …
	```

	```
	//index.html file
	<body>
	    nothing here ಠ_ಠ
	    <script src="/public/bundle.js"></script>
	</body>
	```

	**Important note**:

	When using express, be sure to add the static bundled file **above** the
	index page, otherwise you’ll always receive the index page instead of any
	file that you need. This is because we’ve set to serve the index file for
	every request.

	When you view the bundled file located at
	`http://localhost:3000/public/bundle.js`, we should be able to find this:

	```
	…
	!******************!*\
	!*** ./index.js ***!
	\******************/
	…
	```

	indicating original file location of the compressed code. This is the
	beauty of sourcemap.

## Babel

[Babel] allows us to use [ES2015’s features] and that’s quite sweet.

1. Add `babel` by running `npm install babel-core babel-loader -S`.

1. Add the loader to webpack config. The file should now look like this:
	```
	module.exports = {
		entry: './index',
		output: {
		path: `${__dirname}/public`,
		filename: 'bundle.js'
		},
		module: {
			loaders: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
				  presets: ['es2015']
			  }
		  }]
		}
  };
	```

1. Profit.

	Well, to see your profit, we can go to `index.js` and use ES2015’s template
	literals as an example. Edit the file to

	```
	const cats = ['tomtom', 'steaky', 'zorro'];
	const me = 'nat'
	console.log(`${me} love ${cats}`); // note the backticks
	```

	and run `npm start`. You’ll see that webpack does not complain about the
	usage of backticks, whereas without the loader you’ll get an error, also
	you'll notice that there's some nice stuff in the console.

## Adding your first react component

1. Add the `react` dependency into our project by running `npm install react -S`.


[IntelliJ]: https://www.jetbrains.com/idea/download/
[npm]: https://docs.npmjs.com/getting-started/what-is-npm
[Express]: http://expressjs.com
[webpack tutorial]: https://github.com/AriaFallah/WebpackTutorial/tree/master/part1
[package.json]: https://docs.npmjs.com/files/package.json
[ES2015’s features]: http://babeljs.io/docs/learn-es2015/
[mocha]: https://mochajs.org
[chai]: http://chaijs.com
[webpack]: http://webpack.github.io/docs/tutorials/getting-started/#first-loader
[babel]: https://babeljs.io/docs/setup/#installation