<template>
  <div>
    <div class="mainHeading">
      <h1>How well do you know {{ admin_name }}</h1>
    </div>

    <div class="inputForm">
      <div class="form-group">
        <label for="usr">Name:</label>
        <input v-model="pname" type="text" class="form-control" id="usr" />
      </div>
    </div>
    <div class="buttonSection">
      <button @click="submitName" class="buttonStyle">Get Started</button>
    </div>
    <div v-show="quizSection">
      <Quiz :player_name="pname" />
    </div>
    <div v-show="!quizSection">
      <div class="container">
        <table id="socreboard" class="table striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Rank</th>
              <th>{{ p_name }}</th>
              <th>{{ p_score }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import Quiz from "./QuizSection.vue";
import db from "../firebaseConfig";
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",

  data() {
    return {
      pname: "",
      pemail: "",
      admin_name: "",
      quizSection: false,
      p_score: 0,
      p_name: "",
    };
  },
  created() {
    this.Showblog();
    console.log("length", this.Showblog.length);
    this.ShowName();
  },
  components: {
    Quiz,
    // HelloWorld
  },
  methods: {
    submitName() {
      this.$store.state.player_name = this.pname;

      console.log(this.$store.state);
      localStorage.setItem("name", this.pname);
      this.quizSection = true;
    },
    Showblog() {
      db.collection("scoreboard")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, "test scoreboard => ", doc.data());
            if (doc.data().admin_id == this.$route.params.proId) {
              this.p_name = doc.data().player_name;
              this.p_score = doc.data().score;
            }
            console.log("proid", this.proId);
            console.log("document data", doc.data());
            console.log("length of scoreboard", doc.data().length);
          });
        });
    },
    ShowName() {
      db.collection("person")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, "test scoreboard => ", doc.data());
            this.admin_name = doc.data().admin_name;
          });
        });
    },
  },
};
</script>
<style scoped>
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1em;
}

.table {
  margin-top: 20px;
}

.table thead {
  background: #111;
  color: #fff;
}

.table tr th,
.table tr td:nth-child(odd) {
  text-align: center;
}

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
