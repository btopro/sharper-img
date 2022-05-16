<p align="center">
  <img width="200" src="https://open-wc.org/hero.png"></img>
</p>

## sharper-img

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Quickstart

This is a web component that uses vercel in order to dynamically convert an image from it's default request into a size / quality requested.
`./src/sharper-img.js` contains the vanillaJS version demo'ed and there is also a `./src/sharper-img-lit.js` which is a lit implementation.

### basic usage
```html
  <!-- this is using the base API -->
  <sharper-img quality="60" height="300" width="450" src="https://ftw.usatoday.com/wp-content/uploads/sites/90/2017/05/spongebob.jpg?w=1000&h=600&crop=1"></sharper-img>

  <!-- this is for loading from a template format and is still highly performant-->
  <sharper-img>
    <template>
      <img src="https://ftw.usatoday.com/wp-content/uploads/sites/90/2017/05/spongebob.jpg?w=1000&h=600&crop=1" decoding="async" fetchpriority="low" />
    </template>
  </sharper-img>
```

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project
- `format` fixes linting and formatting errors

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
