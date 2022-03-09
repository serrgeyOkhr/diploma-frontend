<template>
  <h1>Hello Student</h1>
  <RouteLink text="Назад" link="/" />
</template>

<script>
import RouteLink from '@/components/RouteLink.vue'
export default {
  name: 'StudView',
  components: {
    RouteLink
  }
}
</script>
