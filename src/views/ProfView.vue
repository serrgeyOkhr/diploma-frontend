<template>
  <h1>Hello Professor</h1>
  <RouteLink text="Назад" link="/" />
</template>

<script>
import RouteLink from '@/components/RouteLink.vue'
export default {
  name: 'ProfView',
  components: {
    RouteLink
  }
}
</script>
