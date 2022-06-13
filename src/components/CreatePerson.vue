<template>
 <n-form-item v-if="change" label="Выбрать пользователя">
    <n-select v-model:value="formValue.users" :options="allUsers" />
  </n-form-item>
 <div class="createPersonContainer">
   <n-form
    ref="formRef"
    :model="formValue"
    :rules="rules"
    :validate-messages="messages"
  >
    <n-form-item label="Имя" path="user.name">
      <n-input v-model:value="formValue.user.name" placeholder="Введите имя" />
    </n-form-item>
    <n-form-item label="Тип пользователя" path="user.type">
      <n-select
        v-model:value="formValue.user.type"
        placeholder="Выберите тип пользователя"
        :options="userTypeOptions"
      />
    </n-form-item>
    <n-form-item v-if="formValue.user.type === '1'" label="Группа" path="user.group">
      <n-input v-model:value="formValue.user.group" placeholder="Введите группу" />
    </n-form-item>
    <n-form-item label="Логин" path="user.login">
      <n-input v-model:value="formValue.user.login" placeholder="Введите логин" />
    </n-form-item>
    <n-form-item label="Пароль" path="user.password">
      <n-input v-model:value="formValue.user.password" placeholder="Введите пароль" />
    </n-form-item>
    <n-form-item>
      <n-button @click="handleValidateClick">
        Добавить
      </n-button>
    </n-form-item>
  </n-form>
 </div>
 <!-- <pre>{{formValue}}</pre> -->
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
import { useMessage } from 'naive-ui'
export default {
  name: 'create-persone',
  props: {
    isChange: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const getUser = '/api/getUser'
    const createUser = 'http://100.90.100.22:5000/api/create_user'
    const resp = ref(null)
    const change = toRef(props, 'isChange')
    const personID = ref(null)
    const message = useMessage()
    const formRef = ref(null)
    const customError = ref(null)
    let allUsers = []
    const formValue = change.value
      ? getCurrentUser(personID)
      : ref({
        user: {
          name: '',
          type: null,
          group: undefined,
          login: '',
          password: ''
        }
      })
    const userTypeOptions = ['Студент', 'Преподаватель'].map((v, index) => ({
      label: v,
      value: String(index + 1)
    }))
    const rules = {
      user: {
        name: {
          required: true,
          message: 'Необходимо ввести имя',
          trigger: 'blur'
        },
        group: {
          required: false,
          message: 'Необходимо ввести группу',
          trigger: 'blur'
        },
        login: {
          required: true,
          message: 'Необходимо ввести логин',
          trigger: 'blur'
        },
        password: {
          required: true,
          message: 'Необходимо ввести пароль',
          trigger: 'blur'
        },
        type: {
          required: true,
          trigger: ['blur', 'change']
        }
      }
    }

    function handleValidateClick (e) {
      e.preventDefault()
      formRef.value?.validate((errors) => {
        if (!errors) {
          message.success('Valid')
          createNewUser(formValue.value.user)
        } else {
          console.log(errors)
          message.error('Invalid')
        }
      })
    }
    function createNewUser (user) {
      console.log(user)
      const body = {
        name: user.name,
        type: user.type,
        group: user.group ? user.group : undefined,
        username: user.login,
        password: user.password
      }
      fetch(createUser, {
        method: 'POST',
        mode: 'cors',
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
    function getCurrentUser (userID) {
      console.log(userID)
      if (userID.value) {
        const body = {
          userID: userID
        }
        fetch(getUser, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then((response) => {
            resp.value = response.json()
            console.log(resp.value)
          })
        return ref({
          user: {
            name: resp.value.name,
            type: resp.value.type,
            group: resp.value.group ? resp.value.group : undefined,
            login: resp.value.login,
            password: 'Оставить без изменений'
          }
        })
      } else {
        allUsers = []
        return ref({
          users: allUsers,
          user: {
            name: '',
            type: null,
            group: undefined,
            login: '',
            password: ''
          }
        })
      }
    }
    return {
      change,
      formRef,
      formValue,
      userTypeOptions,
      allUsers,
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
