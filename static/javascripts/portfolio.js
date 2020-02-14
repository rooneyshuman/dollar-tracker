// var iexPromise = undefined;
document.addEventListener("DOMContentLoaded", function(event) {

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawOHLC);
});
function drawOHLC(){
    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
    const IEX_KEY = "pk_2d3798cff29b4669a4b6a4b0b41b2cf2"; //this is the public key, ok to share since I have free plan
    let symbol = symbols[0];
    let range = ranges[0];
    // var iexPromise =
    fetch(`https://cloud.iexapis.com/v1/stock/${symbol}/chart/${range}?token=${IEX_KEY}`)
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        return Promise.reject(response.ok);
    })
    .then(function(data){
        let prices = [];
        for(let tick of data){
            prices.push([   tick['date'],
                            tick['low'],
                            tick['open'],
                            tick['close'],
                            tick['high']]);
        }
        let options = {
            legend:'none',
            title: symbol,
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
            },
            colors: ['black'],
            animation:{
                duration: 500,
                easing: 'out',
                startup: true
            },
            chartArea: {
              // leave room for y-axis labels
              width: '94%'
            },
            width: '100%'
        };
        chart.draw(google.visualization.arrayToDataTable(prices, true), options);
    })
    .catch(function(error){
        // ctx.fillText("Error retrieving from IEX", 10 , 50);
        console.log("Error retrieving from IEX: \n", error);
    });
}