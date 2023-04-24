//Deklaration der Variablen
const Chart = window.Chart;

var ticketRange = document.getElementById("ticketrange");
var ticketFeld = document.getElementById("ticketfeld");

var startupRange = document.getElementById("startuprange");
var startupFeld = document.getElementById("startupfeld");
var barData = startupRange.value;


var probRange = document.getElementById("probrange");
var probFeld = document.getElementById("probfeld");

var tvpiMaxValue = document.getElementById("tvpi-max");
var tvpiMinValue = document.getElementById("tvpi-min");

var roiFeldMin = document.getElementById("roifeldmin");
var roiFeldMax = document.getElementById("roifeldmax");

const barDataX = ["X-Achse"];
const barDataY = [startupRange.value];

const inputMin = [0,0.07,0.17,0.51,0.93,1.10,1.13,1.19,1.27];
const inputMax = [0,0.48,1.23,2.03,2.67,3.12,3.26,3.42,3.41];

const inputProb =[0,0.1,0.5,0.9,0.95];
const inputStartups = [0,10,50,200,400];

 
const minArray = interpolationChart(inputMin,400);
const maxArray =  interpolationChart(inputMax,400); 

//const minArray = interpolationChart(inputMin);
//const maxArray = cubicInterpolation(inputMax);

const roiArrayMin = roiArrayFill(minArray,ticketRange.value);
const roiArrayMax = roiArrayFill(maxArray,ticketRange.value);


const probArray = interpolateArrays(inputProb,inputStartups);

//const probArray = cubicProbInterpolation(inputProb);


//arrayMult(roiArrayMin,ticketRange.value);
//arrayMult(roiArrayMax,ticketRange.value);



// Jeder Index des Arrays wird mit einem festen Wert multipliziert. 

function roiArrayFill (inputArray,multValue){
  let outputArray = [];
  for(let i=0;i<inputArray.length;i++){
    outputArray.push(inputArray[i] * multValue);
  }

  return outputArray;
}


// Füllt die X-Werte des Grafen in ein Array.

function fillX (startupCount){
  var startupNum = [];
    for(var i=0;i<=startupCount;i++){
      startupNum.push(i);
    }
    console.log("X-Achsen-Wert:");
    console.log(startupNum);
    return startupNum;
}

//Updatet die Charts

const updateChart = () => {
  displayRange();
  let newValue = document.getElementById("startuprange").value;
  let newTicketValue = document.getElementById("ticketrange").value;
  let newArrayMin = [];
  let newArrayMax = [];
  

  newArrayMin = roiArrayFill(minArray,newTicketValue);
  newArrayMax = roiArrayFill(maxArray,newTicketValue);

  console.log(newValue);
  barChart.data.datasets[0].data = [maxArray[newValue]];
  barChart.data.datasets[1].data = [minArray[newValue]];
  barChart.update();

  lineChart.data.labels =  fillX(newValue);
  lineChart.data.datasets[0].data = maxArray.slice(0,newValue+1);
  lineChart.data.datasets[1].data = minArray.slice(0,newValue+1);
  lineChart.update();

  probChart.data.labels = fillX(newValue);
  probChart.data.datasets[0].data = (probArray.slice(0,newValue+1));
  probChart.update();


  roiChart.data.labels =fillX(newValue);
  roiChart.data.datasets[0].data = newArrayMax.slice(0,newValue+1);
  roiChart.data.datasets[1].data = newArrayMin.slice(0,newValue+1);
  roiChart.update();

  
  console.log("Im Prob Array Update Mode:")
  console.log(probArray[newValue]);

  //console.log(barChart.data.labels);
  //console.log(barChart.data.datasets.data);
}



//Zeigt die Werte an in einem Span Tag

const displayRange = () => {
startupFeld.innerText = startupRange.value;
tvpiMaxValue.innerText =  maxArray[startupRange.value].toFixed(2);
tvpiMinValue.innerText = minArray[startupRange.value].toFixed(2);
}



//Zeigt ddie Wahrscheinlichkeit in Prozent an
const displayProb = (inputVal) =>{

  if(inputVal<=1){
  probFeld.innerText = (probArray[inputVal]).toFixed(2);
  }
  else if(inputVal==400){
    probFeld.innerText = (95.000).toFixed(2);

  }
  else {
  probFeld.innerText = (probArray[inputVal-1]).toFixed(2);
  }

}


//Zeigt den Wert des Ticketgrößen Rangesliders an. 

