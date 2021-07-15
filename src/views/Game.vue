<template>
  <div>
    <div class="mainHeading">
      <h1>How well do you know {{ admin_name }}</h1>
    </div>
    <div class="gameLinkSection" v-show="linkUrl">
      <label for="game">Link</label>
      <input class="gameLink" id="game" type="text" v-model="game_id" />
      <button class="copyButton" @click="myFunction">Copy Link</button>
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
      <Quiz :player_name="admin_name" :pname="pname" />
    </div>
    <div v-show="!quizSection">
      <div class="container">
        <table id="socreboard" class="table striped">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in scoreBoard" :key="index">
            <tr>
              <th>{{ index }}</th>
              <th>Rank {{ index + 1 }}</th>
              <th>{{ item.player_name }}</th>
              <th>{{ item.score }}</th>
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
      game_id: "",
      linkUrl: true,
      scoreBoard: [],
      scoreBoardId: "",
      paramsId: this.$route.params.proId,
    };
  },
  created() {
    setTimeout(() => {
      this.linkUrl = false;
    }, 8000);
    this.Showblog();
    console.log("length", this.Showblog.length);
    this.ShowName();
    this.game_id = window.location.href;
    console.log(window.location.href);
  },
  components: {
    Quiz,
    // HelloWorld
  },
  methods: {
    myFunction() {
      var copyText = document.getElementById("game");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
    },
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

            this.scoreBoardId = doc.data().admin_id;
            console.log("scoreboard array", this.scoreBoard);
            if (doc.data().admin_id == this.$route.params.proId) {
              this.scoreBoard.push(doc.data());
              this.p_name = doc.data().player_name;
              this.p_score = doc.data().score;
            }
            // console.log("proid", this.proId);
            // console.log("document data", doc.data());
            // console.log("length of scoreboard", doc.data().length);
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
.copyButton {
  width: 100px;
  color: white;
  background-color: limegreen;
  height: 22px;
  font-size: 10px;
}
.gameLinkSection {
  display: flex;

  justify-content: center;
  margin-right: 10px;
}
.gameLink {
  width: 400px;
  height: 20px;
}
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
