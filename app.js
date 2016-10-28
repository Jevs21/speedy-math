// Important Variables
var addDiffLevel = 0;
var subDiffLevel = 0;
var multDiffLevel = 0;
var divDiffLevel = 0;
var ops = []; // Operations that can be generated
var answer = 0; // The answer to the generated problem
var score = 0; // User score
var time = 60; // Time remaining

var operation = "";

// Two operands
var numOne = 0;
var numTwo = 0;

// Number of problems solved
var numProblems = 0;
var totalNumProblems = 0;

// Addition Problem category breakdown
var numAdd = 0;
var totalNumAdd = 0;

// Subtraction Problem category breakdown
var numSub = 0;
var totalNumSub = 0;

// Multiplication Problem category breakdown
var numMult = 0;
var totalNumMult = 0;

// Division Problem category breakdown
var numDiv = 0;
var totalNumDiv = 0;

// Add labels to the difficulty slider
var labels = ['Easy', 'Medium', 'Hard'];
var oneBig = 100 / (labels.length - 1);
$.each(labels, function(key,value){
  var w = oneBig;
  if (key === 0 || key === labels.length - 1)
    w = oneBig / 2;

  $(".legend").append("<label style='width: " + w + "%'>" + value + "</laben>");
});


// Addition Difficulty Slider
$("#addDifficulty-slider").slider({
  range: "max",
  min: 1,
  max: labels.length,
  value: 1,
  slide: function(event, ui) {
    $("#addDiffLevel").val(ui.value);
  }
});

// Subtraction Difficulty Slider
$("#subDifficulty-slider").slider({
  range: "max",
  min: 1,
  max: labels.length,
  value: 1,
  slide: function(event, ui) {
    $("#subDiffLevel").val(ui.value);
  }
});

// Multiplication Difficulty Slider
$("#multDifficulty-slider").slider({
  range: "max",
  min: 1,
  max: labels.length,
  value: 1,
  slide: function(event, ui) {
    $("#multDiffLevel").val(ui.value);
  }
});

// Division Difficulty Slider
$("#divDifficulty-slider").slider({
  range: "max",
  min: 1,
  max: labels.length,
  value: 1,
  slide: function(event, ui) {
    $("#divDiffLevel").val(ui.value);
  }
});

// Detect when a checkbox state changes
$("input[type='checkbox']").change(function() {
  // Show Addition Difficulty Slider
  if (this.id == "add" && this.checked)
    document.getElementById("addSlider").style.display = "";
  // Hide Addition Difficulty Slider
  else if (this.id == "add" && !this.checked)
    document.getElementById("addSlider").style.display = "none";
  // Show Subtraction Difficulty Slider
  if (this.id == "sub" && this.checked)
    document.getElementById("subSlider").style.display = "";
  // Hide Subtraction Difficulty Slider
  else if (this.id == "sub" && !this.checked)
    document.getElementById("subSlider").style.display = "none";
  // Show Multiplication Difficulty Slider
  if (this.id == "mult" && this.checked)
    document.getElementById("multSlider").style.display = "";
  // Hide Multiplication Difficulty Slider
  else if (this.id == "mult" && !this.checked)
    document.getElementById("multSlider").style.display = "none";
  // Show Division Difficulty Slider
  if (this.id == "div" && this.checked)
    document.getElementById("divSlider").style.display = "";
  // Hide Division Difficulty Slider
  else if (this.id == "div" && !this.checked)
    document.getElementById("divSlider").style.display = "none";
});

// Begin the game with the provided settings
function startGame() {
  // Set variables to slider values
  addDiffLevel = $("#addDifficulty-slider").slider("value");
  subDiffLevel = $("#subDifficulty-slider").slider("value");
  multDiffLevel = $("#multDifficulty-slider").slider("value");
  divDiffLevel = $("#divDifficulty-slider").slider("value");

  // If nothing was accepted, do not let the game advance
  if (!document.getElementById("add").checked && !document.getElementById("sub").checked && !document.getElementById("mult").checked && !document.getElementById("div").checked)
	return;

  // Get selected operations
  if (document.getElementById("add").checked)
	  ops.push("add")
  if (document.getElementById("sub").checked)
	  ops.push("sub")
  if (document.getElementById("mult").checked)
	  ops.push("mult")
  if (document.getElementById("div").checked)
	  ops.push("div")

  // Hide start page
  document.getElementById("start").style.display = "none";

  // Show game
  document.getElementById("game").style.display = "";

  // Start the game off by generating a problem
  generateProblem();

  // Start the timer
  setInterval(checkTime, 1000);
}

