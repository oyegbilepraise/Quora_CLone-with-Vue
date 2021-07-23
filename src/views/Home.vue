<template>
  <div class="cont bg-white shadow p-3 mt-4">
    <div>
      <img src="../assets/quora.png" class="w-25 quora_logo" alt="" />
      <p class="text-center">
        A Place to share knowledge and better understand the world
      </p>
      <p></p>
    </div>
    <div class="row mt-4">
      <div class="col-5">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi,
        dolorem fuga debitis consequatur, alias odio cum id exercitationem
        molestias commodi, sint voluptate quas libero voluptatum aut quod velit
        explicabo maxime. <br />
        <button class="btn btn-primary text-white mt-3">
          <router-link to="/register" class="text-white">
            Register
          </router-link>
        </button>
      </div>
      <div class="col-1 line border"></div>
      <div class="col-6">
        <p>Login</p>
        <hr />
        <label for="">Email</label>
        <input
          type="text"
          class="form-control mt-2"
          @blur="v$.email.$touch"
          name=""
          placeholder="your email"
          v-model="email"
        />
        <small v-if="v$.email.$error" class="text-danger">
          {{ v$.email.$errors[0].$message }}
        </small>
        <br />
        <label for="" class="mt-4">Password</label>
        <input
          type="text"
          class="form-control mt-2"
          @blur="v$.password.$touch"
          name=""
          placeholder="your password"
          v-model="password"
        />
        <small v-if="v$.password.$error" class="text-danger">
          {{ v$.password.$errors[0].$message }}
        </small>
        <br />
        <p class="mt-4">
          Forget password?
          <span class="mx-5 bg-primary text-white p-2 login_btn" @click="Login"
            >Login</span
          >
        </p>
      </div>
    </div>
    <div class="container-fluid">
      <div class="border text-center">
        <p>
          New:
          <span class="text-primary"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius,
            molestias.</span
          >
        </p>
        <hr />
        <p class="">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque animi
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      email: "",
      password: "",
            arr: []
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    Login() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let store = JSON.parse(localStorage.getItem("Quora"));
        let result = store.find(
          (res) => res.email === this.email && res.password === this.password
        );
        if (result) {
          this.arr.push({email: this.email, password: this.password})
          localStorage.setItem('QuoraLogin', JSON.stringify(this.arr))
          this.$router.push(`/Quora/${result.id}`);
        }
      } else {
        alert("failed to validate");
      }
    },
  },
};
</script>

<style>
body {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  background-image: url(../assets/bgimg.png);
  background-size: cover;
  box-sizing: border-box;
}
.cont {
  width: 55%;
  margin: auto;
}
.quora_logo {
  position: relative;
  margin-left: 40%;
}
.login_btn {
  border-radius: 30px;
}
.line {
  width: 1px !important;
  border-right: none !important;
  border-top: none !important;
  border-bottom: none !important;
}
@media (max-width: 768px) {
  .cont {
    width: 100% !important;
  }
}
</style>