<script src="../store/Auth.js"></script>
<template>
  <v-app>
    <v-app-bar dark app>
      <v-toolbar-title class="mx-4"> My Diary</v-toolbar-title>

      <div class="mx-6">
        <v-btn text :disabled="!$store.getters['Auth/user']" to="/">บันทึกทั้งหมด</v-btn>
        <v-btn text :disabled="!$store.getters['Auth/user']" to="/today">บันทึกวันนี้</v-btn>
        <v-btn text :disabled="!$store.getters['Auth/user']" to="/record">เพิ่มบันทึกใหม่</v-btn>
      </div>

      <v-spacer></v-spacer>

      <client-only>
        <div v-if="$store.getters['Auth/user']">
          <label>{{ $store.getters["Auth/user"]?.displayName }}</label>
          <v-divider vertical class="pa-2"></v-divider>
          <v-btn text @click="logout"> ออกจากระบบ</v-btn>
        </div>
        <v-btn v-else text @click="loginDia = true"> เข้าสู่ระบบ</v-btn>
      </client-only>

    </v-app-bar>

    <!-- Login Dialog -->
    <div>
      <v-dialog v-model="loginDia" max-width="350">
        <v-card height="450" :loading="loginLoading" class="pa-4">
          <v-card-title class="d-flex justify-center">
            เข้าสู่ระบบ
          </v-card-title>

          <v-card-text class="mt-10">
            <!-- Input Email -->
            <v-text-field
              ref="loginEmail"
              prepend-inner-icon="mdi-email"
              v-model="email"
              label="อีเมล"
              @keydown.enter="login"
              required
            ></v-text-field>

            <!-- Input Password -->
            <v-text-field
              ref="loginPassword"
              prepend-inner-icon="mdi-lock"
              v-model="password"
              label="รหัสผ่าน"
              :rules="passwordRules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              @keydown.enter="login"
              required
            ></v-text-field>
          </v-card-text>

          <v-card-actions class="d-flex justify-center mt-6" >
            <v-btn block :disabled="password?.length < 8 || !email" color="black" class="white--text"  @click="login">เข้าสู่ระบบ</v-btn>
          </v-card-actions>

          <v-divider class="ma-5"></v-divider>

          <!-- Login Buttons -->
          <v-row class="mt-n8">
            <v-col cols="6">
              <v-card-actions class="d-flex justify-center">
                <v-btn text @click=";(forgetDia = true), (loginDia = false)"
                >ลืมรหัสผ่าน
                </v-btn
                >
              </v-card-actions>
            </v-col>
            <v-col cols="6">
              <v-card-actions class="d-flex justify-center">
                <v-btn text @click="(registerDia = true); (loginDia = false)"
                >สมัครสมาชิก
                </v-btn
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
        <v-card height="450" :loading="registerLoading" class="pa-4">
          <v-card-title class="d-flex justify-center">
            สมัครสมาชิก
          </v-card-title>

          <v-card-text class="mt-10">
            <!-- Input Name -->
            <v-text-field
              ref="registerName"
              prepend-inner-icon="mdi-account"
              v-model="username"
              label="ชื่อผู้ใช้"
              :rules="usernameRules"
              @keydown.enter="register"
              required
            ></v-text-field>

            <!-- Input Email -->
            <v-text-field
              ref="registerEmail"
              prepend-inner-icon="mdi-email"
              v-model="email"
              label="อีเมล"
              :rules="emailRules"
              @keydown.enter="register"
              required
            ></v-text-field>

            <!-- Input Password -->
            <v-text-field
              ref="registerPassword"
              prepend-inner-icon="mdi-lock"
              v-model="password"
              label="รหัสผ่าน"
              :rules="passwordRules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              @keydown.enter="register"
              required
            ></v-text-field>
          </v-card-text>

          <!-- Regiter Buttons -->

          <v-card-actions class="d-flex justify-center mt-10">
            <v-btn text  @click=";(registerDia = false), (loginDia = true)"
            >ยกเลิก
            </v-btn
            >
            <v-spacer></v-spacer>
            <v-btn text :disabled="!username || !email || password?.length < 8" @click="register">ตกลง</v-btn>
          </v-card-actions>

          <v-card-actions class="d-flex justify-center"></v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- Forget Pass Dialog -->
    <div>
      <v-dialog v-model="forgetDia" max-width="350">
        <v-card height="450" :loading="forgotLoading" class="pa-4">
          <div class="d-flex">
            <v-card-actions>
              <v-btn icon  @click=";(forgetDia = false), (loginDia = true)"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn
              >
            </v-card-actions>
            <v-card-title class="mx-12"> ลืมรหัสผ่าน</v-card-title>
          </div>

          <v-card-text class="mt-10">
            <label>กรุณาใส่อีเมลที่ใช้ลงทะเบียน</label>
            <v-text-field
              class="mt-16"
              prepend-inner-icon="mdi-email"
              v-model="fgEmail"
              label="อีเมล"
              :rules="emailRules"
              @keydown.enter="resetPassword"
              required
            ></v-text-field
            >
          </v-card-text>
          <v-card-actions>
            <v-btn color="black" block :disabled="!fgEmail" @click="resetPassword" class="white--text mt-16">ยืนยัน</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- Pages -->
    <v-main>
      <v-container  >
        <nuxt  />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Defaultlayout",

  data() {
    return {
      loginDia: false,
      loginLoading: false,
      registerDia: false,
      registerLoading: false,
      forgetDia: false,
      forgotLoading: false,
      show1: false,
      username: "",
      email: "",
      password: "",
      fgEmail: "",
      usernameRules: [(v) => !!v || "กรุณาใส่ชื่อผู้ใช้"],
      emailRules: [
        (v) => !!v || "กรุณาใส่อีเมล",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "อีเมลไม่ถูกต้อง"
      ],
      passwordRules: [
        (v) => !!v || "กรุณาใส่รหัสผ่าน",
        (v) => (v && v.length >= 8) || "รหัสผ่านต้องมีอย่างน้อย 8 ตัว"
      ],

      user: {
        name: "NamkheangV"
      }
    };
  },

  methods: {
    async login() {
      this.loginLoading = true;
      const user = {
        email: this.email,
        password: this.password
      };
      if (await this.$store.dispatch("Auth/loginWithEmailAndPassword", user)) {
        this.loginLoading = false;
        this.$swal({
          title: "เข้าสู่ระบบสำเร็จ",
          type: "success",
          timer: 2000,
          showConfirmButton: false
        });
        this.loginDia = false;

      } else {
        this.loginLoading = false;
        this.$swal({
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
          type: "error",
          timer: 2000,
          showConfirmButton: false
        });
      }
      this.clearText();
      this.$refs.loginEmail.focus()
      this.$refs.loginPassword.reset()
    },

    async register() {
      if (this.username != "" && this.email != "" && this.password.length >= 8) {
        this.registerLoading = true;
        const user = {
          email: this.email,
          password: this.password,
          displayName: this.username
        };
        if (await this.$store.dispatch("Auth/registerWithEmail", user)) {
          this.registerLoading = false;
          this.$swal({
            title: "สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ",
            type: "success",
            timer: 2000,
            showConfirmButton: false
          });
          this.registerDia = false;
          this.clearText();
          return;
        }
      }
      this.registerLoading = false;
      this.$swal({
        title: "สมัครสมาชิกไม่สำเร็จ",
        text: "ข้อมูลไม่ถูกต้อง หรืออีเมลนี้มีผู้ใช้แล้ว",
        type: "error",
        timer: 2000,
        showConfirmButton: false
      });
      this.clearRegister();
    },

    async resetPassword() {
      this.forgotLoading = true;
      if (this.fgEmail != "") {
        if (await this.$store.dispatch("Auth/resetPassword", this.fgEmail)) {
          this.forgotLoading = false;
          this.$swal({
            title: "ส่งอีเมลสำเร็จ",
            text: "กรุณาตรวจสอบอีเมลของคุณ",
            type: "success",
            timer: 2000,
            showConfirmButton: false
          });
          this.forgetDia = false;
          this.clearText();
          return;
        }
      }
      this.forgotLoading = false;
      this.$swal({
        title: "ส่งอีเมลไม่สำเร็จ",
        text: "กรุณาตรวจสอบอีเมลของคุณ",
        type: "error",
        timer: 2000,
        showConfirmButton: false
      });
      this.clearText();
    },

    async logout() {

      // confirm logout dialog
      this.$swal({
        title: "ต้องการออกจากระบบ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่"
      }).then(async (result) => {
        if (result.value) {
          await this.$store.dispatch("Auth/logout");
          this.$swal({
            title: "ออกจากระบบสำเร็จ",
            type: "success",
            timer: 2000,
            showConfirmButton: false
          });
          await this.$router.replace("/");
        }
      });
    },

    clearText() {
      this.username = "";
      this.email = "";
      this.password = "";
      this.fgEmail = "";
    },

    clearRegister() {
      this.username = "";
      this.email = "";
      this.password = "";
      this.$refs.registerName.reset()
      this.$refs.registerEmail.reset()
      this.$refs.registerPassword.reset()
      this.$refs.registerName.focus()
    },
  }
};
</script>
<style lang="scss"></style>