const displayTicket = () => {
var ticketSize = parseInt (ticketRange.value);
ticketFeld.innerText = ticketSize.toLocaleString('de-DE');

}

const displayScientificResult = (newValue) =>{
  var resultMax = ticketRange.value * maxArray[newValue];
  var resultMin = ticketRange.value * minArray[newValue];

  roiFeldMax.innerText = "Max: " + parseInt(resultMax).toLocaleString('de-De');
  roiFeldMin.innerText = "Min: " + parseInt(resultMin).toLocaleString('de-De');

  console.log("im Scientific Result Feld");
  

  
}

//Führt Funktionen aus, sobald das Fenster gelanden wird. 
/*
window.addEventListener("load",()=>{

displayRange(startupRange.value);
displayTicket(ticketRange.value);
displayProb(startupRange.value);
displayScientificResult(startupRange.value);
updateChart(startupRange.value);

});
*/


document.addEventListener("DOMContentLoaded", () => {
displayRange(startupRange.value);
displayTicket(ticketRange.value);
displayProb(startupRange.value);
displayScientificResult(startupRange.value);
updateChart(startupRange.value);
});


ticketRange.addEventListener("input", () =>{
  updateChart(startupRange.value);
  displayTicket(ticketRange.value);
  displayScientificResult(startupRange.value);

});


startupRange.addEventListener("input",()=>{
  updateChart(startupRange.value);
  fillX(startupRange.value); 
  displayProb(startupRange.value); 
  displayScientificResult(startupRange.value);

});


// Charts

//Bar-Chart TVPI

  const barChart = new Chart (
    document.getElementById('barchart'),
    {
      type:'bar',
      data:{
        labels: barDataX,
        datasets: [
          {
            label: 'Max',
            data: maxArray[startupRange.value],
            backgroundColor: '#EA5600',

          },
          {
            label:'Min',
            data: minArray[startupRange.value],
            backgroundColor:'#FFFFFF',
          }
        ]
      },
      options: {
        responsive: true,
        aspectRatio: false,
        barThickness: 20,
        scales:{
          y:{
            suggestedMax: 4,
            suggestedMin: 0,
          }
        },
        width: 200,
        height: 100,
      }
    }
  );



const lineChart = new Chart (
  document.getElementById('linechart'),
  {
    type:'line',
    data:{
      labels: fillX(startupRange.value),
      datasets: [
        {
          label: 'Max',
          data: maxArray.slice(0,startupRange.value+1),
          backgroundColor: 'transparent',
          borderColor: '#EA5600',
          tension: 0.4
          
        },
        {
          label: 'Min',
          data: minArray.slice(0,startupRange.value+1),
          backgroundColor: 'transparent',
          borderColor: '#FFFFFF',
          cubicInterpolationMode: 'Monotone',
          tension: 0.8,

        
        }
      ]
    },
    options: {
      responsive: true,
      aspectRatio: true,
      lineThickness: 3,
      pointRadius: 0,
      scales:{
        y:{
          suggestedMax: 4,
          suggestedMin: 0,
        }
      },
    }
  }
);


const probChart = new Chart (
  document.getElementById('probchart'),
  {
    type:'line',
    data:{
      labels: fillX(startupRange.value),
      datasets: [
        {
          label: 'Max',
          data: probArray.slice(0,startupRange.value+1),
          backgroundColor: 'transparent',
          borderColor: '#EA5600',
          tension: 0.4
          
        },
      ]
    },
    options: {
      responsive: true,
      aspectRatio: true,
      lineThickness: 3,
      pointRadius: 0,
      scales:{
        y:{
          suggestedMax: 100,
          suggestedMin: 0,
        }
      },
    }
  }
); 


//Zeigt an wie sich das Investment entwickelt.


const roiChart = new Chart (
  document.getElementById('roichart'),
  {
    type:'line',
    data:{
      labels: fillX(startupRange.value),
      datasets: [
        {
          label:'Max',
          data: roiArrayMax.slice(0,startupRange.value+1),
          backgroundColor: 'transparent',
          borderColor: '#EA5600',
          tension: 0.4
          
        },
        {
          label: 'Min',
          data: roiArrayMin.slice(0,startupRange.value+1),
          backgroundColor: 'transparent',
          borderColor: '#FFFFFF',
          tension: 0.4
          
        },
      ]
    },
    options: {
      responsive: true,
      aspectRatio: true,
      lineThickness: 3,
      pointRadius: 0,
      scales:{
        y:{
          suggestedMax: 100,
          suggestedMin: 0,
        }
      },
    }
  }
);



