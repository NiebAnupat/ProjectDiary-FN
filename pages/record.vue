<template>
  <div>
    <v-card class="mt-4 pa-4" height="800">
      <v-card-text>
        <v-row>
          <v-col cols="8">
            <v-text-field label="หัวข้อเรื่อง"></v-text-field>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text>บันทึก</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  data() {
    return {}
  },
}
</script>
<style lang="scss"></style>
