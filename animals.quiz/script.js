const questions = [
    {
        question: "Dünyanın en hızlı kara hayvanı hangisidir?",
        answers: [
            { text: "Çita", correct: true },
            { text: "Kurt", correct: false },
            { text: "Tavşan", correct: false },
            { text: "Fil", correct: false }
        ]
    },
    {
        question: "Hangi hayvan su altında en uzun süre nefesini tutabilir?",
        answers: [
            { text: "Balina", correct: false },
            { text: "Kaplumbağa", correct: true },
            { text: "Köpek balığı", correct: false },
            { text: "Ahtapot", correct: false }
        ]
    },
    {
        question: "En büyük kara hayvanı hangisidir?",
        answers: [
            { text: "Fil", correct: true },
            { text: "Gergedan", correct: false },
            { text: "Su aygırı", correct: false },
            { text: "Deve", correct: false }
        ]
    },
    {
        question: "Hangi hayvan 360 derece görebilir?",
        answers: [
            { text: "Bukalemun", correct: true },
            { text: "Baykuş", correct: false },
            { text: "Kedi", correct: false },
            { text: "Kartal", correct: false }
        ]
    },
    {
        question: "Dünyanın en küçük kuşu hangisidir?",
        answers: [
            { text: "Arı kuşu", correct: true },
            { text: "Serçe", correct: false },
            { text: "Güvercin", correct: false },
            { text: "Martı", correct: false }
        ]
    },
    {
        question: "Hangi hayvan en yüksek sesi çıkarır?",
        answers: [
            { text: "Mavi balina", correct: true },
            { text: "Aslan", correct: false },
            { text: "Fil", correct: false },
            { text: "Köpek balığı", correct: false }
        ]
    },
    {
        question: "En uzun süre uyuyan hayvan hangisidir?",
        answers: [
            { text: "Koala", correct: true },
            { text: "Kedi", correct: false },
            { text: "Ayı", correct: false },
            { text: "Tavşan", correct: false }
        ]
    },
    {
        question: "Penguenlerin doğada karşılaşmadığı hayvan hangisidir?",
        answers: [
            { text: "Kutup ayısı", correct: true },
            { text: "Balina", correct: false },
            { text: "Fok balığı", correct: false },
            { text: "Martı", correct: false }
        ]
    },
    {
        question: "Hangi hayvan bir defada 50.000'den fazla yumurta bırakabilir?",
        answers: [
            { text: "Kurbağa", correct: false },
            { text: "Kurbağa balığı", correct: true },
            { text: "Timsah", correct: false },
            { text: "Tavuk", correct: false }
        ]
    },
    {
        question: "Zehirli olmayan yılan türü hangisidir?",
        answers: [
            { text: "Boa yılanı", correct: true },
            { text: "Kral kobrası", correct: false },
            { text: "Çıngıraklı yılan", correct: false },
            { text: "Kara mamba", correct: false }
        ]
    },
    {
        question: "Hangi hayvan bir arı kovanını koruyarak beslenir?",
        answers: [
            { text: "Ayı", correct: false },
            { text: "Arı kuşu", correct: true },
            { text: "Tilki", correct: false },
            { text: "Kedi", correct: false }
        ]
    },
    {
        question: "Hangi hayvan sadece bambu ile beslenir?",
        answers: [
            { text: "Panda", correct: true },
            { text: "Kaplan", correct: false },
            { text: "Fil", correct: false },
            { text: "Tavşan", correct: false }
        ]
    },
    {
        question: "Hangi hayvan insan dilini taklit edebilir?",
        answers: [
            { text: "Papağan", correct: true },
            { text: "Maymun", correct: false },
            { text: "Kedi", correct: false },
            { text: "Köpek", correct: false }
        ]
    },
    {
        question: "Hangi kuş türü uçma yeteneğini kaybetmiştir?",
        answers: [
            { text: "Devekuşu", correct: true },
            { text: "Serçe", correct: false },
            { text: "Martı", correct: false },
            { text: "Kırlangıç", correct: false }
        ]
    },
    {
        question: "Dünyanın en büyük denizanası türü hangisidir?",
        answers: [
            { text: "Aslan yelesi denizanası", correct: true },
            { text: "Ay denizanası", correct: false },
            { text: "Kutu denizanası", correct: false },
            { text: "Mavi denizanası", correct: false }
        ]
    }
];


let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = score;
    nextButton.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
        scoreElement.innerText = score;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionElement.innerText = `Quiz tamamlandı! Toplam puanınız: ${score}/${questions.length}`;
    nextButton.innerText = 'Yeniden Başla';
    nextButton.classList.remove('hide');
    nextButton.addEventListener('click', startQuiz);
}

nextButton.addEventListener('click', showNextQuestion);

startQuiz();
