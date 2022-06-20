<template>
  <div v-editable="blok">
    <h1>
      This is a component you created with the CLI. Change its code in the components/ folder.
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
