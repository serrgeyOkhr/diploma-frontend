<template>
  <div class="container" v-if="rawRez">
  <!-- <pre> {{rawRez}} </pre> -->
  <h2>Решение</h2>
    <div class="rawCode">
      <CodeEditor
        theme="light"
        :key='Math.random()'
        :value="rawRez.code.code"
        font_size="16px"
        width="100%"
        min_height="55vh"
        :read_only="true"
        :wrap_code="true"
      > </CodeEditor>
    </div>
    <div class="outputBox">
      <Response :data='rawRez.error' />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { ref, toRaw, toRef } from '@vue/reactivity'
import { isNull } from 'lodash'
import CodeEditor from 'simple-code-editor'
import Response from './Response.vue'
import config from '@/config'
export default {
  name: 'detail-result',
  components: {
    CodeEditor,
    Response
  },
  props: {
    rezId: {
      type: Object,
      default: null
    }
  },
  setup (props) {
    const datailResultURL = config.hostname + config.api.getSolutionDetails
    const resp = ref(null)
    const customError = ref(null)
    const loading = ref(null)
    const resultID = toRef(props, 'rezId')
    const result = ref(null)
    const rawRez = ref(null)
    if (!isNull(resultID.value)) {
      console.log('я тут', resultID.value)
      getResult(resultID, rawRez)
    }
    // const result = getStaticResult(resultID.value.id)
    function getResult (resultID, rawRez) {
      /** ожидаемый return:
      * [
      *   {
      *     id: 1 (type: Number),
      *     deadline: TimeStamp (type: ????),
      *     subject: 'sub1' (type: String),
      *     name: 'title' (type: String),
      *     description: 'descript' (type: String),
      *     published: true / false (type: Boolean),
      *     group: 'IT-6969' (type: String),
      *     examples: [{}] (type: Object),
      *     done: true / false (type: Boolean)
      *   }
      * ]
      */
      // console.log(resultID.value)
      const body = {
        solution_id: resultID.value
      }
      // console.log('body = ', body)
      loading.value = true
      fetch(datailResultURL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(result => {
          console.log('result', result)
          rawRez.value = result
        })
        .catch((error) => {
          customError.value = error
        })
      return toRaw(resp.value)
    }
    // function getStaticResult (resultID) {
    //   console.log(resultID)
    //   const results = ref([
    //     {
    //       id: 1,
    //       failed_test: [[2, 6, 4], [4, -1, 8]],
    //       output: 'long code',
    //       code: "print('1')"
    //     },
    //     {
    //       id: 2,
    //       failed_test: [[2, 6, 4], [4, -1, 8]],
    //       output: null,
    //       code: "print('10')"
    //     },
    //     {
    //       id: 3,
    //       failed_test: null,
    //       output: null,
    //       code: "print('69')"
    //     }
    //   ])
    //   if (resultID) {
    //     return results.value.filter((el) => { return el.id === resultID })
    //   } else {
    //     return null
    //   }
    // }

    return {
      result,
      rawRez
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.outputBox {
  max-height: 22vh;
  overflow: auto;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid;
}

</style>
