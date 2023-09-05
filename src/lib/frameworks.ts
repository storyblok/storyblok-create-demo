export interface Framework {
  name: string
  value: string
  start: string
  token: string
  config: string
  bridge: string
  public: string
  port: string
  https?: boolean
  submodules?: boolean
  tutorialLink?: boolean
  branch?: string
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
    name: 'Nuxt.js V2 (Vue.js V2)',
    value: 'nuxtjs',
    start: 'dev',
    token: 'd6IKUtAUDiKyAhpJtrLFcwtt',
    config: 'nuxt.config.js',
    bridge: 'pages/_.vue',
    public: 'static',
    port: '3000',
  },
  {
    name: 'Nuxt.js V3 (Vue.js V3)',
    value: 'nuxtjs-3',
    start: 'dev',
    token: 'W1vLyxT5rQ15jBpANjnv0gtt',
    config: 'nuxt.config.js',
    bridge: 'pages/index.vue',
    public: 'public',
    port: '3000',
    https: false,
    submodules: true,
  },
  {
    name: 'Next.js (React.js)',
    value: 'nextjs',
    start: 'dev',
    token: 'W1vLyxT5rQ15jBpANjnv0gtt',
    config: 'pages/_app.js',
    bridge: 'pages/index.js',
    public: 'public',
    port: '3000',
    submodules: true,
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
    submodules: true,
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
    submodules: true,
    tutorialLink: 'https://www.storyblok.com/tp/the-storyblok-astro-ultimate-tutorial',
  },
  {
    name: 'Svelte',
    value: 'sveltekit',
    start: 'dev',
    token: 'W1vLyxT5rQ15jBpANjnv0gtt',
    config: 'src/routes/+layout.js',
    bridge: 'src/routes/+page.svelte',
    public: 'static',
    port: '5173',
    https: true,
    submodules: true,
    tutorialLink: 'https://www.storyblok.com/tp/the-storyblok-sveltekit-ultimate-tutorial',
  },
  {
    name: 'Gatsby.js (React)',
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