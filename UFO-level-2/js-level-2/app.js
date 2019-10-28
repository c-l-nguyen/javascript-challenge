// from data.js
const tableData = data;
let tableMatch = null;

// set the reference to the table body and initialize filter flag
let tbody = d3.select("tbody");
let filtered = 0;

// fill in full table by default
tableData.forEach(row => {
    tbody.append("tr");

    for (key in row){
        const cell = tbody.append("td");
        cell.text(row[key]);
    }
});

// define references to fields and buttons
let dateField    = d3.select("#datetime");
let cityField    = d3.select("#city");
let stateField   = d3.select("#state");
let countryField = d3.select("#country");
let shapeField   = d3.select("#shape");

const button = d3.select("#filter-btn");
const reset = d3.select("#reset-btn");
const jsonDownload = d3.select("#download-json");

// filter the table by properties
function filterObs(){
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // flag that table is filtered
    filtered = 1;

    // get the user-entered values
    let userDate    = dateField.property("value");
    let userCity    = cityField.property("value").toLowerCase();
    let userState   = stateField.property("value").toLowerCase();
    let userCountry = countryField.property("value").toLowerCase();
    let userShape   = shapeField.property("value").toLowerCase();

    // only filter if user entered a value
    if(userDate || userCity || userState || userCountry || userShape){
        // flag that table is filtered
        filtered = 1;

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
        tableMatch = tableData.filter(obs => eval(condition));

        // wipe out the tbody to be able to write out new table
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

// reset table to original display
function resetData(){
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // reset the form
    document.forms['ufo-form'].reset()

    // flag that table is not filtered
    filtered = 0;

    // wipe out the tbody to be able to write out new table
    tbody.html("");

    // fill in observations only where date matches user input
    tableData.forEach(row => {
        tbody.append("tr");
    
        for (key in row){
            const cell = tbody.append("td");
            cell.text(row[key]);
        }
    });
}

// download query results as JSON file
function download(){
    let jsonDownloadFile = tableData;

    if (filtered){
        jsonDownloadFile = tableMatch;
    } else {
        jsonDownloadFile = tableData;
    }

    let blob = new Blob([JSON.stringify(jsonDownloadFile,undefined,2)], {
        type: "application/json"
    });

    saveAs(blob, "ufo_sightings.json");
}

// run filterObs function if Enter key is pressed
function enterFilterObs(){
    if (d3.event.keyCode == 13){
        filterObs();
    }
}

// define what happens when user clicks the button
button.on("click", filterObs);
reset.on("click", resetData);
jsonDownload.on("click", download);

// alternatively allow user to just hit Enter to filter
dateField.on("keyup", enterFilterObs);
cityField.on("keyup", enterFilterObs);
stateField.on("keyup", enterFilterObs);
countryField.on("keyup", enterFilterObs);
shapeField.on("keyup", enterFilterObs);

// you were asking for this when you put up that text
const myAudio = document.getElementById("x-files");

function togglePlay() {
    return myAudio.paused ? myAudio.play() : myAudio.pause();
};