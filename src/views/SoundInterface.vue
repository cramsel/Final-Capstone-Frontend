<script>
import axios from "axios";
import * as Tone from "tone";

export default {
  data: function () {
    return {
      sequence: [],
      holdTime: null,
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
  <div class="full-page">
    <h2>Sequence</h2>
    <p>{{ sequence }}</p>

    <div>
      <button
        class="btn btn-secondary"
        style="border-color: rgb(8, 48, 36) !important"
        v-if="sequence"
        v-on:click="playLoop(this.sequence)"
      >
        Play
      </button>
    </div>

    <div class="row row-notes">
      <div class="col">
        <button
          class="notes button"
          v-on:mousedown="startNote('C4')"
          @keydown.a="startNote('C4')"
          v-on:mouseup="stopNote('C4')"
          @keyup.a="stopNote('C4')"
        >
          C note
        </button>
      </div>
      <div class="col">
        <button class="notes button" v-on:mousedown="startNote('D4')" v-on:mouseup="stopNote('D4')">D note</button>
      </div>
      <div class="col">
        <button class="notes button" v-on:mousedown="startNote('E4')" v-on:mouseup="stopNote('E4')">E note</button>
      </div>
      <div class="col">
        <button class="notes button" v-on:mousedown="startNote('F4')" v-on:mouseup="stopNote('F4')">F note</button>
      </div>
      <div class="col">
        <button class="notes button" v-on:mousedown="startNote('G4')" v-on:mouseup="stopNote('G4')">G note</button>
      </div>
      <div class="col">
        <button class="notes button" v-on:mousedown="startNote('A4')" v-on:mouseup="stopNote('A4')">A note</button>
      </div>
      <div class="col">
        <button class="notes button" v-on:mousedown="startNote('B4')" v-on:mouseup="stopNote('B4')">B note</button>
      </div>
      <div class="col">
        <button class="notes button" v-on:mousedown="startNote('C5')" v-on:mouseup="stopNote('C5')">C note</button>
      </div>
    </div>

    <div class="save-sequence">
      <button class="btn btn-success" style="border-color: rgb(8, 48, 36) !important" @click="saveSequence(1)">
        Save Sequence 1
      </button>
      <button class="btn btn-success" style="border-color: rgb(8, 48, 36) !important" @click="saveSequence(2)">
        Save Sequence 2
      </button>
      <button class="btn btn-danger" style="border-color: rgb(8, 48, 36) !important" @click="clearSequence()">
        Clear Current Sequence
      </button>
    </div>

    <div style="padding: 10px">
      <button class="btn btn-secondary" style="border-color: rgb(8, 48, 36) !important" @click="playSavedSequence(1)">
        Saved Sequence 1
      </button>
      <button class="btn btn-secondary" style="border-color: rgb(8, 48, 36) !important" @click="playSavedSequence(2)">
        Saved Sequence 2
      </button>
    </div>

    <div>
      <form class="row form-sequence" v-on:submit.prevent="postSequence()">
        <div class="form-group">
          <label>Title:</label>
          <input class="form-control" type="text" v-model="title" />
        </div>
        <div class="form-group">
          Description:
          <input class="form-control" type="text" v-model="description" />
        </div>
        <div class="form-group">
          Select Sequence:
          <select class="form-control form-select" v-model="sequenceToPost">
            Select Sequence
            <!-- <option selected>Select Sequence</option> -->
            <option value="1">One</option>
            <option value="2">Two</option>
          </select>
        </div>
        <div style="text-align: center">
          <input class="btn btn-primary mt-3" type="Submit" value="Post" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.full-page {
  color: #bcecf0 !important;
  text-align: center;
}
.row-notes {
  margin: auto;
  width: 60%;
}
.notes {
  margin: auto;
  width: 50%;
  padding: 10px;
}
.form-sequence {
  text-align: left;
  width: 50%;
  margin: 0 auto;
}
.button {
  background-color: #04aa6d;
  border-color: rgb(8, 48, 36);
  border-radius: 50%;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  /* margin: auto; */
  width: 100%;
  height: 90%;
  /* padding: 100px; */
}

/* .drop-down {
  margin-left: 45%;
  max-width: 200px;
} */

.row-submits {
  max-width: 800px;
  padding-left: 100px;
  padding-right: 100px;
  margin: auto;
}
.inputs {
  text-align: left;
  padding-right: 100px;
  max-width: 100px;
}
</style>
