# TinyExpress Documentation

TinyExpress is a minimalist web framework inspired by Express.js, designed for simplicity and ease of use. This framework provides essential routing, middleware, and response handling capabilities.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Reference](#api-reference)
    - [TinyExpress](#tinyexpress)
    - [Methods](#methods)
        - [`app.get(path, handler)`](#appgetpath-handler)
        - [`app.post(path, handler)`](#apppostpath-handler)
        - [`app.use(middleware)`](#appusemiddleware)
        - [`app.listen(port, callback)`](#applistenport-callback)
    - [Response Helpers](#response-helpers)
        - [`res.json(data)`](#resjsondata)
        - [`res.status(code)`](#resstatuscode)
        - [`res.status.json(data)`](#resstatusjsondata)
4. [Middleware](#middleware)
    - [jsonParser](#jsonparser)
    - [urlencodedParser](#urlencodedparser)
    - [debug](#debug)
5. [Examples](#examples)

## Installation

TinyExpress can be imported into your project like this:

```javascript
import TinyExpress, { jsonParser, urlencodedParser, debug } from './TinyExpress';
```

## Usage

Below is a basic example of how to use TinyExpress:

```javascript
const app = TinyExpress();

app.use(jsonParser);
app.use(debug);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

## API Reference

### TinyExpress

The `TinyExpress` function initializes the app instance.

```javascript
const app = TinyExpress();
```

### Methods

#### `app.get(path, handler)`

Defines a route for the `GET` method.

- **Parameters:**
  - `path` (string): The route path.
  - `handler` (function): The route handler.
  
- **Example:**

  ```javascript
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
  });
  ```

#### `app.post(path, handler)`

Defines a route for the `POST` method.

- **Parameters:**
  - `path` (string): The route path.
  - `handler` (function): The route handler.
  
- **Example:**

  ```javascript
  app.post('/users', (req, res) => {
    res.json({ message: 'User created!' });
  });
  ```

#### `app.use(middleware)`

Registers a middleware function that will be executed for every incoming request.

- **Parameters:**
  - `middleware` (function): The middleware function.
  
- **Example:**

  ```javascript
  app.use(jsonParser);
  ```

#### `app.listen(port, callback)`

Starts the HTTP server.

- **Parameters:**
  - `port` (number): The port to listen on.
  - `callback` (function): The callback function executed when the server starts.
  
- **Example:**

  ```javascript
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
  ```

### Response Helpers

#### `res.json(data)`

Sends a JSON response.

- **Parameters:**
  - `data` (object): The data to send as a JSON response.
  
- **Example:**

  ```javascript
  res.json({ message: 'Hello World!' });
  ```

#### `res.status(code)`

Sets the HTTP status code and returns the response object for chaining.

- **Parameters:**
  - `code` (number): The status code to set.
  
- **Example:**

  ```javascript
  res.status(404).end('Not Found');
  ```

#### `res.status.json(data)`

Sends a JSON response with a status code.

- **Parameters:**
  - `data` (object): The data to send as a JSON response.
  
- **Example:**

  ```javascript
  res.status(200).json({ message: 'Hello World!' });
  ```

## Middleware

### `jsonParser`

Parses incoming requests with JSON payloads.

- **Example:**

  ```javascript
  app.use(jsonParser);
  ```

### `urlencodedParser`

Parses incoming requests with URL-encoded payloads.

- **Example:**

  ```javascript
  app.use(urlencodedParser);
  ```

### `debug`

Logs incoming requests.

- **Example:**

  ```javascript
  app.use(debug);
  ```

## Examples

Here’s how to create a simple TinyExpress application:

```javascript
import TinyExpress, { jsonParser, urlencodedParser, debug } from './TinyExpress';

const app = TinyExpress();

app.use(jsonParser);
app.use(urlencodedParser);
app.use(debug);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TinyExpress!' });
});

app.post('/submit', (req, res) => {
  res.json({ received: req.body });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

This TinyExpress application listens on port 3000 and handles `GET` and `POST` requests.