// Update time and check if the game is over
function checkTime() {
  // Decrement time + update
  document.getElementById("info").innerHTML = "Score: " + score + " | Time: " + time--;

  // Check if game is over
  if (time === 0)
    endGame();
}

function endGame() {
  // Hide game
  document.getElementById("game").style.display = "none";

  // Show the end game page
  document.getElementById("end").style.display = "";

  // Show final score
  document.getElementById("score").innerHTML = score;

  // Show number of problems correctly answered
  document.getElementById("numProblems").innerHTML = numProblems;
  
  // Show number of problems incorrectly answered
  document.getElementById("numWrongProblems").innerHTML = totalNumProblems - numProblems;
  
  // Show number of problems incorrectly answered
  
  // Show problems you got wrong
  if ((totalNumProblems - numProblems) !== 0)
	document.getElementById("wrong").style.display = "";

  // Show accuracy percentage
  document.getElementById("totalAccuracyHead").innerHTML = "Total Accuracy " + "(" + numProblems + "/" + totalNumProblems + ")";
  document.getElementById("totalAccuracy").innerHTML = (numProblems / totalNumProblems).toFixed(2) * 100 + "%";
  document.getElementById("totalAccuracy").style.width = (numProblems / totalNumProblems).toFixed(2) * 100 + "%";
  document.getElementById("totalAccuracy").setAttribute("aria-valuenow", (numProblems / totalNumProblems).toFixed(2) * 100 + "");

  if (document.getElementById("add").checked) {
    // Show progress bar
    document.getElementById("addStats").style.display = "";

    // Show accuracy percentage for addition
	document.getElementById("addAccuracyHead").innerHTML = "Addition Accuracy " + "(" + numAdd + "/" + totalNumAdd + ")";
    document.getElementById("addAccuracy").innerHTML = (numAdd / totalNumAdd).toFixed(2) * 100 + "%";
    document.getElementById("addAccuracy").style.width = (numAdd / totalNumAdd).toFixed(2) * 100 + "%";
    document.getElementById("addAccuracy").setAttribute("aria-valuenow", (numAdd / totalNumAdd).toFixed(2) * 100 + "");
  }
  if (document.getElementById("sub").checked) {
    // Show progress bar
    document.getElementById("subStats").style.display = "";

    // Show accuracy percentage for subtraction
	document.getElementById("subAccuracyHead").innerHTML = "Subtraction Accuracy " + "(" + numSub + "/" + totalNumSub + ")";
    document.getElementById("subAccuracy").innerHTML = (numSub / totalNumSub).toFixed(2) * 100 + "%";
    document.getElementById("subAccuracy").style.width = (numSub / totalNumSub).toFixed(2) * 100 + "%";
    document.getElementById("subAccuracy").setAttribute("aria-valuenow", (numSub / totalNumSub).toFixed(2) * 100 + "");
  }
  if (document.getElementById("mult").checked) {
    // Show progress bar
    document.getElementById("multStats").style.display = "";

    // Show accuracy percentage for multiplication
	document.getElementById("multAccuracyHead").innerHTML = "Multiplication Accuracy " + "(" + numMult + "/" + totalNumMult + ")";
    document.getElementById("multAccuracy").innerHTML = (numMult / totalNumMult).toFixed(2) * 100 + "%";
    document.getElementById("multAccuracy").style.width = (numMult / totalNumMult).toFixed(2) * 100 + "%";
    document.getElementById("multAccuracy").setAttribute("aria-valuenow", (numMult / totalNumMult).toFixed(2) * 100 + "");
  }
  if (document.getElementById("div").checked) {
    // Show progress bar
    document.getElementById("divStats").style.display = "";

    // Show accuracy percentage for division
	document.getElementById("divAccuracyHead").innerHTML = "Division Accuracy " + "(" + numDiv + "/" + totalNumDiv + ")";
    document.getElementById("divAccuracy").innerHTML = (numDiv / totalNumDiv).toFixed(2) * 100 + "%";
    document.getElementById("divAccuracy").style.width = (numDiv / totalNumDiv).toFixed(2) * 100 + "%";
    document.getElementById("divAccuracy").setAttribute("aria-valuenow", (numDiv / totalNumDiv).toFixed(2) * 100 + "");
  }
}

// Listens for when the enter key is pressed
document.getElementById("ans").addEventListener("keyup", function(event) {
  event.preventDefault();

  if (event.keyCode == 13)
    checkAnswer();
});

