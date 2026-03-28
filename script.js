let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtI5v8Hoehotxm5csnncnWP7g0G5lCZig",
  authDomain: "material-de-apoio-do-flo.firebaseapp.com",
  projectId: "material-de-apoio-do-flo",
  storageBucket: "material-de-apoio-do-flo.firebasestorage.app",
  messagingSenderId: "940145523974",
  appId: "1:940145523974:web:f8fd7e685254c43eaeb287",
  measurementId: "G-W7LL67WKYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("conteudo").style.display = "block";
  } else {
    document.getElementById("login-page").style.display = "block";
    document.getElementById("conteudo").style.display = "none";
  }
});

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
    })
    .catch((error) => {
      alert("Erro ao entrar: " + error.message);
    });
}

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

  { question: "I am ____ tired (Nunca)", answers: ["always", "never", "sometimes"], correct: 1 },

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

  { question: "I ____ English now", answers: ["study", "am studying", "studied"], correct: 1 },

  { question: "She ____ a shower every morning", answers: ["take", "takes", "took"], correct: 1 },

  { question: "I ____ coffee right now", answers: ["drink", "am drinking", "drank"], correct: 1 },
  { question: "We ____ to the beach last summer", answers: ["go", "goes", "went"], correct: 2 },

  { question: "He ____ his homework yesterday", answers: ["finish", "finishes", "finished"], correct: 2 },

  { question: "They ____ English every day", answers: ["practice", "practices", "practiced"], correct: 0 },

  { question: "What is the past of 'eat'?", answers: ["eated", "ate", "eat"], correct: 1 },

  { question: "What is the past of 'have'?", answers: ["haved", "has", "had"], correct: 2 },

  { question: "What is the past of 'see'?", answers: ["seed", "saw", "seen"], correct: 1 },

  { question: "What is the past of 'buy'?", answers: ["buyed", "bought", "buys"], correct: 1 },

  { question: "What is the past of 'drink'?", answers: ["drinked", "drunk", "drank"], correct: 2 },

  { question: "She ____ not like vegetables", answers: ["do", "does", "did"], correct: 1 },

  { question: "Do you ____ soccer?", answers: ["likes", "like", "liked"], correct: 1 },

  { question: "____ he work on Sundays?", answers: ["Do", "Does", "Did"], correct: 1 },

  { question: "____ they eat dinner together?", answers: ["Does", "Did", "Do"], correct: 2 },

  { question: "She ____ reading a book now", answers: ["is", "are", "am"], correct: 0 },

  { question: "Choose correctly: ___ hour", answers: ["a", "an", "the"], correct: 1 },

  { question: "Choose correctly: ___ university", answers: ["an", "a", "aan"], correct: 1 },

  { question: "Choose correctly: ___ umbrella", answers: ["a", "an", "ella, ella"], correct: 1 },

  { question: "Choose correctly: ___ book", answers: ["an", "a", "the"], correct: 1 },

  { question: "Choose correctly: ___ engineer", answers: ["a", "an", "the"], correct: 1 },

  { question: "This is ____ than my old phone (good)", answers: ["gooder", "better", "best"], correct: 1 },

  { question: "She is ____ in the class (tall)", answers: ["taller", "tallest", "the tallest"], correct: 2 },

  { question: "This exercise is ____ than the last one (easy)", answers: ["easier", "more easy", "easiest"], correct: 0 },

  { question: "That car is ____ of all (expensive)", answers: ["more expensive", "the most expensive", "expensiver"], correct: 1 },

  { question: "He runs ____ than me (fast)", answers: ["more fast", "fastest", "faster"], correct: 2 },

  { question: "Choose: ___ the morning", answers: ["on", "at", "in"], correct: 2 },

  { question: "Choose: ___ night", answers: ["in", "on", "at"], correct: 2 },

  { question: "Choose: ___ the weekend", answers: ["in", "at", "on"], correct: 2 },

  { question: "Choose: ___ Christmas", answers: ["in", "on", "at"], correct: 1 },

  { question: "Choose: ___ 2010", answers: ["on", "at", "in"], correct: 2 },

  { question: "What is 'rarely'?", answers: ["Sempre", "Raramente", "Nunca"], correct: 1 },

  { question: "What is 'usually'?", answers: ["Às vezes", "Nunca", "Geralmente"], correct: 2 },

  { question: "I ____ brush my teeth before bed (sempre)", answers: ["never", "always", "rarely"], correct: 1 },

  { question: "She is ____ happy (geralmente)", answers: ["never", "rarely", "usually"], correct: 2 },

  { question: "He ____ forgets his keys (frequentemente)", answers: ["never", "often", "rarely"], correct: 1 },

  { question: "What is 4 × 5?", answers: ["twenty", "fifteen", "forty"], correct: 0 },

  { question: "What is 20 ÷ 4?", answers: ["six", "four", "five"], correct: 2 },

  { question: "What is 1/4?", answers: ["one half", "one quarter", "one third"], correct: 1 },

  { question: "What is 0.25?", answers: ["zero point five", "zero point two five", "zero two five"], correct: 1 },

  { question: "What is 75%?", answers: ["seventy-five percent", "seven five percent", "seventy percent"], correct: 0 },

  { question: "June 21st is...", answers: ["June twenty-one", "June twenty-oneth", "June twenty-first"], correct: 2 },

  { question: "What time is 7:15?", answers: ["half past seven", "quarter past seven", "seven past quarter"], correct: 1 },

  { question: "What time is 9:45?", answers: ["quarter past nine", "quarter to ten", "half past nine"], correct: 1 },

  { question: "wash → ? (3rd person)", answers: ["washs", "washes", "washies"], correct: 1 },

  { question: "fix → ? (3rd person)", answers: ["fixs", "fixies", "fixes"], correct: 2 },

  { question: "try → ? (3rd person)", answers: ["trys", "tries", "tryes"], correct: 1 },

  { question: "Which is correct?", answers: ["She didn't went", "She didn't go", "She didn't goes"], correct: 1 },

  { question: "Which is correct?", answers: ["They are never late", "They never are late", "Never they are late"], correct: 0 },

  { question: "Which is correct?", answers: ["I am study now", "I studying now", "I am studying now"], correct: 2 },

  { question: "Which is correct?", answers: ["He buyed a car", "He bought a car", "He buys a car yesterday"], correct: 1 },

  { question: "Which is correct?", answers: ["Does she plays?", "Do she play?", "Does she play?"], correct: 2 },
];

