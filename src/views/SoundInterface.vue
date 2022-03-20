<script>
import axios from "axios";
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
      title: "",
      description: "",
      sequenceToPost: null,
    };
  },
  created: function () {},
  methods: {
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
    postSequence: function () {
      var savedSequence = localStorage.getItem(`sequence${this.sequenceToPost}`);
      var formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("audio_url", savedSequence);
      formData.append("audio_type", false);

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
    <h2>Sequence</h2>
    {{ sequence }}

    <div>
      <button v-if="sequence" v-on:click="playLoop(this.sequence)">Play</button>
    </div>
    <div class="notes">
      <button
        v-on:mousedown="startNote('C4')"
        @keydown.a="startNote('C4')"
        v-on:mouseup="stopNote('C4')"
        @keyup.a="stopNote('C4')"
      >
        C note
      </button>
      <button v-on:mousedown="startNote('D4')" v-on:mouseup="stopNote('D4')">D note</button>
      <!-- <button @keydown.d="startNote('D4')" @keyup.d="stopNote('D4')">Test note</button> -->
      <!-- stopping point for the night, need to research keyup/down for vue as 
      well as looking into making these as posts -->

      <button v-on:mousedown="startNote('E4')" v-on:mouseup="stopNote('E4')">E note</button>
      <button v-on:mousedown="startNote('F4')" v-on:mouseup="stopNote('F4')">F note</button>
      <button v-on:mousedown="startNote('G4')" v-on:mouseup="stopNote('G4')">G note</button>
      <button v-on:mousedown="startNote('A4')" v-on:mouseup="stopNote('A4')">A note</button>
      <button v-on:mousedown="startNote('B4')" v-on:mouseup="stopNote('B4')">B note</button>
      <button v-on:mousedown="startNote('C5')" v-on:mouseup="stopNote('C5')">C note</button>
    </div>
    <div>
      <button @click="saveSequence(1)">Save Sequence 1</button>
      <button @click="saveSequence(2)">Save Sequence 2</button>
      <button @click="clearSequence()">Clear Current Sequence</button>
    </div>
    <div>
      <button @click="playSavedSequence(1)">Saved Sequence 1</button>
      <button @click="playSavedSequence(2)">Saved Sequence 2</button>
    </div>
    <div>
      BPM:
      <input type="number" v-model="BPM" />
    </div>
    <div>
      <form v-on:submit.prevent="postSequence()">
        Title:
        <input type="text" v-model="title" />
        Description:
        <input type="text" v-model="description" />
        <select class="form-select" v-model="sequenceToPost">
          <option selected>Select Sequence</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
        <input type="Submit" value="Post" />
      </form>
    </div>
  </div>
</template>

<style></style>
