<template>
  <div>
    <todayCard />
    <todayCard />
  </div>
</template>

<script>
import todayCard from '@/components/todayCard.vue'
export default {
  name: 'IndexPage',

  components: {
    todayCard,
  },

  data() {
    return {}
  },
}
</script>
<style lang="scss"></style>