function openPage(pageId) {
  document.getElementById('menu').style.display = 'none';
  document.querySelector('.quiz-section').style.display = 'none';
  document.querySelector('.vocab-section').style.display = 'none';
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById(pageId).style.display = 'block';
}

function goBack() {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById('menu').style.display = 'grid';
  document.querySelector('.vocab-section').style.display = 'block';
  document.querySelector('.quiz-section').style.display = 'block';
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);

  const voices = speechSynthesis.getVoices();

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

const vocabData = {
  places: [
    { en: 'Hospital', pt: 'Hospital' },
    { en: 'School', pt: 'Escola' },
    { en: 'Supermarket', pt: 'Supermercado' },
    { en: 'Bank', pt: 'Banco' },
    { en: 'Pharmacy', pt: 'Farmácia' },
    { en: 'Airport', pt: 'Aeroporto' },
    { en: 'Train station', pt: 'Estação de trem' },
    { en: 'Restaurant', pt: 'Restaurante' },
    { en: 'Hotel', pt: 'Hotel' },
    { en: 'Park', pt: 'Parque' },
    { en: 'Church', pt: 'Igreja' },
    { en: 'Library', pt: 'Biblioteca' },
  ],
  jobs: [
    { en: 'Teacher', pt: 'Professor(a)' },
    { en: 'Doctor', pt: 'Médico(a)' },
    { en: 'Nurse', pt: 'Enfermeiro(a)' },
    { en: 'Engineer', pt: 'Engenheiro(a)' },
    { en: 'Lawyer', pt: 'Advogado(a)' },
    { en: 'Police officer', pt: 'Policial' },
    { en: 'Firefighter', pt: 'Bombeiro(a)' },
    { en: 'Chef', pt: 'Cozinheiro(a)' },
    { en: 'Driver', pt: 'Motorista' },
    { en: 'Architect', pt: 'Arquiteto(a)' },
    { en: 'Dentist', pt: 'Dentista' },
    { en: 'Mechanic', pt: 'Mecânico(a)' },
  ],
  family: [
    { en: 'Mother', pt: 'Mãe' },
    { en: 'Father', pt: 'Pai' },
    { en: 'Brother', pt: 'Irmão' },
    { en: 'Sister', pt: 'Irmã' },
    { en: 'Grandmother', pt: 'Avó' },
    { en: 'Grandfather', pt: 'Avô' },
    { en: 'Uncle', pt: 'Tio' },
    { en: 'Aunt', pt: 'Tia' },
    { en: 'Cousin', pt: 'Primo(a)' },
    { en: 'Son', pt: 'Filho' },
    { en: 'Daughter', pt: 'Filha' },
    { en: 'Husband', pt: 'Marido' },
    { en: 'Wife', pt: 'Esposa' },
  ],
  animals: [
    { en: 'Dog', pt: 'Cachorro' },
    { en: 'Cat', pt: 'Gato' },
    { en: 'Bird', pt: 'Pássaro' },
    { en: 'Fish', pt: 'Peixe' },
    { en: 'Horse', pt: 'Cavalo' },
    { en: 'Cow', pt: 'Vaca' },
    { en: 'Pig', pt: 'Porco' },
    { en: 'Lion', pt: 'Leão' },
    { en: 'Elephant', pt: 'Elefante' },
    { en: 'Snake', pt: 'Cobra' },
    { en: 'Rabbit', pt: 'Coelho' },
    { en: 'Monkey', pt: 'Macaco' },
  ],
  food: [
  { en: 'Rice', pt: 'Arroz' },
  { en: 'Beans', pt: 'Feijão' },
  { en: 'Bread', pt: 'Pão' },
  { en: 'Egg', pt: 'Ovo' },
  { en: 'Chicken', pt: 'Frango' },
  { en: 'Beef', pt: 'Carne bovina' },
  { en: 'Fish', pt: 'Peixe' },
  { en: 'Salad', pt: 'Salada' },
  { en: 'Soup', pt: 'Sopa' },
  { en: 'Cheese', pt: 'Queijo' },
  { en: 'Butter', pt: 'Manteiga' },
  { en: 'Cake', pt: 'Bolo' },
  { en: 'Cookie', pt: 'Biscoito' },
  { en: 'Juice', pt: 'Suco' },
  { en: 'Water', pt: 'Água' },
],
clothes: [
  { en: 'Shirt', pt: 'Camisa' },
  { en: 'T-shirt', pt: 'Camiseta' },
  { en: 'Pants', pt: 'Calça' },
  { en: 'Shorts', pt: 'Bermuda' },
  { en: 'Dress', pt: 'Vestido' },
  { en: 'Skirt', pt: 'Saia' },
  { en: 'Jacket', pt: 'Jaqueta' },
  { en: 'Coat', pt: 'Casaco' },
  { en: 'Shoes', pt: 'Sapatos' },
  { en: 'Sneakers', pt: 'Tênis' },
  { en: 'Socks', pt: 'Meias' },
  { en: 'Hat', pt: 'Chapéu' },
  { en: 'Belt', pt: 'Cinto' },
  { en: 'Gloves', pt: 'Luvas' },
  { en: 'Scarf', pt: 'Cachecol' },
],
colors: [
  { en: 'Red', pt: 'Vermelho' },
  { en: 'Blue', pt: 'Azul' },
  { en: 'Green', pt: 'Verde' },
  { en: 'Yellow', pt: 'Amarelo' },
  { en: 'Orange', pt: 'Laranja' },
  { en: 'Purple', pt: 'Roxo' },
  { en: 'Pink', pt: 'Rosa' },
  { en: 'Black', pt: 'Preto' },
  { en: 'White', pt: 'Branco' },
  { en: 'Gray', pt: 'Cinza' },
  { en: 'Brown', pt: 'Marrom' },
  { en: 'Beige', pt: 'Bege' },
],
house: [
  { en: 'Kitchen', pt: 'Cozinha' },
  { en: 'Bedroom', pt: 'Quarto' },
  { en: 'Bathroom', pt: 'Banheiro' },
  { en: 'Living room', pt: 'Sala de estar' },
  { en: 'Dining room', pt: 'Sala de jantar' },
  { en: 'Garage', pt: 'Garagem' },
  { en: 'Garden', pt: 'Jardim' },
  { en: 'Balcony', pt: 'Varanda' },
  { en: 'Stairs', pt: 'Escadas' },
  { en: 'Door', pt: 'Porta' },
  { en: 'Window', pt: 'Janela' },
  { en: 'Roof', pt: 'Telhado' },
  { en: 'Floor', pt: 'Chão' },
  { en: 'Wall', pt: 'Parede' },
  { en: 'Ceiling', pt: 'Teto' },
],
body: [
  { en: 'Head', pt: 'Cabeça' },
  { en: 'Hair', pt: 'Cabelo' },
  { en: 'Eye', pt: 'Olho' },
  { en: 'Ear', pt: 'Orelha' },
  { en: 'Nose', pt: 'Nariz' },
  { en: 'Mouth', pt: 'Boca' },
  { en: 'Tooth', pt: 'Dente' },
  { en: 'Neck', pt: 'Pescoço' },
  { en: 'Shoulder', pt: 'Ombro' },
  { en: 'Arm', pt: 'Braço' },
  { en: 'Hand', pt: 'Mão' },
  { en: 'Finger', pt: 'Dedo' },
  { en: 'Chest', pt: 'Peito' },
  { en: 'Stomach', pt: 'Estômago' },
  { en: 'Leg', pt: 'Perna' },
  { en: 'Knee', pt: 'Joelho' },
  { en: 'Foot', pt: 'Pé' },
],
transport: [
  { en: 'Car', pt: 'Carro' },
  { en: 'Bus', pt: 'Ônibus' },
  { en: 'Train', pt: 'Trem' },
  { en: 'Subway', pt: 'Metrô' },
  { en: 'Airplane', pt: 'Avião' },
  { en: 'Bicycle', pt: 'Bicicleta' },
  { en: 'Motorcycle', pt: 'Moto' },
  { en: 'Taxi', pt: 'Táxi' },
  { en: 'Truck', pt: 'Caminhão' },
  { en: 'Boat', pt: 'Barco' },
  { en: 'Helicopter', pt: 'Helicóptero' },
  { en: 'Ship', pt: 'Navio' },
],
sports: [
  { en: 'Soccer', pt: 'Futebol' },
  { en: 'Basketball', pt: 'Basquete' },
  { en: 'Volleyball', pt: 'Vôlei' },
  { en: 'Swimming', pt: 'Natação' },
  { en: 'Tennis', pt: 'Tênis' },
  { en: 'Running', pt: 'Corrida' },
  { en: 'Cycling', pt: 'Ciclismo' },
  { en: 'Boxing', pt: 'Boxe' },
  { en: 'Gymnastics', pt: 'Ginástica' },
  { en: 'Surfing', pt: 'Surfe' },
  { en: 'Martial arts', pt: 'Artes marciais' },
  { en: 'Skating', pt: 'Patinação' },
],
technology: [
  { en: 'Computer', pt: 'Computador' },
  { en: 'Laptop', pt: 'Notebook' },
  { en: 'Smartphone', pt: 'Celular' },
  { en: 'Tablet', pt: 'Tablet' },
  { en: 'Keyboard', pt: 'Teclado' },
  { en: 'Mouse', pt: 'Mouse' },
  { en: 'Screen', pt: 'Tela' },
  { en: 'Headphones', pt: 'Fone de ouvido' },
  { en: 'Camera', pt: 'Câmera' },
  { en: 'Charger', pt: 'Carregador' },
  { en: 'Wi-Fi', pt: 'Wi-Fi' },
  { en: 'Password', pt: 'Senha' },
  { en: 'App', pt: 'Aplicativo' },
  { en: 'Battery', pt: 'Bateria' },
],
nature: [
  { en: 'Sun', pt: 'Sol' },
  { en: 'Moon', pt: 'Lua' },
  { en: 'Star', pt: 'Estrela' },
  { en: 'Sky', pt: 'Céu' },
  { en: 'Cloud', pt: 'Nuvem' },
  { en: 'Rain', pt: 'Chuva' },
  { en: 'Wind', pt: 'Vento' },
  { en: 'Snow', pt: 'Neve' },
  { en: 'River', pt: 'Rio' },
  { en: 'Sea', pt: 'Mar' },
  { en: 'Mountain', pt: 'Montanha' },
  { en: 'Forest', pt: 'Floresta' },
  { en: 'Tree', pt: 'Árvore' },
  { en: 'Flower', pt: 'Flor' },
  { en: 'Stone', pt: 'Pedra' },
],
feelings: [
  { en: 'Happy', pt: 'Feliz' },
  { en: 'Sad', pt: 'Triste' },
  { en: 'Angry', pt: 'Com raiva' },
  { en: 'Scared', pt: 'Com medo' },
  { en: 'Surprised', pt: 'Surpreso(a)' },
  { en: 'Tired', pt: 'Cansado(a)' },
  { en: 'Excited', pt: 'Animado(a)' },
  { en: 'Nervous', pt: 'Nervoso(a)' },
  { en: 'Bored', pt: 'Entediado(a)' },
  { en: 'Proud', pt: 'Orgulhoso(a)' },
  { en: 'Lonely', pt: 'Solitário(a)' },
  { en: 'Calm', pt: 'Calmo(a)' },
  { en: 'Confused', pt: 'Confuso(a)' },
  { en: 'Embarrassed', pt: 'Envergonhado(a)' },
],
shopping: [
  { en: 'Price', pt: 'Preço' },
  { en: 'Discount', pt: 'Desconto' },
  { en: 'Receipt', pt: 'Recibo' },
  { en: 'Cash', pt: 'Dinheiro' },
  { en: 'Credit card', pt: 'Cartão de crédito' },
  { en: 'Bag', pt: 'Sacola' },
  { en: 'Store', pt: 'Loja' },
  { en: 'Mall', pt: 'Shopping' },
  { en: 'Size', pt: 'Tamanho' },
  { en: 'Sale', pt: 'Promoção' },
  { en: 'Queue', pt: 'Fila' },
  { en: 'Cashier', pt: 'Caixa' },
  { en: 'Change', pt: 'Troco' },
  { en: 'Exchange', pt: 'Troca' },
],
};

