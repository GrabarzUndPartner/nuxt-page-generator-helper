
# Adapter

- [Adapter](#adapter)
  - [Constants](#constants)
    - [PATH](#path)
  - [Functions](#functions)
    - [_`async`_ getRoutes](#async-getroutes)
    - [_`async`_ getRoute](#async-getroute)
    - [_`async`_ getLayout](#async-getlayout)
  - [Route](#route)

## Constants

### PATH

Type: `String`

Default: `__dirname`

**Must be set (required)**

The `PATH` constant must be defined. Is needed for calling the adapter via the plugins.

```javascript
export const PATH = __dirname;
```

## Functions

### _`async`_ getRoutes

Gets all routes.

**Arguments:**

| Name           | Type            | Description                        |
| -------------- | --------------- | ---------------------------------- |
| locales        | `Array<String>` | Languages used (`['de', 'en', …]`) |
| adapterOptions | `Object`        | Adapter-Options from `nuxt-config` |

**Return:**

```json
[
  {
    "path": "/index",
    "data" : {
      "de": {…},
      "en" : {…}
    }
  },
  {
    "path": "/top-page",
    "data" : {
      "de": {…},
      "en" : {…}
    }
  },,
  {
    "path": "/top-page/sub-page",
    "data" : {
      "de": {…},
      "en" : {…}
    }
  },
  …
]
```

### _`async`_ getRoute

Used by individual routes in development mode.

**Arguments:**

| Name           | Type            | Description                               |
| -------------- | --------------- | ----------------------------------------- |
| route          | `Object`        | Vue-Router Route                          |
| path           | `String`        | Router Path without locale prefix (`/en`) |
| defaultLocale  | `String`        | Default locale (`de`)                     |
| locale         | `String`        | Current locale (`de`)                     |
| locales        | `Array<String>` | Languages used (`['de', 'en', …]`)        |
| adapterOptions | `Object`        | Adapter-Options from `nuxt-config`        |

**Return:**

```json
{
  "path": "/index",
  "data" : {
    "de": {},
    "en" : {}
  }
}
```

### _`async`_ getLayout

Gets the layout data.

> Is used in the `nuxtServerInit` of the store to load layout specific data during the rendering > process. (Example: Header, Footer or Cookie-Notification)

**Arguments:**

| Name           | Type            | Description                               |
| -------------- | --------------- | ----------------------------------------- |
| route          | `Object`        | Vue-Router Route                          |
| path           | `String`        | Router Path without locale prefix (`/en`) |
| defaultLocale  | `String`        | Default locale (`de`)                     |
| locale         | `String`        | Current locale (`de`)                     |
| locales        | `Array<String>` | Languages used (`['de', 'en', …]`)        |
| adapterOptions | `Object`        | Adapter-Options from `nuxt-config`        |

**Return:**

```json
{
    "de": {},
    "en" : {}
}
```

---

## Route

The route object describes a page that is rendered.

A unique path describes the default path of the route, regardless of language variants.

`data` contains the individual language blocks. These describe the respective interpretations of the page (url, title, content).

All described properties must be set.

**Route**

| Property | Description    |
| -------- | -------------- |
| `path`   | Route Name     |
| `data`   | Language block |

**Language block**

| Property     | Description                                             |
| ------------ | ------------------------------------------------------- |
| `url`        | Route object for querying the `localPath` method (i18n) |
| `title`      | Page title                                              |
| `components` | Page components                                         |

```json
{
  "path": "/contact",
  "data": {
    "de": {
      "url": {
        "path": "/kontakt"
      },
      "title": "Kontakt",
      "components": [
        {
          "component": "ComponentA",
          "data": {}
        }
      ]
    },
    "en": {
      "url": {
        "path": "/contact"
      },
      "title": "Contact",
      "components": [
        {
          "component": "ComponentB",
          "data": {}
        }
      ]
    }
  }
}
```

**Component**

| Property    | Description                                           |
| ----------- | ----------------------------------------------------- |
| `component` | Component name (relative to property `componentPath`) |
| `data`      | Component Data (`props`)                              |

Examples

| Component Path                | Component Property Value |
| ----------------------------- | ------------------------ |
| `@component/ComponentA`       | `ComponentA`             |
| `@component/sub/ComponentSub` | `sub/ComponentSub`       |

```json
{
  "components": [
    {
      "component": "ComponentA",
      "data": {}
    }
  ]
}
```
