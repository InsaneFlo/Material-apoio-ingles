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