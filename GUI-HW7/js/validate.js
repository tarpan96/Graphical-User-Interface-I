/*
Tarpan Patel
91.61 GUI Programming I Assignment: Jquery
Tarpan Patel Umass Lowell Computer Science, tarpan_patel@student.uml.edu
Copyright (c) 2013 by Tarpan Patel. All rights reserved.
11/12/20
*/
/*Source: 
https://stackoverflow.com/questions/15060292/a-simple-jquery-form-validation-script
https://jqueryvalidation.org/category/plugin/
https://jqueryvalidation.org/validate/
https://jqueryvalidation.org/category/methods/
*/

$(document).ready(function () {
    // Check if inputs are a whole number. Source : https://jqueryvalidation.org/jQuery.validator.addMethod/
    $.validator.addMethod("validInt", function (value) {
        if ((value % 1) == 0) {
            return true;
        } else {
            return false;
        }
    }, "Please enter a whole number");

    //Check if each input meets the requirements
    $('#inputForm').validate({
        rules: {
            minCol: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                validInt: true
            },
            maxCol: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                validInt: true
            },

            minRow: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                validInt: true
            },

            maxRow: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                validInt: true
            }
        },
        //Based on requirement needed, get corresponding error message
        messages: {
            minCol: {
                required: "No value entered. Please enter a value",
                number: "Input is a number, please enter only numbers",
                min: "Out of Range: Please enter a value greater or equal to -50",
                max: "Out of Range: Please enter a value less or equal to 50"
            },

            maxCol: {
                required: "No value entered. Please enter a value",
                number: "Input is a number, please enter only numbers",
                min: "Out of Range: Please enter a value greater or equal to -50",
                max: "Out of Range: Please enter a value less or equal to 50"
            },
            minRow: {
                required: "No value entered. Please enter a value",
                number: "Input is a number, please enter only numbers",
                min: "Out of Range: Please enter a value greater or equal to -50",
                max: "Out of Range: Please enter a value less or equal to 50"
            },
            maxRow: {
                required: "No value entered. Please enter a value",
                number: "Input is not a number, please enter only numbers",
                min: "Out of Range: Please enter a value greater or equal to -50",
                max: "Out of Range: Please enter a value less or equal to 50"
            }
        },
        //errorPlacement print the error message
        errorPlacement: function (errorMessage, element) {

            errorMessage.insertAfter(element);
        },

        //call getInfo
        submitHandler: function () {
            setInfo();
        }
    });


});