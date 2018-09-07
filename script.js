/*  Project 01_11_04

    Author: Cynthia Sepulveda
    Date:   sep.7.18

    Filename: script.js
*/

"use strict";


var httpRequest = false;
function getRequestObject(){
    try{
        httpRequest = new XMLHttpRequest();
    }
    catch(requestError) {
        return false;
    }
    document.getElementById("csset").style.visibility = "visible";
    var zip = document.getElementById("zip").value;
    if(zip.addEventListener){
        zip.removeEventListener("keyup", checkInput, false);
    } else if(zip.attachEvent){
        zip.detachEvent("onkeyup", checkInput);
    }
 return httpRequest;
}

//will check if there is an input entered 
function checkInput(){
    var zip = document.getElementById("zip").value;
    if (zip.length === 5){
        getLocation()
    } else {
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
    }
}



//checks the length of the zip code
function getLocation(){
   var zip = document.getElementById("zip").value;
    if(!httpRequest){
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "http://api.zippopotam.us/us/" + zip, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}

function displayData() {
    if(httpRequest.readyState === 4 && httpRequest.status === 200) {
        var resultData = JSON.parse(httpRequest.responseText);
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        city.value = resultData.places[0]["place name"];
        state.value = resultData.places[0]["state abbreviation"];
        document.getElementById("zip").blur();
        document.getElementById("csset").style.visibility = "visible";
        
        
        
    }
}


//event listener 
var zip = document.getElementById("zip");
if (zip.addEventListener){
    zip.addEventListener("keyup", checkInput, false);
} else if (zip.attachEvent) {
    zip.attachEvent("onkeyup", checkInput);
}