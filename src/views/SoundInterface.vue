<script>
import * as Tone from "tone";

export default {
  data: function () {
    return {
      sequence: [],
      holdTime: null,
      BPM: 60,
      synth: null,
      startTime: null,
      endTime: null,
      time: "",
      lastNote: "",
    };
  },
  created: function () {},
  methods: {
    // setBPM: function () {},
    noteDuration: function () {
      console.log("test");
    },
    //this is the stopping point for the night, for some reason this plays an A
    //instead of a B or a C
    makeNote: function () {
      console.log("Test");
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease(this.lastNote, this.time);
    },
    playLoop: function () {
      console.log("test");
    },
    startNote: function (note) {
      console.log("startNote");
      // const synth = new Tone.Synth().toDestination();
      // this.note = synth.triggerRelease(["C4", "8n"]);
      const synth = new Tone.Synth().toDestination();
      const now = Tone.now();
      // trigger the attack immediately
      synth.triggerAttack(note, now);
      this.synth = synth;
      this.startTime = new Date();
    },
    stopNote: function (note) {
      console.log("stopNote");
      const now = Tone.now();
      this.synth.triggerRelease(now);
      this.endTime = new Date();
      this.time = (this.endTime - this.startTime) / 1000;
      console.log(this.time);
      console.log(note);
      this.sequence.push([this.lastNote, this.time]);
    },
  },
};
</script>

<template>
  <h2>Sequence</h2>
  {{ sequence }}
  <div>
    <button v-on:click="makeNote()">Test</button>
  </div>
  <div>
    <button v-on:click="playLoop()">Play</button>
  </div>
  <div>
    <button v-on:mousedown="startNote('C4')" v-on:mouseup="stopNote('C4')">C note</button>
  </div>
  <div>
    <button v-on:mousedown="startNote('B4')" v-on:mouseup="stopNote('B4')">B note</button>
  </div>
  <div>
    BPM:
    <input type="number" v-model="BPM" />
  </div>
</template>

<style></style>
