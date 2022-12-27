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
                    v-model="note.date"
                    label="วันที่"
                    solo
                    prepend-inner-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="note.date"
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
          <v-btn dark @click="submit">
            <v-icon>mdi-arrow-up-bold</v-icon>
            บันทึก
          </v-btn>
        </v-card-actions>
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

    <!-- Snackbar -->
    <div>
      <v-snackbar v-model="isSuccessful" color="success" timeout="2000">
        บันทึกสำเร็จ

      </v-snackbar>

      <v-snackbar v-model="isFailed" color="red" timeout="2000">
        บันทึกไม่สำเร็จ
      </v-snackbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  middleware: "auth",
  data() {
    return {
      datePicker: false,
      note: {
        title: "",
        detail: "",
        date: new Date().toISOString().substr(0, 10),
      },
      isFailed: false,
      isSuccessful: false
    };
  },
  methods: {
    async submit() {
      try {
        await this.$store.dispatch("note/create", this.note);
        this.isSuccessful = true;
        this.note.title = "";
        this.note.detail = "";
        this.note.date = new Date().toISOString().slice(0, 10);
      } catch (error) {
        this.isFailed = true;
      }
    }
  }
};
</script>
<style lang="scss"></style>
