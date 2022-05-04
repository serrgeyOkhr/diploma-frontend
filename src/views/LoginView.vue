<template>
  <n-message-provider>
    <div class="home">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <div class="container">
        <div class="placeForText">
          <h1>СГУВТ код</h1>
          <div class="description">
            <img src="../assets/logo_ssuwt.png" alt="logo_ssuwt">
            <span> Сервис создан студентами для студентов </span>
          </div>
        </div>
        <div class="loginForm">
          <n-form ref="formRef" :rules="rules" :model="formValue" action="#">
            <n-form-item label="Логин" path='login'>
              <n-input
                v-model:value="formValue.login"
                placeholder='Введите Логин'
                size='large'
              />
            </n-form-item>
            <n-form-item label='Пароль' path='password'>
              <n-input
                v-model:value="formValue.password"
                type='password'
                placeholder='Введите пароль'
                size='large'
              />
            </n-form-item>
            <n-button
              :block= true
              :bordered= false
              :color=style.colors.yellow
              text-color='#000000'
              @click='handleValidateClick'
              size='large'
              class='button'
            > Войти</n-button>
          </n-form>
      <!-- <pre>
        login: {{formValue.login}}
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
// @ is an alias to /src
// import ModalLogin from '@/components/ModalLogin.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { mapState, useStore } from 'vuex'
import { useMessage } from 'naive-ui'

export default {
  name: 'LoginView',
  components: {
    // ModalLogin
  },
  setup () {
    const loginUrl = 'http://127.0.0.1:5000/login'
    const message = useMessage()
    const store = useStore()
    const router = useRouter()
    const formRef = ref(null)
    const resp = ref(null)
    const customError = ref(null)
    const loading = ref(null)
    const formValue = ref({
      login: '',
      password: ''
    })
    const rules = ref({
      login: {
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
    function getUser (data) {
      /* ожидаемый return: {  responce: xxx (type: Number),
                              user: {
                                name: 'Jon' (type: String),
                                type: 1 / 2 / 69 {type: Number},
                                group: 'IT-6969' / undefined (type: String or undefined)
                              }
                            }
      */
      const body = {
        login: data.value.login,
        password: data.value.password
      }
      loading.value = true
      fetch(loginUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(async (response) => { resp.value = await response.json() })
        .then((response) => { loading.value = false })
        .catch((error) => {
          customError.value = error
          setTimeout(() => { loading.value = false }, 1000)
        })
      store.commit('updateUser', resp.value.user)
      return resp.value
    }

    function getStaticUser (data) {
      const Result = {
        response: 200,
        user: {
          name: 'Сергей Вячеславович',
          type: 1,
          group: 'ИТ-181'
        }
      }
      store.commit('updateUser', Result.user)
      return Result
    }
    function getStaticProf (data) {
      const Result = {
        response: 200,
        user: {
          name: 'Антон Денисович',
          type: 2,
          group: undefined
        }
      }
      store.commit('updateUser', Result.user)
      return Result
    }

    function getStaticAdmin (data) {
      const Result = {
        response: 200,
        user: {
          name: 'Админ Админович',
          type: 69,
          group: undefined
        }
      }
      store.commit('updateUser', Result.user)
      return Result
    }
    function getStaticErrorUser (data) {
      const Result = {
        response: 400,
        user: undefined
      }
      // store.commit('updateUser', Result.user)
      return Result
    }

    return {
      formRef,
      formValue,
      rules,
      loading,
      handleValidateClick (e) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            // const rez = getUser(formValue)
            // const rez = getStaticUser(formValue)
            const rez = getStaticProf(formValue)
            // const rez = getStaticAdmin(formValue)
            // const rez = getStaticErrorUser(formValue)
            if (rez.response === 200) {
              message.info('Здравствуй, ' + rez.user.name)
              router.push({ path: '/' })
            } else {
              message.error('Такого пользователя не существует')
            }
          }
        })
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {

  },
  computed: mapState([
    'style'
  ])
}

</script>

<style scoped>
.home{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #97F7D6;
}
.container{
  display: flex;
  width: 1280px;
  justify-content: space-between;
  background-color: rgba(247, 245, 253, .6);
  padding: 70px 100px;

}
.placeForText{
   text-align: start;
}
.placeForText h1{
  font-weight: 700;
  margin: 0;
  line-height: 90px;
  font-size: 64px;
}
.description{
  display: flex;
  flex-direction: column;
  font-size: 18px;
  line-height: 32px;
  margin-top: 30px;
}
.description img{
    width: 300px;
}
.loginForm{
  min-width: 320px;
  margin-right: 70px;
  text-align: left;
}
.button{
  margin-top: 20px;
}
</style>
