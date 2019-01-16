var config = {
    apiKey: "AIzaSyACjn9nVChqctAAIfhygDj-vVl6DZ0d_VU",
    authDomain: "train-hub.firebaseapp.com",
    databaseURL: "https://train-hub.firebaseio.com",
    projectId: "train-hub",
    storageBucket: "train-hub.appspot.com",
    messagingSenderId: "330138126219"
  };
firebase.initializeApp(config);

var trainData = firebase.database();

//Makes the button collect the data//
$("#addTrainBtn").on("click", function (e) {
    e.preventDefault();
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);



    alert("Train Added!");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false
});

//retrieves data from firebase//
trainData.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tbody" ).append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
    
});

