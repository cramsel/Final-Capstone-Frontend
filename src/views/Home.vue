<script>
import axios from "axios";
import * as Tone from "tone";

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
  <div class="home" v-for="post in posts" v-bind:key="post.id">
    <a v-bind:href="`/posts/${post.id}`">
      <h2>{{ post.title }}</h2>
    </a>
    <div v-if="post.audio_type">
      <audio controls v-if="post.audio_url">
        <source v-bind:src="post.audio_url" />
      </audio>
    </div>
    <div v-else>
      <button @click="playLoop(post.audio_url)">Play Sequence</button>
    </div>
    <p>{{ post.description }}</p>
  </div>
</template>

<style></style>
