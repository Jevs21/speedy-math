var intAddDiffLevel = 0; // Addition difficulty level
var intSubDiffLevel = 0; // Subtraction difficulty level
var intMultDiffLevel = 0; // Multiplication difficulty level
var intDivDiffLevel = 0; // Division difficulty level
var expDiffLevel = 0; // Exponent difficulty level
var sqDiffLevel = 0; // Perfect sqaure difficulty level
var decAddDiffLevel = 0; // Decimal addition difficulty level
var decSubDiffLevel = 0; // Decimal subtraction difficulty level
var decMultDiffLevel = 0; // Decimal multiplication difficulty level
var decDivDiffLevel = 0; // Decimal division difficulty level

var ops = []; // Operations that can be generated
var answer = 0; // The answer to the generated problem
var score = 0; // User score
var time = 60; // Time remaining
var operation = ""; // Current operation
var numOne = 0; // Operand one
var numTwo = 0; // Operand two
var practiceMode = false; // If it is practice mode or game mode
var labels = ['Easy', 'Medium', 'Hard']; // Labels for difficulty sliders
var problem = ""; // Current problem
var lastProblem = ""; // Last problem to prevent duplicate problems back to back

// Number of problems solved
var numProblems = 0;
var totalNumProblems = 0;

// Addition Problem category breakdown
var numIntAdd = 0;
var totalNumIntAdd = 0;

// Subtraction Problem category breakdown
var numIntSub = 0;
var totalNumIntSub = 0;

// Multiplication Problem category breakdown
var numIntMult = 0;
var totalNumIntMult = 0;

// Division Problem category breakdown
var numIntDiv = 0;
var totalNumIntDiv = 0;

// Exponent Problem category breakdown
var numExp = 0;
var totalNumExp = 0;

// Perfect Square Problem category breakdown
var numSq = 0;
var totalNumSq = 0;

// Decimal addition problem category breakdown
var numDecAdd = 0;
var totalNumDecAdd = 0;

// Decimal subtraction problem category breakdown
var numDecSub = 0;
var totalNumDecSub = 0;

// Decimal multiplication problem category breakdown
var numDecMult = 0;
var totalNumDecMult = 0;

// Decimal division problem category breakdown
var numDecDiv = 0;
var totalNumDecDiv = 0;

// Detect when a checkbox state changes
$("input[type='checkbox']").change(function() {
  // Show Addition Difficulty Slider
  if (this.id == "intAdd" && this.checked)
    document.getElementById("intAddSlider").style.display = "";
  // Hide Addition Difficulty Slider
  else if (this.id == "intAdd" && !this.checked)
    document.getElementById("intAddSlider").style.display = "none";
  // Show Subtraction Difficulty Slider
  if (this.id == "intSub" && this.checked)
    document.getElementById("intSubSlider").style.display = "";
  // Hide Subtraction Difficulty Slider
  else if (this.id == "intSub" && !this.checked)
    document.getElementById("intSubSlider").style.display = "none";
  // Show Multiplication Difficulty Slider
  if (this.id == "intMult" && this.checked)
    document.getElementById("intMultSlider").style.display = "";
  // Hide Multiplication Difficulty Slider
  else if (this.id == "intMult" && !this.checked)
    document.getElementById("intMultSlider").style.display = "none";
  // Show Division Difficulty Slider
  if (this.id == "intDiv" && this.checked)
    document.getElementById("intDivSlider").style.display = "";
  // Hide Division Difficulty Slider
  else if (this.id == "intDiv" && !this.checked)
    document.getElementById("intDivSlider").style.display = "none";
  // Show Exponent Difficulty Slider
  if (this.id == "exp" && this.checked)
    document.getElementById("expSlider").style.display = "";
  // Hide Exponent Difficulty Slider
  else if (this.id == "exp" && !this.checked)
    document.getElementById("expSlider").style.display = "none";
  // Show Perfect Square Difficulty Slider
  if (this.id == "sq" && this.checked)
    document.getElementById("sqSlider").style.display = "";
  // Hide Perfect Square Difficulty Slider
  else if (this.id == "sq" && !this.checked)
    document.getElementById("sqSlider").style.display = "none";
  // Show Decimal Addition Difficulty Slider
  if (this.id == "decAdd" && this.checked)
    document.getElementById("decAddSlider").style.display = "";
  // Hide Decimal Addition Difficulty Slider
  else if (this.id == "decAdd" && !this.checked)
    document.getElementById("decAddSlider").style.display = "none";
	// Show Decimal Subtraction Difficulty Slider
  if (this.id == "decSub" && this.checked)
    document.getElementById("decSubSlider").style.display = "";
  // Hide Decimal Subtraction Difficulty Slider
  else if (this.id == "decSub" && !this.checked)
    document.getElementById("decSubSlider").style.display = "none";
	// Show Decimal Multiplication Difficulty Slider
  if (this.id == "decMult" && this.checked)
    document.getElementById("decMultSlider").style.display = "";
  // Hide Decimal Multiplication Difficulty Slider
  else if (this.id == "decMult" && !this.checked)
    document.getElementById("decMultSlider").style.display = "none";
  // Show Decimal Division Difficulty Slider
  if (this.id == "decDiv" && this.checked)
    document.getElementById("decDivSlider").style.display = "";
  // Hide Decimal Division Difficulty Slider
  else if (this.id == "decDiv" && !this.checked)
    document.getElementById("decDivSlider").style.display = "none";
});

