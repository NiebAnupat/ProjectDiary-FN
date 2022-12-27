<template>
  <div :class=" !$store.getters['Auth/user'] ? 'd-flex justify-center align-center' : ''"
       :style=" !$store.getters['Auth/user'] ? 'height: 85vh;' : ''">
    <client-only>
      <div v-if="$store.getters['Auth/user']">
        <!-- Search -->
        <div class="mt-8">
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="6"></v-col>
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              label="ค้นหาบันทึก"
              single-line
              class="mb-4"
            ></v-text-field>
          </v-row>
        </div>

        <div class="mt-6 ">
          <!-- Table -->
          <v-data-table
            :headers="headers"
            :items="$store.getters[`note/notes`]"
            :search="search"
            class="elevation-1 pa-3"
            :loading="$store.getters[`note/isLoading`]"

            loading-text="กำลังโหลดข้อมูลบันทึก"
            no-data-text="ไม่พบข้อมูลบันทึก"
            no-results-text="ไม่พบข้อมูลบันทึกที่ค้นหา"
            caption="บันทึกของฉัน"
          >
            <template v-slot:item.actions="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    nuxt
                    @click="showDetail(item)"
                  >
                    <v-icon color="grey" class="mx-1"> mdi-book</v-icon>
                  </v-btn>
                </template>
                <span>รายละเอียด</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    nuxt
                    @click="deleteNote(item)"
                  >
                    <v-icon color="grey" class="mx-1"> mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>ลบบันทึก</span>
              </v-tooltip>

            </template>


          </v-data-table>
          <div class="text-center mt-6">
            <v-btn text color="grey" @click="deleteAll">
              <v-icon>mdi-delete-sweep-outline</v-icon>
              ลบบันทึกทั้งหมด
            </v-btn>
          </div>

          <!-- Detail Dialog -->
          <div>
            <v-dialog v-model="dialog" :overlay="false" max-width="800">
              <v-card height="780" class="pa-4">
                <v-card-text class="mt-4">
                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        v-model="selected.title"
                        solo
                        prepend-inner-icon="mdi-pencil"
                        label="หัวข้อเรื่อง"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="selected.date"
                        solo
                        prepend-inner-icon="mdi-calendar"
                        label="วันที่"
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-divider class="mt-n4 mb-6"></v-divider>

                  <v-textarea
                    v-model="selected.detail"
                    label="รายละเอียด"
                    placeholder="รายละเอียด"
                    solo
                    rows="20"
                    readonly
                  ></v-textarea>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </div>

      <div v-else class="grey--text">
        <h2>กรุณาเข้าสู่ระบบ</h2>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "IndexPage",

  data() {
    return {
      dialog: false,
      search: null,

      headers: [
        {
          text: "หัวข้อ",
          align: "start",
          value: "title",
          class: "text-center"
        },
        {
          text: "วันที่",
          align: "center",
          value: "date",
          class: "text-center",
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "actions",
          class: "text-center",
          width: "20%"
        }
      ],

      selected: {
        id: null,
        title: null,
        date: null,
        detail:null
      }
    };
  },
  methods:{
    showDetail(note){
      this.selected = note
      this.dialog = true
    },
    deleteNote(note){
      // confirm delete dialog
     this.$swal({
        title: 'คุณต้องการลบบันทึกนี้ใช่หรือไม่?',
        text: "คุณจะไม่สามารถกู้คืนบันทึกนี้ได้หากลบแล้ว",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ลบบันทึกนี้!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch(`note/deleteNote`, note)
          this.dialog = false
          this.$swal(
            'ลบบันทึกเรียบร้อยแล้ว!',
            'บันทึกของคุณถูกลบแล้ว',
            'success'
          )
        }
      })
    },
    deleteAll(){
      // confirm delete dialog
     this.$swal({
        title: 'ต้องการลบบันทึกทั้งหมดใช่หรือไม่?',
        text: "คุณจะไม่สามารถกู้คืนบันทึกได้หากลบแล้ว",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ลบบันทึกทั้งหมด!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch(`note/deleteAllNotes`)
          this.$swal(
            'ลบบันทึกทั้งหมดเรียบร้อยแล้ว!',
            'บันทึกของคุณถูกลบแล้ว',
            'success'
          )
        }
      })
    }
  }
};
</script>
<style lang="scss"></style>
