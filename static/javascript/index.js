/**
 * SAVINGS PROGRESS BAR
 */
function prog_bar(accounts) {
  var savingsGoal = 500;
  var savingsBalance = accounts.filter(e => e.subtype == "savings")[0].balance;
  var savingsProg = (savingsBalance / savingsGoal) * 100;

  $(".progress-bar").html("$" + savingsBalance);
  $(".savings-prog").html(savingsProg + "%");
  $(".savings-goal").html("$" + savingsGoal);

  // Animates the width of the savings progress bar. Is executed by adding the ".active" class
  // to the ".progress" element
  var current_width = 1;
  var progress = setInterval(() => {
    var $bar = $(".progress-bar");

    if (current_width >= savingsProg) {
      clearInterval(progress);
      $(".progress").removeClass("active");
    } else {
      ++current_width;
      $bar.width(current_width + "%");
    }
  }, 10);
}

/**
 * NET WORTH SUMMARY
 */
google.charts.load("current", {
  packages: ["corechart"]
});
google.charts.setOnLoadCallback(drawChart);

var assets = [
  ["Account", "Balance"]
];
var liabilities = [
  ["Account", "Balance"]
];

function net_worth_calc(accounts) {
  get_assets(accounts);
  get_liabilities(accounts);

  var assets_total = 0;
  var liabilities_total = 0;

  for (let acct of assets.slice(1, assets.length)) {
    assets_total += acct[1];
  }
  $("#assets_total").html("$" + Math.round(assets_total));

  for (let acct of liabilities.slice(1, liabilities.length)) {
    liabilities_total += acct[1];
  }
  $("#liabilities_total").html("-$" + Math.round(liabilities_total));
  $("#net_worth_val").html("$" + Math.round(assets_total - liabilities_total));

  var asset_table_content = "<tbody>";
  for (let acct of assets.slice(1, assets.length)) {
    asset_table_content +=
      "<tr> <td>" +
      acct[0] +
      "</td> <td>$" +
      acct[1].toFixed(2) +
      "</td></tr>";
  }
  asset_table_content += "</tbody>";
  $("#asset_table").append(asset_table_content);

  var liability_table_content = "<tbody>";
  for (let acct of liabilities.slice(1, assets.length)) {
    liability_table_content +=
      "<tr> <td>" +
      acct[0] +
      "</td> <td>-$" +
      acct[1].toFixed(2) +
      "</td></tr>";
  }
  liability_table_content += "</tbody>";
  $("#liability_table").append(liability_table_content);
}

// Assets retrieval and calculations
function get_assets(accounts) {
  var retirement = accounts.filter(e => e.type == "investment");
  var ret_total = 0;
  for (let acct of retirement) {
    ret_total += acct["balance"];
  }
  assets.push(["Retirement", ret_total]);

  var personal = accounts.filter(
    e => e.subtype == "savings" || e.subtype == "checking"
  );
  var pers_total = 0;
  for (let acct of personal) {
    pers_total += acct["balance"];
  }
  assets.push(["Personal", pers_total]);

  var investments = accounts.filter(
    e => e.subtype == "money market" || e.subtype == "cd"
  );
  var inv_total = 0;
  for (let acct of investments) {
    inv_total += acct["balance"];
  }
  assets.push(["Investments", inv_total]);
}

// Liabilities retrieval and calculations
function get_liabilities(accounts) {
  var credit = accounts.filter(e => e.type == "credit");
  var cred_total = 0;
  for (let acct of credit) {
    cred_total += acct["balance"];
  }
  liabilities.push(["Credit", cred_total]);

  var loans = accounts.filter(e => e.type == "loan");
  var loan_total = 0;
  for (let acct of loans) {
    loan_total += acct["balance"];
  }
  liabilities.push(["Loans", loan_total]);
}

/**
 * SPENDING BREAKDOWN 
 */
var expenses = [
  ["Category", "Amount"]
];

function spending_breakdown(transactions) {
  get_transactions(transactions)

  var spending_total = 0;
  for (let exp of transactions) {
    spending_total += parseInt(exp["amount"].toFixed(2));
  }

  $("#spending_total").html("$" + Math.round(spending_total));

  var trans_table_content = "<tbody>";
  for (let exp of transactions) {
    let date_arr = exp["date"].split("-");
    let date = date_arr[1] + "/" + date_arr[2] + "/" + date_arr[0];

    trans_table_content +=
      "<tr> <td>" +
      date +
      "</td> <td>" +
      exp["name"] +
      "</td> <td>" +
      exp["category"] +
      "</td> <td>$" +
      exp["amount"].toFixed(2) +
      "</td></tr>";
  }
  trans_table_content += "</tbody>";
  $("#transaction_table").append(trans_table_content);
}

// Transactions retrieval and calculations
function get_transactions(transactions) {
  var travel = transactions.filter(e => e.category == "Travel");
  var travel_total = 0;
  for (let trans of travel) {
    travel_total += trans["amount"];
  }
  expenses.push(["Travel", travel_total]);

  var food = transactions.filter(e => e.category == "Food and Drink");
  var food_total = 0;
  for (let trans of food) {
    food_total += trans["amount"];
  }
  expenses.push(["Food and Drink", food_total]);

  var payment = transactions.filter(e => e.category == "Payment");
  var payment_total = 0;
  for (let trans of payment) {
    payment_total += trans["amount"];
  }
  expenses.push(["Payment", payment_total]);

  var shops = transactions.filter(e => e.category == "Shops");
  var shops_total = 0;
  for (let trans of shops) {
    shops_total += trans["amount"];
  }
  expenses.push(["Shops", shops_total]);

  var transfer = transactions.filter(e => e.category == "Transfer");
  var transfer_total = 0;
  for (let trans of transfer) {
    transfer_total += trans["amount"];
  }
  expenses.push(["Transfer", transfer_total]);

  var rec = transactions.filter(e => e.category == "Recreation");
  var rec_total = 0;
  for (let trans of rec) {
    rec_total += trans["amount"];
  }
  expenses.push(["Recreation", rec_total]);
}

function drawChart() {
  var assets_chart_data = google.visualization.arrayToDataTable(assets);
  var liabilities_chart_data = google.visualization.arrayToDataTable(
    liabilities
  );
  var expenses_chart_data = google.visualization.arrayToDataTable(expenses);

  var options = {
    pieHole: 0.5,
    pieSliceText: "none",
    legend: "none",
    chartArea: {
      height: '90%'
    },
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

  // Draw assets chart
  var chart = new google.visualization.PieChart(
    document.getElementById("assets_chart")
  );
  chart.draw(assets_chart_data, options);

  // Draw liabilies chart
  chart = new google.visualization.PieChart(
    document.getElementById("liabilities_chart")
  );
  chart.draw(liabilities_chart_data, options);

  // Draw expenses chart
  delete options.legend;
  chart = new google.visualization.PieChart(
    document.getElementById("expenses_chart")
  );
  chart.draw(expenses_chart_data, options);
}