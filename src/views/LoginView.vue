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
    const message = useMessage()
    const store = useStore()
    const router = useRouter()
    const formRef = ref(null)
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
    function checkUser (data) {
      const dataToServer = {
        login: data.value.login,
        password: data.value.password
      }
      console.log(dataToServer)
      const Result = {
        response: 200,
        // user: {
        //   name: 'Антон Денисович',
        //   type: 2,
        //   group: undefined
        // }
        user: {
          name: 'Сергей Вячеславович',
          type: 1,
          group: 'ИТ-181'
        }
      }
      store.commit('updateUser', Result.user)
      // localStorage.setItem('User', JSON.stringify(store.state.user))
      return Result
    }

    return {
      formRef,
      formValue,
      rules,
      handleValidateClick (e) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (errors) {
            console.log(errors)
          } else {
            const rez = checkUser(formValue)
            if (rez.response === 200) {
              message.info('Здравствуй, ' + rez.user.name)
              console.log('hello')
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