// Listen key click
document.getElementById("ans").addEventListener("keyup", function(event) {
  event.preventDefault();

  // If user hits enter key
  if (event.keyCode == 13)
    checkAnswer();

  // If user hits space key
  if (event.keyCode == 32) {
	 document.getElementById("ans").value = "";
	  generateProblem();
  }
});

// When the document loads, initialize the sliders
$(document).ready(function() {
	initializeSliders();
});

// Add labels to the difficulty slider
var oneBig = 100 / (labels.length - 1);
$.each(labels, function(key,value){
  var w = oneBig;
  if (key === 0 || key === labels.length - 1)
    w = oneBig / 2;

  $(".legend").append("<label style='width: " + w + "%'>" + value + "</laben>");
});

// Make the sliders
function initializeSliders() {
	// Addition Difficulty Slider
	$("#intAddDifficulty-slider").slider({
	  range: "max",
	  min: 1,
	  max: labels.length,
	  value: 1,
	  slide: function(event, ui) {
		    $("#intAddDiffLevel").val(ui.value);
	  }
	});

	// Subtraction Difficulty Slider
	$("#intSubDifficulty-slider").slider({
	  range: "max",
	  min: 1,
	  max: labels.length,
	  value: 1,
	  slide: function(event, ui) {
		    $("#intSubDiffLevel").val(ui.value);
	  }
	});

	// Multiplication Difficulty Slider
	$("#intMultDifficulty-slider").slider({
	  range: "max",
	  min: 1,
	  max: labels.length,
	  value: 1,
	  slide: function(event, ui) {
		    $("#intMultDiffLevel").val(ui.value);
	  }
	});

	// Division Difficulty Slider
	$("#intDivDifficulty-slider").slider({
	  range: "max",
	  min: 1,
	  max: labels.length,
	  value: 1,
	  slide: function(event, ui) {
		    $("#intDivDiffLevel").val(ui.value);
	  }
	});

	// Exponents Difficulty Slider
	$("#expDifficulty-slider").slider({
	  range: "max",
	  min: 1,
	  max: labels.length,
	  value: 1,
	  slide: function(event, ui) {
		    $("#expDiffLevel").val(ui.value);
	  }
	});

	// Perfect Squares Difficulty Slider
	$("#sqDifficulty-slider").slider({
	  range: "max",
	  min: 1,
	  max: labels.length,
	  value: 1,
	  slide: function(event, ui) {
		    $("#sqDiffLevel").val(ui.value);
	  }
	});

    // Decimal Addition Difficulty Slider
	$("#decAddDifficulty-slider").slider({
	  range: "max",
	  min: 1,
	  max: labels.length,
	  value: 1,
	  slide: function(event, ui) {
		    $("#decAddDiffLevel").val(ui.value);
	  }
	});

	// Decimal Subtraction Difficulty Slider
	$("#decSubDifficulty-slider").slider({
	  range: "max",
	  min: 1,
	  max: labels.length,
	  value: 1,
	  slide: function(event, ui) {
		    $("#decSubDiffLevel").val(ui.value);
	  }
	});

	// Decimal Multiplication Difficulty Slider
	$("#decMultDifficulty-slider").slider({
	  range: "max",
	  min: 1,
	  max: labels.length,
	  value: 1,
	  slide: function(event, ui) {
		    $("#decMultDiffLevel").val(ui.value);
	  }
	});

	// Decimal Division Difficulty Slider
	$("#decDivDifficulty-slider").slider({
	  range: "max",
	  min: 1,
	  max: labels.length,
	  value: 1,
	  slide: function(event, ui) {
		    $("#decDivDiffLevel").val(ui.value);
	  }
	});
}

