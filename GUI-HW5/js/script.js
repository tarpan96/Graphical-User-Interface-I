/*
File: style.css
91.61 GUI Programming I Assignment: Creating First Webpage
Tarpan Patel Umass Lowell Computer Science, tarpan_patel@student.uml.edu
Copyright (c) 2013 by Tarpan Patel. All rights reserved.
I could'nt get the scripting part to work properly.
*/   
        /*Store each input into corresponding variables */
          var minY = parseInt(document.getElementById('#minCol').value);
          var maxY = parseInt(document.getElementById('#maxCol').value);
          var minX = parseInt(document.getElementById('#minRow').value);
          var maxX = parseInt(document.getElementById('#maxRow').value);
            
          /*locate #multable and assign divtable variable */
          var divtable = document.querySelector("#multable");

          /*create element table */
          table = document.createElement("table");
          divtable.appendChild(table); //add the table under the div element
          validateInput(table, minX, maxX, minX, minY); //call function validateInput and pass all input

          /* Function validateInput, makes sures the users input meets the requirements and provides error when they are not met*/
          function validateInpsut(table, minX, maxX, minX, minY) {
    
          var multtable;

            //Check if any of the input not other than integer
            if(isNaN(minY) || isNaN(maxX) || isNaN(minX) || isNaN(maxX)) {
               document.getElementById("errorMessage").innerHTML = "One or more input(s) is invalid";
               
            }
            //Check if any empty input as been provided
            if(minX == null || minY == null || maxX == null || maxY == null)
            {
                document.getElementById("errorMessage").innerHTML = "Please fill in all required fields";
            }

            //Checks if the given input does not exceed in valid range
            if(minX < -50 || minY < -50) {
                document.getElementById("errorMessage").innerHTML = "Please enter values not less than -50";
            }
            if(maxX < 50 || maxX < 50) {
                document.getElementById("errorMessage").innerHTML = "Please enter values not greater than 50";
            }

            //Checks if the minimum values are not greater than maximum values
            if(minX > maxX) {
                document.getElementById("errorMessage").innerHTML = "Please enter Min X value less than Max X value";
            }
            if(minY > maxY) {
                document.getElementById("errorMessage").innerHTML = "PPlease enter Min Y value thats less than Max Y value";
            }
            else {  
            
            //Calls functions to create the tables
            multtable = generateTable(table, minX, maxX, minX, minY);
            multtable = fillTable(multtable, minX, maxX, minX, minY);
            return multtable;
            }

        }
        
        
        function generateTable(table, minX, maxX, minX, minY) {
            //create tbody element
            let tbody = document.createElement("tbody");
            table.appendChild(tbody); //Add the element to the table

            //for n number of times, create rows and store the row number
            for (let x = minX; x <maxX; x++) {
               let tr =  document.createElement("tr");
               tr.textContent = x;
               tbody.appendChild(tr);
            }    
            //retrun table
            return table;
        }

        //Suppose to fill muliplications values of x and y
        function fillTable(table, minX, maxX, minX, minY) {
            //Fill the columns with the values
            for(let y = minY; y < maxY; y++){
                let row = document.createElement("tr");
                table.appendChild(row);
                let thead = document.createElement();
                row.appendChild(thead);
                thead.textContent = y;
                //Loop through each cell and fill with muliplation result of x *  y
                for(let x = minX; x<maxX;x++) {
                    let cell = document.createElement("td");
                    row.appendChild(cell);
                    cell.textContent = x*y; //store the result in empty cell
                    
                }
            }
            return table;
        }