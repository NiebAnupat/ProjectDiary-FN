<template>
  <div>
    <v-card class="mt-4 pa-4" height="800">
      <!-- Head -->
      <div class="d-flex">
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="note.title"
                solo
                prepend-inner-icon="mdi-pencil"
                label="หัวข้อเรื่อง"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="note.date"
                label="วันที่"
                solo
                readonly
                prepend-inner-icon="mdi-calendar"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <v-divider class="mt-n4 mb-4"></v-divider>

      <!-- Body -->
      <v-card-text>
        <v-textarea
          v-model="note.detail"
          label="รายละเอียด"
          placeholder="รายละเอียด"
          solo
          counter
          rows="22"
        ></v-textarea>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {

  props:{
    note: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      date: null,
      datePicker: false,

      diary: {
        id: 1,
        title: 'วันอากาศดีๆ ที่ไม่มีเธออยู่',
        date: '2022-12-15',
        detail:
          '         ค่ำคืนมีหมู่ดาวมากมาย แต่ฉันเห็นแค่เพียงเธอตลอดมา ซึ่งเธอก็ไม่มีฉันเลยในสายตา แม้รู้เราต่างกันเพียงใด แม้รู้เธอมีใครที่เธอต้องการ แต่อยากทุ่มเททุก ๆ อย่างให้รู้ไป',
      },
    }
  },
}
</script>
<style lang="scss"></style>