// Procedurally generate problems
function generateProblem() {
   // Generate the operation
   operation = Math.floor(Math.random() * ops.length);
   operation = ops[operation];

   // Addition
   if (operation == "add") {
      // Generator the operands
      numOne = Math.floor(Math.random() * (addDiffLevel * 10));
      numTwo = Math.floor(Math.random() * (addDiffLevel * 10));

      // Calculate the answer
      answer = numOne + numTwo;

      // Show the problem
      document.getElementById("problem").innerHTML = numOne + " + " + numTwo + " = ??";
   }
   // Subtraction
   else if (operation == "sub") {
      // Generator the operands
      numOne = Math.floor(Math.random() * (subDiffLevel * 10));
      numTwo = Math.floor(Math.random() * (subDiffLevel * 10));

      // Make sure difference is always positive
      while (!(numOne - numTwo > 0)) {
         numOne = Math.floor(Math.random() * (subDiffLevel * 10));
         numTwo = Math.floor(Math.random() * (subDiffLevel * 10));
      }

      // Calculate the answer
      answer = numOne - numTwo;

      // Show the problem
      document.getElementById("problem").innerHTML = numOne + " - " + numTwo + " = ??";
   }
   // Multiplication
   else if (operation == "mult") {
      // Generator the operands
      numOne = Math.floor(Math.random() * (multDiffLevel * 8));
      numTwo = Math.floor(Math.random() * (multDiffLevel * 8));

      // Calculate the answer
      answer = numOne * numTwo;

      // Show the problem
      document.getElementById("problem").innerHTML = numOne + " * " + numTwo + " = ??";
   }
   // Division
   else if (operation == "div") {
      // Generator the operands
      numOne = Math.floor(Math.random() * (divDiffLevel * 8));
      numTwo = Math.floor(Math.random() * (divDiffLevel * 8));

      // Make sure numbers are always divisible
      while (numOne % numTwo !== 0) {
         numOne = Math.floor(Math.random() * (divDiffLevel * 8));
         numTwo = Math.floor(Math.random() * (divDiffLevel * 8));
      }

      // Calculate the answer
      answer = numOne / numTwo;

      // Show the problem
      document.getElementById("problem").innerHTML = numOne + " / " + numTwo + " = ??";
   }
}

// Check if the user answer is correct
function checkAnswer() {
  // Get the user's answer
  var input = document.getElementById("ans").value;

  // If they answered correctly
  if (input.replace(/[.,\/#!$%\^&\*;:{}+=\-_`~()]/g,"") == answer) {
    // Flash green for right answer
	 document.getElementById("ans").style.backgroundColor = "green";
	 setTimeout(function(){
     // Clear background color
		 document.getElementById("ans").style.backgroundColor = "";

		 // Reset text in input field
     document.getElementById("ans").value = "";
	 }, 300);

    // Increment score + update score
    document.getElementById("info").innerHTML = "Score: " + (score += 10) + " | Time: " + time;

    // Increment number of problems solved
    numProblems++;
	  totalNumProblems++;

    // Increment correct problem category for accuracy breakdown
    if (operation == "add") {
      numAdd++;
      totalNumAdd++;
    }
    else if (operation == "sub") {
      numSub++;
      totalNumSub++;
    }
    else if (operation == "mult") {
      numMult++;
      totalNumMult++;
    }
    else if (operation == "div") {
      numDiv++;
      totalNumDiv++;
    }

    // Generate a new problem
    generateProblem();
  }
  // If they answered incorrectly
  else {
	  // Flash red if incorrect
    document.getElementById("ans").style.backgroundColor = "red";
	  setTimeout(function(){
      // Clear background color
  		document.getElementById("ans").style.backgroundColor = "";

  		// Reset text in input field
  		document.getElementById("ans").value = "";
  	}, 500);

     // Increment number of problems faced
	   totalNumProblems++;

     // Increment correct problem category for accuracy breakdown
     if (operation == "add")
       totalNumAdd++;
     else if (operation == "sub")
       totalNumSub++;
     else if (operation == "mult")
       totalNumMult++;
     else if (operation == "div")
       totalNumDiv++;
   
     // Add problem to wrong problem display
	 if (operation == "add") {
		var problem = numOne + " + " + numTwo + " = ??"
		$("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	 }
     else if (operation == "sub") {
		var problem = numOne + " - " + numTwo + " = ??"
		$("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	 }
     else if (operation == "mult") {
		var problem = numOne + " * " + numTwo + " = ??"
		$("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	 }
     else if (operation == "div") {
		var problem = numOne + " / " + numTwo + " = ??"
		$("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	 }

     // Decrement score + update score
     document.getElementById("info").innerHTML = "Score: " + (score -= 10) + " | Time: " + time;
  }
}
