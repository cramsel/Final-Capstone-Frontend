<script>
import axios from "axios";

export default {
  data: function () {
    return {
      post: { user: {}, comments: [] },
    };
  },
  created: function () {
    this.getPostInfo();
  },
  methods: {
    getPostInfo: function () {
      // eslint-disable-next-line prettier/prettier
      axios.get(`/posts/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.post = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="Main Post">
    <a v-bind:href="`/users/${post.user.id}`">
      <p>{{ post.user.username }}</p>
    </a>
    <audio controls v-if="post.audio_url">
      <source v-bind:src="post.audio_url" />
    </audio>
    <h2>{{ post.title }}</h2>
    <p>{{ post.description }}</p>
  </div>
  <div class="Comment Section" v-for="comment in post.comments" v-bind:key="comment.id">
    <h3>{{ comment.user.username }}</h3>
    <p>{{ comment.body }}</p>
  </div>
</template>

<style></style>