function startPractice() {
  // Set it to practice mode
  practiceMode = true;

  // Hide scoreboard
  document.getElementById("info").style.display = "none";

  // Show quit button
  document.getElementById("quitGame").style.display = "none";
  document.getElementById("quitPractice").style.display = "";

  // If nothing was accepted, do not let the game advance
  if (!document.getElementById("intAdd").checked && !document.getElementById("intSub").checked && !document.getElementById("intMult").checked && !document.getElementById("intDiv").checked && !document.getElementById("exp").checked && !document.getElementById("sq").checked && !document.getElementById("decAdd").checked && !document.getElementById("decSub").checked && !document.getElementById("decMult").checked && !document.getElementById("decDiv").checked)
	 return;

   getDiffLevels();
   getOperations();

  // Hide start page
  document.getElementById("start").style.display = "none";

  // Show game
  document.getElementById("game").style.display = "";

  // Start the game off by generating a problem
  generateProblem();
}

// Begin the game with the provided settings
function startGame() {
  practiceMode = false;

  getDiffLevels();
  getOperations();

  // Show quit button
  document.getElementById("quitPractice").style.display = "none";
  document.getElementById("quitGame").style.display = "";

  // If nothing was accepted, do not let the game advance
  if (!document.getElementById("intAdd").checked && !document.getElementById("intSub").checked && !document.getElementById("intMult").checked && !document.getElementById("intDiv").checked && !document.getElementById("exp").checked && !document.getElementById("sq").checked && !document.getElementById("decAdd").checked && !document.getElementById("decSub").checked && !document.getElementById("decMult").checked && !document.getElementById("decDiv").checked)
	 return;

  // Hide start page
  document.getElementById("start").style.display = "none";

  // Show game
  document.getElementById("game").style.display = "";

  // Start the game off by generating a problem
  generateProblem();

  // Start the timer
  setInterval(checkTime, 1000);
}

function endPractice() {
  // Hide game
  document.getElementById("game").style.display = "none";

  // Show the end game page
  document.getElementById("end").style.display = "";

  // Show final score
  document.getElementById("score").innerHTML = "N/A";

  // Show number of problems correctly answered
  document.getElementById("numProblems").innerHTML = numProblems;

  // Show number of problems incorrectly answered
  document.getElementById("numWrongProblems").innerHTML = totalNumProblems - numProblems;

  // Show problems you got wrong
  if ((totalNumProblems - numProblems) !== 0)
	 document.getElementById("wrong").style.display = "";

   makeAccuracyBars();
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

  // Show problems you got wrong
  if ((totalNumProblems - numProblems) !== 0)
	 document.getElementById("wrong").style.display = "";

  makeAccuracyBars();
}

function goHome() {
	// Hide the end game panel
	document.getElementById("end").style.display = "none";

	// Show the start game panel
	document.getElementById("start").style.display = "";

  // Uncheck all boxes
  $("input:checkbox").prop('checked', false);

  // Reset operations array
  ops = [];

	// Reset problem stats
	numProblems = totalNumProblems = 0;
	numIntAdd = totalNumIntAdd = 0;
	numIntSub = totalNumIntSub = 0;
	numIntMult = totalNumIntMult = 0;
	numIntDiv = totalNumIntDiv = 0;
	numExp = totalNumExp = 0;
	numSq = totalNumSq = 0;
  numDecAdd = totalNumDecAdd = 0;
	numDecSub = totalNumDecSub = 0;
	numDecMult = totalNumDecMult = 0;
	numDecDiv = totalNumDecDiv = 0;

	// Reset difficulty levels
	intAddDiffLevel = intSubDiffLevel = intMultDiffLevel = intDivDiffLevel = expDiffLevel = sqDiffLevel = decAddDiffLevel = decSubDiffLevel = decMultDiffLevel = decDivDiffLevel = 0;

	// Reinitialize the sliders
	initializeSliders();

	// Rehide all sliders
	document.getElementById("intAddSlider").style.display = "none";
	document.getElementById("intSubSlider").style.display = "none";
	document.getElementById("intMultSlider").style.display = "none";
	document.getElementById("intDivSlider").style.display = "none";
	document.getElementById("expSlider").style.display = "none";
	document.getElementById("sqSlider").style.display = "none";
  document.getElementById("decAddSlider").style.display = "none";
	document.getElementById("decSubSlider").style.display = "none";
	document.getElementById("decMultSlider").style.display = "none";
	document.getElementById("decDivSlider").style.display = "none";

	// Reset score
	score = 0;

  // Clear timer interval function
  for (var i = 1; i < 99999; i++)
        window.clearInterval(i);

  // Reset time
  time = 60;
}

