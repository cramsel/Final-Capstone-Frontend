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
  <div class="home">
    <div class="row">
      <div v-for="post in posts" v-bind:key="post.id" class="col-sm-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <a v-bind:href="`/posts/${post.id}`" style="color: rgb(10, 77, 57); text-decoration: none">
                <h2>{{ post.title }}</h2>
              </a>
            </h5>
            <div class="card-text">
              <div class="audio" v-if="post.audio_type">
                <audio controls v-if="post.audio_url">
                  <source v-bind:src="post.audio_url" />
                </audio>
              </div>
              <div class="audio" v-else>
                <button @click="playLoop(post.audio_url)">Play Sequence</button>
              </div>
              <p>{{ post.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-for="post in posts" v-bind:key="post.id">
    <div class="card">
      <div class="card-body">
        <a class="card-title" v-bind:href="`/posts/${post.id}`" style="color: rgb(10, 77, 57); text-decoration: none">
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
        <p class="card-text">{{ post.description }}</p>
      </div>
    </div>
  </div> -->
  </div>
</template>

<style>
/* .a {
  color: rgb(10, 77, 57);
  width: 300px;
  padding: 1em 1.5em;
  text-decoration: none;
} */

* {
  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
}

.col-sm-3 {
  padding-bottom: 20px;
  margin: auto;
  /* margin-right: 10px; */
}

body {
  background: #0b3c49;
}

.card {
  box-shadow: 10px 10px 15px -2px rgba(8, 17, 10, 1);
  background-color: #c2f9bb;
  align-items: center;
  min-height: 200px;
  max-height: 200px;
}
.card-text {
  width: 300px;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.audio {
}
</style>
