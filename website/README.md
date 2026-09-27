# Website

The documentation website is built with [Docusaurus](https://docusaurus.io/) from the docs in [`../docs`](../docs).
It's deployed to GitHub Pages by the `website` workflow on every push to `main`.

```shell
npm ci          # install dependencies
npm start       # start a dev server with live reload
npm run build   # build the static website into build/
npm run serve   # serve the built website
```

- Docs are kept almost 1:1 with the [docs of fbt](https://github.com/richardDobron/fbt/tree/main/docs), only
  Laravel specific parts differ (artisan commands, Blade). The `website` workflow reports the differences.
- Docs of 4.x are in `versioned_docs/version-4.x`.
- New docs have to be added to `sidebars.js`.