function getOperations() {
  // Get selected operations
  if (document.getElementById("intAdd").checked)
	  ops.push("intAdd")
  if (document.getElementById("intSub").checked)
	  ops.push("intSub")
  if (document.getElementById("intMult").checked)
	  ops.push("intMult")
  if (document.getElementById("intDiv").checked)
	  ops.push("intDiv")
  if (document.getElementById("exp").checked)
    ops.push("exp")
  if (document.getElementById("sq").checked)
    ops.push("sq")
  if (document.getElementById("decAdd").checked)
    ops.push("decAdd")
  if (document.getElementById("decSub").checked)
    ops.push("decSub")
  if (document.getElementById("decMult").checked)
    ops.push("decMult")
  if (document.getElementById("decDiv").checked)
    ops.push("decDiv")
}

function getDiffLevels() {
  // Set variables to slider values
  intAddDiffLevel = $("#intAddDifficulty-slider").slider("value");
  intSubDiffLevel = $("#intSubDifficulty-slider").slider("value");
  intMultDiffLevel = $("#intMultDifficulty-slider").slider("value");
  intDivDiffLevel = $("#intDivDifficulty-slider").slider("value");
  expDiffLevel = $("#expDifficulty-slider").slider("value");
  sqDiffLevel = $("#sqDifficulty-slider").slider("value");
  decAddDiffLevel = $("#decAddDifficulty-slider").slider("value");
  decSubDiffLevel = $("#decSubDifficulty-slider").slider("value");
  decMultDiffLevel = $("#decMultDifficulty-slider").slider("value");
  decDivDiffLevel = $("#decDivDifficulty-slider").slider("value");
}

