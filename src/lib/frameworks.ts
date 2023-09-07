export interface Framework {
  /** The name of the framework */
  name: string
  /** The framework identifier */
  value: string
  /** argument used for `npm run` . Typically is dev, but you can customize it for example `dev-ssl` */
  start: string
  /** the Storyblok preview access token */
  token: string
  /** the file that contains the initializaztion of the Stroyblok Client (with the setting for the access token) */
  config: string
  /** the file that instance the Storyblok bridge */
  bridge: string
  /** the public/static folder of the framework (typically `public` or `static`) */
  public: string
  /** the port used by the framework to start the local webserver */
  port: string
  /** if the HTTPS protocol is used */
  https?: boolean
  /** if the submodules is used in the Getting Started repository */
  submodules?: boolean
  /** the Storyblok Ultimate Tutorial link useful for the recap message */
  tutorialLink?: boolean
  /** The repository URL for cloning the project */
  repositoryUrl?: string
  /** the branch used */
  branch?: string
  /** true if the SSL certificate is created via mkcert or fals or null if the framework uses vite basicSsl */
  usingMkcert?: boolean
}

const frameworks = [
  {
    name: 'Vue.js',
    value: 'vuejs',
    start: 'dev',
    token: 'd6IKUtAUDiKyAhpJtrLFcwtt',
    config: 'src/main.js',
    bridge: 'src/pages/Home.vue',
    public: 'public',
    port: '3000',
  },
  {
    name: 'Nuxt.js 2',
    value: 'nuxtjs',
    start: 'dev',
    token: 'd6IKUtAUDiKyAhpJtrLFcwtt',
    config: 'nuxt.config.js',
    bridge: 'pages/_.vue',
    public: 'static',
    port: '3000',
  },
  {
    name: 'Nuxt.js 3',
    value: 'nuxtjs-3',
    start: 'dev-ssl',
    token: 'W1vLyxT5rQ15jBpANjnv0gtt',
    config: 'nuxt.config.js',
    bridge: 'pages/index.vue',
    public: 'public',
    port: '3000',
    branch: 'part-1',
    repositoryUrl: 'https://github.com/storyblok/nuxt-ultimate-tutorial.git',
    usingMkcert: true,
  },
  {
    name: 'Next.js',
    value: 'nextjs',
    start: 'dev',
    token: 'W1vLyxT5rQ15jBpANjnv0gtt',
    config: 'pages/_app.js',
    bridge: 'pages/index.js',
    public: 'public',
    port: '3000',
    branch: 'part-1',
    repositoryUrl: 'https://github.com/storyblok/next.js-ultimate-tutorial.git',
  },
  {
    name: 'React.js',
    value: 'reactjs',
    start: 'start',
    token: 'W1vLyxT5rQ15jBpANjnv0gtt',
    config: 'src/index.js',
    bridge: 'src/App.js',
    public: 'public',
    port: '3000',
    branch: 'master',
    repositoryUrl: 'https://github.com/storyblok/storyblok-react-boilerplate.git',
  },
  {
    name: 'Remix',
    value: 'remix',
    start: 'dev',
    token: 'd6IKUtAUDiKyAhpJtrLFcwtt',
    config: 'app/root.jsx',
    bridge: 'app/routes/home.jsx',
    public: 'public',
    port: '3000',
  },
  {
    name: 'Astro',
    value: 'astro',
    start: 'dev',
    token: 'W1vLyxT5rQ15jBpANjnv0gtt',
    config: 'astro.config.mjs',
    bridge: 'src/pages/index.astro',
    public: 'public',
    port: '3000',
    tutorialLink: 'https://www.storyblok.com/tp/the-storyblok-astro-ultimate-tutorial',
    branch: 'part-1',
    repositoryUrl: 'https://github.com/storyblok/astro-ultimate-tutorial.git',
  },
  {
    name: 'SvelteKit',
    value: 'sveltekit',
    start: 'dev',
    token: 'W1vLyxT5rQ15jBpANjnv0gtt',
    config: 'src/routes/+layout.js',
    bridge: 'src/routes/+page.svelte',
    public: 'static',
    port: '5173',
    https: true,
    repositoryUrl: 'https://github.com/storyblok/sveltekit-ultimate-tutorial.git',
    branch: 'part-1-sveltekit-ut',
    tutorialLink: 'https://www.storyblok.com/tp/the-storyblok-sveltekit-ultimate-tutorial',
  },
  {
    name: 'Gatsby.js',
    value: 'gatsbyjs',
    start: 'start',
    token: 'W1vLyxT5rQ15jBpANjnv0gtt',
    config: 'gatsby-config.js',
    bridge: 'src/pages/index.js',
    public: 'static',
    port: '8000',
    submodules: true,
  },
] as Framework[]

export default frameworks
