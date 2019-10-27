// from data.js
const tableData = data;

// set the reference to the table body
let tbody = d3.select("tbody");

// fill in full table by default
tableData.forEach(row => {
    tbody.append("tr");

    for (key in row){
        const cell = tbody.append("td");
        cell.text(row[key]);
    }
});

// define references to fields and button
let dateField    = d3.select("#datetime");
let cityField    = d3.select("#city");
let stateField   = d3.select("#state");
let countryField = d3.select("#country");
let shapeField   = d3.select("#shape");

const button = d3.select("#filter-btn");

// what happens when user clicks Filter Table button
function filterObs(){
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // get the user-entered values
    let userDate    = dateField.property("value");
    let userCity    = cityField.property("value").toLowerCase();
    let userState   = stateField.property("value").toLowerCase();
    let userCountry = countryField.property("value").toLowerCase();
    let userShape   = shapeField.property("value").toLowerCase();

    // only filter if user entered a value
    if(userDate || userCity || userState || userCountry || userShape){
        // use only the conditions that have values entered and dynamically build up condition statement
        let userArray = [["datetime", userDate], ["city", userCity], ["state", userState], ["country", userCountry], ["shape", userShape]];
        let existingArray = userArray.filter(user => user[1] !== "");
        let condition = existingArray.map(arr => "obs." + arr[0] + " == " + "'" + arr[1] + "'").join(" && ");

        // what the next line actually evaluates to (full conditions version):
        // let tableMatch = tableData.filter(obs =>(obs.datetime == userDate) &&
        //                                         (obs.city == userCity) &&
        //                                         (obs.state == userState) &&
        //                                         (obs.country == userCountry) &&
        //                                         (obs.shape == userShape) );
        let tableMatch = tableData.filter(obs => eval(condition));

        // wipe out the tbody to be able to write out new table using tableDateMatch values
        tbody.html("");

        // fill in observations only where date matches user input
        tableMatch.forEach(row => {
            tbody.append("tr");
        
            for (key in row){
                const cell = tbody.append("td");
                cell.text(row[key]);
            }
        });
    };
}

// define what happens when user clicks the button
button.on("click", filterObs);

// alternatively allow user to just hit Enter to filter
dateField.on("keyup", function(event) {
    if (d3.event.keyCode == 13){
        filterObs();
    }
});

cityField.on("keyup", function(event) {
    if (d3.event.keyCode == 13){
        filterObs();
    }
});

stateField.on("keyup", function(event) {
    if (d3.event.keyCode == 13){
        filterObs();
    }
});

countryField.on("keyup", function(event) {
    if (d3.event.keyCode == 13){
        filterObs();
    }
});

shapeField.on("keyup", function(event) {
    if (d3.event.keyCode == 13){
        filterObs();
    }
});

// you were asking for this when you put up that text
const myAudio = document.getElementById("x-files");

function togglePlay() {
    return myAudio.paused ? myAudio.play() : myAudio.pause();
};