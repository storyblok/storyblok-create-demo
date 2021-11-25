<div align="center">
	<a  href="https://www.storyblok.com?utm_source=github.com&utm_medium=readme&utm_campaign=create-storyblok-app"  align="center">
		<img  src="https://a.storyblok.com/f/88751/1776x360/51af0ebe23/shared_logos_framework.png" alt="Storyblok Logo">
	</a>
	<h1 align="center">Create Storyblok App</h1>
	<p align="center">A CLI to quickly start a project with your favourite framework, already set up with <a href="http://www.storyblok.com?utm_source=github.com&utm_medium=readme&utm_campaign=create-storyblok-app" target="_blank">Storyblok</a>, Headless CMS.</p> <br />
  <p>Supports <a href="https://nextjs.org/" target="_blank">Next.js</a>, <a href="https://nuxtjs.org/" target="_blank">Nuxt.js</a> and <a href="https://www.gatsbyjs.com/" target="_blank">Gatsby.js</a></p>
</div>

<p align="center">
 <a href="https://oclif.io">
   <img src="https://img.shields.io/badge/cli-oclif-brightgreen.svg">
   </a>
    <a href="https://npmjs.org/package/create-storyblok-app">
   <img src="https://img.shields.io/npm/v/create-storyblok-app.svg">
   </a>
    <a href="https://npmjs.org/package/create-storyblok-app">
   <img src="https://img.shields.io/npm/dw/create-storyblok-app.svg">
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


# Usage

1. Signup at https://app.storyblok.com/
2. Create a new space and retrieve the space preview token under Space -> Settings -> Api Keys
3. Execute follwing command with the space preview access token:

```sh-session
npx create-storyblok-app --key YOUR_STORYBLOK_PREVIEW_TOKEN

cd my-app
yarn && yarn dev
```

4. Open your localhost and click on the "Edit this page" button on the top left to edit the page inside of Storyblok.


# Local Usage

You can also start the CLI locally from this repository

```sh-session
yarn
 ./bin/run --key YOUR_STORYBLOK_PREVIEW_TOKEN
```
