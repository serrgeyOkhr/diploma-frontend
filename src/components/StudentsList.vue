<template>
  <h1>Список студентов</h1>
  <!-- <pre>{{ studList }}</pre> -->
  <div class="studentListContainer" v-for="(student, index) in studList" :key="index">
    <div class="studentListElement" :class="{active: thisActiveStudent === student.user_id}" @click="$emit('getResult', student.user_id)">
      {{student.name}}
    </div>
  </div>
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
export default {
  name: 'student-list',
  props: {
    id: {
      type: Number
    },
    activeStudent: {
      type: Number || null
    },
    group: {
      type: String
    }
  },
  setup (props) {
    const getStudentURL = 'http://100.90.100.22:5000/api/get_solutions_by_group'
    const taskId = toRef(props, 'id')
    const thisActiveStudent = toRef(props, 'activeStudent')
    const thisGroup = toRef(props, 'group')
    const studList = ref([])
    // const resp = ref(null)
    const customError = ref(null)
    console.log('active', thisActiveStudent)
    getStudentList(taskId, thisGroup, studList)
    // studList.value = getStaticStudentList(taskId)
    // function getStaticStudentList (data) {
    //   return [{
    //     id: 1,
    //     name: 'Сергей Вячеславович',
    //     type: 1,
    //     group: 'ИТ-181'
    //   }, {
    //     id: 2,
    //     name: 'Александр Константинович',
    //     type: 1,
    //     group: 'ИТ-181'
    //   }, {
    //     id: 3,
    //     name: 'Ксения Сергеевна',
    //     type: 1,
    //     group: 'ИТ-181'
    //   }]
    // }
    async function getStudentList (data, thisGroup) {
      /* ожидаемый return: {  responce: xxx (type: Number),
                              user: {
                                name: 'Jon' (type: String),
                                type: 1 / 2 / 69 {type: Number},
                                group: 'IT-6969' / undefined (type: String or undefined)
                              }
                            }
      */
      const body = {
        task_id: data.value,
        group_id: thisGroup.value
      }
      // loading.value = true
      fetch(getStudentURL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then((result) => {
          // loading.value = false
          console.log(result)
          studList.value = result
        })
        .catch((error) => {
          customError.value = error
        })
      // console.log(result)
      // return result
      // console.log(thisActiveStudent)
    }
    return {
      taskId,
      getStudentList,
      studList,
      thisActiveStudent
    }
  }
}
</script>

<style scoped>
.studentListContainer {
  display: flex;
  /* padding: 0 10px; */
}
.studentListElement {
  text-align: left;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 15px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  padding: 10px 15px;
  border: 1px solid;
  /* border-bottom: 1px solid; */
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  width: 100%;
}
.active{
  background-color: rgb(255, 251, 233);
  border: 2px solid;
}

</style>
