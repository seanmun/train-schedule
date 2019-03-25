// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyAgxHfawTBvJUxcGXOEw2RpNVsxcqkp1A8",
  authDomain: "moneyneversleeps-b2982.firebaseapp.com",
  databaseURL: "https://moneyneversleeps-b2982.firebaseio.com",
  projectId: "moneyneversleeps-b2982",
  storageBucket: "moneyneversleeps-b2982.appspot.com",
  messagingSenderId: "996762236644"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDes = $("#destination-input").val().trim();
  var trainFirst = moment($("#first-input").val().trim(), "HH:mm").format("HH:mm");
  var trainFreq = $("#freq-input").val().trim();
  var currentTime = moment();
	console.log("Current: " +  moment(currentTime).format("HH:mm"));
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDes,
    first: trainFirst,
    frequency: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  //Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);


  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");

});

// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDes = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().frequency;

    // console.log(trainName);
    // console.log(trainDes);
    // console.log(trainFirst);
    // console.log(trainFreq);

    var trainFirstPretty = moment(trainFirst, "HH:mm");
    console.log("first train: " + trainFirstPretty);
    
    //calculate difference between times
		var difference =  moment().diff(moment(trainFirstPretty),"minutes");
    console.log("Difference " + difference);
    
    //time apart(remainder)
		var trainRemain = difference % trainFreq;
    console.log("trainRemian: " + trainRemain);
    
    //minutes until arrival
		var minAway = trainFreq - trainRemain;
    console.log("Min Away " + minAway);
    
    //next arrival time
		var nextArrival = moment().add(minAway, "minutes").format('HH:mm');
    console.log("Next " + nextArrival);

  // Create the new row
  var newEntry = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDes),
    $("<td>").text(trainFreq),
    $("<td>").text(nextArrival),
    $("<td>").text(minAway)
  );

//   // Append the new row to the table
  $("#train-table > tbody").append(newEntry);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
