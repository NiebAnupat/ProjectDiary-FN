<template>
  <div>
    <v-card class="mt-4 pa-4" height="800">
      <!-- Head -->
      <div class="d-flex">
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-text-field
                solo
                prepend-inner-icon="mdi-pencil"
                label="หัวข้อเรื่อง"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-menu
                v-model="datePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="วันที่"
                    solo
                    prepend-inner-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="datePicker = false"
                  scrollable
                  dark
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="mt-n6">
          <v-spacer></v-spacer>
          <v-btn dark @click=";(fail = false), (success = true)">
            <v-icon>mdi-arrow-up-bold</v-icon>
            บันทึก
          </v-btn>
        </v-card-actions>
      </div>

      <v-divider class="mt-n4 mb-4"></v-divider>

      <!-- Body -->
      <v-card-text>
        <v-textarea
          label="รายละเอียด"
          placeholder="รายละเอียด"
          solo
          counter
          rows="22"
        ></v-textarea>
      </v-card-text>
    </v-card>

    <!-- Snackbar -->
    <div>
      <v-snackbar v-model="success" color="success" timeout="3000">
        บันทึกสำเร็จ
        <template v-slot:action="{ attrs }">
          <v-btn text color="white" v-bind="attrs" @click="success = false">
            ปิด
          </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar v-model="fail" color="red" timeout="3000">
        บันทึกไม่สำเร็จ
        <template v-slot:action="{ attrs }">
          <v-btn text color="white" v-bind="attrs" @click="fail = false">
            ปิด
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  data() {
    return {
      success: false,
      fail: false,
      date: null,
      datePicker: false,
    }
  },
}
</script>
<style lang="scss"></style>
