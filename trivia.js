

var number = 30; //  Set our number counter to 30.
var intervalId; //  Variable that will hold our interval ID when we execute "run" funciton

//  When the stop button gets clicked, run the stop function.
//$("#stop").on("click", stop);


$("#start").on("click", run); //  When the start button gets clicked, execute the run function.
$("#done").on("click", checkAnswers);
$("#restart").on("click", restart);

//  ----------TIMER FUNCITON ---------
function run() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000); //  The run function sets an interval, runs decrement function once per second (1000)
}


function decrement() { //  The decrement function.
  number--; //  Decrease number by one.
  $("#timer").html("<h2>" + number + "</h2>"); //  Show the number in the #timer tag.
  if (number === 0) { // AT ZERO = run stop function and run check answers function
    stop();
    checkAnswers();
    alert("Time Up!");  //  Alert the user that time is up.
  }
}

  // function reset() {
    // var number = 30;
    //  $("#timer").append(number);
    //  console.log("reset", number)
 // }



function stop() { //  The stop function
  clearInterval(intervalId); //  Clears our intervalId
}

// --------TRIVIA QUESTIONS-----------
var triviaQuestions = [
  {
    "title": "What street is Bob’s Burgers on?",
    "type": "radio",
    "options": [
      {
        value: '1_id',
        label: "Ocean Avenue"
      },
      {
        value: '2_id',
        label: "River Avenue"
      },
      {
        value: '3_id',
        label: "The Hamburgler"
      },
      {
        value: '4_id',
        label: "5th Street"
      }
    ],
    "answer": "1_id"
  },
  {
    "title": "Who did Linda almost marry?",
    "type": "radio",
    "options": [
      {
        value: '1_id',
        label: "Gene"
      },
      {
        value: '2_id',
        label: "Jimmy"
      },
      {
        value: '3_id',
        label: "The Hamburgler"
      },
      {
        value: '4_id',
        label: "Hugo"
      }
    ],
    "answer": "4_id"
  },
  {
    "title": "What character did Aziz Ansari voice?",
    "type": "radio",
    "options": [
      {
        value: '1_id',
        label: "Bob"
      },
      {
        value: '2_id',
        label: "Darryl"
      },
      {
        value: '3_id',
        label: "The Hamburgler"
      },
      {
        value: '4_id',
        label: "Moolissa"
      }
    ],
    "answer": "2_id"
  },
];

$(document).ready(function () {
  var s = "<form>";
  for (var i = 0; i < triviaQuestions.length; i++) {

    if (triviaQuestions[i].type == "radio") {
      s += "<div>" + triviaQuestions[i].title + "</div>";
      s += "<ul>";

      const options = triviaQuestions[i].options;
      for (var x = 0; x < options.length; x++) {
        s += `
          <input type='radio' id='${options[x].value}' name='${triviaQuestions[i].title}'>
            <label for='" + i + "'> ${options[x].label} </label>
          </input>
        `;
      }

      s += "</ul>";
      s += "</form>";
    }
  }

  $(".questions").append(s);

})

//funciton check answer
// hide questions, timer Start and Done buttons
// show score of correct vs incorrect answers
// show restart button

function checkAnswers() {
  stop();
  
  
  

  let correctAnswer = 0;
  let incorrectAnswer = 0;
  let unansweredQuestion = 0;
  const totalQuestions = triviaQuestions.length

  $(".questions").addClass("visuallyhidden");
  $("#timer").addClass("visuallyhidden");
  $("#start").addClass("visuallyhidden");
  $("#done").addClass("visuallyhidden");
  $("#restart").removeClass("visuallyhidden");
  $("#endQuiz").removeClass("visuallyhidden");

  // create nested for loop - check if element of trviva questions has been checked and if it's id is the same as it's value (if selected elements value is = answer)
  for (var i = 0; i < triviaQuestions.length; i++) {
    console.log($(`input[name="${triviaQuestions[i].title}"]:checked`).attr('id'))
    
    if ($(`input[name="${triviaQuestions[i].title}"]:checked`).attr('id') === triviaQuestions[i].answer) { //if response is correct
      correctAnswer++;
      //scoredCorrectAnswer.textContent = correctAnswer;
      $('#correct-answerCount').html(`Correct Answers: ${correctAnswer}`); 
      console.log((`Correct Answers: ${correctAnswer} amt`));

    } else if($(`input[name="${triviaQuestions[i].title}"]:checked`).attr('id') === undefined) { //if response is unanswered
      unansweredQuestion++;
      $('#unanswered-count').html(`Unanswered Questions: ${unansweredQuestion}`); 
    }
    
    else { // if response is incorrect
      incorrectAnswer++;
      $('#incorrect-answerCount').html(`Incorrect Answers: ${incorrectAnswer}`); 
    }
     
  }
  //console.log('i', scoredIncorrectAnswer)
  console.log(correctAnswer);
  console.log(unansweredQuestion);
  console.log(incorrectAnswer);
}

function restart() {
  // show questions, timer Start and Done buttons
  // hide score of correct vs incorrect answers
  // hide restart button

  $(".questions").removeClass("visuallyhidden");
  $("#timer").removeClass("visuallyhidden");
  $("#start").removeClass("visuallyhidden");
  $("#done").removeClass("visuallyhidden");
  $("#restart").addClass("visuallyhidden");
  $("#endQuiz").addClass("visuallyhidden");
  reset ();
  run();

}



