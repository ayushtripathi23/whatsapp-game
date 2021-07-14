import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player_name: "",
    player_email: "",
    questionBank: [{
      question: "🎭 Who is your favourite bollywood actor?",
      options: [{ answerText: "Amitabh Bacchan", isCorrect: false },
      { answerText: "Sharukh Khan", isCorrect: false },
      { answerText: "Amir Khan", isCorrect: false },
      { answerText: "Akshay Kumar", isCorrect: false },],

    },
    {
      question: "If you meets a genie, what would be your's wish?",
      options: [{ answerText: "💸 Rs100 crore", isCorrect: false },
      { answerText: " 💑 Beautiful wife/Handsome Husband", isCorrect: false },
      { answerText: "👑 To be the king of the world", isCorrect: false },],
    },
    {
      question: "Does you want his/her wife/husband to be the Hottest or the Smartest?",
      options: [{ answerText: "💖 The Hottest", isCorrect: false },
      { answerText: "😏 The Smartest", isCorrect: false },],
    },
    {
      question: "What does you drink the most?",
      options: [{ answerText: "☕ Tea", isCorrect: false },
      { answerText: "☕ Coffee", isCorrect: false },
      { answerText: "🥛 Butter Milk (Chaas)", isCorrect: false },
      { answerText: "🍺 Alcohol", isCorrect: false },
      { answerText: "🍵 Green Tea", isCorrect: false }],
    },
    {
      question: "🏏 Who is your's favourite cricketer?",
      options: [{ answerText: "Sachin Tendulkar", isCorrect: false },
      { answerText: "Virat Kohli", isCorrect: false },
      { answerText: "Mahendra Singh Dhoni", isCorrect: false },],
    }
    ]

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
