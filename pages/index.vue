<template>
  <div>
    <div class="mt-6">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">หัวข้อ</th>
              <th class="text-center">วันที่</th>
              <th class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">ขี้เกียจทำงานจังครับ</td>
              <td class="text-center">14-12-65</td>
              <td class="text-center">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="dialog = true">
                      <v-icon color="grey" class="mx-1"> mdi-book</v-icon>
                    </v-btn>
                  </template>
                  <span>ดูบันทึก</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" nuxt>
                      <v-icon color="red" class="mx-1"> mdi-minus</v-icon>
                    </v-btn>
                  </template>
                  <span>ลบบันทึก</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <!-- Detail Dialog -->
      <div>
        <v-dialog v-model="dialog" scrollable :overlay="false" max-width="800">
          <v-card height="780" class="pa-4">
            <v-card-text class="mt-4">
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    solo
                    prepend-inner-icon="mdi-pencil"
                    label="หัวข้อเรื่อง"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    solo
                    prepend-inner-icon="mdi-calendar"
                    label="วันที่"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-divider class="mt-n4 mb-6"></v-divider>

              <v-textarea
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
</template>

<script>
export default {
  name: 'IndexPage',

  data() {
    return {
      dialog: false,
    }
  },
}
</script>
<style lang="scss"></style>
