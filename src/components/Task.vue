<template>
  <div class="container" :class="{already_done: done}">
    <div class="task_text" @click="$emit('openPage')">
      <div class="task_title_box">
        <h4 class="task_title"> {{title}}</h4>
        <span
        v-if='!done'
        :class="{toLate: rawTime <= Date.parse(new Date())}"
        > Сдать до: {{ deadline.toLocaleDateString() }}</span>
      </div>
      <p class="description"> {{trimDescription}} </p>
    </div>
    <div class="icon_box"
    v-if='published !== undefined'
    @click="changeVis()"
    >
      <n-icon v-if='visible' size="40">
        <Eye  />
      </n-icon>
      <n-icon v-else size="40">
        <EyeOff />
      </n-icon>
    </div>
    <div class="icon_box" v-else>
      <n-icon v-if='done' size="40">
        <Checkmark color='#3DC727' />
      </n-icon>
    </div>
  </div>
</template>

<script>
import { Eye, EyeOff, Checkmark } from '@vicons/ionicons5'
import { ref, toRef } from '@vue/reactivity'
import { useStore } from 'vuex'
import config from '@/config'
export default {
  name: 'TaskCom',
  components: {
    Eye, EyeOff, Checkmark
  },
  props: {
    id: Number,
    title: String,
    description: String,
    published: {
      type: Boolean,
      default: undefined
    },
    done: {
      type: Boolean,
      default: undefined
    },
    task: {
      type: Object,
      default: undefined
    }
  },
  setup (props) {
    const resp = ref(null)
    const updateTask = config.hostname + config.api.editTask
    const thisTask = toRef(props, 'task')
    const visible = ref(thisTask.value.shown)
    const taskId = ref(thisTask.value.id)
    const toMuch = ref(thisTask.value.description.substring(130))
    const trimDescription = ref(thisTask.value.description)
    const store = useStore()
    // console.log('props', thisTask)
    const rawTime = Date.parse(thisTask.value.deadline)
    const deadline = new Date(Date.parse(thisTask.value.deadline))
    // console.log(Date.parse(thisTask.value.deadline))
    // console.log(Date.parse(new Date()))

    if (toMuch.value) {
      trimDescription.value = trimDescription.value.substring(0, 130) + '...'
    }

    function changeVis () {
      // console.log(visible)
      visible.value = !visible.value
      const data = {
        id: taskId.value,
        shown: visible.value
      }
      store.commit('changeTaskPublished', data)
      // console.log('data = ', data)
      fetch(updateTask, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          // console.log(result)
          resp.value = result
          // console.log(resp.value)
        })
    }
    return {
      visible,
      trimDescription,
      deadline,
      rawTime,
      changeVis
    }
  }
  // methods: {
  //   ...mapMutations({
  //     setVis: 'changeTaskPublished'
  //   })
  // }
}
/*
,
    userType: Number,
    id: Number
*/
</script>

<style scoped>
.container{
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin: 0 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  margin-top: 5px;
}
.task_text{
  display: flex;
  width: 100%;
  flex-direction: column;
  cursor: pointer;
  text-align: left;
}
.task_title{
  margin: 0
}
.description{
  margin-top: 0;
}
.already_done{
  background-color: rgb(209, 209, 209);
  opacity: 0.9;
}
.task_title_box{
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 5px;
}
.toLate{
  font-weight: bold;
  color: red;
}
</style>
