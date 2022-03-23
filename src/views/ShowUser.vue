<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      currentUser: null,
    };
  },
  created: function () {
    this.userInfo();
  },
  methods: {
    userInfo: function () {
      this.currentUser = parseInt(localStorage.getItem("user_id"));
      axios.get(`/users/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.user = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="User">
    <h1>{{ user.username }}</h1>
    <p>{{ user.first_name }} {{ user.last_name }}</p>
    <p>{{ user.description }}</p>
  </div>
  <div class="Post" v-for="post in user.posts" v-bind:key="post.id">
    <h1>{{ post.title }}</h1>
    <p>{{ post.description }}</p>
    <div v-if="post.audio_type">
      <audio controls v-if="post.audio_url">
        <source v-bind:src="post.audio_url" />
      </audio>
    </div>
    <div v-else>
      <button
        class="btn btn-secondary"
        style="border-color: rgb(8, 48, 36) !important"
        @click="playLoop(post.audio_url)"
      >
        Play Sequence
      </button>
    </div>
  </div>
  <div v-if="this.$route.params.id == currentUser">
    <a v-bind:href="`/posts/new`">New Post</a>
  </div>
</template>

<style scoped>
* {
  color: #bcecf0 !important;
  text-align: center;
}
</style>
