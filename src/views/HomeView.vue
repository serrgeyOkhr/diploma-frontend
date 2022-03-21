<template>
  <div class="home">
    <header class="header">
      <nav class="navigation"></nav>
      <div class="header_group">
        <span>
          {{user.name}} + {{user.group}}
        </span>
        <n-button
        ghost
        :color=style.colors.purple
        text-color='#000000'
        >Выход</n-button>
      </div>
    </header>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
// @ is an alias to /src
// import ModalLogin from '@/components/ModalLogin.vue'
// const testUser = {
//   name: 'oleg',
//   id: 9999
// }
export default {
  name: 'HomeView',
  components: {
    // ModalLogin
  },
  computed: mapState([
    'user', 'style'
  ]),
  methods: {
    ...mapMutations({
      updateUser: 'updateUser'
    }),
    getUser (id) {
    }
  },
  created () {
    // console.log(testUser)
    const serverUser = {
      name: 'Sergey',
      id: 1221,
      group: 'it-181'
    }
    this.updateUser(serverUser)
    console.log(this.user)
    console.log(this.style)
  },
  setup () {
    // const store = useStore()
    // console.log(store.colors)
    console.log('setUp')
  }
}

</script>
