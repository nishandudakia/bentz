# Name That Flag!

_Name That Flag_ is a simple web-based quiz game aimed at secondary school students and focused around matching the
correct country name to a given flag.

Uses the [REST Countries](https://restcountries.com/) API.

## Dependencies

Requires [Node.js](https://nodejs.org/en) and `npm` (bundled with Node). Depends on the following packages:

- `koa`, `@koa/router`, `@koa/cors`, `koa-logger`
- `nodemon` (dev)
- `jest` (dev, testing)

## Setup

Simply clone this repo and make sure to install the required dependencies for the `server` component.

```shell
$ git clone https://github.com/nishandudakia/bentz.git
$ cd bentz
$ cd Server
$ npm ci
```

## Usage

To run the backend component via the standard `node` runner, assuming you're currently in the `server` directory:

```shell
$ npm start
```

To instead run the backend component via `nodemon`, for automatic restarts upon filesystem changes resulting from code
edits in development:

```shell
$ npm run dev
```

To run the frontend component, it is recommended to use a separate local web server to not run into issues with CORS.
This can easily be done with an IDE such as Visual Studio Code with the
[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
