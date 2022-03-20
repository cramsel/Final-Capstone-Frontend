<script>
import axios from "axios";
import * as Tone from "tone";

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
    playLoop: function (audio_url) {
      const synth = new Tone.Synth().toDestination();
      const now = Tone.now();
      var startTime = 0;
      JSON.parse(audio_url).forEach((note) => {
        console.log(note);
        synth.triggerAttackRelease(note[0], note[1], now + startTime);
        startTime += note[1] + 0.1;
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
    <div v-if="post.audio_type">
      <audio controls v-if="post.audio_url">
        <source v-bind:src="post.audio_url" />
      </audio>
    </div>
    <div v-else>
      <button @click="playLoop(post.audio_url)">Play Sequence</button>
    </div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.description }}</p>
  </div>
  <div class="Comment Section" v-for="comment in post.comments" v-bind:key="comment.id">
    <h3>{{ comment.user.username }}</h3>
    <p>{{ comment.body }}</p>
  </div>
</template>

<style></style>
