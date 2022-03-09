<template>
  <div class="home">
    <RouteLink text="Я пре" link="/prof"/>
    <RouteLink text="Я сту" link="/student"/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import RouteLink from '@/components/RouteLink.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld,
    RouteLink
  }
}
</script>
