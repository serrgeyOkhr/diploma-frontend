<template>
  <h1>code here</h1>
  <div class="container">
    <n-form class="codeForm">
      <!-- <n-form-item path="textareaValue"> -->
        <n-input
          class="giantTextarea"
          placeholder="Textarea"
          type="textarea"
          :autosize="{
            minRows: 20,
            maxRows: 20
          }"
        />
      <!-- </n-form-item> -->
    </n-form>
    <div class="results">Ответ</div>
    <div class="takerButton">
      <n-button>Отправить</n-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'code-taker'
}
</script>

<style scoped>
.codeForm{
  border: 1px solid;
  padding: 0;
  margin: 0;
  margin-bottom: 30px;
  box-shadow: 0px 2px 4px -1px #000;
}
.giantTextarea{
  padding: 0;
  margin: 0;
}
/* .giantTextarea:hover{
  border: 1px solid blue;
} */
.container{
  width: 100%;
  text-align-last: left;
  /* background-color: #ccc; */
}
.results{
  min-height: 10vh;
  padding: 10px;
  border: 1px solid;
}
</style>
