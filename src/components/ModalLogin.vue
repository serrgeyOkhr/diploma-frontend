<template>
  <n-modal preset="dialog" title="Dialog">
    <div>
        <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item
        path="login"
        label="Login"
        >
          <n-input
            v-model:value="model.login"
            type="text"
            placeholder="Логин"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input
            v-model:value="model.password"
            type="password"
            placeholder="Пароль"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                :disabled="(model.login === null || model.login === '') || (model.password === null || model.password === '')"
                round
                type="primary"
                @click="handleValidateButtonClick"
              >
                Validate
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </div>

  </n-modal>
</template>

<script>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
export default {
  name: 'ModalLogin',
  props: {
    linkPath: String
  },
  setup (props) {
    const formRef = ref(null)
    const message = useMessage()
    const modelRef = ref({
      status: props.linkPath,
      login: null,
      password: null
    })
    const rules = {
      login: [
        {
          required: true,
          validator (rule, value) {
            if (!value) {
              return new Error('Пожалуйста, введите логин')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      password: [
        {
          required: true,
          validator (rule, value) {
            if (!value) {
              return new Error('Введите пароль')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ]
    }
    return {
      formRef,
      message,
      // rPasswordFormItemRef,
      model: modelRef,
      rules,
      warning () {
      },
      createMessage (val) {
        message.error(val)
      },
      showModalStud: ref(false),
      showModalProf: ref(false)
    }
  },
  methods: {
    handleValidateButtonClick (e) {
      e.preventDefault()
      if (checkUser(JSON.stringify(this.model, null, 2))) {
        // redirect on page Student
        console.log(this.linkPath)
        this.$router.push({ path: '/' + this.linkPath })
      } else {
        this.createMessage('Такого пользователя не существует!')
        this.$router.push({ path: '/' })
        // redirect on page Home
      }
    }
  }
}
async function checkUser (data) {
  await console.log(data)
  // login check. Result is true or false
  const rez = true
  return rez
}
</script>

<style>

</style>
