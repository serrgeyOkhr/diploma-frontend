<template>
  <a :href="link"> {{text}} </a>
</template>

<script>
export default {
  name: 'RouteLink',
  props: {
    text: String,
    link: String
  }

}
</script>

<style scoped>
a {
  display: block;
  width: 50px;
  height: 20px;
  background-color: rgb(37, 248, 202);
}
</style>
