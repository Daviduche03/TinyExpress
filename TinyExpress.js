import http from 'http';
import { parse } from 'querystring';
import { parse as parseUrl } from 'url';

function TinyExpress() {
    const routes = [];
    const middlewares = [];

    const app = (req, res) => {
        let idx = 0;

        res.json = (data) => {
            
            res.end(JSON.stringify(data));
        };

        res.status = (code) => {
            res.writeHead(code);
            return res;
        };

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

    

    router.get = (path, handler) => {
        routes.push({ path, handler });
    };

    function handle(req, res) {
        const parsedUrl = parseUrl(req.url, true);
        req.query = parsedUrl.query.q;

        for (const route of routes) {
            const match = matchRoute(route.path, parsedUrl.pathname);
            if (route.method === req.method && match) {
                req.params = match.params;
                return route.handler(req, res);
            }
        }
        res.status(404).end('Not Found');
    }

    function matchRoute(routePath, requestPath) {
        
        const routeSegments = routePath.split('/').filter(Boolean);
        const requestSegments = requestPath.split('/').filter(Boolean);

        if (routeSegments.length !== requestSegments.length) {
            return null;
        }

        const params = {};

        for (let i = 0; i < routeSegments.length; i++) {
            if (routeSegments[i].startsWith(':')) {
                const paramName = routeSegments[i].slice(1);
                params[paramName] = requestSegments[i];
            } else if (routeSegments[i] !== requestSegments[i]) {
                return null;
            }
        }

        return { params };
    }

    app.use = (middleware) => {
        middlewares.push(middleware);
    };

    app.get = (path, handler) => {
        routes.push({ method: 'GET', path, handler });
    };

    app.post = (path, handler) => {
        routes.push({ method: 'POST', path, handler });
    };

    app.listen = (port, callback) => {
        return http.createServer(app).listen(port, callback);
    };

    return app;
}

// Middleware to parse JSON bodies
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

// Middleware to parse URL-encoded bodies
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

export const debug = (req, res, next) => {
    console.log(req.method, req.url);
    next();
};


export const router = (req, res, next) => {
    app(req, res, next);
};



export default TinyExpress;
