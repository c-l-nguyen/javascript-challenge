// from data.js
var tableData = data;

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

let dateField = d3.select("#datetime");
const button = d3.select("#filter-btn");

// what happens when user clicks Filter Table button
function filterDate(){
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // get the user's entered date value
    let userDate = dateField.property("value");

    // filter tableData for observations with matching dates
    let tableDateMatch = tableData.filter(obs => obs.datetime == userDate);

    // wipe out the tbody to be able to write out new table using tableDateMatch values
    tbody.html("");

    // fill in observations only where date matches user input
    tableDateMatch.forEach(row => {
        tbody.append("tr");
    
        for (key in row){
            const cell = tbody.append("td");
            cell.text(row[key]);
        }
    });
}

// define what happens when user clicks the button
button.on("click", filterDate);

// alternatively allow user to just hit Enter to filter by date
dateField.on("keyup", function(event) {
    if (d3.event.keyCode == 13){
        filterDate();
    }
})