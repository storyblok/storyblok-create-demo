<div align="center">
	<a  href="https://www.storyblok.com?utm_source=github.com&utm_medium=readme&utm_campaign=create-storyblok-app"  align="center">
		<img  src="https://a.storyblok.com/f/88751/1776x360/795b73df6d/create-demo-app.png/m/" alt="Storyblok Create Demo CLI">
	</a>
	<h1 align="center">Create Storyblok Demo</h1>
	<p align="center">A CLI to quickly start a project with your favorite framework, already set up with <a href="http://www.storyblok.com?utm_source=github.com&utm_medium=readme&utm_campaign=create-storyblok-app" target="_blank">Storyblok</a>, Headless CMS.</p> <br />
  <p>Supports
  <a href="https://nextjs.org/" target="_blank">Next.js</a>,
  <a href="https://nuxtjs.org/" target="_blank">Nuxt</a>,
  <a href="https://www.gatsbyjs.com/" target="_blank">Gatsby</a>,
  <a href="https://vuejs.org/" target="_blank">Vue</a>,
  <a href="https://reactjs.org/" target="_blank">React</a>,
  <a href="https://astro.build/" target="_blank">Astro</a>,
  <a href="https://remix.run/" target="_blank">Remix</a>,
  and <a href="https://kit.svelte.dev/" target="_blank">SvelteKit</a></p>
</div>

<p align="center">

  <a href="https://npmjs.org/package/@storyblok/create-demo">
   <img src="https://img.shields.io/npm/v/%40storyblok%2Fcreate-demo">
   </a>
    <a href="https://npmjs.org/package/@storyblok/create-demo">
   <img src="https://img.shields.io/npm/dw/%40storyblok%2Fcreate-demo">
   </a>
    <a href="https://github.com/storyblok/create-storyblok-app/blob/master/package.json">
   <img src="https://img.shields.io/npm/l/create-storyblok-app.svg">
   </a><br /><br />
  <a href="https://discord.gg/jKrbAMz">
   <img src="https://img.shields.io/discord/700316478792138842?label=Join%20Our%20Discord%20Community&style=appveyor&logo=discord&color=09b3af">
   </a>
  <a href="https://twitter.com/intent/follow?screen_name=storyblok">
    <img src="https://img.shields.io/badge/Follow-%40storyblok-09b3af?style=appveyor&logo=twitter" alt="Follow @Storyblok" />
  </a><br/>
  <a href="https://app.storyblok.com/#!/signup?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-nuxt">
    <img src="https://img.shields.io/badge/Try%20Storyblok-Free-09b3af?style=appveyor&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHqADAAQAAAABAAAAHgAAAADpiRU/AAACRElEQVRIDWNgGGmAEd3D3Js3LPrP8D8WXZwSPiMjw6qvPoHhyGYwIXNAbGpbCjbzP0MYuj0YFqMroBV/wCxmIeSju64eDNzMBJUxvP/9i2Hnq5cM1devMnz984eQsQwETeRhYWHgIcJiXqC6VHlFBjUeXgav40cIWkz1oLYXFmGwFBImaDFBHyObcOzdW4aSq5eRhRiE2dgYlpuYoYSKJi8vw3GgWnyAJIs/AuPu4scPGObd/fqVQZ+PHy7+6udPOBsXgySLDfn5GRYYmaKYJcXBgWLpsx8/GPa8foWiBhuHJIsl2DkYQqWksZkDFgP5PObcKYYff//iVAOTIDlx/QPqRMb/YSYBaWlOToZIaVkGZmAZSQiQ5OPtwHwacuo4iplMQEu6tXUZMhSUGDiYmBjylFQYvv/7x9B04xqKOnQOyT5GN+Df//8M59ASXKyMHLoyDD5JPtbj42OYrm+EYgg70JfuYuIoYmLs7AwMjIzA+uY/zjAnyWJpDk6GOFnCvrn86SOwmsNtKciVFAc1ileBHFDC67lzG10Yg0+SjzF0ownsf/OaofvOLYaDQJoQIGix94ljv1gIZI8Pv38zPvj2lQWYf3HGKbpDCFp85v07NnRN1OBTPY6JdRSGxcCw2k6sZuLVMZ5AV4s1TozPnGGFKbz+/PE7IJsHmC//MDMyhXBw8e6FyRFLv3Z0/IKuFqvFyIqAzd1PwBzJw8jAGPfVx38JshwlbIygxmYY43/GQmpais0ODDHuzevLMARHBcgIAQAbOJHZW0/EyQAAAABJRU5ErkJggg==" alt="Follow @Storyblok" />
  </a>
</p>


# Getting Started

1. Signup at https://app.storyblok.com/;
2. Create a new space and retrieve the space preview token under your space in "Settings -> Access Tokens" menu item;
3. Execute the following commands (use your preview access token when prompted when running the `npx` command):

~~~bash
npx @storyblok/create-demo@latest

cd my-app
npm i && npm run dev
~~~

4. Open the Storyblok App following the URL suggested by the output provided by the commands. It depends on the HTTPS configuration and the port used by the frameworks.

# CLI Options

The CLI has different options that can be filled, you can see all the options by running `npx @storyblok/create-demo --help`:

~~~
OPTIONS
  -d, --folder=folder                  Folder path for the demo (e.g. my-demo)
  -f, --framework=framework            Framework to use (e.g. astro)
  -h, --help                           show CLI help
  -k, --key=key                        Storyblok Access Token
  -p, --packagemanager=packagemanager  Package manager to use (yarn or npm)
  -r, --region=region                  Space region (e.g. eu-central-1, us-east-1, cn-north-1, ca-central-1, ap-southeast-2)
  -v, --version                        show CLI version
~~~

By using this, you can skip the "questions" of the CLI and fill it with your options directly like so:

~~~bash
npx @storyblok/create-demo@latest --key YOUR_STORYBLOK_PREVIEW_TOKEN --region US
~~~


### Local Development

If you want to contribute, you can run the CLI locally and test it with this command:

~~~bash
npm i
./bin/dev --key YOUR_STORYBLOK_PREVIEW_TOKEN
~~~

#### Framework Options

The framework options can be set in `src/lib/frameworks.ts` and work in combination with the [getting-started](https://github.com/storyblok/getting-started) or The Ultimate Tutorial repositories:

- `name`:  name of the framework
- `value`: cli value to use for reference
- `start`: local command to start the example
- `token`: space token used in the demo repository
- `config`: file that has the access token
- `bridge`: file that is loading the bridge
- `public`: public folder path for the static files
- `port`:  port the framework starts,
- `repositoryUrl`: (optional) the URL repository for cloning the template;
- `branch`: (optional) for setting a specific branches
- `https`: (optional) if the framework starts with https
- `submodules`: (optional) if the framework in `getting-started` is a submodule
- `tutorialLink`: (optional) - link to the framwork tutorial
