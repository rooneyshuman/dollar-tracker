document.addEventListener("DOMContentLoaded", function(event) {
    var ctx = document.getElementById('chart-1').getContext('2d');
    // var chartData = {
    //     labels : [{% for datapoint in prices%}
    //                     "{{datapoint.date}}",
    //                         {%end for%}]
    // };
     {% for datapoint in prices%}
     console.log("{{datapoint.date}}")
    {%end for%}
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });

});