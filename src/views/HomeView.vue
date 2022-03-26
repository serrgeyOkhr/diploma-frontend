<template>
  <div class="home">
    <header class="header">
      <nav class="navigation">
          <n-button
          :class="['testButton', 'btn', {handle_active: showSubject === 'all'}]" @click='setTasks("all")'
          :color=this.style.colors.yellow
          ghost
          text-color='#000000'
          >Показать все</n-button>
          <n-button
          :class="['testButton', 'btn', {handle_active: showSubject === subject}]"
          :color=this.style.colors.yellow
          text-color='#000000'
          ghost
          v-for='(subject, index) in subjects'
          :key='index'
          @click='setTasks(subject)'
          >{{subject}}</n-button>
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
        :color=this.style.colors.purple
        text-color='#000000'
        >Выход</n-button>
      </div>
    </header>
    <div class="container">
      <div class="taskBar" v-for='(group, index) in groups' :key='index'>
        <TaskCom
        v-for='(task, index) in showTask'
        :id='task.id'
        :key='index'
        :title="task.name"
        :description="task.description"
        :published="task.published"
        :done="task.done"
        />
        <!-- <h2 class=group_header v-if='groups.size >= 1'> {{task}} </h2> -->
        <!-- <div class="task_item" v-for='(task, index) in showTask' :key='index'>{{task.name}}</div> -->
        <n-button v-if='user.type === 2' class='addTask' @click='logStore()' :color=this.style.colors.purple>show store</n-button>
      </div>
      <div class="statsBar"> <span>content</span></div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { mapMutations, mapState, useStore } from 'vuex'
import TaskCom from '../components/Task.vue'
// @ is an alias to /src
// import ModalLogin from '@/components/ModalLogin.vue'
// const testUser = {
//   name: 'oleg',
//   id: 9999
// }
export default {
  name: 'HomeView',
  components: {
    TaskCom
  },
  data () {
    return {
      showSubject: 'all'
    }
  },
  computed: {
    showTask () {
      return this.showSubject === 'all' ? this.tasks : this.tasks.filter(el => el.subject === this.showSubject)
    },
    ...mapState({
      state_tasks: 'tasks'
    })
  },
  methods: {
    ...mapMutations({
      updateUser: 'updateUser'
    }),
    setTasks (subject) {
      this.showSubject = subject
      if (subject === 'all') {
        console.log(this.tasks)
        return null
      }
      console.log(this.tasks.filter((task) => {
        return task.subject === subject
      }))
    },
    logStore () {
      console.log('state: ', this.state_tasks)
    }
  },
  // created () {
  //   // console.log(testUser)
  //   const serverUser = {
  //     name: 'Sergey',
  //     id: 1221,
  //     group: 'it-181'
  //   }
  //   this.updateUser(serverUser)
  //   console.log(this.user)
  //   console.log(this.style)
  // },
  setup () {
    const store = useStore()
    const user = ref(store.state.user)
    const style = ref(store.state.style)

    function setData (place, data) {
      store.commit(place, data)
    }

    function getTasks () {
      const tasks = [{
        id: 1,
        deadline: '05.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск цифр в строке',
        description: 'В этом задании требуется найти корни квадратного уравнения. Функция должна необходимое число корней, или "нет корней. В этом задании требуется найти корни квадратного уравнения. В этом задании требуется найти корни квадратного уравнения.',
        published: true,
        group: 'ИТ-181'
      },
      {
        id: 2,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181'
      },
      {
        id: 3,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: false,
        group: 'ИТ-181'
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 4,
        deadline: '11.10.2022',
        subject: 'Предмет 2',
        name: 'решение квадратного уравнения',
        description: 'В этом задании требуется найти корни квадратного уравнения. Функция должна необходимое число корней, или "нет корней. В этом задании требуется найти корни квадратного уравнения. В этом задании требуется найти корни квадратного уравнения."',
        published: true,
        group: 'ИТ-181',
        done: false
      }]
      return tasks
    }

    if (!localStorage.getItem('User')) {
      localStorage.setItem('User', JSON.stringify(store.state.user))
    } else {
      setData('updateUser', JSON.parse(localStorage.getItem('User')))
      setData('updateTasks', getTasks())
    }
    console.log(JSON.parse(localStorage.getItem('User')))
    console.log(store.state.user)
    // console.log(store.state.tasks)

    const tasks = store.state.tasks
    const subjects = new Set()
    const groups = new Set()

    tasks.forEach(element => {
      subjects.add(element.subject)
      groups.add(element.group)
    })
    console.log('setUp')
    // localStorage.setItem('User', JSON.stringify(store.state.user))
    return {
      subjects,
      tasks,
      groups,
      user,
      style
    }
  }
}

</script>

<style scoped>
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
.container {
  display: flex;
  justify-content: space-between;
}
.taskBar {
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  border: 1px solid #fff;
  border-right-color: black;
  max-height: calc(100vh - 100px);
  min-height: calc(100vh - 100px);
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.taskBar::-webkit-scrollbar {
  display: none;
}
.task_item{
  border: 1px solid #F8D57E;
  padding: 10px;
  margin-bottom: 10px;
}
.statsBar {
  display: flex;
  width: 70%;
  justify-content: center;
  align-items: center;
}
.handle_active{
  background-color: #F8D57E !important;
  color:black
}
.n-button:hover{
  color:black
}
.n-button:focus{
  color:black
}
.addTask{
  margin-top: 20px;
}
</style>