//dataRange.addEventListener("input",updateChart(data1));
//dataRange.addEventListener("input",displayRange);



// Interpolationen 

function cubicInterpolation(inputArray) {
  const outputArray = [];
  const n = inputArray.length - 1;
  const step = n / 399;

  for (let i = 0; i < inputArray.length; i++) {
    const x = i * step;
    const k = Math.floor(x);
    const t = x - k;
    const k1 = Math.min(k + 1, n);
    const k2 = Math.min(k + 2, n);
    const k3 = Math.min(k + 3, n);
    const y0 = inputArray[k];
    const y1 = inputArray[k1];
    const y2 = inputArray[k2];
    const y3 = inputArray[k3];
    const a0 = y3 - y2 - y0 + y1;
    const a1 = y0 - y1 - a0;
    const a2 = y2 - y0;
    const a3 = y1;

    outputArray.push(a0 * t * t * t + a1 * t * t + a2 * t + a3);
  }

console.log("KUBISCHeS ArraY: " + outputArray);}

  // Interpolationen 

function cubicProbInterpolation(inputArray) {
  const outputArray = [];
  const n = inputArray.length - 1;
  const step = n / 399;

  for (let i = 0; i < 400; i++) {
    const x = i * step;
    const k = Math.floor(x);
    const t = x - k;
    const k1 = Math.min(k + 1, n);
    const k2 = Math.min(k + 2, n);
    const k3 = Math.min(k + 3, n);
    const y0 = inputArray[k];
    const y1 = inputArray[k1];
    const y2 = inputArray[k2];
    const y3 = inputArray[k3];
    const a0 = y3 - y2 - y0 + y1;
    const a1 = y0 - y1 - a0;
    const a2 = y2 - y0;
    const a3 = y1;
    outputArray.push(a0 * t * t * t + a1 * t * t + a2 * t + a3);
  }
  console.log ("Cubic Output Array : " + outputArray);

  return outputArray;
}





function interpolateArrays(inputProb, inputStartups) {
  // Erstellen Sie ein Array mit 400 Elementen, das am Anfang nur Nullen enthält
  const outputArray = new Array(400).fill(0);

  // Schleife durch jedes Element im Ausgabe-Array und interpoliere den entsprechenden Wert
  for (let i = 0; i < outputArray.length; i++) {
    // Berechne den X-Wert, der interpoliert werden soll, basierend auf der aktuellen Indexposition
    const x = i * (inputStartups[inputStartups.length - 1] / (outputArray.length - 1));

    // Finden Sie den Index des nächsten X-Werts im inputStartups-Array
    const nextIndex = inputStartups.findIndex((val) => val > x);

    // Wenn kein nächster Index gefunden wurde, verwenden Sie den letzten Wert im inputStartups-Array
    const startIndex = nextIndex === -1 ? inputStartups.length - 2 : nextIndex - 1;

    // Berechne die Interpolationsdifferenz zwischen dem nächsten und vorherigen X-Wert
    const delta = inputStartups[nextIndex] - inputStartups[startIndex];

    // Berechne die Interpolationsdifferenz zwischen dem nächsten und vorherigen Y-Wert
    const deltaProb = inputProb[nextIndex] - inputProb[startIndex];

    // Berechne das Verhältnis zwischen der Differenz des interpolierten X-Werts und der Gesamtdifferenz
    const ratio = (x - inputStartups[startIndex]) / delta;

    // Berechne den interpolierten Y-Wert
    const y = inputProb[startIndex] + deltaProb * ratio;

    // Setzen Sie den interpolierten Y-Wert im Ausgabe-Array an der aktuellen Indexposition
    outputArray[i] = y*100;
  }

  // Rückgabe des Ausgabe-Arrays
  return outputArray;

}

// Beispielaufruf der Funktion mit den Eingabe-Arrays aus der Frage

function interpolationChart(input, startupCount) {
  const output = [];
  
  // Add first value of input array to output array
  output.push(input[0]);

  for (let i = 1; i < startupCount; i++) {
    const x = i * (input.length - 1) / (startupCount - 1);
    const lowerIndex = Math.floor(x);
    const upperIndex = Math.ceil(x);
    const lowerValue = input[lowerIndex];
    const upperValue = input[upperIndex];
    const interpolatedValue = lowerValue + (upperValue - lowerValue) * (x - lowerIndex);
    output.push(interpolatedValue);
  }
  
  // Add last value of input array to output array
  output.push(input[input.length - 1]);

  return output;
}