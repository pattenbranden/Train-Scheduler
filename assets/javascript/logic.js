$(document).ready(function(){
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA4F1E0xmpl_LHfyFT8dKriyQq0GFmzFtw",
  authDomain: "train-schedule-34696.firebaseapp.com",
  databaseURL: "https://train-schedule-34696.firebaseio.com",
  projectId: "train-schedule-34696",
  storageBucket: "train-schedule-34696.appspot.com",
  messagingSenderId: "985738958694",
  appId: "1:985738958694:web:f86876d559ed730a0f9aa7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var trainName;
var trainLine;
var dest;
var depart;
var interval;


function addTrainLine() {

  trainName = $("#train-input").val().trim();
  dest = $("#dest-input").val().trim();
  depart = $("#depart-input").val().trim();
  interval = $("#inter-input").val().trim();

  var trainLine = {
    trainName: trainName,
    dest: dest,
    depart: depart,
    interval: interval
  };
  console.log(trainLine)

  database.ref().push(trainLine);

  // Clears all of the text-boxes
   $("#train-input").val("");
   $("#dest-input").val("");
   $("#depart-input").val("");
   $("#inter-input").val("");

}
$("#submitLine").on("click", function (event) {
  event.preventDefault();
  addTrainLine()
})

database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var dest = childSnapshot.val().dest;
  var depart = childSnapshot.val().depart;
  var interval = childSnapshot.val().interval;


   // Declare variable
    var trainFreq;

    // Time is to be entered on the entry form
      var firstTime = 0;

   var firstTimeConverted = moment(depart, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
    var tRemainder = diffTime % interval;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = interval - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" + interval + 
   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

})