<template>
  <landing-page />
  <div class="container landing">
    <div class="row">
      <div class="col-3 col-sm-2 bg-light p-2 create">
        <b
          ><p class="text-center">
            <i class="fa fa-plus-square" aria-hidden="true"></i>
            Create Space
          </p>
          <hr />
        </b>
        <div v-for="user in interest" :key="user">
          <input
            type="checkbox"
            :value="user"
            @click="
              () => {
                add(user);
              }
            "
          />
          {{ user }}
          <hr />
        </div>
      </div>
      <div class="col-9 col-sm-7">
        <Post :currentUser="currentUser" />
      </div>
      <div class="col-3 border bg-white d-none d-sm-block">
        <div class="bg-white m-2 p-2">
          <p><input type="checkbox" /> Visit your feed</p>
          <hr />
          <p><input type="checkbox" /> Follow 5 more Spaces</p>
          <hr />
          <p><input type="checkbox" /> Update 5 more good pieces of content</p>
          <hr />
          <p><input type="checkbox" /> Ask a question</p>
          <hr />
          <p>
            <input type="checkbox" /> Add 5 credentitals where you live, work or
            study
          </p>
          <hr />
          <p><input type="checkbox" /> Answer a question</p>
          <hr />
        </div>
        <div class="bg-white m-2 shadow p-2">
          <b
            ><p class="text-center">Spaces followed</p>
            <hr />
          </b>
          <!-- {{result.interested}} -->
          <div v-for="intrests in mySpace" :key="intrests">
            <p>
              <img
                src="../assets/clement.jpg"
                alt=""
                class="postImg shadow rounded-circle"
              />{{ intrests }}
            </p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "../components/Post.vue";
import LandingPage from "../components/LandingPage.vue";
export default {
  components: { Post, LandingPage },
  mounted() {
    let store = JSON.parse(localStorage.getItem("Quora"));
    let result = store.find(
      (res) => Number(res.id) === Number(this.$route.params.id)
    );
    // console.log(result);
    this.currentUser = result;
    this.user = result;
    this.interest = result.spaces;
    this.mySpace = result.interested;
    this.followers = result.followers;
    this.bookmark = result.bookmark;
    // this.myInterested = result.interested
  },
  data() {
    return {
      user: "",
      mySpace: [],
      interest: [],
      followers: [],
      currentUser: {},
      bookmark: [],
    };
  },
  methods: {
    add(id) {
      let int = this.interest.find((res) => res === id);
      let store = JSON.parse(localStorage.getItem("Quora"));
      let result = store.find(
        (res) => Number(res.id) === Number(this.$route.params.id)
      );
      result.interested.push(int);
      this.mySpace.push(int);
      result.spaces.splice(id, 1);
      let index = store.indexOf(result);
      store[index] = result;

      localStorage.setItem("Quora", JSON.stringify(store));

      setTimeout(() => {
        let expire = this.interest.filter((int) => int !== id);
        this.interest = expire;
      }, 500);
    },
  },
};
</script>

<style>
body {
  background-color: rgba(235, 235, 235, 0.693) !important;
  box-sizing: border-box;
}
.postImg {
  height: 35px;
  width: 35px;
  margin-right: 10px;
}
.landing {
  margin-top: 100px !important;
}
.create {
  height: 550px;
}
@media (max-width: 460px) {
  /* .col7 {
    width: 300px !important;
  } */
}
</style>