const questions = [
  { question: "What is the past of 'go'?", answers: ["goed", "went", "goes"], correct: 1 },
  { question: "She ____ every day", answers: ["work", "works", "worked"], correct: 1 },
  { question: "I ____ yesterday", answers: ["work", "worked", "works"], correct: 1 },
  { question: "He ____ pizza", answers: ["like", "likes", "liked"], correct: 1 },
  { question: "They ____ to school yesterday", answers: ["go", "went", "goes"], correct: 1 },

  { question: "Which is correct?", answers: ["He go", "He goes", "He going"], correct: 1 },
  { question: "She ____ TV now", answers: ["watch", "is watching", "watched"], correct: 1 },
  { question: "We ____ soccer last week", answers: ["play", "played", "plays"], correct: 1 },

  { question: "Choose the correct preposition: ___ Monday", answers: ["in", "on", "at"], correct: 1 },
  { question: "Choose: ___ 5 PM", answers: ["on", "at", "in"], correct: 1 },
  { question: "Choose: ___ January", answers: ["on", "at", "in"], correct: 2 },

  { question: "What is 'always'?", answers: ["Nunca", "Sempre", "Às vezes"], correct: 1 },
  { question: "What is 'never'?", answers: ["Sempre", "Nunca", "Frequentemente"], correct: 1 },

  { question: "He ____ plays soccer (Sempre)", answers: ["always", "never", "usually"], correct: 0 },

  { question: "What is 2 + 2?", answers: ["four", "five", "three"], correct: 0 },
  { question: "What is 10 - 3?", answers: ["seven", "six", "eight"], correct: 0 },
  { question: "What is 3 × 2?", answers: ["five", "six", "four"], correct: 1 },

  { question: "How do you say 1/2?", answers: ["one half", "one second", "one part"], correct: 0 },

  { question: "Choose correctly: ___ apple", answers: ["a", "an", "the"], correct: 1 },
  { question: "Choose correctly: ___ car", answers: ["a", "an", "the"], correct: 0 },

  { question: "big → ? (Comparative)", answers: ["biger", "bigger", "biggest"], correct: 1 },
  { question: "good → ? (Comparative)", answers: ["better", "gooder", "best"], correct: 0 },
  { question: "fast → ? (Comparative)", answers: ["faster", "fastest", "more fast"], correct: 0 },

  { question: "This is the ____ car", answers: ["fast", "faster", "fastest"], correct: 2 },

  { question: "March 5th is...", answers: ["March five", "March fifth", "March fifteen"], correct: 1 },

  { question: "What time is 3:00?", answers: ["three", "three o'clock", "three time"], correct: 1 },

  { question: "3:30 is...", answers: ["half past three", "quarter past three", "three thirty past"], correct: 0 },

  { question: "Which is correct?", answers: ["Did you went?", "Did you go?", "Did you goes?"], correct: 1 },

  { question: "She ____ not work", answers: ["does", "do", "did"], correct: 0 },

  { question: "Does he ____?", answers: ["works", "work", "worked"], correct: 1 },

  { question: "I am ____ tired (", answers: ["always", "never", "sometimes"], correct: 0 },

  { question: "They ____ late (Nunca)", answers: ["are never", "never are", "are always"], correct: 0 },

  { question: "What is 'sometimes'?", answers: ["Sempre", "Às vezes", "Nunca"], correct: 1 },

  { question: "He ____ TV yesterday", answers: ["watch", "watched", "watches"], correct: 1 },

  { question: "We ____ dinner last night", answers: ["eat", "ate", "eats"], correct: 1 },

  { question: "go → ? (Past)", answers: ["went", "goed", "goes"], correct: 0 },

  { question: "eat → ? (Past)", answers: ["eated", "ate", "eat"], correct: 1 },

  { question: "study → ? (3rd person)", answers: ["studys", "studies", "study"], correct: 1 },

  { question: "play → ? (3rd person)", answers: ["plays", "plaies", "playes"], correct: 0 },

  { question: "Which is correct?", answers: ["She don't work", "She doesn't work", "She not work"], correct: 1 },

  { question: "What is 100?", answers: ["one hundred", "hundred one", "ten hundred"], correct: 0 },

  { question: "What is 1000?", answers: ["one thousand", "thousand one", "ten thousand"], correct: 0 },

  { question: "Choose correctly:", answers: ["He go to school", "He goes to school", "He going school"], correct: 1 },

  { question: "What is 'often'?", answers: ["Frequentemente", "Nunca", "Sempre"], correct: 0 },

  { question: "Which is correct?", answers: ["She is happy", "She are happy", "She am happy"], correct: 0 },

  { question: "What is 0.5?", answers: ["zero point five", "zero five", "point five"], correct: 0 },

  { question: "What is 50%?", answers: ["fifty percent", "half percent", "five percent"], correct: 0 },

  { question: "This is ____ than that", answers: ["big", "bigger", "biggest"], correct: 1 },

  { question: "This is the ____", answers: ["best", "better", "good"], correct: 0 },

  { question: "I ____ English now", answers: ["study", "am studying", "studied"], correct: 1 }
];

function openPage(pageId) {
  document.getElementById('menu').style.display = 'none';
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById(pageId).style.display = 'block';
}

function goBack() {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById('menu').style.display = 'grid';
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);

  const voices = speechSynthesis.getVoices();

  console.log(voices.map(v => v.name));

  const voice =
    voices.find(v => v.name.includes('Google')) ||
    voices.find(v => v.name.includes('US')) ||
    voices.find(v => v.lang === 'en-US');

  if (voice) {
    utterance.voice = voice;
  }

  utterance.lang = 'en-US';
  utterance.rate = 0.85;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

let currentQuestion = 0;

function loadQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;

    btn.onclick = () => checkAnswer(index);

    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].correct;
  const feedback = document.getElementById("feedback");

  if (selected === correct) {
    feedback.innerText = "✅ Correct!";
    launchConfetti();
  } else {
    feedback.innerText = "❌ Wrong!";
  }

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      feedback.innerText = "";
      loadQuestion();
    } else {
      document.getElementById("question").innerText = "🎉 Finished!";
      document.getElementById("answers").innerHTML = "";
    }
  }, 1000);
}

function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(questions);
loadQuestion();