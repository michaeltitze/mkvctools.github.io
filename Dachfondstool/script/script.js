// Javascript
var startupNum= document.getElementById("startup-num");
var active = 'active';
var yearActive = 'year-active';

//Wähle den Button
var btn10 = document.querySelector("#btn-10");
var btn50 = document.querySelector("#btn-50");
var btn90 = document.querySelector("#btn-90");

//Tab-Button

var simpleBtn = document.querySelector("#simple-btn");
var complexBtn = document.querySelector("#complex-btn");

//Button Jahre

var btn_4_y = document.querySelector("#btn-4-y");
var btn_6_y = document.querySelector("#btn-6-y");
var btn_10_y = document.querySelector("#btn-10-y");


//Werte Gewinnwahrscheinlichkeit in %
var percent10 = parseFloat(document.getElementById("10-percent").value);
var percent50 = parseFloat(document.getElementById("50-percent").value);
var percent90 = parseFloat(document.getElementById("90-percent").value);

//Werte Jahre
var years4 = parseInt(document.getElementById("4-years").value);
var years6 = parseInt(document.getElementById("6-years").value);
var years10 = parseInt(document.getElementById("10-years").value);

var probButton = document.querySelector(".prob-button");
var moneySlider = document.querySelector("#money-slider");
var moneyValue = document.getElementById("money-val");
var expectedResult = document.getElementById("expected-result");
var worstResult = document.getElementById("ideal-case");
var gewinnActive = $('.active').value;
var yearActive = $('.year-active').value;

const displayResult = ()=>{

    if((($("#btn-10").hasClass("active")) && ( $("#btn-4-y").hasClass("year-active"))) == true){
        console.log("BTN-10 & Btn 4 Jahre ");
        expectedCase(moneyAmount(),0.8);
        idealCase(moneyAmount(),0.8);
    }

    else if((($("#btn-10").hasClass("active")) && ( $("#btn-6-y").hasClass("year-active"))) == true){
        console.log("BTN 10 & Btn 6 Jahre");
        expectedCase(moneyAmount(),0.5);
        idealCase(moneyAmount(),0.5);
    }

    else if((($("#btn-10").hasClass("active")) && ( $("#btn-10-y").hasClass("year-active"))) == true){
        console.log("BTN-10 & Btn 10 Jahre");
        expectedCase(moneyAmount(),0.19);
        idealCase(moneyAmount(),0.48);
    }
    
    else if((($("#btn-50").hasClass("active")) && ( $("#btn-4-y").hasClass("year-active"))) == true){
        console.log("BTN 50 & Btn 4 Jahre");
        expectedCase(moneyAmount(),1.2);
        idealCase(moneyAmount(),1.2);
    }

    else if ((($("#btn-50").hasClass("active")) && ( $("#btn-6-y").hasClass("year-active"))) == true){
        console.log("BTN-50 & Btn 6 Jahre");
        expectedCase(moneyAmount(),1.4);
        idealCase(moneyAmount(),1.53);

    }
    else if((($("#btn-50").hasClass("active")) && ( $("#btn-10-y").hasClass("year-active"))) == true){
        console.log("BTN 50 & Btn 10 Jahre");
        expectedCase(moneyAmount(),1.27);
        idealCase(moneyAmount(),2.03);
    }
    
    else if((($("#btn-90").hasClass("active")) && ( $("#btn-4-y").hasClass("year-active"))) == true){
        console.log("BTN 90 & Btn 4 Jahre");
        expectedCase(moneyAmount(),1.25);
        idealCase(moneyAmount(),1.49);
    }
    
    else if((($("#btn-90").hasClass("active")) && ( $("#btn-6-y").hasClass("year-active"))) == true){
        console.log("BTN-90 & Btn 6 Jahre");
        expectedCase(moneyAmount(),1.6);
        idealCase(moneyAmount(),2.01);
    }
    
    else if((($("#btn-90").hasClass("active")) && ( $("#btn-10-y").hasClass("year-active"))) == true){
        console.log("BTN 90 & Btn 10 Jahre");
        expectedCase(moneyAmount(),2.36);
        idealCase(moneyAmount(),3.12);
    }
    
};


function changeStartup(textValue) {
    startupNum.textContent = textValue;
  }


const moneyAmount = () => {

var money = parseInt(moneySlider.value);
var moneyOut = money.toLocaleString('de-DE');

moneyValue.innerText = moneyOut;
return money;

}

function expectedCase(moneyVal,returnRate)  {
var bestResult = moneyVal * returnRate;
expectedResult.innerText = bestResult.toLocaleString('de-De');
}
  
function idealCase (moneyVal,returnRate){
var worstRes = moneyVal * returnRate;
worstResult.innerText = worstRes.toLocaleString('de-De');
}

$('.prob-button').on('click',function(){
    $('.active').removeClass('active');
    $(this).addClass('active');
})

$('.year-btn').on('click',function(){
    $('.year-active').removeClass('year-active');
    $(this).addClass('year-active');
})

$('.tab-btn').on('click',function(){
    $('.tab-active').removeClass('tab-active');
    $(this).addClass('tab-active');
})


/*moneySlider.addEventListener("input",moneyAmount);
moneySlider.addEventListener("input",moneyAmount);
moneySlider.addEventListener("input",expectedCase);
moneySlider.addEventListener("input",idealCase); */

window.addEventListener("load",displayResult);
moneySlider.addEventListener("input",displayResult);
btn10.addEventListener("click",displayResult);
btn50.addEventListener("click",displayResult);
btn90.addEventListener("click",displayResult);
btn_4_y.addEventListener("click",displayResult);
btn_6_y.addEventListener("click",displayResult);
btn_10_y.addEventListener("click",displayResult);



/* Tabs */
$( function() {
    $( "#tabs" ).tabs();
  } );


