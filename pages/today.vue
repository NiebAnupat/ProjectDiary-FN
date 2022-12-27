<template>
  <div :class=" !$store.getters['note/todayNotes'].length>0 ? 'd-flex justify-center align-center' : ''"
       :style=" !$store.getters['note/todayNotes'].length>0 ? 'height: 85vh;' : ''">
    <div v-if="$store.getters['note/todayNotes'].length>0">
      <todayCard v-for="note in $store.getters['note/todayNotes']" :key="note.id" :note="note" />
    </div>
    <div v-else class="grey--text">
      <h2>ไม่พบบันทึกวันนี้</h2>
    </div>
  </div>
</template>

<script>
import todayCard from '~/components/todayCard.vue'
export default {
  middleware: 'auth',
  async asyncData ({ store }) {
    await store.dispatch('note/fetchTodayNotes', )
  },
  components: {
    todayCard,
  },
}
</script>
<style lang="scss"></style>
