// @ts-check

const { themes } = require("prism-react-renderer");

const repoUrl = "https://github.com/richardDobron/laravel-fbt";

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: "FBT for Laravel",
  tagline: "An internationalization framework for Laravel applications.",
  url: "https://richarddobron.github.io",
  baseUrl: "/laravel-fbt/",
  favicon: "img/favicon_blue.png",
  organizationName: "richardDobron",
  projectName: "laravel-fbt",
  trailingSlash: false,
  onBrokenLinks: "throw",
  markdown: {
    format: "detect",
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          path: "../docs",
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          lastVersion: "current",
          versions: {
            current: { label: "5.x" },
            "4.x": { label: "4.x", banner: "none" },
          },
          editUrl: ({ version, docPath }) =>
            `${repoUrl}/edit/${version === "current" ? "main" : version}/docs/${docPath}`,
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve("@fontsource-variable/inter/index.css"),
            require.resolve("@fontsource-variable/fira-code/index.css"),
            require.resolve("./src/css/custom.css"),
          ],
        },
      },
    ],
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: "docs",
        docsDir: "../docs",
      },
    ],
  ],
  themeConfig: {
    image: "img/fbt.png",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "FBT for Laravel",
      logo: {
        alt: "FBT Logo",
        src: "img/fbt.png",
      },
      items: [
        { type: "doc", docId: "getting_started", label: "Docs", position: "left" },
        { type: "doc", docId: "upgrading", label: "Upgrading to fbt 5", position: "left" },
        { type: "docsVersionDropdown", position: "right" },
        { href: "https://packagist.org/packages/richarddobron/laravel-fbt", label: "Packagist", position: "right" },
        { href: repoUrl, label: "GitHub", position: "right" },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "Richard's Blog",
        src: "img/blog.svg",
        href: "https://dobron.showwcase.com/",
      },
      links: [
        {
          title: "Docs",
          items: [
            { label: "Getting started", to: "docs/getting_started" },
            { label: "API reference", to: "docs/api_intro" },
            { label: "Upgrading to fbt 5", to: "docs/upgrading" },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "Issues", href: `${repoUrl}/issues` },
            { label: "Changelog", href: `${repoUrl}/blob/main/CHANGELOG.md` },
          ],
        },
        {
          title: "FBT",
          items: [
            { label: "FBT for PHP", href: "https://github.com/richardDobron/fbt" },
            { label: "FBT for JavaScript (Facebook)", href: "https://github.com/facebook/fbt" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Richard Dobroň & Meta Platforms, Inc. and affiliates.`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: ["php", "bash", "json"],
    },
  },
};
