<template>
  <div class="containerTaskSub addForm" >
    <div class="groupContainer " >
      <div class="allGroupList">
        <h3>Текущие группы</h3>
        <p class="group_list" v-for="(group, index) in allGroup.sort((a,b) => a.id > b.id )" :key="index">
          {{group.id}}
        </p>
      </div>
      <div class="createGroup">
        <h3>Добавить группу</h3>
        <n-input class="addGroupInput" v-model:value="newGroupName" type="text" placeholder="Введите номер группы" />
        <n-button @click="addNewGroup">Сохранить</n-button>
      </div>
    </div>
    <div class="subjectContainer addForm">
          <!-- <div class="allSubjectList"> компонент список</div> -->
      <div class="createSubject">
        <div class="subjectMenu">
          <h3 class="subjectMenu_title" :class="{active_title: subjectFormShow}" @click="subjectFormShow = true"> Добавить предмет </h3>
          <h3 class="divider"> / </h3>
          <h3 class="subjectMenu_title" :class="{active_title: !subjectFormShow}" @click="subjectFormShow = false"> Изменить предмет </h3>
        </div>
        <!-- <pre>{{subjectFormShow}}</pre> -->
        <div v-if="subjectFormShow" class="subjectAddForm">
          <n-form ref="formRef" :rules="rules" :model="newSubject">
            <n-form-item>
              <p>Полное название предмета</p>
              <n-input class="addGroupInput" v-model:value="newSubject.full_name" placeholder="Название"/>
            </n-form-item>
            <n-form-item>
              <p>Сокращенное название предмета</p>
              <n-input class="addGroupInput" v-model:value="newSubject.id" placeholder="Сокращение"/>
            </n-form-item>
            <n-form-item>
              <p>Выберите преподавателя для этого предмета</p>
              <n-select class="addGroupInput" v-model:value="newSubject.teacher" :options="allTeachers"/>
            </n-form-item>
            <n-form-item>
              <n-button @click="addNewSubject">Сохранить</n-button>
            </n-form-item>
          </n-form>
        </div>
        <div v-else class="subjectAddForm">
          <n-form ref="formRef" :rules="rules" :model="changeSubject">
            <n-form-item>
              <p class="mr20">Выберите предмет</p>
              <n-select class="addGroupInput" v-model:value="selectSubject" :options="allSubjects" @update:value="getSubjectData"/>
            </n-form-item>
            <!-- <pre>{{changeSubject}}</pre> -->
            <!-- <n-form-item>
              <p>Полное название предмета</p>
              <n-input v-model:value="changeSubject.full_name" placeholder="название"/>
            </n-form-item>
            <n-form-item>
              <p>Сокращенное название предмета</p>
              <n-input v-model:value="changeSubject.id" placeholder="Сокращение"/>
            </n-form-item> -->
            <n-form-item>
              <p>Выберите преподавателя для этого предмета</p>
              <n-select class="addGroupInput" v-model:value="changeSubject.teacher" :options="allTeachers"/>
            </n-form-item>
            <n-form-item>
              <n-button @click="sendChangeSubject">Изменить</n-button>
            </n-form-item>
          </n-form>
        </div>
      </div>
        <!-- <div class="SubjectChangeContainer">компонент форма, данные зависят от списка </div> -->
    </div>
 </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import config from '@/config'
