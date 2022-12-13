<template>
  <v-app>
    <v-app-bar dark>
      <v-toolbar-title class="mx-4"> My Diary </v-toolbar-title>

      <div class="mx-6">
        <v-btn text>หน้าหลัก</v-btn>
        <v-btn text>บันทึก</v-btn>
      </div>

      <v-spacer></v-spacer>

      <div v-if="isAuth">
        <label>NamkheangV</label>
        <v-divider vertical class="pa-2"></v-divider>
        <v-btn text @click="logout"> ออกจากระบบ </v-btn>
      </div>
      <div v-else>
        <v-btn text @click="loginDia = true"> เข้าสู่ระบบ </v-btn>
      </div>
    </v-app-bar>

    <!-- Login Dialog -->
    <div>
      <v-dialog v-model="loginDia" max-width="350">
        <v-card height="450" class="pa-4">
          <v-card-title class="d-flex justify-center">
            เข้าสู่ระบบ
          </v-card-title>

          <v-card-text class="mt-10">
            <!-- Input Email -->
            <v-text-field
              prepend-inner-icon="mdi-email"
              v-model="email"
              label="อีเมล"
              required
            ></v-text-field>

            <!-- Input Password -->
            <v-text-field
              prepend-inner-icon="mdi-lock"
              v-model="password"
              label="รหัสผ่าน"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-card-text>

          <v-card-actions class="d-flex justify-center mt-6">
            <v-btn block dark v-on:click="login">เข้าสู่ระบบ</v-btn>
          </v-card-actions>

          <v-divider class="ma-5"></v-divider>

          <!-- Login Buttons -->
          <v-row class="mt-n8">
            <v-col cols="6">
              <v-card-actions class="d-flex justify-center">
                <v-btn text>ลืมรหัสผ่าน</v-btn>
              </v-card-actions>
            </v-col>
            <v-col cols="6">
              <v-card-actions class="d-flex justify-center">
                <v-btn text @click=";(registerDia = true), (loginDia = false)"
                  >สมัครสมาชิก</v-btn
                >
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </div>

    <!-- Register Dialog -->
    <div>
      <v-dialog v-model="registerDia" max-width="350">
        <v-card height="450" class="pa-4">
          <v-card-title class="d-flex justify-center">
            สมัครสมาชิก
          </v-card-title>

          <v-card-text class="mt-10">
            <!-- Input Name -->
            <v-text-field
              prepend-inner-icon="mdi-email"
              v-model="username"
              label="ชื่อผู้ใช้"
              required
            ></v-text-field>

            <!-- Input Email -->
            <v-text-field
              prepend-inner-icon="mdi-email"
              v-model="email"
              label="อีเมล"
              required
            ></v-text-field>

            <!-- Input Password -->
            <v-text-field
              prepend-inner-icon="mdi-lock"
              v-model="password"
              label="รหัสผ่าน"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-card-text>

          <!-- Regiter Buttons -->
          <v-row>
            <v-col cols="6">
              <v-card-actions class="d-flex justify-center">
                <v-btn text @click=";(registerDia = False), (loginDia = true)"
                  >ยกเลิก</v-btn
                >
              </v-card-actions>
            </v-col>

            <v-col cols="6">
              <v-card-actions class="d-flex justify-center">
                <v-btn text>ตกลง</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </div>

    <!-- Pages -->
    <v-container class="ma-auto" style="height: 95%">
      <nuxt class="ml-10 pb-5" />
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'Defaultlayout',

  data() {
    return {
      loginDia: false,
      registerDia: false,
      show1: false,
    }
  },

  computed: {
    isAuth() {
      return this.$store.getters['Auth/isAuth']
    },
  },

  methods: {
    async login() {
      if (this.id != '' && this.password != '') {
        await this.$store.dispatch('Auth/setAuthTrue')
        this.loginDia = false
      } else {
        this.$store.dispatch('Auth/setAuthFalse')
      }
    },

    async logout() {
      await this.$store.dispatch('Auth/setAuthFalse')
    },
  },
}
</script>
<style lang="scss"></style>
