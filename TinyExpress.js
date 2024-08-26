import http from 'http';
import { parse } from 'querystring';
import { parse as parseUrl } from 'url';

/**
 * TinyExpress - a minimalist web framework
 *
 * @example
 * const app = TinyExpress();
 * app.get('/', (req, res) => {
 *   res.json({ message: 'Hello World!' });
 * });
 * app.listen(3000, () => {
 *   console.log('Server listening on port 3000');
 * });
 */
function TinyExpress() {
  const routes = [];
  const middlewares = [];

  const app = (req, res) => {
    let idx = 0;

    /**
     * Send a JSON response
     *
     * @param {object} data - the data to send
     * @example
     * res.json({ message: 'Hello World!' });
     */
    res.json = (data) => {
      res.end(JSON.stringify(data));
    };

    /**
     * Set the HTTP status code
     *
     * @param {number} code - the status code
     * @example
     * res.status(404).end('Not Found');
     */
    res.status = (code) => {
      res.writeHead(code);
      return res;
    };

    /**
     * Send a JSON response with a status code
     *
     * @param {object} data - the data to send
     * @example
     * res.status(200).json({ message: 'Hello World!' });
     */
    res.status.json = (data) => {
      res.writeHead(res.statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    };

    function next() {
      if (idx < middlewares.length) {
        middlewares[idx++](req, res, next);
      } else {
        handle(req, res);
      }
    }

    next();
  };

  /**
   * Define a route for the GET method
   *
   * @param {string} path - the route path
   * @param {function} handler - the route handler
   * @example
   * app.get('/', (req, res) => {
   *   res.json({ message: 'Hello World!' });
   * });
   */
  app.get = (path, handler) => {
    routes.push({ method: 'GET', path, handler });
  };

  /**
   * Define a route for the POST method
   *
   * @param {string} path - the route path
   * @param {function} handler - the route handler
   * @example
   * app.post('/users', (req, res) => {
   *   res.json({ message: 'User created!' });
   * });
   */
  app.post = (path, handler) => {
    routes.push({ method: 'POST', path, handler });
  };

  /**
   * Use a middleware function
   *
   * @param {function} middleware - the middleware function
   * @example
   * app.use(jsonParser);
   */
  app.use = (middleware) => {
    middlewares.push(middleware);
  };

  /**
   * Start the server
   *
   * @param {number} port - the port to listen on
   * @param {function} callback - the callback function
   * @example
   * app.listen(3000, () => {
   *   console.log('Server listening on port 3000');
   * });
   */
  app.listen = (port, callback) => {
    return http.createServer(app).listen(port, callback);
  };

  return app;
}

/**
 * Middleware to parse JSON bodies
 *
 * @example
 * app.use(jsonParser);
 */
export const jsonParser = (req, res, next) => {
  if (req.headers['content-type'] === 'application/json') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        req.body = JSON.parse(body);
      } catch (e) {
        req.body = null;
      }
      next();
    });
  } else {
    next();
  }
};

/**
 * Middleware to parse URL-encoded bodies
 *
 * @example
 * app.use(urlencodedParser);
 */
export const urlencodedParser = (req, res, next) => {
  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      req.body = parse(body);
      next();
    });
  } else {
    next();
  }
};

/**
 * Middleware to log requests
 *
 * @example
 * app.use(debug);
 */
export const debug = (req, res, next) => {
    console.log(req.method, req.url);
    next();
};


export const router = (req, res, next) => {
    app(req, res, next);
};



export default TinyExpress;
