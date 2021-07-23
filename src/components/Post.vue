<template>
  <landing-page />
  <div class="Postmsg bg-light shadow p-3">
    <img src="../assets/clement.jpg" alt="" class="postImg rounded-circle" />
    Welcome to Quora {{ currentUser.Username }}
    <textarea
      v-model="postMsg"
      placeholder="What is your question or Link??"
      class="form-control my-2"
    ></textarea>
    <select v-model="selected" class="form-control">
      <option
        v-for="intrest in currentUser.interested"
        :key="intrest"
        :value="intrest"
      >
        {{ intrest }}
      </option>
    </select>
    <div class="d-flex mt-3">
      <button @click="post" class="mx-3 btn btn-success btn-sm form-control">
        Post
      </button>
      <button
        @click="saveToDraft"
        class="btn btn-danger mx-3 btn-sm form-control"
      >
        saveAsDraft
      </button>
    </div>
  </div>

  <!-- <div v-for="(draft, id) in myDraft" :key="draft">
    {{ draft.postedBy }} {{ draft.time }}
    <p>
      {{ draft.content }}
      <button>Edit</button>
      <button @click="postDraft(id)">Post</button>
      <button @click="deleteDraft(id)">Delete</button>
    </p>
  </div> -->

  <div
    v-for="(post, id) in myPosts"
    :key="id"
    class="post my-2 bg-white shadow"
  >
    <img src="../assets/clement.jpg" alt="" class="postImg rounded-circle" />
    <b> ___ posted by {{ post.postedBy }}</b>
    <b
      ><i class="text-primary"> ___@ {{ post.type }} </i>
      <i class="fa fa-bookmark text-primary book" @click="bookMarks(id)"></i>
      <button
        class="btn text-primary follow"
        @click="followUser(id)"
        v-if="currentUser.Username !== post.postedBy"
      >
        Follow
      </button>
    </b>
    <p>
      <b
        ><p>{{ post.content }}</p></b
      >
      Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
      minus ullam eius repellat molestias magni dolores voluptate natus est,
      harum aperiam quisquam aliquam rem deleniti omnis? Ab maiores porro
      reprehenderit! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Eos, repellendus. Rerum quasi voluptatum nulla animi, delectus aperiam
      consequuntur nemo et dolorem aliquam sunt ipsa assumenda sequi maxime ad
      error blanditiis! <br /><br />
      <i class="fas fa-thumbs-up fa-2x text-primary" @click="likeFunc(id)">{{
        post.likes
      }}</i>
    </p>
    <div v-for="(comment, index) in post.comment" :key="index">
      <i>Commented by___{{ comment.by }}</i
      ><br />
      <h4>{{ comment.commentContent }}</h4>
    </div>
    <input
      type="text"
      placeholder="coment here..."
      v-model="comment[id]"
      class="styInp w-75"
    />
    <button @click="commentFunc(id)" class="btn btn-primary m-1">
      Comment
    </button>
  </div>
</template>

