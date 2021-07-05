<template>
  <div
    v-editable="blok"
    class="container mx-auto px-4">

          <div class="flex justify-between py-16 sm:py-24">
             <div class="w-full lg:w-1/2 xl:w-6/12 text-center lg:text-left py-4 sm:p-0">
                <h1 class="text-4xl xl:text-5xl text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary font-medium tracking-normal leading-tight mb-6">
                  {{ blok.headline }}
                </h1>
                <h2 class="text-lg font-medium mb-6">
                  Build your next Vue.js application with confidence using NuxtJS.
                </h2>
                <div class="flex flex-col sm:block py-4">
                   <a href="_blank" class="no-underline inline-block font-medium text-sm px-4 py-2 shadow uppercase rounded hover:shadow-md sm:mr-4 py-3 px-6 text-base mb-4 primary">
                      Learn more
                   </a>
                </div>
             </div>
             <div class="hidden lg:block lg:w-5/12">
                <img src="https://img.storyblok.com/ESj1lIqO5N2nrvzRp8KwVCg8CtU=/1300x0/filters:format(webp):quality(80)/f/88751/1734x1092/fac47826c3/storyblok-editor.png" />
             </div>
          </div>


  </div>
</template>
 
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
