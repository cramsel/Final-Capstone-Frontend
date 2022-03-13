<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
    };
  },
  created: function () {
    this.userInfo();
  },
  methods: {
    userInfo: function () {
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
    <p>{{ user.first_name }}</p>
    <p>{{ user.last_name }}</p>
    <p>{{ user.description }}</p>
  </div>
  <div class="Post" v-for="post in user.posts" v-bind:key="post.id">
    <h1>{{ post.title }}</h1>
    <p>{{ post.description }}</p>
  </div>
  <a v-bind:href="`/posts/new`">New Post</a>
</template>

<style></style>