// Display all accuracy bars for each category
function makeAccuracyBars() {
  // Hide all bars just in case
  document.getElementById("intAddStats").style.display = "none";
  document.getElementById("intSubStats").style.display = "none";
  document.getElementById("intMultStats").style.display = "none";
  document.getElementById("intDivStats").style.display = "none";
  document.getElementById("expStats").style.display = "none";
  document.getElementById("sqStats").style.display = "none";
  document.getElementById("decAddStats").style.display = "none";
  document.getElementById("decSubStats").style.display = "none";
  document.getElementById("decMultStats").style.display = "none";
  document.getElementById("decDivStats").style.display = "none";

  // Show accuracy percentage
  document.getElementById("totalAccuracyHead").innerHTML = "Total Accuracy " + "(" + numProblems + "/" + totalNumProblems + ")";
  document.getElementById("totalAccuracy").innerHTML = (numProblems / totalNumProblems).toFixed(2) * 100 + "%";
  document.getElementById("totalAccuracy").style.width = (numProblems / totalNumProblems).toFixed(2) * 100 + "%";
  document.getElementById("totalAccuracy").setAttribute("aria-valuenow", (numProblems / totalNumProblems).toFixed(2) * 100 + "");

  if (document.getElementById("intAdd").checked) {
    // Show progress bar
    document.getElementById("intAddStats").style.display = "";

    // Show accuracy percentage for addition
	  document.getElementById("intAddAccuracyHead").innerHTML = labels[intAddDiffLevel - 1] + " Addition Accuracy " + "(" + numIntAdd + "/" + totalNumIntAdd + ")";
    document.getElementById("intAddAccuracy").innerHTML = (numIntAdd / totalNumIntAdd).toFixed(2) * 100 + "%";
    document.getElementById("intAddAccuracy").style.width = (numIntAdd / totalNumIntAdd).toFixed(2) * 100 + "%";
    document.getElementById("intAddAccuracy").setAttribute("aria-valuenow", (numIntAdd / totalNumIntAdd).toFixed(2) * 100 + "");
  }
  if (document.getElementById("intSub").checked) {
    // Show progress bar
    document.getElementById("intSubStats").style.display = "";

    // Show accuracy percentage for subtraction
	  document.getElementById("intSubAccuracyHead").innerHTML = labels[intSubDiffLevel - 1] + " Subtraction Accuracy " + "(" + numIntSub + "/" + totalNumIntSub + ")";
    document.getElementById("intSubAccuracy").innerHTML = (numIntSub / totalNumIntSub).toFixed(2) * 100 + "%";
    document.getElementById("intSubAccuracy").style.width = (numIntSub / totalNumIntSub).toFixed(2) * 100 + "%";
    document.getElementById("intSubAccuracy").setAttribute("aria-valuenow", (numIntSub / totalNumIntSub).toFixed(2) * 100 + "");
  }
  if (document.getElementById("intMult").checked) {
    // Show progress bar
    document.getElementById("intMultStats").style.display = "";

    // Show accuracy percentage for multiplication
	  document.getElementById("intMultAccuracyHead").innerHTML = labels[intMultDiffLevel - 1] + " Multiplication Accuracy " + "(" + numIntMult + "/" + totalNumIntMult + ")";
    document.getElementById("intMultAccuracy").innerHTML = (numIntMult / totalNumIntMult).toFixed(2) * 100 + "%";
    document.getElementById("intMultAccuracy").style.width = (numIntMult / totalNumIntMult).toFixed(2) * 100 + "%";
    document.getElementById("intMultAccuracy").setAttribute("aria-valuenow", (numIntMult / totalNumIntMult).toFixed(2) * 100 + "");
  }
  if (document.getElementById("intDiv").checked) {
    // Show progress bar
    document.getElementById("intDivStats").style.display = "";

    // Show accuracy percentage for division
	  document.getElementById("intDivAccuracyHead").innerHTML = labels[intDivDiffLevel - 1] + " Division Accuracy " + "(" + numIntDiv + "/" + totalNumIntDiv + ")";
    document.getElementById("intDivAccuracy").innerHTML = (numIntDiv / totalNumIntDiv).toFixed(2) * 100 + "%";
    document.getElementById("intDivAccuracy").style.width = (numIntDiv / totalNumIntDiv).toFixed(2) * 100 + "%";
    document.getElementById("intDivAccuracy").setAttribute("aria-valuenow", (numIntDiv / totalNumIntDiv).toFixed(2) * 100 + "");
  }
  if (document.getElementById("exp").checked) {
    // Show progress bar
    document.getElementById("expStats").style.display = "";

    // Show accuracy percentage for exponents
	  document.getElementById("expAccuracyHead").innerHTML = labels[expDiffLevel - 1] + " Exponents Accuracy " + "(" + numExp + "/" + totalNumExp + ")";
    document.getElementById("expAccuracy").innerHTML = (numExp / totalNumExp).toFixed(2) * 100 + "%";
    document.getElementById("expAccuracy").style.width = (numExp / totalNumExp).toFixed(2) * 100 + "%";
    document.getElementById("expAccuracy").setAttribute("aria-valuenow", (numExp / totalNumExp).toFixed(2) * 100 + "");
  }
  if (document.getElementById("sq").checked) {
    // Show progress bar
    document.getElementById("sqStats").style.display = "";

    // Show accuracy percentage for perfect squares
	  document.getElementById("sqAccuracyHead").innerHTML = labels[sqDiffLevel - 1] + " Perfect Squares Accuracy " + "(" + numSq + "/" + totalNumSq + ")";
    document.getElementById("sqAccuracy").innerHTML = (numSq / totalNumSq).toFixed(2) * 100 + "%";
    document.getElementById("sqAccuracy").style.width = (numSq / totalNumSq).toFixed(2) * 100 + "%";
    document.getElementById("sqAccuracy").setAttribute("aria-valuenow", (numSq / totalNumSq).toFixed(2) * 100 + "");
  }
  if (document.getElementById("decAdd").checked) {
    // Show progress bar
    document.getElementById("decAddStats").style.display = "";

    // Show accuracy percentage for decimal addition
	document.getElementById("decAddAccuracyHead").innerHTML = labels[decAddDiffLevel - 1] + " Decimal Addition Accuracy " + "(" + numDecAdd + "/" + totalNumDecAdd + ")";
    document.getElementById("decAddAccuracy").innerHTML = (numDecAdd / totalNumDecAdd).toFixed(2) * 100 + "%";
    document.getElementById("decAddAccuracy").style.width = (numDecAdd / totalNumDecAdd).toFixed(2) * 100 + "%";
    document.getElementById("decAddAccuracy").setAttribute("aria-valuenow", (numDecAdd / totalNumDecAdd).toFixed(2) * 100 + "");
  }
  if (document.getElementById("decSub").checked) {
    // Show progress bar
    document.getElementById("decSubStats").style.display = "";

    // Show accuracy percentage for decimal subtraction
	document.getElementById("decSubAccuracyHead").innerHTML = labels[decSubDiffLevel - 1] + " Decimal Subtraction Accuracy " + "(" + numDecSub + "/" + totalNumDecSub + ")";
    document.getElementById("decSubAccuracy").innerHTML = (numDecSub / totalNumDecSub).toFixed(2) * 100 + "%";
    document.getElementById("decSubAccuracy").style.width = (numDecSub / totalNumDecSub).toFixed(2) * 100 + "%";
    document.getElementById("decSubAccuracy").setAttribute("aria-valuenow", (numDecSub / totalNumDecSub).toFixed(2) * 100 + "");
  }
  if (document.getElementById("decMult").checked) {
    // Show progress bar
    document.getElementById("decMultStats").style.display = "";

    // Show accuracy percentage for decimal multiplication
	document.getElementById("decMultAccuracyHead").innerHTML = labels[decMultDiffLevel - 1] + " Decimal Multiplication Accuracy " + "(" + numDecMult + "/" + totalNumDecMult + ")";
    document.getElementById("decMultAccuracy").innerHTML = (numDecMult / totalNumDecMult).toFixed(2) * 100 + "%";
    document.getElementById("decMultAccuracy").style.width = (numDecMult / totalNumDecMult).toFixed(2) * 100 + "%";
    document.getElementById("decMultAccuracy").setAttribute("aria-valuenow", (numDecMult / totalNumDecMult).toFixed(2) * 100 + "");
  }
  if (document.getElementById("decDiv").checked) {
    // Show progress bar
    document.getElementById("decDivStats").style.display = "";

    // Show accuracy percentage for decimal multiplication
	document.getElementById("decDivAccuracyHead").innerHTML = labels[decDivDiffLevel - 1] + " Decimal Division Accuracy " + "(" + numDecDiv + "/" + totalNumDecDiv + ")";
    document.getElementById("decDivAccuracy").innerHTML = (numDecDiv / totalNumDecDiv).toFixed(2) * 100 + "%";
    document.getElementById("decDivAccuracy").style.width = (numDecDiv / totalNumDecDiv).toFixed(2) * 100 + "%";
    document.getElementById("decDivAccuracy").setAttribute("aria-valuenow", (numDecDiv / totalNumDecDiv).toFixed(2) * 100 + "");
  }
}

