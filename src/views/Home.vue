<script>
import axios from "axios";

export default {
  data: function () {
    return {
      posts: [],
    };
  },
  created: function () {
    this.postIndex();
  },
  methods: {
    postIndex: function () {
      axios.get("/posts").then((response) => {
        console.log(response.data);
        this.posts = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="home" v-for="post in posts" v-bind:key="post.id">
    <h2>{{ post.title }}</h2>
    <p>{{ post.audio_url }}</p>
    <p>{{ post.description }}</p>
  </div>
</template>

<style></style>
