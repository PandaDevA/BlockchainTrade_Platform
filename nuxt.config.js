const pkg = require("./package");

module.exports = {
  mode: "spa",
  server: {
    // port: 443 // default: 3000
    port: process.env.NODE_ENV == "production" ? 443 : 4000 // default: 3000
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      // { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.6.3/css/all.css"
      }
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"
      },
      {
        src: "/js/signalr.min.js"
      },
      {
        src: "/js/charting_library.min.js"
      },
      {
        src: "/js/particles.min.js"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#e64f56", height: "5px" },

  /*
   ** Global CSS
   */
  css: [
    "~assets/css/normalize.css",
    "~assets/css/components.css",
    "~assets/css/folex.css",
    "~assets/css/style.css",
    "~assets/css/slider.css",
    "~assets/css/animations.css",
    "~assets/css/responsive.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/core-components",
    "~/plugins/axios",
    "~/plugins/libraries-settings",
    "~/plugins/socket",
    "~/plugins/datafees"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    [
      "nuxt-fontawesome",
      {
        component: "fa",
        imports: [
          //import whole set
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["fas"]
          }
        ]
      }
    ]
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://api.folex.io/api"
        : "http://134.119.221.110:8080/api",
    browserBaseURL:
      process.env.NODE_ENV === "production"
        ? "https://api.folex.io/api"
        : "http://134.119.221.110:8080/api",
    https: process.env.NODE_ENV === "production",
    retry: { retries: 0 },
    progress: true,
    proxyHeaders: false,
    credentials: false
  },

  /*
   ** Build configuration
   */
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
