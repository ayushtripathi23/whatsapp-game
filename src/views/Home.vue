<template>
  <div>
    <div class="mainHeading">
      <h1>How well do your friends know you?</h1>
    </div>
    <div class="listHeading">
      <ul style="list-style-type: disc">
        <li>Enter your name</li>
        <li>Answer 10 Questions about yourself.</li>
        <li>Share your quiz link with your friends.</li>
        <li>Your friends will try to answer your questions.</li>
        <li>Check the results at your quiz link!</li>
      </ul>
    </div>
    <div class="inputForm">
      <div class="form-group">
        <label for="usr">Name:</label>
        <input v-model="pname" type="text" class="form-control" id="usr" />
        <label for="usr">Email:</label>
        <input v-model="pemail" type="email" class="form-control" id="email" />
      </div>
    </div>
    <div class="buttonSection">
      <router-link to="/about">
        <button @click="submitName" class="buttonStyle">Get Started</button>
      </router-link>
    </div>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  data() {
    return {
      pname: "",
      pemail: "",
    };
  },
  components: {
    // HelloWorld
  },
  methods: {
    submitName() {
      this.$store.state.player_name = this.pname;
      this.$store.state.player_email = this.pemail;
      console.log(this.$store.state);
      localStorage.setItem("name", this.pname);
      localStorage.setItem("email", this.pemail);
    },
  },
};
</script>
<style scoped>
.mainHeading {
  display: flex;
  justify-content: center;
  color: blueviolet;
}
.buttonSection {
  display: flex;
  justify-content: center;
}
.buttonStyle {
  /* width: 30%; */
  background-color: #7b389d;
  color: #f7fcfc;
  height: 35px;
}
.listHeading {
  display: flex;
  justify-content: center;
  margin-right: 200px;
  color: black;
}
.inputForm {
  display: flex;
  justify-content: center;
}
.form-control {
  width: 500px;
}
@media screen and (max-width: 480px) {
  .form-control {
    width: 300px;
  }
}
</style>
