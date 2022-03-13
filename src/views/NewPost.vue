<script>
import axios from "axios";

export default {
  data: function () {
    return {
      title: "",
      description: "",
      audioUrl: "",
    };
  },
  created: function () {},
  methods: {
    setFile: function () {
      if (event.target.files.length > 0) {
        this.audioUrl = event.target.files[0];
      }
    },
    newPost: function () {
      var formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("audio_file", this.audioUrl);

      axios.post("/posts", formData).then((response) => {
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
      <input type="text" v-model="title" />
      Description:
      <input type="text" v-model="description" />
      Audio:
      <input type="file" v-on:change="setFile($event)" ref="audioUrl" />
      <input type="Submit" value="Post" />
    </form>
  </div>
</template>