<script>
export default {
  props: ["currentUser"],
  data() {
    return {
      selected: "testt",
      postMsg: "",
      followers: [],
      myPosts: [],
      myDraft: [],
      bookMark: [],
      comment: [],
      like: true,
      dislike: true,
      front: true,
      likeDislike: "Like",
    };
  },

  mounted() {
    let store = JSON.parse(localStorage.getItem("Quora"));
    let res = store.filter(
      (res) => Number(res.id) === Number(this.$route.params.id)
    );
    this.myDraft = res[0].Drafts;
    res = res.map((info) => info.interested);
    res = res[0];
    let array = [];
    for (let a = 0; a < store.length; a++) {
      const element = store[a].post;
      // console.log(element);
      for (let b = 0; b < element.length; b++) {
        const elem = [element[b]];
        // console.log(elem);
        for (let c = 0; c < res.length; c++) {
          const elm = res[c];
          // console.log(elm);

          let a = elem.filter((val) => val.type === elm);
          if (a.length > 0) {
            array.push(...a);
          }
        }
      }
    }
    this.myPosts = array;
  },

  methods: {
    post() {
      let store = JSON.parse(localStorage.getItem("Quora"));
      let result = store.find(
        (res) => Number(res.id) === Number(this.$route.params.id)
      );
      let date = new Date();
      let time = date.toLocaleTimeString();
      result.post.unshift({
        type: this.selected,
        content: this.postMsg,
        time: time,
        postedBy: this.currentUser.Username,
        id: result.post.length + 1,
        comment: [],
        likes: 0,
      });
      let index = store.indexOf(result);
      store[index] = result;
      localStorage.setItem("Quora", JSON.stringify(store));
      this.myPosts.unshift({
        type: this.selected,
        content: this.postMsg,
        time: time,
        postedBy: this.currentUser.Username,
        likes: 0,
      });
    },

    saveToDraft() {
      let store = JSON.parse(localStorage.getItem("Quora"));
      let result = store.find(
        (res) => Number(res.id) === Number(this.$route.params.id)
      );
      let date = new Date();
      let time = date.toLocaleTimeString();
      result.Drafts.push({
        type: this.selected,
        content: this.postMsg,
        time: time,
        postedBy: this.currentUser.Username,
      });
      let index = store.indexOf(result);
      store[index] = result;
      localStorage.setItem("Quora", JSON.stringify(store));

      this.myDraft.unshift({
        type: this.selected,
        content: this.postMsg,
        time: time,
        postedBy: this.currentUser.Username,
      });
    },

    postDraft(id) {
      let value = this.myDraft.find((val, index) => index === id);
      let store = JSON.parse(localStorage.getItem("Quora"));
      let result = store.find(
        (res) => Number(res.id) === Number(this.$route.params.id)
      );
      let date = new Date();
      let time = date.toLocaleTimeString();
      result.post.unshift({
        type: value.type,
        content: value.content,
        time: time,
        postedBy: this.currentUser.Username,
      });
      let index = store.indexOf(result);
      store[index] = result;
      localStorage.setItem("Quora", JSON.stringify(store));

      this.myPosts.unshift({
        type: value.type,
        content: value.content,
        time: time,
        postedBy: this.currentUser.Username,
      });
      result.Drafts.splice(id, 1);
      index = store.indexOf(result);
      store[index] = result;
      localStorage.setItem("Quora", JSON.stringify(store));

      let v = this.myDraft.filter((val, ind) => ind !== id);
      this.myDraft = v;
    },

    deleteDraft(id) {
      let v = this.myDraft.filter((val, ind) => ind !== id);
      this.myDraft = v;
      let store = JSON.parse(localStorage.getItem("Quora"));
      let result = store.find(
        (res) => Number(res.id) === Number(this.$route.params.id)
      );
      result.Drafts.splice(id, 1);
      let index = store.indexOf(result);
      store[index] = result;
      localStorage.setItem("Quora", JSON.stringify(store));
    },

    commentFunc(id) {
      let date = new Date();
      let time = date.toLocaleTimeString();
      let d = this.myPosts.find((val, ind) => ind === id);
      let owner = d.postedBy;
      let identity = d.id;
      if (this.currentUser.Username !== owner) {
        let store = JSON.parse(localStorage.getItem("Quora"));
        let postOwner = store.find((res) => res.Username === owner);

        let post = postOwner.find((val) => val.id === identity);
        post.comment.unshift({
          commentContent: this.comment[id],
          time: time,
          by: this.currentUser.Username,
        });

        let ind = store.indexOf(postOwner);
        store[ind] = postOwner;
        localStorage.setItem("Quora", JSON.stringify(store));
      } else {
        let d = this.myPosts.find((val, ind) => ind === id);
        let identity = d.id;
        let store = JSON.parse(localStorage.getItem("Quora"));
        let result = store.find(
          (res) => res.Username === this.currentUser.Username
        );
        let post = result.post.find((val) => val.id === identity);
        post.comment.unshift({
          commentContent: this.comment[id],
          time: time,
          by: this.currentUser.Username,
        });

        let index = store.indexOf(post);
        store[index] = post;
        localStorage.setItem("Quora", JSON.stringify(store));
      }
      let key = this.myPosts.find((val, ind) => ind === id);
      key.comment.unshift({
        commentContent: this.comment[id],
        time: time,
        by: this.currentUser.Username,
      });
      this.comment[id] = undefined;
    },

    likeFunc(id) {
      let d = this.myPosts.find((val, ind) => ind === id);
      let owner = d.postedBy;
      let identity = d.id;
      if (this.currentUser.Username !== owner) {
        if (this.like === true) {
          let store = JSON.parse(localStorage.getItem("Quora"));
          let postOwner = store.find((res) => res.Username === owner);

          let post = postOwner.find((val) => val.id === identity);
          post.likes++;

          let ind = store.indexOf(postOwner);
          store[ind] = postOwner;
          localStorage.setItem("Quora", JSON.stringify(store));
          this.like = false;
        } else if (this.likes === false) {
          let store = JSON.parse(localStorage.getItem("Quora"));
          let postOwner = store.find((res) => res.Username === owner);

          let post = postOwner.find((val) => val.id === identity);
          post.likes--;

          let ind = store.indexOf(postOwner);
          store[ind] = postOwner;
          localStorage.setItem("Quora", JSON.stringify(store));
          this.like = true;
        }
      } else {
        if (this.dislike === true) {
          let disp = this.myPosts.find((val, ind) => ind === id);
          let ident = disp.id;
          let store = JSON.parse(localStorage.getItem("Quora"));
          let result = store.find(
            (res) => res.Username === this.currentUser.Username
          );
          let post = result.post.find((val) => val.id === ident);
          post.likes++;

          let index = store.indexOf(post);
          store[index] = post;
          localStorage.setItem("Quora", JSON.stringify(store));
          this.likeDislike = "Dislike";
          this.dislike = false;
        } else if (this.dislike === false) {
          let disp = this.myPosts.find((val, ind) => ind === id);
          let ident = disp.id;
          let store = JSON.parse(localStorage.getItem("Quora"));
          let result = store.find(
            (res) => res.Username === this.currentUser.Username
          );
          let post = result.post.find((val) => val.id === ident);
          post.likes--;

          let index = store.indexOf(post);
          store[index] = post;
          localStorage.setItem("Quora", JSON.stringify(store));
          this.likeDislike = "Like";
          this.dislike = true;
        }
      }
      if (this.front === true) {
        let key = this.myPosts.find((val, ind) => ind === id);
        key.likes++;
        this.front = false;
      } else if (this.front === false) {
        let key = this.myPosts.find((val, ind) => ind === id);
        key.likes--;
        this.front = true;
      }
    },

    followUser(id) {
      let d = this.myPosts.find((val, ind) => ind === id);
      let owner = d.postedBy;
      let store = JSON.parse(localStorage.getItem("Quora"));
      let postOwner = store.find((res) => res.Username === owner);
      if (postOwner.followers.includes(this.currentUser.Username)) {
        postOwner.followers;
        alert("Already following this User");
      } else {
        postOwner.followers.push(this.currentUser.Username);
      }
      let index = store.indexOf(postOwner);
      store[index] = postOwner;
      localStorage.setItem("Quora", JSON.stringify(store));
      this.followers.push(this.currentUser.Username);
    },

    bookMarks(id) {
      let d = this.myPosts.find((val, ind) => ind === id);
      let owner = this.currentUser.Username;
      let store = JSON.parse(localStorage.getItem("Quora"));
      let postOwner = store.find((res) => res.Username === owner);
      let post = postOwner.bookmark.filter(
        (val) => val.content === d.content && val.time === d.time
      );
      if (post.length === 0) {
        postOwner.bookmark.unshift({
          content: d.content,
          by: d.postedBy,
          time: d.time,
          type: d.type,
        });
        let ind = store.indexOf(postOwner);
        store[ind] = postOwner;
        localStorage.setItem("Quora", JSON.stringify(store));
        this.bookMark.unshift({
          content: d.content,
          by: d.postedBy,
          time: d.time,
          type: d.type,
        });
      }
    },
  },
};
</script>

<style scoped>
.Postmsg {
  padding: 5px;
  outline: none;
}
.post {
  padding: 20px;
}
.postImg {
  height: 35px;
  width: 35px;
}
.styInp {
  border: 0;
  border-bottom: 2px solid grey;
  padding: 10px;
  margin: 10px;
  outline: none;
}
.follow {
  font-family: cursive;
  font-style: italic;
}
.book {
  margin-left: 130px;
}

@media (max-width: 768px) {
  .book {
    margin-left: 40px;
  }
}
</style>