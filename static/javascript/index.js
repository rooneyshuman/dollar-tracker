/**
 * Creates assets and liabilities charts
 */
google.charts.load("current", {
  packages: ["corechart"]
});
google.charts.setOnLoadCallback(drawChart);

var assets = [
  ['Account', 'Balance']
];
var liabilities = [
  ['Account', 'Balance']
];

function net_worth_calc(accounts) {
  get_assets(accounts);
  get_liabilities(accounts);
}

// Assets retrieval and calculations
function get_assets(accounts) {
  var retirement = accounts.filter(e => e.type == "investment");
  var ret_total = 0;
  for (let acct of retirement) {
    ret_total += acct['balance'];
  }
  assets.push(['Retirement', ret_total]);

  var personal = accounts.filter(e => e.subtype == "savings" || e.subtype == "checking");
  var pers_total = 0;
  for (let acct of personal) {
    pers_total += acct['balance'];
  }
  assets.push(['Personal', pers_total]);

  var investments = accounts.filter(e => e.subtype == "savings" || e.subtype == "money market" || e.subtype == "cd");
  var inv_total = 0;
  for (let acct of investments) {
    inv_total += acct['balance'];
  }
  assets.push(['Investments', inv_total]);
}

// Liabilities retrieval and calculations
function get_liabilities(accounts) {
  var credit = accounts.filter(e => e.type == "credit");
  var cred_total = 0;
  for (let acct of credit) {
    cred_total += acct['balance'];
  }
  liabilities.push(['Credit', cred_total]);

  var loans = accounts.filter(e => e.type == "loan");
  var loan_total = 0;
  for (let acct of loans) {
    loan_total += acct['balance'];
  }
  liabilities.push(['Loans', loan_total]);
}

function drawChart() {
  var assets_chart_data = google.visualization.arrayToDataTable(assets);
  var liabilities_chart_data = google.visualization.arrayToDataTable(liabilities);

  var options = {
    pieHole: .5,
    pieSliceText: 'none',
    legend: 'none',
    slices: {
      0: {
        color: '#1c84c6'
      },
      1: {
        color: '#1ab394'
      },
      2: {
        color: '#5e5e5e'
      }
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById('assets_chart'));
  chart.draw(assets_chart_data, options);
  chart = new google.visualization.PieChart(document.getElementById('liabilities_chart'));
  chart.draw(liabilities_chart_data, options);
}