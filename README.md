![graph icon](https://raw.githubusercontent.com/wikibus/Argolis/master/assets/logo.png)
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

1. Generic, universal view for resource documented in Hydra's API documentaiton
1. Specialized views for Hydra collections
1. Collections support paging and filtering
1. API documentation viewer

## Coming soon

1. Support for operations

## Limitations

Due to HTTP restrictions, the API has to be served over SSL. For that reason the API published under http://www.markus-lanthaler.com/hydra/api-demo/ does not currently work on the published app. You can however [run locally](#running-locally)

## Running locally

Clone, then:

```
npm install
npm dev
```

And open the browser at webpack-dev-server's URL. Typically http://localhost:3000
