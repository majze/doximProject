// set the variable name of the database
const db = firebase.firestore()
//
// Reference an entire collection
var allUsers = db.collection('users');

// Reference a single document in a collection
var loginUser1 = db.collection('users').doc('user1');
// Same thing but simplified pathing
var loginUser2 = db.doc('users/user2');

// Nested data, always follow collection/doc/collection/doc formula
var messageRef = db.collection('rooms').doc('roomA')
                .collection('messages').doc('message1');

// Create new or overwrite document in collection "users"
db.collection("users").doc("user3").set({
    username: "testUser",
    password: "testPass"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});

// Add a new document with a generated id.
db.collection("cities").add({
    name: "Tokyo",
    country: "Japan"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

// Merge data into existing document
var userRef = db.collection('users').doc('user3');
var setWithMerge = userRef.set({
    username: 'updatedUser',
    password: 'updatedPass'
});

// Data types
var docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: "foo"
        }
    }
};
db.collection("data").doc("one").set(docData).then(function() {
    console.log("Document successfully written!");
});

// Update a document without overwriting entire document
var washingtonRef = db.collection("cities").doc("DC");

// Set the "capital" field of the city 'DC'
/*
return washingtonRef.update({
    capital: true
})
.then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
*/

// Create an initial document to update.
var frankDocRef = db.collection("users").doc("frank");
frankDocRef.set({
    name: "Frank",
    favorites: { food: "Pizza", color: "Blue", subject: "recess" },
    age: 12
});

// To update age and favorite color:
db.collection("users").doc("frank").update({
    "age": 13,
    "favorites.color": "Red"
})
.then(function() {
    console.log("Document successfully updated!");
});

// Increment a numeric value
var washingtonRef = db.collection('cities').doc('DC');
washingtonRef.update({
    population: firebase.firestore.FieldValue.increment(50)
});
