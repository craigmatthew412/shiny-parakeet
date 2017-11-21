shiny-parakeet
=====================================
Personal digital portfolio and cv for Craig McMurray that utilizes [these best AngularJS practices](https://github.com/toddmotto/angularjs-styleguide)  and Gulp best practices from [this resource](https://github.com/greypants/gulp-starter).

---

### System Requirements

1. Node.js v5.9.x
2. Microsoft Build Tools (only on Windows -- [can be installed with NPM](https://github.com/felixrieseberg/windows-build-tools))
  * Make sure that you use the `--add-python-to-path` argument, see the Usage section on the page
3. Git
4. Ruby 2.2.x (only on Windows because it comes pre-installed on OS X -- [can be downloaded here](https://rubyinstaller.org/downloads))

### Getting up and running

1. Clone this repo from `https://github.com/craigmatthew412/shiny-parakeet.git`
2. Run `npm rebuild` from the root directory
3. Run `npm run build:dev` from the root directory (Note: see example below for full syntax)
4. Your browser will automatically be opened and directed to the browser-sync proxy address
5. Run `npm run build:prod` to prepare assets for production or run `npm run build:qa` to prepare assets for qa (Note: the production and qa tasks do not fire up the Express.js server, and won't provide you with browser-sync's live reloading. Simply use `npm run build:dev` during development. More information below)

NPM run example: `npm run build:dev -- --env <env>` where `<env>` could be `development`.  Refer to properties under `/app/js/properties` for available properties.

Now that `npm run build:dev` is running, the server is up as well and serving files from the `/dist_bundle` directory. Any changes in the `/app` directory will be automatically processed by Gulp and the changes will be injected to any open browsers pointed at the proxy address.

#### Other resources

- [Yeoman generator](https://github.com/alferov/generator-angular-gulp-browserify)
- [Cordova-friendly fork](https://github.com/StrikeForceZero/angularjs-cordova-gulp-browserify-boilerplate)

---

This boilerplate uses the latest versions of the following libraries:

- [AngularJS](http://angularjs.org/)
- [SASS](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)

Along with many Gulp libraries (these can be seen in either `package.json`, or at the top of each task in `/gulp/tasks/`).

---

### Node Package Manager (NPM)

This boilerplate primarily relies on NPM for dependency management.  We use bower for some things which are not available on NPM, but NPM is the primary package manager.  Due to security restrictions, we must commit our NPM modules to our Version Control System (VCS), i.e. Git.  This is twofold; the security team wants to be able to perform Static Code Analysis against all third-party software for security holes and malicious code, and also because the Jenkins build server does not have access to the external Internet so it is unable to download our modules from the NPM Registry.  This is not a straightforward task, however, due to how NPM modules are installed and compiled. A compiled module on a Mac cannot simply be checked-out onto a Windows machine and run because of how it is compiled.  What we must do is commit *uncompiled* NPM module binaries, and then "rebuild" them on each client that checks-out the code.

#### Shrinkwrap

`shrinkwrap` is a very important tool that is included with `NPM`. What this does in the simplest terms is ensure that everyone gets the exact same version of our modules, since that is not guaranteed everytime `npm install` is run.  A new module might be updated overnight, and a new developer on the team might run `npm install` and get a new updated version of a module and be actively developing against a different version than the rest of the team.  Or, it could even be more subtle...they might get an updated *dependency* to a module which could cause subtle and difficult-to-trace bugs.  What is even more important, is that we don't *deploy* a different version of our module than what we develop against! We could be blindly introducing bugs into our Production environment which is a very dangerous thing!  In order to Shrinkwrap our package, we can simply run `npm shrinkwrap` from the root directory. This will generate a file `npm-shrinkwrap.json` which needs to be committed into VCS.

#### Committing Modules to Git

Below are the steps to correctly commit a new NPM module to VCS.  In our case, it would be Git, but this should work for any VCS.  These steps were taken from [this blog post](http://www.letscodejavascript.com/v3/blog/2014/03/the_npm_debacle).

1. Run `npm install --save-dev --ignore-scripts <<package name >>` from the root directory.  Please note the `--ignore-scripts` option as it is very important.  This will basically download the module, *without* compiling the binaries.  This is important so we don't commit compiled binaries! The `--save-dev` option is also important because it adds the module to our `package.json` file which is important for `shrinkwrap`.
2. Check `npm-shrinkwrap.json` to validate that the updated module exists.  If it does not, then run `npm shrinkwrap` from the root directory to generate a new file based on the current `package.json` file.
3. Run `git add /path/to/new/module && git commit -am "descriptive commit message goes here"` from the root directory.
4. Run `git push origin branch_name ` from the root directory.
5. Run `npm rebuild` from the root directory.  This will then compile the binaries of the new module (and also all of the existing modules, which is okay).
6. Run `git status` from the root directory.  This will show all compiled binaries, if any exist. We do *not* want to commit these!
7. If step 6 shows files, add them to `.gitignore`
8. Commit the updated `.gitignore` file from step 7 so that no one else commits the compiled binaries.
9. High-five yourself for having completed this tedious task.

---

### AngularJS

AngularJS is a MVW (Model-View-Whatever) Javascript Framework for creating single-page web applications. In this boilerplate, it is used for all the application routing as well as all of the frontend views and logic.

The AngularJS files are all located within `/app/js`, structured in the following manner:

```
/controllers
  index.js   (the main module on which all controllers will be mounted, loaded in app.js)
  example.js
/directives
  index.js   (the main module on which all directives will be mounted, loaded in app.js)
  example.js
/filters
  index.js (the main module on which all filters will be mounted, loaded in app.js)
  example.js
/providers
  index.js   (the main module on which all providers will be mounted, loaded in app.js)
  example.js
/services
  index.js   (the main module on which all services will be mounted, loaded in app.js)
  example.js
constants.js  (any constant values that you want to make available to Angular)
app.js       (the main file read by Browserify, also where the application is defined and bootstrapped)
run.js     (any functions or logic that need to be executed on app.run())
config.js  (all route definitions and any logic that need to be executed on app.config())
templates.js  (this is dynamically created via Gulp by compiling your views, and will not be present before any build tasks have been run)
environment.js  (this is dynamically created via Gulp by targeting the correct environment from the NPM script executed, and will not be present before any build tasks have been run)
```

##### Module organization

Controllers, services, directives, etc. should all be placed within their respective folders, and will be automatically required and mounted via their respective `index.js` using `bulk-require`. All modules must export an object of the format:

```javascript
const ExampleModule = function() {};

export default {
  name: 'ExampleModule',
  fn: ExampleModule
};

```

##### Dependency injection

Dependency injection is carried out with the `ng-annotate` library. In order to take advantage of this, a simple directive prologue of the format:

```js
function MyService($http) {
  'ngInject';
  ...
}
```

needs to be added at the very beginning of any Angular functions/modules. The Gulp tasks will then take care of adding any dependency injection, requiring you to only specify the dependencies within the function parameters and nothing more.

##### Routing

This application uses `ui-router` for its routing framework. The AngularJS `ui-router` is a state-based router versus the AngularJS `ngRoute` which is a route-based router.  State-based routing gives us the flexibility to nest views, whereas route-based routing does not.  More information regarding `ui-router` can be found here at the [APIs](https://ui-router.github.io/ng1/docs/latest/index.html) and here at the [guides](https://ui-router.github.io/ng1/tutorial/helloworld). 

---

### SASS

SASS, standing for 'Syntactically Awesome Style Sheets', is a CSS extension language adding things like extending, variables, and mixins to the language. This boilerplate provides a barebones file structure for your styles, with explicit imports into `/app/styles/main.scss`. A Gulp task (discussed later) is provided for compilation and minification of the stylesheets based on this file.

##### Common Variables

There is a file `_vars.scss` in the directory `/app/styles` which is meant to hold any application-wide common variables.  For example, any common colors or standard font sizes/families.  The whole point is to reduce the amount of duplication around hard-coding String values in the main stylesheet itself.  This allows for the ability to quickly refactor by only having to change a single value versus multiple interspersed values.

##### Twitter Bootstrap

The `bootstrap-sass` Bower dependency is included (v3.3.7). There is a SASS file `_boostrap.scss` in the `/app/styles` directory which enables/disables Bootstrap features.  Only some specific features have been enabled by default, but any additional required features can be enabled in this file by uncommenting the include for that feature.

##### Font Awesome

The `font-awesome-sass` Bower dependency is included (v4.7.0).

##### Animate.css

The `animate-sass` Bower dependency is included.  This is simply a SASS wrapper around the `Animate.css` library which is for "just add water" animations.  More information regarding Animate.css [can be found here](https://daneden.github.io/animate.css).

---

### Browserify

Browserify is a Javascript file and module loader, allowing you to `require('modules')` in all of your files in the same manner as you would on the backend in a node.js environment. The bundling and compilation is then taken care of by Gulp, discussed below. However, since this project uses ES6, it would be `import 'module'`.

---

### Gulp

Gulp is a "streaming build system", providing a very fast and efficient method for running your build tasks.

##### Web Server

Gulp is used here to provide a very basic node/Express web server for viewing and testing your application as you build. It serves static files from the `/dist_bundle` directory, leaving routing up to AngularJS. All Gulp tasks are configured to automatically reload the server upon file changes. The application is served to `localhost:3002` once you run the `npm run build:dev` script. To take advantage of the fast live reload injection provided by `browser-sync`, you must load the site at the proxy address (within this boilerplate will by default be `localhost:3000`). To change the settings related to live-reload or browser-sync, you can access the UI at `localhost:3001`.

##### Scripts

A number of build processes are automatically run on all of our Javascript files, run in the following order:

- **eslint:** Gulp is currently configured to run an eslint task before processing any Javascript files. This will show any errors in your code in the console, but will not prevent compilation or minification from occurring.  We are using the Airbnb eslint project as our base for rules, with some overrides and additions.  See the `/.eslintrc` file for more details.
- **JSCS:** Gulp is currently configured to run a JSCS task before processing any Javascript files.  This will show any code syntax errors (i.e. checkstyle) in your code in the console, but will not prevent compilation or minification from occurring.  We are using the Airbnb eslint project as our base for rules, with some overrides and additions.  See the `/.jscsrc` file for more details.
- **Browserify:** The main build process run on any Javascript files. This processes any of the `require('module')` statements, compiling the files as necessary.
- **Babelify:** This uses [babelJS](https://babeljs.io/) to provide support for ES6+ features.
- **Debowerify:** Parses `require()` statements in your code, mapping them to `bower_components` when necessary. This allows you to use and include bower components just as you would npm modules.
- **ngAnnotate:** This will automatically add the correct dependency injection to any AngularJS files, as mentioned previously.
- **Uglifyify:** This will minify the file created by Browserify and ngAnnotate.

The resulting file (`app-*.js`) and optional source map file (`app-*.js.map`) are placed inside the directory `/dist_bundle/js/`.

##### Styles

Just one plugin is necessary for processing our SASS files, and that is `gulp-sass`. This will read the `main.scss` file, processing and importing any dependencies and then minifying the result. The resulting file (`main-*.css`) and optional source map file (`main-*.css.map`) are placed inside the directory `/dist_bundle/css/`.

- **gulp-autoprefixer:** Gulp is currently configured to run autoprefixer after compiling the scss.  Autoprefixer will use the data based on current browser popularity and property support to apply prefixes for you. Autoprefixer is recommended by Google and used in Twitter, WordPress, Bootstrap and CodePen.

##### Fonts

Any fonts placed within the `/app/fonts` directory will automatically be copied to the `/dist_bundle/fonts` directory.  Additionally, the Twitter Bootstrap Glyphicons and Font Awesome Icons have been configured in the Gulp task to be automatically included from their respective `bower_components` directories.

##### Images

Any images placed within the `/app/images` directory will be automatically copied to the `/dist_bundle/images` directory. If running `npm run build:prod` or `npm run build:qa`, they will also be compressed via imagemin.

##### Views

When any changes are made to the `index.html` file, the new file is simply copied to the `/dist_bundle` directory without any changes occurring.

Files inside `/app/views/`, on the other hand, go through a slightly more complex process. First, the views are run through the `gulp-htmlmin` module for optimizations and minification.  Then, the `gulp-angular-templatecache` module is used in order to process all views/partials, creating the `template.js` file briefly mentioned earlier. This file will contain all the views, now in Javascript format inside Angular's `$templateCache` service. This will allow us to include them in our Javascript minification process, as well as avoid extra HTTP requests for our views.

##### Environments

There are different environment specific properties files which enables great flexibility for deployment.  The environment specific properties file is automatically copied from the source folder and renamed to `environment.js` which is what we import into our application. Any number of environment properties files can exist and the Gulp task will automatically pick it up as long as there is a valid NPM script with the correct environment variable, which the files follow the format `environment.<variable>.js`.

##### Watching files

All of the Gulp processes mentioned above are run automatically when any of the corresponding files in the `/app` directory are changed, and this is thanks to our Gulp watch tasks. Running `npm run build:dev` will begin watching all of these files, while also serving to `localhost:3002`, and with browser-sync proxy running at `localhost:3000` (by default).

##### Production & QA Tasks

Just as there is the `npm run build:dev` command for development, there are also `npm run build:prod` and `npm run build:qa` commands for putting your project into a production-ready state. This will run each of the tasks, while also adding the image minification task discussed above. There is also an empty deploy task (run with `npm run deploy`) that is included when running the production task. This deploy task can be fleshed out to automatically push your production-ready site to your hosting setup.

**Reminder:** When running the production or qa task, gulp will not fire up the Express.js server and serve your index.html. This task is designed to be run before the `deploy` step that may copy the files from `/dist_bundle` to a production or qa web server.

##### Pre-compressing text assets

When building with `npm run build:prod` or `npm run build:qa`, a pre-compressed file is generated in addition to uncompressed file (.html.gz, .js.gz, css.gz). This is done to enable web servers serve compressed content without having to compress it on the fly. Pre-compression is handled by `gzip` task.

##### Testing

A Gulp tasks also exists for running the test framework (discussed in detail below). Running `gulp test` will run any and all tests inside the `/test` directory and show the results (and any errors) in the terminal.

---

### Constants and Properties

#### Application Constants

There is a `constants.js` file that lives in the `/app/js` directory which is for application-wide constants which will not change.

#### Variable Properties

Properties files live in the `/app/js/properties` directory.  Properties are meant to be variable/dynamic based on property type.  There are currently only `environment` properties, but any additional types of properties can be added by simply creating a folder and adding files under that folder.  There are several changes required:

1. Add property folder under `/app/js/properties`
2. Add property files under new folder
3. Add Gulp configurations in the Gulp `config.js` file under the `properties` section
4. Add a command-line argument to any NPM scripts
5. Add a global reference to the new argument in the Gulp file `gulpfile.babel.js` in the root of the project
6. The `browserify` task will need updated to account for the new property type
7. Add the new AngularJS Constant in the `app.js` file
8. Add the generated file to the `.gitignore` file in the root of the project since you should not commit derived files to Version Control

##### Property Syntax

Using the `environment` property as an example, a new property type (i.e. Chain) would follow the below:

1. Create a folder: `/app/js/properties/chain`
2. Add property files in new folder: `chain.<variable>.js`
3. Add command-line argument to NPM script(s): `--chain <variable>`

---

### File Revisioning

File revisioning (aka cache-busting) is a strategy in which we control how we can automatically invalidate static assets.  We use file revisioning for our scripts and our styles.  This enables us to prevent any stale files from lingering due to browser cache after a deployment.  We use several Gulp tools to do this.  Such tools are `gulp-rev`, `gulp-rev-replace`, and `gulp-inject`.  We use specific comment tags in our `index.html` file (i.e. `<!-- inject:main:css --><!-- endinject -->` and `<!-- inject:app:js --><!-- endinject -->`) which are read by `gulp-inject` to automatically inject the dynamically generated file names into our file.  We use `gulp-rev` to dynamically name our compiled files, which is done so basically on a hash which is generated based on the files contents.  Even a single whitespace character change will generate a new hash and a new filename.  We also use `gulp-rev-replace` to replace references to the original filenames so that the source maps still work correctly.  This is done through a file `rev-manifest.json` which is automatically created during the revision process.  Since we don't cache HTML files, any new request to the server will respond with the latest version of `index.html` which will have the latest file revisions, this forces the browser to always download the latest available revisions.  

---

### Miscellaneous Third-party Libraries

Miscellaneous third-party libraries are located in the `/app/libraries` directory.  These are typically things which are Globals and not present in the NPM registry.  They need to be manually maintained since they are not managed by either of our two package managers, NPM and Bower.

##### AccessifyHTML5

AccessifyHTML5 helps with ADA Compliance by automatically adding ARIA support where applicable.  More information regarding AccessifyHTML5 [can be found here](https://github.com/yatil/accessifyhtml5.js).

##### FastClick.js

FastClick should be used if touch support is required.  It should only be loaded on touch devices, so a feature detection library like Modernizr should be used to conditionally load it.  It intercepts `click` Events and automatically handles them by managing the 300ms delay.  The library is in the `/app/libraries` directory but not linked in our index.html file by default.  This should be used instead of the AngularJS `ngTouch` module (unless Swipe support is required) because AngularJS version 1.5.0 [introduced breaking changes](https://github.com/angular/angular.js/blob/master/CHANGELOG.md#breaking-changes-5) with the `ng-click` Directive for the `ngTouch` module. If required, simply link the existing static asset in index.html.  More information regarding FastClick [can be found here](https://github.com/ftlabs/fastclick).

##### jQuery

jQuery v3.1.1 is currently included and linked in index.html by default.  It needs to be loaded prior to the main application bundle so that AngularJS can take advantage of the full API rather than the out-of-the-box jqLite.

##### Picturefill

Picturefill is a responsive image polyfill for `<picture>`, `srcset`, `sizes`, and more.  It is currently included and linked in index.html by default.  More information regarding this [can be found here](https://github.com/scottjehl/picturefill).

##### Polyfill.io

Polyfill.io is a polyfill service which will automatically detect User Agent and respond with appropriate polyfills.  This library is included via their own CDN rather than the `/app/libraries` directory due to the nature of its functionality.  More information regarding Polyfill.io [can be found here](https://polyfill.io/v2/docs). 

---

### Feature Detection

##### Modernizr

Modernizr should be used for all feature detection.  Feature detection should be used for progressive enhancement, meaning that we should only attempt to add functionality to our web application if the feature is supported by a particular browser.  Feature detection libraries (like Modernizr) can be used to test for features and add polyfills if required to add the required functionality or load scripts to execute the code utilizing the requested functionality.  More information regarding Modernizr can be found [here at the Modernizr site](https://modernizr.com).  If Modernizr is going to be included, it must be the first `<script>` AFTER the CSS links so that it can execute before any other scripts.

---

### Asynchronous CSS

##### LoadCSS

LoadCSS is a script which is inlined into the `<head>` of the index.html document which allows for asynchronously loading of CSS resources (i.e. Web Fonts) so that they do not become resource-blocking.  More information regarding LoadCSS and its use-case [can be found here](https://github.com/filamentgroup/loadCSS). 

##### rel="preload"

There is also a new concept of "preload" using `rel="preload"` but is still not a widely used implementation.  More information regarding preload [can be found here](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for).

---

### Documentation

##### ngdoc

When the Gulp Development and Production Tasks are run, an `ngdoc` task generates output to the `/dist_bundle/docs` directory.  Alternatively, the Gulp task `ngdoc` can be ran manually from the command-line.  It uses @ngdoc to provide AngularJS specific JSDoc capabilities.  This enables us to have real-time code documentation which can be generated at any point in time for any version of the application.  To learn more about how to write @ngdoc, please read [these AngularJS best practices](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation).  To learn more about how to write JSDoc in general, please read [the JSDoc documentation and tutorials](http://usejsdoc.org).

If you wish to view the generated documentation when your development server is running, you can do so by opening up the url `http://localhost:3000/docs/index.html`.  However, in order to keep rebuild times quick, the `ngdoc` task does not run...only on initial server start.  With that said, if you'd like to view the documentation after making code changes, you can open a new Terminal and manually run the `ngdoc` task and refresh the page to see the updated changes.

---

### Debugging AngularJS Applications

##### Debug Mode

There is a property in the `EnvironmentSettings` constants which enables/disabled "debug mode" for both the `$compileProvider` and the `$logProvider`.  If set to true, it will enable `$log.debug()` statements in the console and will also enable additional DOM data in the "Elements" tab of the Chrome Developers Console such as adding the class `ng-scope` to Elements which start a new `$scope`.  This is useful if debug statements are properly used during development and also for debugging nested scopes/isolate scopes. 

##### Console Statements

Statements can be executed in the Developers Console in Chrome which leverage Angular's `$injector` service.  You can be as specific as you need to with your query selector if you have multiple nested states and you are trying to target a specific Controller, for example.  You may need to use `"ui-view ui-view"` as your selector if you are trying to access the Controller of a nested/child State rather than the parent State.  The below are examples to debug the following different types of AngularJS components and can be copy/pasted into the Developer Console of a running AngularJS application.

###### Controllers

`angular.element(document.querySelector('ui-view')).controller();`

###### Services

You can call any public method on a service, even if it requires input parameters. You can even call a method which accepts a parameter such as a unique ID and makes an API call based on the input...and the application will actually make the API call and output the result of your method into the console.

`angular.element(document.querySelector('html')).injector().get('nodeApi').getBaseApiUrl();`

###### Constants

This is helpful if you are trying to debug a specific environment and are unsure of what was actually deployed with the build, or if you are pointing your local environment to a specific environment.

`angular.element(document.querySelector('html')).injector().get('EnvironmentSettings');`

###### Scope

`angular.element(document.querySelector('html')).scope();`

`angular.element(document.querySelector('ui-view')).scope();`

##### Batarang

`Batarang` is a Chrome Extension written by the core AngularJS team and can be used for application profiling and debugging AngularJS `$scope`

---

### Testing

This boilerplate also includes a simple framework for unit and end-to-end (e2e) testing via [Karma](http://karma-runner.github.io/) and [Jasmine](http://jasmine.github.io/). In order to test AngularJS modules, the [angular.mocks](https://docs.angularjs.org/api/ngMock/object/angular.mock) module is used.

All of the tests can be run at once with the command `npm test`. However, the tests are broken up into two main categories:

##### End-to-End (e2e) Tests

e2e tests, as hinted at by the name, consist of tests that involve multiple modules or require interaction between modules, similar to integration tests. These tests are carried out using the Angular library [Protractor](https://github.com/angular/protractor), which also utilizes Jasmine. The goal is to ensure that the flow of your application is performing as designed from start to finish.

In this boilerplate, two end-to-end test examples are provided:

- `routes_spec.js`, which tests the functionality of our AngularJS routing
- `example_spec.js`, which tests the functionality of the example route, controller, and view

More examples can be seen at the above link for Protractor.

All e2e tests are run with `npm run protractor`.

##### Unit Tests

Unit tests are used to test a single module (or "unit") at a time in order to ensure that each module performs as intended individually. In AngularJS this could be thought of as a single controller, directive, filter, service, etc. That is how the unit tests are organized in this boilerplate.

An example test is provided for the following types of AngularJS modules:

- `unit/controllers/example_spec.js`
- `unit/services/example_spec.js`
- `unit/directives/example_spec.js`
- `unit/constants_spec.js`

All unit tests are run with `npm run unit`. When running unit tests, code coverage is simultaneously calculated and output as an HTML file to the `/coverage` directory.

In addition to that, all other boilerplate code has Unit tests written as well which includes the module.config() and module.run() blocks which are notoriously difficult to Unit test, as well as the HTTP Interceptor. If you execute the Unit test script and view the coverage report, you will see 100% code coverage.

---

### Integrated Development Environment (IDE)

#### Webstorm

Webstorm is an excellent IDE for development front-end web applications.  Like other JetBrains IDE's, it has been around for a while.  It also has great AngularJS hooks, as well as Gulp and NPM.  More information regarding Webstorm can be found [on their website here](https://www.jetbrains.com/webstorm).

###### Webstorm Setup

Depending on how Webstorm is to be used, there may be some changes to preferences which need to be made:

1. ES6 Support.  By default, Webstorm is set to use ECMAScript 5.  You will need to open up the Webstorm preferences and change it to use ECMAScript 6.
2. Line endings.  This is important when using VCS in a team development environment.  All developers need to use the same line endings so that entire files don't look changed whenever changes are committed to VCS.  For example, if using Git, all line endings should be `LF` since Git runs on Linux.  If using TFS and a Windows environment, then everyone on the team will want to use `CRLF`.
3. VCS.  For convenience, you can set up Version Control preferences

#### Visual Studio Code

Visual Studio Code is another excellent choice.  It has similar features as Webstorm, and is being used by some AngularJS community leaders.  More information regarding Visual Studio Code can be found [on their website here](https://code.visualstudio.com).
