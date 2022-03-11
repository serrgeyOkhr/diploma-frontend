<template>
<n-message-provider>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="container">
      <div class="placeForText">
        some text, if requaried
      </div>
      <div class="content">
        <div class="studentSide">
          <n-button
            color="#f0f0f0"
            text-color="000000"
            @click="showModalStud = true"
          >
            naive-ui
          </n-button>
        </div>
        <div class="professorSide">
          <n-button
            color="#f0f0f0"
            text-color="000000"
            @click="showModalProf = true"
          >
            naive-ui
          </n-button>
        </div>
      </div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- modal from here -->
      <ModalLogin v-model:show="showModalStud" linkPath="student"/>
      <ModalLogin v-model:show="showModalProf" linkPath="professor"/>
  </div>
</n-message-provider>
</template>

<script>
// @ is an alias to /src
import ModalLogin from '@/components/ModalLogin.vue'
import { ref } from 'vue'

export default {
  name: 'HomeView',
  components: {
    ModalLogin
  },
  setup () {
    return {
      showModalStud: ref(false),
      showModalProf: ref(false)
    }
  }
}

</script>
