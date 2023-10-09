# Crazy Party Chess

A stupid chess game made for the "Make Something Horrible" Canard PC's Game Jam.

Available as an electron app or in the browser.

## Build

* Clone repository
* `npm i`

Build an executable/installer:

* `npm run make`
* take a look at the `out/make` directory

Build for the web:

* `npm run web`
* take a look at the `dist/browser` directory

## Development

* first, run `npm run compile`. This will start SASS and TS compilation in watch mode
* then, run `npm start`. This will start an electron app in development mode