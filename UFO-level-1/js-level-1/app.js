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
const csvDownload = d3.select("#download-csv");

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

// download query results as CSV file
function arrayToCSV(objArray) {
    let csv = '';
    let header = Object.keys(objArray[0]).join(',');
    let values = objArray.map(o => Object.values(o).join(',')).join('\n');

    csv += header + '\n' + values;
    return csv;
}

// return full table or filtered table
function tableReturned(filtered_val){
    if (filtered_val){
        return tableMatch;
    } else {
        return tableData;
    }
}

// download query results as CSV file
function downloadCSV(){
    let jsonFile = tableReturned(filtered);
    let csvDownloadFile = arrayToCSV(jsonFile);

    let blob = new Blob([csvDownloadFile], {
        type: "text/plain;charset=utf-8"
    });

    saveAs(blob, "ufo_sightings.csv");
}

// download query results as JSON file
function downloadJSON(){
    let jsonDownloadFile = tableReturned(filtered);

    let blob = new Blob([JSON.stringify(jsonDownloadFile,undefined,2)], {
        type: "application/json"
    });

    saveAs(blob, "ufo_sightings.json");
}

// define what happens when user clicks the buttons
button.on("click", filterDate);
reset.on("click", resetData);
jsonDownload.on("click", downloadJSON);
csvDownload.on("click", downloadCSV);

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
