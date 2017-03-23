# pug-lint-loader

> Pug lint loader for webpack

## Install

```console
$ npm install pug-lint-loader --save-dev
```

## Usage

In your webpack configuration

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(pug|jade)$/,
        exclude: /node_modules/,
        loader: "pug-lint-loader",
        options: require('./.pug-lintrc.js'),
        enforce: "pre"
      },
    ],
  },
  // ...
}
```

To be safe, you should use `enforce: "pre"` section to check source files, not modified
by other loaders (like `pug-loader`)

### Options

You can pass [puglint options](https://github.com/pugjs/pug-lint#configuration-file)
using standard webpack [loader options](https://webpack.js.org/configuration/module/#useentry).


#### Errors or Warning?

You can still force this behavior by using `emitError`:

##### `emitError` (default: `true`)

Loader will always return errors if this option is set to `true`.

```js
module.exports = {
  entry: "...",
  module: {
    rules: [
      {
        test: /\.(pug|jade)$/,
        exclude: /node_modules/,
        loader: "pug-lint-loader",
        options: Object.assign({
          emitError: true,
        }, require('./.pug-lintrc.js'))
      },
    ],
  },
}
```

## License
MIT License
