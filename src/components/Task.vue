<template>
  <div class="container" :class="{already_done: done}">
    <div class="task_text">
      <h4 class="task_title"> {{title}}</h4>
      <p class="description"> {{trimDescription}} </p>
    </div>
    <div class="icon_box"
    @click="changeVis({id, visible})"
    v-if='done === undefined'
    >
      <n-icon v-if='this.published' size="40">
        <Eye  />
      </n-icon>
      <n-icon v-else size="40">
        <EyeOff />
      </n-icon>
    </div>
    <div class="icon_box" @click="changeVis({id, visible})" v-else>
      <n-icon v-if='done' size="40">
        <Checkmark color='#3DC727' />
      </n-icon>
    </div>
  </div>
</template>

<script>
import { Eye, EyeOff, Checkmark } from '@vicons/ionicons5'
import { ref } from '@vue/reactivity'
import { mapMutations } from 'vuex'
export default {
  name: 'TaskCom',
  components: {
    Eye, EyeOff, Checkmark
  },
  props: {
    id: Number,
    title: String,
    description: String,
    published: Boolean,
    done: {
      type: Boolean,
      default: undefined
    }
  },
  setup (props) {
    const visible = ref(props.published)
    const toMuch = ref(props.description.substring(130))
    let trimDescription = ref(props.description)
    // console.log('proos', toMuch)
    if (toMuch.value) {
      trimDescription = props.description.substring(0, 130) + '...'
    }
    return {
      visible,
      trimDescription
    }
  },
  methods: {
    changeVis () {
      this.visible = !this.visible
      const data = { id: this.id, published: this.visible }
      // Отправить на сервер. (если тру, то ->)
      this.setVis(data)
    },
    ...mapMutations({
      setVis: 'changeTaskPublished'
    })
  }
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
  border: 1px solid #000000;
  border-radius: 5px;
  margin-top: 5px;
}
.task_text{
  display: flex;
  flex-direction: column;
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
