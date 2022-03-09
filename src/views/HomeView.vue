<template>
  <div class="home">
    <div class="topBar">Некий текст, возможно понадобится</div>
    <div class="content">
      <div class="side">
          <MDBBtn
          tag="a"
          to="/stud"
          color="primary"
          >
            <router-link
            to="/stud"
            >
          Студент
            </router-link>
          </MDBBtn>

        <!-- <RouteLink text="Я студент" link="/stud"/> -->
      </div>
      <div class="side">
        <RouteLink text="Я преподаватель" link="/prof"/>
      </div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import RouteLink from '@/components/RouteLink.vue'
import { MDBBtn } from 'mdb-vue-ui-kit'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld,
    RouteLink,
    MDBBtn
  }
}
</script>

<style scoped>
.home{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content{
  display: flex;
  height: 100vh;
}
.topBar{
  width: 100%;
}
.side{
  width: 50%;
  background-color: rgb(221, 255, 243);
  border:  1px solid rgb(152, 255, 152);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
