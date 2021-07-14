<template>
  <div>
    <h1>{{ getName }}'s Quiz</h1>
    <h3>Select an answer for each of the following question-</h3>

    <div class="container-fluid">
      <div class="modal-dialog">
        <div
          class="modal-content"
          v-for="(question, objIndex) in questionsList"
          :key="objIndex"
        >
          <div class="modal-header">
            <h3>{{ question.question }}</h3>
          </div>
          <div class="modal-body">
            <div class="col-xs-3 5"></div>
            <div class="quiz" id="quiz" data-toggle="buttons">
              <label
                class="element-animation1 btn btn-lg btn-danger btn-block"
                id="button-change"
                v-for="(row, index) in question.options"
                :key="index"
                ><span
                  @click="rightAnswer(index, question.options[index])"
                  class="btn-label"
                  ><i class="glyphicon glyphicon-check"></i
                ></span>

                <input
                  type="text"
                  id="button-input"
                  style="
                    width: 100%;
                    border-radius: 1rem;
                    color: black;
                    background-color: white;
                  "
                  v-model="question.options[index].answerText"
                  :disabled="readonly"
                />

                <button
                  type="submit"
                  class="btn deleteButton"
                  @click="deleteRow(question.options, index)"
                >
                  Delete the option
                </button>
              </label>
              <div class="submitButtonDiv">
                <button
                  type="submit"
                  class="btn addButton"
                  id="button-add"
                  @click="addRow(objIndex)"
                >
                  Add an option
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="submitButtonDiv">
        <button class="submitButton" @click="submit">Submit Answer</button>
      </div>
    </div>
  </div>
</template>
<script>
import db from "../firebaseConfig";

export default {
  data() {
    return {
      pname: "",
      rows: [{ select: 1, name: "ayush" }],
      questionsList: [],
      answer: "",
      newInput: "",
      correctAnswer: "",
      proId: "",
      gameId: "",
      readonly: true,
    };
  },
  created() {
    console.log(this.getQuestions);

    this.questionsList = this.getQuestions;
    console.log(this.questionsList);
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
    addRow: function (objNo) {
      this.readonly = false;
      this.questionsList[objNo].options.push({
        answerText: "",
        isCorrect: false,
      });
    },
    deleteRow: (row, objNo) => {
      row.splice(objNo, 1);
    },

    submit() {
      console.log(this.questionsList);
      const data = {
        questions: this.questionsList,
        admin_name: this.$store.state.player_name,
      };
      db.collection("person")
        .add(data)
        .then((doc) => {
          console.log("Document successfully written!");
          console.log(doc.id);
          this.proId = doc.id;
        })
        .then(() => {
          console.log("form submitted", data);
          console.log("id", this.proId);
          this.$router.push(`/game/${this.proId}`);
        })

        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    rightAnswer(index, object) {
      console.log(index, object);
      const condition = (object.isCorrect = true);
      console.log("consition => ", condition, object);
      this.correctAnswer = object;
      // var cor = (document.getElementById("button-change").style.background =
      //   "lightgreen");
      // console.log(cor);
    },
  },
};
</script>
<style scoped>
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