// Update time and check if the game is over
function checkTime() {
  // Decrement time + update
  document.getElementById("info").innerHTML = "Score: " + score + " | Time: " + time--;

  // Check if game is over
  if (time === 0)
    endGame();
}

// Procedurally generate problems
function generateProblem() {
   // Generate the operation
   operation = Math.floor(Math.random() * ops.length);
   operation = ops[operation];

   // Addition
   if (operation == "intAdd") {
      lastProblem = problem;

      while (lastProblem == problem) {
        // Generator the operands
        numOne = Math.floor(Math.random() * (intAddDiffLevel * 10));
        numTwo = Math.floor(Math.random() * (intAddDiffLevel * 10));

        problem = numOne + " + " + numTwo + " = ??"
      }

      // Calculate the answer
      answer = numOne + numTwo;

      // Show the problem
      document.getElementById("problem").innerHTML = problem;
   }
   // Subtraction
   else if (operation == "intSub") {
      lastProblem = problem;

      while (lastProblem == problem) {
        // Generator the operands
        numOne = Math.floor(Math.random() * (intSubDiffLevel * 10));
        numTwo = Math.floor(Math.random() * (intSubDiffLevel * 10));
        problem = numOne + " - " + numTwo + " = ??"

        // Make sure difference is always positive
        while (!(numOne - numTwo > 0)) {
           numOne = Math.floor(Math.random() * (intSubDiffLevel * 10));
           numTwo = Math.floor(Math.random() * (intSubDiffLevel * 10));
           problem = numOne + " - " + numTwo + " = ??"
        }
      }

      // Calculate the answer
      answer = numOne - numTwo;

      // Show the problem
      document.getElementById("problem").innerHTML = problem;
   }
   // Multiplication
   else if (operation == "intMult") {
      lastProblem = problem;

      while (lastProblem == problem) {
        // Generator the operands
        numOne = Math.floor(Math.random() * (intMultDiffLevel * 8));
        numTwo = Math.floor(Math.random() * (intMultDiffLevel * 8));

        problem = numOne + " x " + numTwo + " = ??"
      }

      // Calculate the answer
      answer = numOne * numTwo;

      // Show the problem
      document.getElementById("problem").innerHTML = numOne + " x " + numTwo + " = ??";
   }
   // Division
   else if (operation == "intDiv") {
      lastProblem = problem;

      while (lastProblem == problem) {
        // Generator the operands
        numOne = Math.floor(Math.random() * (intDivDiffLevel * 13));
        numTwo = Math.floor(Math.random() * (intDivDiffLevel * 10));
        problem = numOne + " / " + numTwo + " = ??"

        // Make sure numbers are always divisible
        while (numOne % numTwo !== 0) {
           numOne = Math.floor(Math.random() * (intDivDiffLevel * 13));
           numTwo = Math.floor(Math.random() * (intDivDiffLevel * 10));
           problem = numOne + " / " + numTwo + " = ??"
        }
      }

      // Calculate the answer
      answer = numOne / numTwo;

      // Show the problem
      document.getElementById("problem").innerHTML = problem;
   }
   else if (operation == "exp") {
     lastProblem = problem;

     while (lastProblem == problem) {
       // Generator the operands
       numOne = Math.floor(Math.random() * (expDiffLevel * 10));
       numTwo = Math.floor(Math.random() * (expDiffLevel * 4));

       problem = numOne + "<sup>" + numTwo + "</sup> = ??";
     }

     // Calcuate answer
     answer = Math.pow(numOne, numTwo);

     // Show the problem
     document.getElementById("problem").innerHTML = problem;
   }
   else if (operation == "sq") {
     lastProblem = problem;

     while (lastProblem == problem) {
       // Generate operands
       numOne = Math.floor(Math.random() * (sqDiffLevel * 7));
       numTwo = Math.pow(numOne, 2);

       problem = '&radic;<span style="text-decoration:overline;">&nbsp;' + numTwo + '&nbsp;</span>';
     }

     // Calcuate answer
     answer = numOne;

     // Show the problem
     document.getElementById("problem").innerHTML = problem;
   }

   else if (operation == "decAdd") {
     lastProblem = problem;

     while (lastProblem == problem) {
       // Generate operands
       numOne = (Math.random() * 10 * decAddDiffLevel).toFixed(1);
       numTwo = (Math.random() * 10 * decAddDiffLevel).toFixed(1);

       problem = numOne + " + " + numTwo + " = ??";
     }

     // Calcuate answer
     answer = (parseFloat(numOne) + parseFloat(numTwo)).toFixed(1);

     // Show the problem
     document.getElementById("problem").innerHTML = problem;
   }
   else if (operation == "decSub") {
	 lastProblem = problem;

     while (lastProblem == problem) {
		 // Generate operands
		 numOne = (Math.random() * 10 * decSubDiffLevel).toFixed(1);
		 numTwo = (Math.random() * 10 * decSubDiffLevel).toFixed(1);

         problem = numOne + " - " + numTwo + " = ??";

       while (!((parseFloat(numOne) - parseFloat(numTwo)) > 0)) {
           // Generate operands
		   numOne = (Math.random() * 10 * decSubDiffLevel).toFixed(1);
		   numTwo = (Math.random() * 10 * decSubDiffLevel).toFixed(1);

           problem = numOne + " - " + numTwo + " = ??";
        }
     }

     // Calcuate answer
     answer = (parseFloat(numOne) - parseFloat(numTwo)).toFixed(1);

     // Show the problem
     document.getElementById("problem").innerHTML = problem;
   }
   else if (operation == "decMult") {
	   lastProblem = problem;

	   while (lastProblem == problem) {
		   // Generate operands
		   numOne = (Math.random() * 10 * decMultDiffLevel).toFixed(1);
		   numTwo = Math.floor(Math.random() * 10 * decMultDiffLevel);

		   problem = numOne + " x " + numTwo + " = ??";
	   }

	   // Calcuate answer
     answer = (parseFloat(numOne) * parseFloat(numTwo)).toFixed(1);

	   // Show the problem
     document.getElementById("problem").innerHTML = problem;
   }
   else if (operation == "decDiv") {
	   lastProblem = problem;

	   while (lastProblem == problem) {
		   // Generate operands
		   numOne = (Math.random() * 10 * decMultDiffLevel).toFixed(1);
		   numTwo = (Math.random() * 10 * decMultDiffLevel).toFixed(1);
		   problem = numOne + " / " + numTwo + " = ??";

       // Check if decimals are divisible
		   while ((parseFloat(numOne) % parseFloat(numTwo)).toFixed(1) > .00001) {
			   numOne = (Math.random() * 14 * decMultDiffLevel).toFixed(1);
		     numTwo = (Math.random() * 7 * decMultDiffLevel).toFixed(1);

			   problem = numOne + " / " + numTwo + " = ??";
		   }
	   }

	   // Calculate the answer
      answer = (parseFloat(numOne) / parseFloat(numTwo)).toFixed(1);

      // Show the problem
      document.getElementById("problem").innerHTML = problem;
   }
}

