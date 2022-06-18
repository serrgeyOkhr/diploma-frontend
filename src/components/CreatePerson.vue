<template>
 <n-form-item v-if="change" label="Выбрать пользователя">
    <n-select v-model:value="selectedUser" :options="usersOptions" @update:value="getUserData"/>
  </n-form-item>
 <div class="createPersonContainer">
   <n-form
    ref="formRef"
    :model="formValue"
    :rules="rules"
    :validate-messages="messages"
  >
    <n-form-item label="Имя" path="name">
      <n-input v-model:value="formValue.name" placeholder="Введите имя" />
    </n-form-item>
    <n-form-item label="Тип пользователя" path="user_type">
      <n-select
        v-model:value="formValue.user_type"
        placeholder="Выберите тип пользователя"
        :options="userTypeOptions"
      />
    </n-form-item>
    <n-form-item v-if="formValue.user_type === 'student'" label="Группа" path="group">
      <n-input v-model:value="formValue.group" placeholder="Введите группу" />
    </n-form-item>
    <n-form-item label="Логин" path="username">
      <n-input v-model:value="formValue.username" placeholder="Введите логин" />
    </n-form-item>
    <n-form-item label="Пароль" path="password">
      <n-input v-model:value="formValue.password" placeholder="Введите пароль" />
    </n-form-item>
    <n-form-item>
      <n-button @click="handleValidateClick">
        Сохранить
      </n-button>
    </n-form-item>
  </n-form>
 </div>
 <!-- <pre>{{formValue}}</pre> -->
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
import { useMessage } from 'naive-ui'
import config from '@/config'

export default {
  name: 'create-persone',
  props: {
    isChange: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const change = toRef(props, 'isChange')
    const getUsers = config.hostname + config.api.getUsers
    const userURL = config.hostname + change ? config.api.editUser : config.api.createUser
    const resp = ref(null)
    // const personID = ref(null)
    const message = useMessage()
    const formRef = ref(null)
    const customError = ref(null)
    const allUsers = ref([])
    const usersOptions = ref([])
    const selectedUser = ref(null)
    getAllUsers(getUsers, allUsers, usersOptions)
    const formValue = ref({
      user: {
        name: '',
        type: null,
        group: undefined,
        login: '',
        password: undefined
      }
    })
    const userTypeOptions = [{
      label: 'Студент',
      value: 'student'
    },
    {
      label: 'Преподаватель',
      value: 'teacher'
    }]
    const rules = {
      name: {
        required: true,
        message: 'Необходимо ввести имя',
        trigger: ['input', 'blur']
      },
      group: {
        required: false,
        message: 'Необходимо ввести группу',
        trigger: ['input', 'blur']
      },
      username: {
        required: true,
        message: 'Необходимо ввести логин',
        trigger: ['input', 'blur']
      },
      password: {
        required: !change.value,
        message: 'Необходимо ввести пароль',
        trigger: ['input', 'blur']
      },
      user_type: {
        required: true,
        trigger: ['blur', 'change']
      }
    }
    function getAllUsers (URL, allUsers, output) {
      fetch(URL, {
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(result => {
          result.forEach(element => {
            output.value.push({
              label: element.name,
              value: element.id
            })
          })
          allUsers.value = result
        })
    }
    function handleValidateClick (e) {
      e.preventDefault()
      formRef.value?.validate((errors) => {
        if (!errors) {
          message.success('Valid')
          createNewUser(formValue.value)
        } else {
          console.log(errors)
          message.error('Invalid')
        }
      })
    }
    function createNewUser (user) {
      console.log(user)
      const body = {
        id: user.id ? user.id : undefined,
        name: user.name,
        user_type: user.user_type,
        group: user.group ? user.group : undefined,
        username: user.username,
        password: user.password ? user.password : undefined
      }
      fetch(userURL, {
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
          console.log(resp.value)
        })
        .catch((error) => {
          customError.value = error
          console.error(customError.value)
        })
    }
    function getUserData (userID) {
      formValue.value = allUsers.value.filter((el) => { return el.id === userID })[0]
      console.log(formValue.value)
    }

    return {
      change,
      formRef,
      formValue,
      userTypeOptions,
      usersOptions,
      allUsers,
      selectedUser,
      getUserData,
      // messages,
      rules,
      handleValidateClick
    }
  }
}
</script>

<style>
.createPersonContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
