<template>
  <header class="header">
    <nav class="navigation" v-if="user.type !== 'admin'">
        <n-button v-if="allSubjects.size > 0"
          :class="['testButton', 'btn', {handle_active: thisShowSubject === 'all'}]" @click="$emit('setTasks', 'all' )"
          :color=this.style.colors.yellow
          ghost
          text-color='#000000'
        >Показать все
        </n-button>
        <n-button v-else
          :class="['testButton', 'btn', 'handle_active']" @click="goHome()"
          :color=this.style.colors.yellow
          ghost
          text-color='#000000'
        >Показать все
        </n-button>
        <n-button
        :class="['testButton', 'btn', {handle_active: thisShowSubject === subject}]"
        :color=this.style.colors.yellow
        text-color='#000000'
        ghost
        v-for='(subject, index) in allSubjects'
        :key='index'
        @click="$emit('setTasks', subject)"
        >{{subject}}</n-button>
    </nav>
    <nav class="navigation" v-else>
        <n-button
          :class="['testButton', 'btn', {handle_active: thisShowSubject === subject}]"
          @click="$emit('adminPage', 'person')"
          :color=this.style.colors.yellow
          ghost
          text-color='#000000'
        > Работа с пользователем
        </n-button>
        <n-button
        :class="['testButton', 'btn', {handle_active: thisShowSubject === subject}]"
        :color=this.style.colors.yellow
        text-color='#000000'
        ghost
        @click="$emit('adminPage', 'subject')"
        >Работа с группой / предметом</n-button>
    </nav>
    <div class="header_group">
      <span>
        {{this.user.name}}
      </span>
      <span>
        {{this.user.group}}
      </span>
      <n-button
        class='exitButton btn'
        ghost
        :color='this.style.colors.purple'
        text-color='#000000'
        @click="logOut()"
      >Выход</n-button>
    </div>
  </header>
</template>

<script>
import { toRef } from '@vue/reactivity'
import { useStore } from 'vuex'
import router from '@/router'
import config from '@/config'
export default {
  name: 'header-vue',
  props: {
    subjects: {
      type: Set,
      default: new Set()
    },
    showSubject: {
      type: String,
      default: 'all'
    }
  },
  methods: {
    goHome () {
      router.push({ path: '/' })
    },
    logOut () {
      localStorage.clear()
      const URL = config.hostname + config.api.logout
      fetch(URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(result => {
          console.log(result)
        })
        .finally(() => {
          router.push({ path: '/login' })
        })
    }
  },
  setup (props) {
    const store = useStore()
    const style = store.state.style
    const user = store.state.user
    const allSubjects = toRef(props, 'subjects')
    const thisShowSubject = toRef(props, 'showSubject')
    // console.log(allSubjects)
    return {
      style,
      user,
      allSubjects,
      thisShowSubject
    }
  }
}
</script>

<style>
.handle_active{
  background-color: #F8D57E !important;
  color:black
}
.header{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000000;
  font-size: 18px;
}
.btn{
  font-size: 18px;
  padding: 10px 20px;
}
.header_group{
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.header_group span{
  font-size: 18px;
  margin-right: 40px;
}
</style>
