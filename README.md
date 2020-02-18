<table>
    <thead>
        <tr>
            <th colspan="5" style="text-align: center;"><strong>Subjects of Study</strong></th>
        </tr>
        <tr>
            <td colspan="5">The links below are to the parent GitHub repos of completed courses, resources, my own notes, links to articles, etc. about the topics shown below. They are designed to be my "go-to" place for teaching myself the given subject.</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://github.com/coolinmc6/analytics">Analytics</a></td>
            <td><a href="https://github.com/coolinmc6/CS-concepts">Computer Science</a></td>
            <td><a href="https://github.com/coolinmc6/design-ux-ui#product-design--development">Product Development</a></td>
            <td><a href="https://github.com/coolinmc6/design-ux-ui">UX / UI Design</a></td>
            <td><strong><a href="https://github.com/coolinmc6/front-end-dev">Front End Development</a></strong></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><a href="https://github.com/coolinmc6/front-end-dev/blob/master/webpack.md">Webpack</a></td>
        </tr>
    </tbody>
</table>

# Webpack Practice #002

**Notes based on:** [Webpack: Asset Management](https://webpack.js.org/guides/asset-management/).

- This exercise went over adding a number of different file types to your project like: CSS, images (PNG, GIF, etc.), 
fonts (woff, otf, etc.), data (JSON, XML, CSV).
- Older build tools would typically just move the assets from your `src` folder to your `dist` folder.
- Webpack is different because it creates a dependency graph, allowing you to avoid loading the modules (files)
you don't need.
- I'll start with the big changes all at once and explain.

**BEFORE**

```js
// webpack.config.js
const path = require("path");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
``` 

**AFTER**

```js
// webpack.config.js
const path = require("path");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.(xml)$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
};
```

- It looks like a lot but it's really just another object property called `module` which is itself an object.
It has, right now, one property called `rules` which is just an array of objects. 
- Everything in webpack is a module so with the `css-loader`, we can add CSS to our app.
  - What really happens with the `css-loader` and `style-loader` is that the CSS is written, in-line, into the `<head>` tag
  of the page.
- To add the css loader (or any loader), here is the general pattern:
  - #1: Install the loader
  - #2: Write the rule
  - #3: Import file where needed

**#1: Install the loader**

```sh
npm i --save-dev style-loader css-loader
```

**#2: Write the rule**

```js 
// in the webpack.config.js file
module.exports = {
    // CODE
    // entry: '',
    // output: {},
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}
```

**#3: Import the file**

```js
// index.js
import './style.css'; // in this case, style.css is in the /src directory
```
- And that's it. When you run `npm run build`, notice that there isn't a CSS file
- The rest of the tutorial goes through importing images, adding fonts, and adding 
XML and CSV files using specific loaders to do that.
- Here are all the loaders used in this tutorial:
  - css-loader
  - style-loader
  - file-loader (used for images and fonts)
  - csv-loader
  - xml-loader
- For some general notes, the style-loader injects CSS into the DOM while the css-loader
interprets the `@import` and `url()` like `import`/`require()` and resolves them. They
kind of depend on each other so when using one, you'll need the other; they are a package deal
- file-loader is almost just like the css-loader - it resolves the `@import`/`require()` into
a URL and emits the file into the output directory
- csv-loader translates CSV files into JSON and xml-loader converts XML files into a JSON object

**Exercise:** Create a simple Webpack setup that has the following attributes:
1. Can load CSS, images, fonts, CSV, and XML files
2. Has a build script
3. Uses a configuration file

To complete the exercise, you must list/have the following:
- npm modules and steps
- `webpack.config.js` file
- `/src` and `/dist` directories
- correct package.json file