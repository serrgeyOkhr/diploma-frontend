<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <router-view/>
    </n-message-provider>
  </n-config-provider>
</template>

<script>
// import HeaderView from './components/Header.vue'
/**
   * Use this for type hints under js file
   * @type import('naive-ui').GlobalThemeOverrides
   */
export default {
  setup () {
    const themeOverrides = {
      // common: {
      //   primaryColor: '#FF0000'
      // },
      // hover: {
      //   border: '1px solid yellow'
      // },
      Input: {
        primaryColorHover: '#FF2222'
      },
      Select: {
        peers: {
          InternalSelection: {
            textColor: '#000000'
          }
        }
      }
      // ...
    }

    return {
      themeOverrides
    }
  },
  components: {
    // HeaderView
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.n-input__state-border{
  display: none;
}
.n-input__border{
  display: none;
}
</style>
