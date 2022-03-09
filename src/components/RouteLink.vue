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
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 5px;
  font-size: 22px;
  display: block;
  line-height: 1em;
  max-width: 250px;
  /* height: 20px; */
  background-color: rgb(37, 248, 202);
}
</style>