function getMultiplier() {
  var num = 1;

  // Assign operation difficulty multiplier
  if (operation == "intAdd")
    num *= intAddDiffLevel;
  else if (operation == "intSub")
    num *= intSubDiffLevel;
  else if (operation == "intMult")
    num *= intMultDiffLevel;
  else if (operation == "intDiv")
    num *= intDivDiffLevel;
  else if (operation == "exp")
    num *= expDiffLevel;
  else if (operation == "sq")
    num *= sqDiffLevel;
  else if (operation == "decAdd")
    num *= decAddDiffLevel;
  else if (operation == "decSub")
    num *= decSubDiffLevel;
  else if (operation == "decMult")
    num *= decMultDiffLevel;
  else if (operation == "decDiv")
    num *= decDivDiffLevel;

  return num;
}

// Check if the user answer is correct
function checkAnswer() {
  // Get the user's answer
  var input = document.getElementById("ans").value;

  // Add decimal .0 after answer if doing decimal stuff
  if (operation.includes("dec") && !input.includes("."))
    input += ".0";

  // If they answered correctly
  if (input.replace(/[,\/#!$%\^&\*;:{}+=\-_`~()]/g,"") == answer) {
    // Flash green for right answer
	 document.getElementById("ans").style.backgroundColor = "green";
	 setTimeout(function(){
     // Clear background color
		 document.getElementById("ans").style.backgroundColor = "";

		 // Reset text in input field
     document.getElementById("ans").value = "";
	 }, 300);

    // Increment score + update score
    if (!practiceMode) {
      var multiplier = 1;

      // Assign number of operations multiplier
      multiplier = getMultiplier();

      document.getElementById("info").innerHTML = "Score: " + (score += (10 * multiplier)) + " | Time: " + time;
    }

    // Increment number of problems solved
    numProblems++;
	  totalNumProblems++;

    // Increment correct problem category for accuracy breakdown
    if (operation == "intAdd") {
      numIntAdd++;
      totalNumIntAdd++;
    }
    else if (operation == "intSub") {
      numIntSub++;
      totalNumIntSub++;
    }
    else if (operation == "intMult") {
      numIntMult++;
      totalNumIntMult++;
    }
    else if (operation == "intDiv") {
      numIntDiv++;
      totalNumIntDiv++;
    }
    else if (operation == "exp") {
      numExp++;
      totalNumExp++;
    }
    else if (operation == "sq") {
      numSq++;
      totalNumSq++;
    }
    else if (operation == "decAdd") {
      numDecAdd++;
      totalNumDecAdd++;
    }
	  else if (operation == "decSub") {
      numDecSub++;
      totalNumDecSub++;
    }
	  else if (operation == "decMult") {
      numDecMult++;
      totalNumDecMult++;
    }
	  else if (operation == "decDiv") {
      numDecDiv++;
      totalNumDecDiv++;
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

     // Increment problem category for accuracy breakdown
     if (operation == "intAdd")
       totalNumIntAdd++;
     else if (operation == "intSub")
       totalNumIntSub++;
     else if (operation == "intMult")
       totalNumIntMult++;
     else if (operation == "intDiv")
       totalNumIntDiv++;
     else if (operation == "exp")
       totalNumExp++;
     else if (operation == "sq")
       totalNumSq++;
     else if (operation == "decAdd")
       totalNumDecAdd++;
     else if (operation == "decSub")
	     totalNumDecSub++;
     else if (operation == "decMult")
       totalNumDecMult++;
     else if (operation == "decDiv")
	     totalNumDecDiv++;

     // Add problem to wrong problem display
	   if (operation == "intAdd") {
		   var problem = numOne + " + " + numTwo + " = ??"
		   $("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	   }
     else if (operation == "intSub") {
		   var problem = numOne + " - " + numTwo + " = ??"
		   $("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	   }
     else if (operation == "intMult") {
		   var problem = numOne + " * " + numTwo + " = ??"
		   $("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	   }
     else if (operation == "intDiv") {
		   var problem = numOne + " / " + numTwo + " = ??"
		   $("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	   }
     else if (operation == "exp") {
		   var problem = numOne + "<sup>" + numTwo + "</sup> = ??"
		   $("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	   }
     else if (operation == "sq") {
		   var problem = '&radic;<span style="text-decoration:overline;">&nbsp;' + numTwo + '&nbsp;</span>';
		   $("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + numOne + '</p> </a>');
	   }
     else if (operation == "decAdd") {
		   var problem = numOne + " + " + numTwo + " = ??"
		   $("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	   }
	  else if (operation == "decSub") {
		   var problem = numOne + " - " + numTwo + " = ??"
		   $("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	   }
	   else if (operation == "decMult") {
		   var problem = numOne + " x " + numTwo + " = ??"
		   $("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	   }
	   else if (operation == "decDiv") {
		   var problem = numOne + " / " + numTwo + " = ??"
		   $("#wrongProblem").append('<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">' + problem + '</h5> <p class="list-group-item-text"><b>Your Answer: </b>' + input +  '<br> <b>Correct: </b>'  + answer + '</p> </a>');
	   }

     // Decrement score + update score
     if (!practiceMode) {
       var multiplier = 1;

       // Assign number of operations multiplier
       multiplier = getMultiplier();

       document.getElementById("info").innerHTML = "Score: " + (score -= (10 * multiplier)) + " | Time: " + time;
     }
  }
}
