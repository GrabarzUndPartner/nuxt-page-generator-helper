# Adapter `local-json`

Adapter `local-json` is used to work with local `JSON` files.

## Locales Directory

### Example structure

```
.
└── locales
    ├── layout.json
    └── pages
        ├── index.json
        ├── page-1.json
        └── top-page
            ├── index.json
            └── sub-page-json
```

### Pages

Path: `./locales/pages`

The directory 'pages' defines the route structure.  
> Each file contains a route object from the [📖 Adapter **Docs**](../../../README-ADAPTER.md)  

### Layout

Path: `./locales/layout.json`

Contains all data required in the layout layer.  

**Example:** Header, Footer

## Configuration

Paths to the `locales` directory can be customized in the `config.js` of the adapter.