export default {
  name: 'create-task-sub',
  setup () {
    const newGroupName = ref(null)
    const newSubject = ref(
      {
        full_name: '',
        id: '',
        teacher: null
      }
    )
    const changeSubject = ref(
      {
        full_name: '',
        id: '',
        teacher: null
      }
    )
    const allGroup = ref([])
    const allSubjects = ref([])
    const allSubject = ref([])
    const allTeachers = ref([])
    const resp = ref(null)
    const formRef = ref(null)
    const selectSubject = ref(null)
    const subjectFormShow = ref(true)
    // const messages = {
    //   required: '%s is really really required'
    // }
    getGroups(allGroup)
    getSubjects(allSubjects, allSubject)
    getTeachers(allTeachers)
    // console.log('allSubjects', allSubjects.value)

    function getGroups (output) {
      const URL = config.hostname + config.api.getGroups
      getFromServer(URL, output)
    }
    function getSubjects (output, allSubject) {
      const URL = config.hostname + config.api.getSubjects
      fetch(URL, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((result) => {
          allSubject.value = result
          result.forEach(element => {
            // console.log('element', element)
            output.value.push({
              label: element.full_name,
              value: element.id
            })
          })
          // console.log(allSubjects.value)
        })
    }
    function getTeachers (output) {
      const URL = config.hostname + config.api.getUsers
      fetch(URL, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((result) => {
          const teachers = result.filter((el) => { return el.user_type === 'teacher' })
          teachers.forEach(element => {
            output.value.push({
              label: element.name,
              value: element.id
            })
          })
          // console.log(teachers)
        })
    }

    function getFromServer (url, output) {
      fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((result) => {
          output.value = result
          // console.log(result)
        })
    }
    function addNewGroup (e) {
      e.preventDefault()
      // console.log(newGroupName.value)
      const URL = config.hostname + config.api.createGroup
      const body = {
        name: newGroupName.value
      }
      sendToServer(URL, body)
        .then(response => getGroups(allGroup))
    }
    function sendChangeSubject () {
      const URL = config.hostname + config.api.editSubject
      const body = {
        // full_name: changeSubject.value.full_name,
        id: changeSubject.value.id,
        teacher: changeSubject.value.teacher
      }
      // console.log(body)
      sendToServer(URL, body)
    }
    function addNewSubject (e) {
      e.preventDefault()
      // console.log('newSubject', newSubject.value)
      const URL = config.hostname + config.api.createSubject
      const body = {
        full_name: newSubject.value.full_name,
        id: newSubject.value.id,
        teacher: newSubject.value.teacher
      }
      sendToServer(URL, body)
    }
    /**
     * full_name: "Алгоритмы и структуры данных"
     * id: "АСД"
     * teacher: 2
     */

    async function sendToServer (URL, body) {
      return fetch(URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((response) => {
          resp.value = response.json()
          // console.log(resp.value)
        })
    }
    function getSubjectData (e) {
      // console.log('getSubjectData', e)
      changeSubject.value = allSubject.value.filter((el) => { return el.id === e })[0]
      // console.log('changeSubject.value', changeSubject.value)
    }
    return {
      formRef,
      newGroupName,
      newSubject,
      changeSubject,
      selectSubject,
      allTeachers,
      allSubjects,
      allGroup,
      subjectFormShow,
      addNewGroup,
      addNewSubject,
      getSubjectData,
      sendChangeSubject
    }
  }
}
</script>

<style scoped>
.containerTaskSub {
  /* width: 100%; */
  display: flex;
  /* justify-content: center; */
  /* flex-direction: row; */
  /* flex-shrink: 1; */
  /* border: 2px solid red; */
}
.groupContainer {
  display: flex;
  justify-content: space-between;
  /* border: 1px solid; */
}
.subjectContainer {
  /* border: 1px solid rgb(107, 255, 107); */
  display: flex;
  justify-content: center;
}
.mr20{
  margin-right: 20px;
}
.subjectMenu {
  padding: 0 5px;
  justify-content: center;
  display: flex;
  align-items: center;
}
.subjectMenu_title{
  font-size: 20px;
  cursor: pointer;
  color: gray;
}
.active_title{
  color: black;
  font-size: 22px;
}
.group_list{
  margin-bottom: 0;
  margin-top: 5px;
}
.divider{
  margin-left: 10px;
  margin-right: 10px;
  font-size: 22px;
}
.activeSubjectForm {
  font-size: 24px;
}
.allGroupList{
  text-align: left;
}
.addGroupInput{
  text-align: left;
  margin: 5px 0;
  /* margin-left: 15px; */
  border: 1px solid;
  max-width: 250px;
}
.subjectAddForm{
  text-align: left;
  font-size: 16px;
}
</style>