function loadVocab() {
  const theme = document.getElementById('vocab-select').value;
  const list = document.getElementById('vocab-list');
  list.innerHTML = '';

  if (!theme) return;

  vocabData[theme].forEach(item => {
    const div = document.createElement('div');
    div.className = 'vocab-item';
    div.innerHTML = `
      <span>
        <span class="vocab-en">${item.en}</span>
        <span class="vocab-pt"> – ${item.pt}</span>
      </span>
      <button onclick="speak('${item.en}')">🔊</button>
    `;
    list.appendChild(div);
  });
}

function startQuiz() {
  document.getElementById("start-btn").style.display = "none";
  document.getElementById("answers").style.display = "block";
  document.getElementById("progress").style.display = "block";
  document.getElementById("timer").style.display = "block";
  document.getElementById("question").style.display = "block";

  currentQuestion = 0;
  score = 0;

  shuffleArray(questions);
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);

  timeLeft = 15;
  document.getElementById("timer").innerText = `⏳ ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `⏳ ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer(-1);
    }
  }, 1000);

  const q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;
  document.getElementById("progress").innerText = `${currentQuestion}/${questions.length}`;

  let shuffledAnswers = q.answers.map((text, index) => ({ text, index }));

  for (let i = shuffledAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
  }

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  shuffledAnswers.forEach(({ text, index }) => {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = () => checkAnswer(index);
    btn.classList.add("answer-btn");

    answersDiv.appendChild(btn);
  });

  document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(selected) {
  clearInterval(timer);

  document.querySelectorAll(".answer-btn").forEach(btn => btn.disabled = true);
  const correctIndex = questions[currentQuestion].correct;
  const correctAnswer = questions[currentQuestion].answers[correctIndex];

  const feedback = document.getElementById("feedback");

  if (selected === correctIndex) {
    feedback.innerText = "✅ Correct!";
    score++;
    launchConfetti();
  } else if (selected === -1) {
    feedback.innerText = `⏰ Time's up! Correct: ${correctAnswer}`;
  } else {
    feedback.innerText = `❌ Wrong! Correct: ${correctAnswer}`;
  }

  document.getElementById("next-btn").style.display = "block";
}

function showResult() {
  document.getElementById("question").innerText = "🎉 Finished!";
  document.getElementById("answers").innerHTML = "";

  document.getElementById("feedback").innerText =
    `You got ${score} out of ${questions.length} 🎯`;

  const nextBtn = document.getElementById("next-btn");

  nextBtn.style.display = "block";
  nextBtn.innerText = "Restart";
  nextBtn.onclick = restartQuiz;
}

function nextQuestion() {
  currentQuestion++;

  const feedback = document.getElementById("feedback");
  feedback.innerText = "";

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  document.getElementById("feedback").innerText = "";
  document.getElementById("answers").innerHTML = "";

  const nextBtn = document.getElementById("next-btn");

  nextBtn.style.display = "none";
  nextBtn.innerText = "Next";
  nextBtn.onclick = nextQuestion;

  document.getElementById("start-btn").style.display = "block";

  document.getElementById("progress").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("question").style.display = "none";
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

window.openPage = openPage;
window.goBack = goBack;
window.speak = speak;
window.login = login;
window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.restartQuiz = restartQuiz;
window.loadVocab = loadVocab;