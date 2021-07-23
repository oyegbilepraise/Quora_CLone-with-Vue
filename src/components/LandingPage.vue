<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top">
    <div class="container bg-white">
      <a class="navbar-brand" href="#">
        Quora_P
        <!-- <img src="../assets/quora.png" class="quora_logo" alt="" /> -->
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"></li>
          <li class="nav-item">
            <router-link to="/" class="nav-link active"
              ><i class="fa fa-home fa-2x text-danger" aria-hidden="true"></i
            ></router-link>
          </li>
          <li
            class="nav-item"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style="cursor: pointer"
          >
            <p class="nav-link">Drafts</p>
          </li>
          <li
            style="cursor: pointer"
            class="nav-item"
            data-bs-toggle="modal"
            data-bs-target="#Backdrop"
          >
            <p class="nav-link">Bookmarks</p>
          </li>
          <li class="nav-item" data-bs-toggle="modal" data-bs-target="#drop">
            <p class="nav-link">Followings</p>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link"
              ><i class="fa fa-bell fa-2x" aria-hidden="true"></i
            ></router-link>
          </li>
          <li class="nav-item">
            <input
              type="text"
              class="form-control nav-link mt-1"
              placeholder="Search here..."
              name=""
              id=""
            />
          </li>
          <li class="nav-item">
            <i class="fa fa-globe fa-2x nav-link" aria-hidden="true"></i>
          </li>
          <li class="nav-item">
            <button class="btn btn-danger btn-sm text-white mt-1 nav-link">
              Add a question
            </button>
          </li>
        </ul>
        <button class="btn btn-danger btn-sm text-white" @click="Logout">
          Logout
        </button>
      </div>
    </div>
  </nav>

  <!-- Draft-Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-for="(draft, id) in myDraft" :key="draft">
            {{ draft.postedBy }} {{ draft.time }}
            <p>
              {{ draft.content }}
              <button>Edit</button>
              <button @click="postDraft(id)">Post</button>
              <button @click="deleteDraft(id)">Delete</button>
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Bookmark Modal -->
  <div
    class="modal fade"
    id="Backdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <b><p class="text-center">Bookmarks</p> </b>
          <hr />
          <div v-for="(book, index) in bookmark" :key="index">
            <p>{{ index + 1 }} - {{ book.content }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Bookmark Modal -->
  <!-- Bookmark Modal -->
  <div
    class="modal fade"
    id="drop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <b><p class="text-center">Followers</p> </b>
          <hr />
          <div v-for="follower in followers" :key="follower">
            {{ follower }}
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Bookmark Modal -->
</template>


<script>
export default {
  data() {
    return {
      currentUser: {},
      myDraft: [],
      bookmark: [],
    };
  },

  mounted() {
    let store = JSON.parse(localStorage.getItem("Quora"));
    let result = store.find(
      (res) => Number(res.id) === Number(this.$route.params.id)
    );
    this.currentUser = result;
    this.myDraft = result.Drafts;
    this.bookmark = result.bookmark;
    console.log(this.myDraft);
    console.log(this.currentUser);
  },

  methods: {
    Logout() {
      console.log("ksdbfkjlsfbuij");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.navbar {
  height: 60px;
}
/* ul {
  margin-left: -1000px;
} */
.nav-item {
  margin-left: 20px;
}
.quora_logo {
  width: 8%;
}
</style>
