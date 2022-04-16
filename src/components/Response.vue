<template>
  <!-- <h1>hell</h1> -->
  <div v-if="status === 'passed'"  class="testResult">
    <h3 class="success"> Все тесты пройдены! </h3>
  </div>
  <div v-else-if="status === 'test_failed'"  class="testResult">
    <h3 class="error">Ошибка прохождения теста</h3>
    <pre>Входные параметры: {{ failed_test }}</pre>
  </div>
  <div v-else-if="status === 'runtime_error'"  class="testResult">
    <h3 class="error">Ошибка при запуске теста</h3>
    <pre>Входные параметры: {{ failed_test }}</pre>
    <pre>Output: {{output}} </pre>
  </div>
  <div v-else-if="status === 'compile_error'"  class="testResult">
    <h3 class="error">Ошибка компиляции</h3>
    <pre>Output: {{output}} </pre>
  </div>
  <div v-else-if="status === 'timeout'"  class="testResult">
    <h3 class="error">Превышен лимит времени</h3>
  </div>
  <div v-else-if="status === 'internal_error'"  class="testResult">
    <h3 class="error">Внутренняя ошибка сервера</h3>
  </div>
  <div v-else-if="String(data) === 'TypeError: NetworkError when attempting to fetch resource.'"  class="testResult">
    <h3 class="error">TypeError: NetworkError when attempting to fetch resource.</h3>
  </div>
  <div v-else class="testResult">
    Тут появится результат вашего решения
  </div>
  <!-- <pre> status: {{status}} </pre> -->
  <!-- Статусы (status):
  1: passed - Прошел все тесты
  2: test_failed - завален тест (+ failed_test)
  3: runtime_error - ошибка при запуске (+ output, failed_test)
  4: compile_error - ошибка компиляции (+ output??)
  5: timeout - ошибка времени
  6: internal_error - ошибка на сервере
   -->
</template>

<script>
export default {
  name: 'rsponce-view',
  props: {
    data: {
      type: Object
    }
  },
  data (props) {
    console.log(props.data)
    return {
      // response: JSON.parse(props.data),
      status: props.data ? props.data.status : '',
      output: props.data ? props.data.output : '',
      failed_test: props.data ? props.data.failed_test : ''
      // status: 'passed',
      // status: 'test_failed',
      // status: 'runtime_error',
      // status: 'compile_error',
      // status: 'timeout',
      // status: 'internal_error',
      // output: '...Fasfa;ksjfkasfk;a;ksfmas;gnjksdngkjh sjgnslkdns lknsdlkandvlkanvkandvkadn  ndknfakldnglkasnf',
      // failed_test: '5'
    }
  },
  methods: {

  }
}
</script>

<style>
.success{
  color: green;
}
.error {
  color: red;
}
</style>
