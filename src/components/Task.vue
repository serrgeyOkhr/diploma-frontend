<template>
  <div class="container" :class="{already_done: done}">
    <div class="task_text" @click="$emit('openPage')">
      <h4 class="task_title"> {{title}}</h4>
      <p class="description"> {{trimDescription}} </p>
    </div>
    <div class="icon_box"
    @click="changeVis()"
    v-if='published !== undefined'
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
    const updateTask = 'http://100.90.100.22:5000/api/edit_task'
    const visible = ref(props.published)
    const taskId = toRef(props, 'id')
    const thisTask = toRef(props, 'task')
    const toMuch = ref(props.description.substring(130))
    let trimDescription = ref(props.description)
    const store = useStore()
    const resp = ref(null)
    // console.log('proos', toMuch)
    function changeVis () {
      visible.value = !visible.value
      const data = {
        id: taskId.value,
        shown: visible.value
      }
      const body = {
        deadline: thisTask.value.deadline,
        description: thisTask.value.description,
        group: thisTask.value.group,
        id: taskId.value,
        shown: visible.value,
        subject: thisTask.value.subject,
        title: thisTask.value.title
      }
      store.commit('changeTaskPublished', data)
      console.log('data = ', data)
      fetch(updateTask, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(result => {
          console.log(result)
          resp.value = result
          console.log(resp.value)
        })
    }
    if (toMuch.value) {
      trimDescription = props.description.substring(0, 130) + '...'
    }
    return {
      visible,
      trimDescription,
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
  flex-direction: column;
  cursor: pointer;
  text-align: left;
}
.task_title{
  margin-bottom: 10px;
  margin-top: 5px;
}
.description{
  margin-top: 0;
}
.already_done{
  background-color: rgb(209, 209, 209);
  opacity: 0.9;
}
</style>
