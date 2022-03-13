<script>
import * as Tone from "tone";

export default {
  data: function () {
    return {
      sequence: [],
    };
  },
  created: function () {},
  methods: {
    makeC: function () {
      console.log("Test");
      // const synth = new Tone.Synth().toDestination();
      // this.note = synth.triggerAttackRelease("C4", "8n");
      this.sequence.push(["C4", "8n"]);
    },
    playLoop: function () {
      console.log("test");
    },
  },
};
</script>

<template>
  <h2>Sequence</h2>
  {{ sequence }}
  <div>
    <button v-on:click="makeC()">Test</button>
  </div>
  <div>
    <button v-on:click="playLoop()">Play</button>
  </div>
</template>

<style></style>
