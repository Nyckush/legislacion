const questions = [
  { category: 'CONCEPTOS BÁSICOS', question: '¿Qué es el Convenio de Budapest?', answers: ['Un tratado internacional sobre ciberdelito', 'Una ley exclusiva de Argentina', 'Un programa antivirus', 'Una red social europea'], correct: 0, explanation: 'Correcto. Es un tratado internacional del Consejo de Europa sobre ciberdelito.' },
  { category: 'ORIGEN', question: '¿En qué ciudad se adoptó el Convenio?', answers: ['Roma', 'Budapest', 'París', 'Buenos Aires'], correct: 1, explanation: '¡Bien! Se adoptó en Budapest, Hungría, el 23 de noviembre de 2001.' },
  { category: 'ARGENTINA', question: '¿Qué ley aprobó la adhesión argentina al Convenio?', answers: ['Ley 26.388', 'Ley 27.411', 'Ley 24.767', 'Ley 25.326'], correct: 1, explanation: 'Correcto. La Ley 27.411 aprobó la adhesión de Argentina.' },
  { category: 'DELITOS', question: '¿Qué conducta describe el acceso ilícito?', answers: ['Entrar a un sistema sin autorización', 'Publicar una noticia falsa', 'Comprar en línea', 'Cambiar una contraseña propia'], correct: 0, explanation: 'Exacto. El artículo 2 se refiere al acceso sin autorización a un sistema.' },
  { category: 'DELITOS', question: '¿Qué grupo incluye el fraude informático?', answers: ['Delitos contra sistemas y datos', 'Fraude y falsificación informática', 'Propiedad intelectual', 'Contenido ilícito'], correct: 1, explanation: 'Correcto. El fraude informático está previsto en el artículo 8.' },
  { category: 'COOPERACIÓN', question: '¿Por qué el Convenio facilita la cooperación internacional?', answers: ['Porque Internet y la evidencia digital pueden cruzar fronteras', 'Porque elimina todas las leyes nacionales', 'Porque impide investigar delitos', 'Porque solo se aplica en Europa'], correct: 0, explanation: 'Muy bien. Un delito puede afectar a personas, datos y servidores ubicados en distintos países.' },
  { category: 'OBJETIVOS', question: '¿Cuál es uno de los objetivos principales del Convenio?', answers: ['Reemplazar los tribunales nacionales', 'Crear videojuegos educativos', 'Ayudar a preservar y obtener pruebas digitales', 'Prohibir el uso de Internet'], correct: 2, explanation: 'Correcto. El tratado prevé herramientas para preservar y obtener evidencia electrónica.' },
  { category: 'DELITOS', question: '¿Qué artículo trata infracciones al derecho de autor?', answers: ['Artículo 2', 'Artículo 6', 'Artículo 9', 'Artículo 10'], correct: 3, explanation: '¡Excelente! El artículo 10 aborda delitos relacionados con propiedad intelectual.' }
];

let current = 0, score = 0, mistakes = 0, answered = false;
const $ = id => document.getElementById(id);
const routePositions = ['7px','calc(29% + 7px)','calc(58% + 7px)','calc(100% - 81px)'];

function renderQuestion() {
  const q = questions[current]; answered = false;
  $('category').textContent = q.category;
  $('question').textContent = q.question;
  $('questionImage').className = 'question-image art-' + current;
  $('questionImage').setAttribute('aria-label', 'Ilustración de ' + q.category.toLowerCase());
  $('questionNumber').textContent = current + 1;
  $('questionTotal').textContent = questions.length;
  $('feedback').textContent = '';
  $('feedback').className = 'feedback';
  $('nextButton').hidden = true;
  $('answers').innerHTML = '';
  q.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer'; button.type = 'button'; button.textContent = answer;
    button.addEventListener('click', () => answerQuestion(index, button));
    $('answers').appendChild(button);
  });
}

function answerQuestion(index, button) {
  if (answered) return; answered = true;
  const q = questions[current], all = [...document.querySelectorAll('.answer')];
  all.forEach(b => b.disabled = true);
  if (index === q.correct) {
    score++; button.classList.add('correct');
    $('feedback').textContent = q.explanation; $('feedback').classList.add('success');
  } else {
    mistakes++; button.classList.add('incorrect'); all[q.correct].classList.add('correct');
    $('feedback').textContent = 'Alerta: respuesta incorrecta. ' + q.explanation; $('feedback').classList.add('error');
    advanceHacker();
  }
  $('score').textContent = score;
  if (mistakes >= 3) setTimeout(() => finish(false), 900); else $('nextButton').hidden = false;
}

function advanceHacker() {
  $('hacker').style.left = routePositions[mistakes];
  $('hacker').className = 'hacker hacker-stage-' + mistakes;
  document.querySelectorAll('.checkpoint').forEach((node, i) => node.classList.toggle('active', i === mistakes));
  const messages = ['El atacante está buscando una puerta de entrada.', 'El atacante aumentó sus permisos.', 'El atacante llegó a datos sensibles.', '¡Peligro! El atacante está listo para cometer el delito.'];
  $('attackCopy').textContent = messages[mistakes] || messages[3];
  if (mistakes === 2) $('dangerText').textContent = 'RIESGO ALTO';
}

function nextQuestion() { current++; current >= questions.length ? finish(true) : renderQuestion(); }
function finish(won) {
  const modal = $('modal'), card = modal.querySelector('.modal-card');
  card.classList.toggle('lost', !won);
  $('modalEyebrow').textContent = won ? 'MISIÓN COMPLETADA' : 'BRECHA DE SEGURIDAD';
  $('modalIcon').textContent = won ? '✦' : '';
  $('modalTitle').textContent = won ? '¡Red protegida!' : 'El hacker cometió el delito';
  $('modalText').textContent = won ? `Terminaste con ${score} respuestas correctas. Tu conocimiento del Convenio de Budapest ayudó a proteger la red.` : `El atacante aprovechó tres errores y alcanzó el sistema. Repasá los contenidos y volvé a intentarlo.`;
  modal.hidden = false;
}
function resetGame() { current = 0; score = 0; mistakes = 0; $('score').textContent = '0'; $('hacker').style.left = routePositions[0]; $('hacker').className = 'hacker hacker-stage-0'; $('attackCopy').textContent = 'El atacante aún está fuera del sistema.'; $('dangerText').textContent = 'BAJO RIESGO'; document.querySelectorAll('.checkpoint').forEach((n,i)=>n.classList.toggle('active',false)); $('modal').hidden = true; renderQuestion(); }
$('nextButton').addEventListener('click', nextQuestion); $('resetButton').addEventListener('click', resetGame); $('playAgain').addEventListener('click', resetGame);
renderQuestion();
