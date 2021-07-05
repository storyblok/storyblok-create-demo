<template>
  <div
    v-editable="blok"
    class="py-2 bg-gray-100">
    <h1 class="uppercase font-medium text-2xl py-8 text-center">
      {{ blok.name }}
    </h1>
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
