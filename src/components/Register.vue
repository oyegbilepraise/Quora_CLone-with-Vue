<template>
  <div class="cont">
    <div class="body w-100 shadow rounded p-3">
      <p class="text-center h5">SignUp</p>
      <div class="row mx-1">
        <div class="col-6">
          <label for="">Username: </label>
          <div>
            <i class="fa fa-user my-4"></i>
            <input
              type="text"
              @blur="v$.user.Username.$touch"
              placeholder="username "
              v-model="user.Username"
              class="mb-3 w-100"
            /><br />
            <small v-if="v$.user.Username.$error" class="text-danger">
              {{ v$.user.Username.$errors[0].$message }} </small
            ><br />
            <label for="">Email: </label>
            <div>
              <i class="fa fa-mail-bulk my-4"></i>
              <input
                type="email"
                placeholder="email"
                @blur="v$.user.email.$touch"
                v-model="user.email"
                class="mb-3 w-100"
              /><br />
              <small v-if="v$.user.email.$error" class="text-danger">
                {{ v$.user.email.$errors[0].$message }}
              </small>
            </div>
            <label for="">Password: </label>
            <div>
              <i class="fa fa-key my-4" aria-hidden="true"></i>
              <input
                type="password"
                @blur="v$.user.password.$touch"
                placeholder="password"
                v-model="user.password"
                class="mb-3 w-100"
              /><br />
              <small v-if="v$.user.password.$error" class="text-danger">
                {{ v$.user.password.$errors[0].$message }}
              </small>
            </div>
            <label for="">Confirm Password: </label>
            <div>
              <i class="fa fa-key my-4" aria-hidden="true"></i>
              <input
                type="password"
                @blur="v$.user.cPassword.$touch"
                placeholder="comfirm password"
                class="mb-3 w-100"
                v-model="user.cPassword"
              /><br />
              <small v-if="v$.user.cPassword.$error" class="text-danger">
                {{ v$.user.cPassword.$errors[0].$message }}
              </small>
            </div>
            <button
              @click="register"
              class="btn btn-sm btn-primary shadow text-white my-3 form-control"
            >
              Signup
            </button>
            <span>Already Register!</span>
            <button class="btn btn-primary mx-5 text-white">
              <router-link class="text-white" to="/">Signin</router-link>
            </button>
          </div>
        </div>
        <div class="col-6">
          <div>
            <video
              class="w-100 vdImg"
              src="../assets/bc0e95417e2c8d0930199f0b46eed3da27587ea4.webm"
              autoplay
              loop
            ></video>
          </div>
        </div>
      </div>
      <fieldset class="p-4"></fieldset>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      user: {
        Username: "",
        email: "",
        password: "",
        cPassword: "",
        post: [],
        interested: [],
        spaces: [],
        followers: [],
      },
      allUsers: [],
    };
  },
  validations() {
    return {
      user: {
        Username: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        cPassword: { required, sameAs: sameAs(this.user.password) },
      },
    };
  },
  methods: {
    register() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.user.password === this.user.cPassword) {
          this.allUsers.push({
            id: Math.floor(Math.random() * 100000),
            Username: "@" + this.user.Username,
            email: this.user.email,
            password: this.user.password,
            cPassword: this.user.cPassword,
            followers: [],
            bookmark: [],
            spaces: [
              "Tech",
              "Science",
              "Religion",
              "Art $ Science",
              "ICT",
              "Politics",
              "UI / UX",
              "Web Development",
              "Food",
            ],
            interested: [],
            post: [],
            Drafts: [],
          });

          if (localStorage.getItem("Quora") === null) {
            localStorage.setItem("Quora", JSON.stringify(this.allUsers));
          } else {
            let local = JSON.parse(localStorage.getItem("Quora"));
            local.push(...this.allUsers);
            localStorage.setItem("Quora", JSON.stringify(local));
          }
          (this.user.Username = ""),
            (this.user.email = ""),
            (this.user.password = ""),
            (this.user.cPassword = "");
          this.allUsers = [];
          this.$router.push(`/`);
        }
      }
    },
  },
};
</script>

<style scoped>
.body {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  background-color: white;
  /* display: flex; */
  margin: auto;
  margin-top: 5%;
}
input {
  padding-left: 30px;
  border: none;
  border-bottom: 2px inset grey;
  outline: none;
  background-color: inherit;
  margin-top: 20px;
  border-radius: none !important;
}
.fa {
  position: absolute;
  /* top: 10px; */
}
@media (max-width: 768px) {
  .body {
    width: 100% !important;
  }
}
</style>