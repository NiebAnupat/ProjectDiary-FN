<template>
  <div>
    <todayCard />
  </div>
</template>

<script>
import todayCard from '~/components/todayCard.vue'
export default {
  name: 'IndexPage',
  middleware: 'auth',
  components: {
    todayCard,
  },
}
</script>
<style lang="scss"></style>
