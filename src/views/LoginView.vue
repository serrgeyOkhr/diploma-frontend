<template>
  <n-message-provider>
    <div class="home">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <div class="container">
        <div class="placeForText">
          <h1>Алгоритмы и Структуры</h1>
          <div class="description">
            <img src="../assets/logo_ssuwt.png" alt="logo_ssuwt" />
            <span> Сервис создан студентами для студентов </span>
          </div>
        </div>
        <div class="loginForm">
          <n-form ref="formRef" :rules="rules" :model="formValue" action="#">
            <n-form-item label="Логин" path="username">
              <n-input
                v-model:value="formValue.username"
                placeholder="Введите Логин"
                size="large"
              />
            </n-form-item>
            <n-form-item label="Пароль" path="password">
              <n-input
                v-model:value="formValue.password"
                type="password"
                placeholder="Введите пароль"
                size="large"
              />
            </n-form-item>
            <n-button
              :loading="loading"
              :block="true"
              :bordered="false"
              :color="style.colors.yellow"
              text-color="#000000"
              @click="handleValidateClick"
              size="large"
              class="button"
            >
              Войти
            </n-button>
          </n-form>
          <!-- <pre>
        username: {{formValue.username}}
        password: {{formValue.password}}
      </pre> -->
        </div>
      </div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- modal from here -->
    <!-- <ModalLogin v-model:show="showModalStud" linkPath="student"/> -->
    <!-- <ModalLogin v-model:show="showModalProf" linkPath="professor"/> -->
  </n-message-provider>
</template>

<script>
/* eslint-disable no-unused-vars */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { mapState, useStore } from 'vuex'
import { useMessage } from 'naive-ui'
import { isNull, isUndefined } from 'lodash'

export default {
  name: 'LoginView',
  setup () {
    const loginUrl = 'http://100.90.100.22:5000/api/login'
    const message = useMessage()
    const store = useStore()
    const router = useRouter()
    const formRef = ref(null)
    const resp = ref(null)
    const customError = ref(null)
    const loading = ref(null)
    const formValue = ref({
      username: '',
      password: ''
    })
    const rules = ref({
      username: {
        required: true,
        message: 'Это поле обязательно для ввода',
        trigger: ['input', 'blur']
      },
      password: {
        required: true,
        message: 'Это поле обязательно для ввода',
        trigger: ['input', 'blur']
      }
    })
    async function getUser (data) {
      /* ожидаемый return: {  responce: xxx (type: Number),
                              user: {
                                name: 'Jon' (type: String),
                                type: 1 / 2 / 69 {type: Number},
                                group: 'IT-6969' / undefined (type: String or undefined)
                              }
                            }
      */
      const body = {
        username: data.value.username,
        password: data.value.password
      }
      loading.value = true
      const trig = await fetch(loginUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'
      })
        .then((response) => {
          resp.value = response.json()
        })
        .then((response) => {
          loading.value = false
          console.log(resp.value)
          return resp.value
        })
        .catch((error) => {
          customError.value = error
          console.error(customError)
          return customError.value
        })
      const ret = await trig
      if (!isUndefined(ret.user_type)) {
        store.commit('updateUser', ret)
      }
      return ret
    }

    return {
      formRef,
      formValue,
      rules,
      loading,
      handleValidateClick (e) {
        e.preventDefault()
        formRef.value?.validate(async (errors) => {
          if (!errors) {
            const rez = await getUser(formValue)
            // console.log(await getUser(formValue))
            // console.log('rez', rez)
            if (!isUndefined(rez.user_type)) {
              // store.commit('updateUser', rez)
              message.info('Здравствуй, ' + rez.name)
              router.push({ path: '/' })
            } else {
              message.error('Такого пользователя не существует')
            }
          }
        })
      }
    }
  },
  computed: mapState(['style'])
}
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #97f7d6;
}
.container {
  display: flex;
  width: 1280px;
  justify-content: space-between;
  background-color: rgba(247, 245, 253, 0.6);
  padding: 70px 100px;
}
.placeForText {
  text-align: start;
}
.placeForText h1 {
  font-weight: 700;
  margin: 0;
  line-height: 90px;
  font-size: 64px;
}
.description {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  line-height: 32px;
  margin-top: 30px;
}
.description img {
  width: 300px;
}
.loginForm {
  min-width: 320px;
  margin-right: 70px;
  text-align: left;
}
.button {
  margin-top: 20px;
}
</style>
