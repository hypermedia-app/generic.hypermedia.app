![graph icon](https://github.com/hypermedia-app/generic.hypermedia.app/raw/master/src/assets/icons/mstile-150x150.png)
# generic.hypermedia.app

> A modern, standards-based Hydra console

## Building blocks

1. Uses [Alcaeus Hydra client][a]. 100% in-browser, no server-side proxy
1. UI build using [material design web components][pe]
1. Content and forms rendered using [lit-any][la], a JS library which reduces UI to pure functions returning HTML templates (_actually ES6 template strings_)

[a]: https://alcaeus.hydra.how/
[pe]: https://www.webcomponents.org/author/PolymerElements
[la]: https://github.com/wikibus/lit-any

## Features

1. Generic, universal view for resource documented in Hydra's API documentation
1. Specialized views for Hydra collections
1. Collections support paging and filtering
1. API documentation viewer
1. Basic support for operations

## Limitations

Due to HTTP restrictions, the API has to be served over SSL. For that reason the API published under http://www.markus-lanthaler.com/hydra/api-demo/ does not currently work on the published app. You can however [run locally](#running-locally)

## Running locally

Clone, then:

```
npm install
npm dev
```

And open the browser at webpack-dev-server's URL. Typically http://localhost:3000

## Deployment configuration

The behavior of the application can be customized through environment variables. They
can be added in a `.env` file.

None of the below are mutually exclusive. All of these settings can be mixed and used together.

### Changing the known APIs (left drawer dropdown)

```
API_ENTRYPOINTS={ "https://example.com/api/": "My API" }
```

The value must be a valid JSON condensed to a single line.

### Using HTML5 history

By default the application uses hash fragments, which are more practical when running locally.
To run with nice URLs:

```
HTML5_HISTORY=true
```

The value can be anything. It is only checked whether it's truthy.

### Hiding API base URL

The routing occurs by placing the full resource URIs in the address bar which
results in lengthy and ugly addresses. To change that, a base URI (namespace) of
the resource identifiers can be set:

```
BASE_URL=https://example.com/apis/
```

This will change the addresses which appear in the application. For example

```diff
-https://example.app/#/https://example.com/apis/people/bill
+https://example.app/#/people/bill
```

It is no magic. Simple substitution. If the URL does not share this base URL,
the whole identifier will still appear in the address.

### Deploying to a path

The application may be deployed in a virtual directory, such as `https://example.com/app/`.
Set a variable, which will sit between the application's host address and the
resource identifier.

```
APP_PATH=app
```
