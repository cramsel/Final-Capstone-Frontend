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
    makeNote: function () {
      console.log("Test");
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease(this.lastNote, this.time);
    },
    playLoop: function (sequence) {
      const synth = new Tone.Synth().toDestination();
      const now = Tone.now();
      var startTime = 0;
      sequence.forEach((note) => {
        console.log(note);
        synth.triggerAttackRelease(note[0], note[1], now + startTime);
        startTime += note[1] + 0.1;
      });
    },
    startNote: function (note) {
      console.log("startNote");
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
      this.lastNote = note;
      this.sequence.push([this.lastNote, this.time]);
    },
    saveSequence: function (seqNum) {
      localStorage.setItem(`sequence${seqNum}`, JSON.stringify(this.sequence));
    },
    clearSequence: function () {
      this.sequence = [];
    },
    playSavedSequence: function (seqNum) {
      var savedSequence = JSON.parse(localStorage.getItem(`sequence${seqNum}`));
      this.playLoop(savedSequence);
    },
  },
};
</script>

<template>
  <h2>Sequence</h2>
  {{ sequence }}
  <div>
    <button v-if="lastNote" v-on:click="makeNote()">Test</button>
  </div>
  <div>
    <button v-if="sequence" v-on:click="playLoop(this.sequence)">Play</button>
  </div>
  <div class="notes">
    <button v-on:mousedown="startNote('C4')" v-on:mouseup="stopNote('C4')">C note</button>
    <button v-on:mousedown="startNote('D4')" v-on:mouseup="stopNote('D4')">D note</button>
    <button v-on:mousedown="startNote('E4')" v-on:mouseup="stopNote('E4')">E note</button>
    <button v-on:mousedown="startNote('F4')" v-on:mouseup="stopNote('F4')">F note</button>
    <button v-on:mousedown="startNote('G4')" v-on:mouseup="stopNote('G4')">G note</button>
    <button v-on:mousedown="startNote('A4')" v-on:mouseup="stopNote('A4')">A note</button>
    <button v-on:mousedown="startNote('B4')" v-on:mouseup="stopNote('B4')">B note</button>
    <button v-on:mousedown="startNote('C5')" v-on:mouseup="stopNote('C5')">C note</button>
  </div>
  <div>
    <button @click="saveSequence(1)">Save Sequence</button>
    <button @click="clearSequence()">Clear Sequence</button>
  </div>
  <div>
    <button @click="playSavedSequence(1)">Saved Sequence 1</button>
  </div>
  <div>
    BPM:
    <input type="number" v-model="BPM" />
  </div>
</template>

<style></style>
