<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newPostInfo: {},
    };
  },
  created: function () {},
  methods: {
    newPost: function () {
      axios.post("/posts", this.newPostInfo).then((response) => {
        console.log(response.data);

        this.$router.push("/");
      });
    },
  },
};
</script>

<template>
  <div>
    <h2>New Post</h2>
    <form v-on:submit.prevent="newPost()">
      Name:
      <input type="text" v-model="newPostInfo.title" />
      Description:
      <input type="text" v-model="newPostInfo.description" />
      Audio:
      <input type="text" v-model="newPostInfo.audio_url" />
      <input type="Submit" value="Post" />
    </form>
  </div>
</template>
