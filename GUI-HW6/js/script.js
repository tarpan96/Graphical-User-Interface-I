/*
Tarpan Patel
91.61 GUI Programming I Assignment: Creating First Webpage
Tarpan Patel Umass Lowell Computer Science, tarpan_patel@student.uml.edu
Copyright (c) 2013 by Tarpan Patel. All rights reserved.
11/12/20
*/   

//Get div id called .multable to add table under
const multable = document.querySelector(".multable");


function setInfo() {
    //clear table if the table needs to be updated
    multable.textContent='';
    
    //get corresponding values from input box and store them in variable
    let minXValue = parseInt(document.querySelector("#minRow").value);
    let maxXValue = parseInt(document.querySelector("#maxRow").value);
    let minYValue = parseInt(document.querySelector("#minCol").value);
    let maxYValue = parseInt(document.querySelector("#maxCol").value);
    //temp variables to store
    let tempXVal = 0, tempYVal = 0;
    let message = "";
    var multiplier = false;
    var muliplicand = false;

    //Check if the minimum multiplier is greater than maximum muliplier
    if(minXValue > maxXValue) {    
       tempXVal = minXValue;
       minXValue = maxXValue;
       maxXValue = tempXVal;
       multiplier = true;
    }

    //Check if the minimum muliplicand is greater than maximum muliplicand
    if(minYValue > maxYValue) {
        tempYVal = minYValue;
       minYValue = maxYValue;
       maxYValue = tempYVal;
       muliplicand =  true;
    }

    //if true then set message to id highValue 
    if(muliplicand ||  multiplier) {
        //assign message 
        message = "Minimum value was swapped with Maxinum value for either Multiplier and/or Multiplicand"
        //get element with assoicate id of highValue
        var highvalue = document.getElementById("highValue");
        //set message to highValue id
        highvalue.textContent = message;
    }

    //call method genearateTable and pass all input values to create table
    generateTable(minXValue, maxXValue, minYValue, maxYValue);
}

function generateTable(minXVal, maxXVal, minYVal, maxYVal) {
    
    //create element table
    let table = document.createElement('table');
    //add class to the element table
    table.setAttribute("class", "table table-bordered table-responsive");
    //add table to div element
    multable.appendChild(table);
    
    //create first empty first cell 
    let tr = document.createElement('tr');
    let emptyCell = document.createElement('td'); 
    table.appendChild(tr);
    tr.appendChild(emptyCell);
    emptyCell.textContent='-';
    /*Source:
        https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
        https://www.valentinog.com/blog/html-table/
    */
    //Create row of multiplicands and values to each row cells
    for(let i = minXVal; i <= maxXVal; i++) {
        let header = document.createElement('th');
        header.textContent = i;
        tr.appendChild(header);
    }

    //The outer loop creates the rows for multiplier values. 
    for(let y = minYVal; y <= maxYVal; y++) {
        //create row for each y values and add them to the table
        let row = document.createElement('tr');
        table.appendChild(row);
        let thead = document.createElement('th');
        row.appendChild(thead);
        thead.textContent = y;

        //inner loop cells and sets the values of multiplier * multiplicand
        for(let x = minXVal; x <= maxXVal; x++) {
            let cell = document.createElement('td');
            cell.textContent = x * y;
            row.appendChild(cell);
        }
    }

}

