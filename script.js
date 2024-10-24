const questions = [
    {
      question: "What type of work do you enjoy?",
      options: ["Technical", "Creative", "Social", "Analytical"],
      help: "Think about what excites you most in a work environment.",
      answers: { "A": 1, "B": 2, "C": 3, "D": 4 }
    },
    {
      question: "Do you prefer working alone or in a team?",
      options: ["Alone", "Team", "Depends", "No Preference"],
      help: "Consider how you feel most productive.",
      answers: { "A": 5, "B": 6, "C": 7, "D": 8 }
    },
    {
      question: "Are you interested in helping others?",
      options: ["Yes, Very Much", "Sometimes", "Not Really", "No"],
      help: "Helping others can be part of many careers.",
      answers: { "A": 9, "B": 10, "C": 11, "D": 12 }
    },
    {
      question: "Would you like a job that involves problem-solving?",
      options: ["Yes", "Maybe", "Rarely", "No"],
      help: "Problem-solving skills are important in technical and analytical fields.",
      answers: { "A": 13, "B": 14, "C": 15, "D": 16 }
    },
    {
      question: "Based on your answers, you might enjoy a career in technology!",
      isFinal: true,
      career: "Technology",
      description: "Roles like Software Developer, Data Analyst, or IT Specialist might suit you."
    },
  ];
  
  let currentQuestionIndex = 0;
  let progress = 0;
  const userAnswers = [];
  
  // Load the first question
  function loadQuestion() {
    const questionElement = document.getElementById('question');
    const questionNumber = document.getElementById('question-number');
    const helpText = document.getElementById('help-text');
    const progressElement = document.getElementById('progress');
  
    if (questions[currentQuestionIndex].isFinal) {
      displayResult();
    } else {
      const questionData = questions[currentQuestionIndex];
      questionElement.innerText = questionData.question;
      helpText.innerText = questionData.help || '';
      questionNumber.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length - 1}`;
      progress = ((currentQuestionIndex + 1) / (questions.length - 1)) * 100;
      progressElement.style.width = `${progress}%`;
  
      const answerOptionsContainer = document.querySelector('.answer-options');
      answerOptionsContainer.innerHTML = ''; // Clear previous options
  
      // Create buttons for each answer option
      questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.innerText = option;
        button.onclick = () => handleResponse(String.fromCharCode(65 + index)); // 'A', 'B', 'C', 'D'
        answerOptionsContainer.appendChild(button);
      });
    }
  }
  
  // Handle answer and proceed to the next question
  function handleResponse(option) {
    userAnswers.push(option);
    currentQuestionIndex++;
  
    const questionCard = document.querySelector('.card');
    questionCard.classList.add('fade-out');
  
    setTimeout(() => {
      questionCard.classList.remove('fade-out');
      loadQuestion();
    }, 500);
  }
  
  // Display the final recommendation based on user answers
  function displayResult() {
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
  
    const resultText = document.getElementById('result-text');
    const careerIcon = document.getElementById('career-icon');
    const careerDetails = document.getElementById('career-details');
  
    // Example decision logic based on user answers
    if (userAnswers.includes('A') && userAnswers.includes('D')) {
      resultText.innerText = 'You might enjoy a career in Technology!';
      careerDetails.innerHTML = `
        <p>Roles like Software Developer, Data Analyst, or IT Specialist might suit you.</p>
        <p>Consider further exploring technical fields where your analytical skills can shine!</p>
      `;
      careerIcon.innerHTML = `<i class="career-icon tech-icon"></i>`;
    } else if (userAnswers.includes('B')) {
      resultText.innerText = 'A Creative Field might be perfect for you!';
      careerDetails.innerHTML = `
        <p>Consider careers in Graphic Design, Content Creation, or Digital Marketing.</p>
      `;
      careerIcon.innerHTML = `<i class="career-icon creative-icon"></i>`;
    } else {
      resultText.innerText = 'Explore careers that align with your skills and interests.';
      careerDetails.innerHTML = `<p>Consider seeking additional guidance to discover the best path for you.</p>`;
    }
  }
  
  // Restart the quiz
  function restart() {
    currentQuestionIndex = 0;
    userAnswers.length = 0;
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
    loadQuestion();
  }
  
  // Toggle help text visibility
  function toggleHelp() {
    const helpText = document.getElementById('help-text');
    helpText.classList.toggle('hidden');
  }
  
  // Initialize the first question on page load
  document.addEventListener('DOMContentLoaded', loadQuestion);
  