<template>
  <div class="container mx-auto px-4">
    <div class="m-4 wrapper">
      <a :href="editorPath" class="edit-button shadow-lg text-xl text-white p-2.5 px-5 bg-pink-600 rounded-lg" v-if="!inEditor">
        Edit this page
      </a>
      <logo />
    </div>
    <page
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      story: { content: {} }
    }
  },

  computed: {
    inEditor() {
      return typeof window !== 'undefined' && window.location != window.parent.location
    },

    editorPath() {
      return `/editor.html#/edit/${this.story.id}`
    }
  },

  mounted () {
    this.$storybridge(() => {
      const storyblokInstance = new StoryblokBridge({
        customParent: window.location.origin
      })

      // Listen to Storyblok's Visual Editor event
      storyblokInstance.on(['input', 'published', 'change'], (event) => {
        if (event.action == 'input') {
          if (event.story.id === this.story.id) {
            this.story.content = event.story.content
          }
        } else {
          this.$nuxt.$router.go({
            path: this.$nuxt.$router.currentRoute,
            force: true,
          })
        }
      })
    })
  },
  asyncData (context) {
    const version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    const fullSlug = (context.route.path == '/' || context.route.path == '') ? 'home' : context.route.path

    // Load the JSON from the API - loadig the home content (index page)
    return context.app.$storyapi.get(`cdn/stories/${fullSlug}`, {
      version: version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  }
}
</script>

<style>
.edit-button {
  display: block;
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
