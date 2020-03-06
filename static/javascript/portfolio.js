//chart can only be drawn when dom is loaded, maybe dom loads faster than google charts, not sure if thats the case
//every time
document.addEventListener("DOMContentLoaded", function (event) {
  google.charts.load("current", {
    packages: ["corechart"]
  });
  google.charts.setOnLoadCallback(chartStocks);
});

function chartStocks() {
  for (let i = 0; i < symbols.length; i++) {
    let chart = new google.visualization.CandlestickChart(
      document.getElementById(`chart-div-${i}`)
    );
    drawOHLC(chart, symbols[i], ranges[i]);
  }
  let sectorAllocations = [["Sector", "Percentage"]];
  for (let i = 0; i < sectors.length; i++) {
    sectorAllocations.push([sectors[i], allocations[i]]);
  }
  drawSectorsChart(sectorAllocations);
}

function drawOHLC(chart, symbol, range) {
  const IEX_KEY = "pk_2d3798cff29b4669a4b6a4b0b41b2cf2"; //this is the public key, ok to share since I have free plan
  fetch(
      `https://cloud.iexapis.com/v1/stock/${symbol}/chart/${range}?token=${IEX_KEY}`
    )
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.ok);
    })
    .then(function (data) {
      let prices = [];
      for (let tick of data) {
        prices.push([
          tick["date"],
          tick["low"],
          tick["open"],
          tick["close"],
          tick["high"]
        ]);
      }
      let options = {
        legend: "none",
        titleTextStyle: {
          fontSize: 24
        },
        candlestick: {
          fallingColor: {
            strokeWidth: 0,
            fill: "#1c84c6"
          },
          risingColor: {
            strokeWidth: 0,
            fill: "#23c6c8"
          }
        },
        colors: ["black"],
        animation: {
          duration: 500,
          easing: "out",
          startup: true
        },
        //needed for chart to take whole viewport
        chartArea: {
          width: "84%",
          height: "90%"
        },
        width: "90%",
        hAxis: {
          textPosition: "none"
        },
        vAxis: {
          format: "$##",
          title: "Price"
        }
      };
      chart.draw(google.visualization.arrayToDataTable(prices, true), options);
    })
    .catch(function (error) {
      //TODO add error message on html
      console.log("Error retrieving from IEX: \n", error);
    });
}

function drawSectorsChart(sectorAllocations) {
  var allocation_data = google.visualization.arrayToDataTable(sectorAllocations);
  var options = {
    titleTextStyle: {
      fontSize: 24
    },
    animation: {
          duration: 500,
          easing: "out",
          startup: true
        },
        //needed for chart to take whole viewport
        chartArea: {
          width: "84%",
          height: "90%"
        },
        width: "90%",
    pieHole: 0.5,
    pieSliceText: "none",
    legend: "none",
    slices: {
      0: {
        color: "#1c84c6"
      },
      1: {
        color: "#1ab394"
      },
      2: {
        color: "#5e5e5e"
      },
      3: {
        color: "#23c6c8"
      },
      4: {
        color: "#2f4050"
      },
      5: {
        color: "#f8ac59"
      }
    }
  };

  delete options.legend;
  var chart = new google.visualization.PieChart(
    document.getElementById("sectors_chart")
  );
  chart.draw(allocation_data, options);
}