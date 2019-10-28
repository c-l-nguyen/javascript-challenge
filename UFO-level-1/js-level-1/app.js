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

// define references to date field and buttons
let dateField = d3.select("#datetime");
const button = d3.select("#filter-btn");
const reset = d3.select("#reset-btn");
const jsonDownload = d3.select("#download-json");

// filter the table by date
function filterDate(){
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // get the user's entered date value
    let userDate = dateField.property("value");

    // only filter if user entered a date
    if(userDate){
        // flag that table is filtered
        filtered = 1;

        // filter tableData for observations with matching dates
        tableMatch = tableData.filter(obs => obs.datetime == userDate);

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

// define what happens when user clicks the buttons
button.on("click", filterDate);
reset.on("click", resetData);
jsonDownload.on("click", download);

// alternatively allow user to just hit Enter to filter by date
dateField.on("keyup", function() {
    if (d3.event.keyCode == 13){
        filterDate();
    }
});

// you were asking for this when you put up that text
const myAudio = document.getElementById("x-files");

function togglePlay() {
    return myAudio.paused ? myAudio.play() : myAudio.pause();
};
