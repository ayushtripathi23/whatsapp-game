<template>
  <div v-show="closeQuizSection">
    <h1>{{ getName }}'s Quiz</h1>
    <h3>Select an answer for each of the following question-</h3>

    <div class="container-fluid">
      <div class="modal-dialog">
        <div
          class="modal-content"
          v-for="(question, objIndex) in firebaseData"
          :key="objIndex"
        >
          <div class="modal-header">
            <h3>{{ question.question }}</h3>
          </div>
          <div class="modal-body">
            <div class="col-xs-3 5"></div>
            <div class="quiz" id="disable-click" data-toggle="buttons">
              <label
                v-for="(row, index) in question.options"
                :key="index"
                class="element-animation1 btn btn-lg btn-danger btn-block"
                id="label-button"
                @click="handleAnswerClick(question.options[index].isCorrect)"
              >
                <input
                  type="text"
                  style="width: 100%; border-radius: 1rem; color: black"
                  :value="question.options[index].answerText"
                  readonly
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="submitButtonDiv">
        <button
          class="submitButton"
          data-toggle="modal"
          data-target="#myModal"
          @click="submitScore"
        >
          Submit Answer
        </button>
      </div>
      <div class="container">
        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Your Score</h4>
              </div>
              <div class="modal-body">
                <p>
                  your score is {{ score }} / {{ this.firebaseData.length }}
                </p>
              </div>
              <div class="modal-footer bottomButton">
                <router-link to="/" style="text-decoration: none">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Create Your Own
                  </button>
                </router-link>
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  @click="!closeQuizSection"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "../firebaseConfig";

export default {
  props: ["player_name"],
  data() {
    return {
      pname: "",
      rows: [{ select: 1, name: "ayush" }],
      questionsList: [],
      answer: "",
      newInput: "",
      correctAnswer: "",
      closeQuizSection: true,
      score: 0,
      proId: "",
      firebaseData: "",
      checkid: this.$route.params.proId,
    };
  },
  created() {
    // console.log(this.getQuestions);
    this.questionsList = this.getQuestions;
    console.log(this.questionsList);
    console.log(this.$route.params.proId);
    this.Showblog();
    console.log("proid", this.proId);
    console.log("check id", this.checkid);
  },
  computed: {
    getQuestions() {
      return this.$store.state.questionBank;
    },
    getName() {
      return this.$store.state.player_name
        ? this.$store.state.player_name
        : localStorage.getItem("name");
    },
  },
  methods: {
    Showblog() {
      db.collection("person")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, "test 0 => ", doc.data().questions);
            if (doc.id == this.checkid) {
              this.firebaseData = doc.data().questions;
              console.log("under if", this.firebaseData);
            }

            this.proId = doc.id;
            console.log("proid", this.proId);
          });
        });
    },
    submitScore() {
      console.log(this.questionsList);
      const data = {
        score: this.score,
        admin_id: this.checkid,
        player_name: this.player_name,
      };
      db.collection("scoreboard")
        .add(data)
        .then((doc) => {
          console.log("Document successfully written!");
          console.log(doc.id);
        })
        .then(() => {
          console.log("form submitted", data);
          console.log("id", this.proId);
        })

        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    handleAnswerClick(isCorrect) {
      console.log(isCorrect);
      if (isCorrect) {
        this.score = this.score + 1;
        localStorage.setItem("score", this.score);
        console.log("check score", this.score);
      }
      var cor = (document.getElementById("label-button").style.background =
        "lightgreen");
      var cor1 = (document.getElementById("disable-click").style.pointerEvents =
        "none");
      console.log(cor, cor1);
    },
    rightAnswer(index, object) {
      console.log(index, object);
      const condition = (object.isCorrect = true);
      console.log("consition => ", condition, object);
      this.correctAnswer = object;
    },
  },
};
</script>
<style scoped>
.bottomButton {
  display: flex;
  justify-content: space-between;
}
.submitButtonDiv {
  display: flex;
  justify-content: center;
}
.submitButton {
  width: 500px;
  background-color: green;
  height: 30px;
  color: white;
  border-radius: 1rem;
  margin-bottom: 40px;
}
.deleteButton {
  color: white;
  background-color: green;
  border-radius: 1rem;
  margin-top: 10px;
}
.addButton {
  width: 80%;
  background-color: green;
  border-radius: 1rem;
  margin-top: 10px;
  margin-left: 50px;
  color: white;
  font-weight: 600;
}
label.btn {
  padding: 18px 60px;
  white-space: normal;
  /* -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -o-transform: scale(1);
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -o-transition-duration: 0.3s; */
  transform: scale(1);
}

label.btn:hover {
  text-shadow: 0 3px 2px rgba(0, 0, 0, 0.4);
  /* -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1); */
  transform: scale(1.1);
}

label.btn-block {
  text-align: left;
  position: relative;
}

label .btn-label {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  padding: 0 10px;
  background: #000000;
  height: 100%;
}

label .glyphicon {
  top: 34%;
}

.element-animation1 {
  animation: animationFrames ease 0.8s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  -webkit-animation: animationFrames ease 0.8s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -ms-animation: animationFrames ease 0.8s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
}

.element-animation2 {
  animation: animationFrames ease 1s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  -webkit-animation: animationFrames ease 1s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -ms-animation: animationFrames ease 1s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
}

.element-animation3 {
  animation: animationFrames ease 1.2s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  -webkit-animation: animationFrames ease 1.2s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -ms-animation: animationFrames ease 1.2s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
}

.element-animation4 {
  animation: animationFrames ease 1.4s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  -webkit-animation: animationFrames ease 1.4s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -ms-animation: animationFrames ease 1.4s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
}

@keyframes animationFrames {
  0% {
    opacity: 0;
    transform: translate(-1500px, 0px);
  }

  60% {
    opacity: 1;
    transform: translate(30px, 0px);
  }

  80% {
    transform: translate(-10px, 0px);
  }

  100% {
    opacity: 1;
    transform: translate(0px, 0px);
  }
}

@-webkit-keyframes animationFrames {
  0% {
    opacity: 0;
    -webkit-transform: translate(-1500px, 0px);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate(30px, 0px);
  }

  80% {
    -webkit-transform: translate(-10px, 0px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translate(0px, 0px);
  }
}

.modal-header {
  background-color: transparent;
  color: inherit;
}

.modal-body {
  min-height: 300px;
}
</style>
