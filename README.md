# http-json-error-handler

![npm](https://img.shields.io/npm/v/http-json-error-handler)
[![Build Status](https://travis-ci.org/lfurnielis/http-json-error-handler.svg?branch=master)](https://travis-ci.org/lfurnielis/http-json-error-handler)
![GitHub](https://img.shields.io/github/license/lfurnielis/http-json-error-handler.svg)
![npm](https://img.shields.io/npm/dm/http-json-error-handler.svg)
[![Coverage Status](https://coveralls.io/repos/github/lfurnielis/http-json-error-handler/badge.svg?branch=master)](https://coveralls.io/github/lfurnielis/http-json-error-handler?branch=master)

## Installation

You can download `http-json-error-handler` from NPM

```bash

$ npm install http-json-error-handler --save

```

then in your project require http-json-error-handler

```js
const errorHandler = require('http-json-error-handler');
```

or GitHub

```bash

$ git clone https://github.com/lfurnielis/http-json-error-handler.git

```

## Guide

```js
const errorHandler =  require('http-json-error-handler');
const express = require('express');

const app = express();

// Your defined middlewares
...
...

// Your defined routes
app.get('/foo', (req, res, next) => {
    const error = new Error('Missing field(s): foo');
    error.status = 400;
    error.code = 10401;
    next(error);
});

// HTTP error handler
app.use(errorHandler({
	stderr: true // Default: false
}));
```

## Options

```js

{
  stderr: false // Log error using `console.error()`, Default: false
  stackerr: false // Log error stack using `console.debug()` only for statusCode >= 500, Default: false
}

```

### Definition of a "Error"

The error could contain the following fields:

| Error Key          | Purpose                                                                          |
| ------------------ | -------------------------------------------------------------------------------- |
| [message] | Error details.                                                                   |
| [status]  | HTTP status code for response. Default: 500 (Internal Server Error). |
| [code]    | Error code. Default: same as "status".                                  |

### HTTP JSON Error Example

```json
{
  "error": {
    "code": 10401,
    "message": "BAD REQUEST",
    "details": "Missing field(s): foo"
  }
}
```
