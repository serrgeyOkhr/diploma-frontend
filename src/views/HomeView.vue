<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <n-button
      color="#f0f0f0"
      text-color="000000"
      @click="showModal = true"
      >naive-ui</n-button>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- modal from here -->
      <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
        <template #header>
          <div>title</div>
        </template>
        <div>content</div>
        <template #action>
          <div>action</div>
        </template>
      </n-modal>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { ref } from 'vue'
export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  },
  setup () {
    return {
      showModal: ref(false)
    }
  }
}
</script>
