<template>
  <div class="containerTaskSub">
    <div class="groupContainer">
      <div class="groupAddContainer">
        <div class="allGroupList"> компонент список</div>
        <div class="createGroup"> компонент форма</div>
      </div>
      <div class="groupChangeContainer">компонент форма, данные зависят от списка </div>
    </div>
    <div class="subjectContainer">
        <div class="subjectAddContainer">
          <div class="allSubjectList"> компонент список</div>
          <div class="createSubject"> компонент форма</div>
        </div>
        <div class="SubjectChangeContainer">компонент форма, данные зависят от списка </div>
    </div>
 </div>
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
import { useMessage } from 'naive-ui'
export default {
  name: 'create-persone',
  props: {
    personID: {
      type: Number,
      default: null
    }
  },
  setup (props) {
    const getUser = '/api/getUser'
    const resp = ref(null)
    const propsPersonID = toRef(props, 'personID')
    const isChange = ref(propsPersonID.value !== null)
    const message = useMessage()
    const formRef = ref(null)
    const formGroupValue = isChange.value
      ? getCurrentUser(propsPersonID)
      : ref({
        user: {
          name: '',
          type: null,
          group: undefined,
          login: '',
          password: ''
        }
      })
    const formSubjectValue = isChange.value
      ? getCurrentUser(propsPersonID)
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
    // const messages = {
    //   required: '%s is really really required'
    // }
    const groupRules = {
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
        } else {
          console.log(errors)
          message.error('Invalid')
        }
      })
    }

    function getCurrentUser (userID) {
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
          group: resp.value.group,
          login: resp.value.login,
          password: resp.value.password
        }
      })
    }
    return {
      isChange,
      formRef,
      formGroupValue,
      formSubjectValue,
      userTypeOptions,
      // messages,
      groupRules,
      handleValidateClick
    }
  }
}
</script>

<style scoped>
.containerTaskSub {
  /* width: 100%; */
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  border: 2px solid red;
}
.groupContainer {
  display: flex;
  border: 1px solid;
}
.subjectContainer {
  border: 1px solid rgb(107, 255, 107);
  display: flex;
}
</style>
