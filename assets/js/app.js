function getLoanValues() {
  document.getElementById("tableCard").classList.add("d-none");
  let totalLoanAmount = parseFloat(document.getElementById("loanAmount").value);
  let termMonths = parseInt(document.getElementById("termMonths").value);
  let interestRate = (parseInt(document.getElementById("interestRate").value));

  if (Number.isFinite(totalLoanAmount) && Number.isInteger(termMonths) && Number.isFinite(interestRate)) {
    let monthlyPayment = calculateMonthlyPayment(totalLoanAmount, interestRate, termMonths);

    paymentData = calculatePaymentData(termMonths, monthlyPayment, totalLoanAmount, interestRate);
    console.log(paymentData)

    displayLoanInformation(totalLoanAmount, paymentData);
  }
}

function calculateMonthlyPayment(totalLoanAmount, interestRate, monthTerm) {
  let monthlyPayment = (totalLoanAmount) * (interestRate / 1200) / (1 - Math.pow((1 + interestRate / 1200), -monthTerm));

  return monthlyPayment;
}

function calculateInterestPayment(remainingBalance, interestRate) {
  return remainingBalance * (interestRate / 1200);
}


function calculatePrincipalPayment(monthlyPayment, interestPayment) {
  return monthlyPayment - interestPayment;
}

function calculatePaymentData(termMonths, monthlyPayment, totalLoanAmount, interestRate) {
  let remainingBalance = totalLoanAmount;
  let paymentData = [];
  let totalInterest = 0;
  let totalCost = 0;

  // document.getElementById("tableCard").classList.remove("d-none");
  for (let currentMonth = 1; currentMonth <= termMonths; currentMonth++) {
    interestPayment = calculateInterestPayment(remainingBalance, interestRate);
    principalPayment = calculatePrincipalPayment(monthlyPayment, interestPayment);
    totalInterest = (totalInterest + interestPayment);
    totalCost = totalInterest + totalLoanAmount

    remainingBalance = remainingBalance - principalPayment;

    let payment = {
      month: currentMonth,
      payment: monthlyPayment.toFixed(2),
      principal: principalPayment.toFixed(2),
      interest: interestPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      balance: remainingBalance.toFixed(2)
    };

    paymentData.push(payment);
  }

  document.getElementById("totalPrincipal").innerHTML = `&dollar;${totalLoanAmount.toFixed(2)}`;
  document.getElementById("totalInterest").innerHTML = `&dollar;${totalInterest.toFixed(2)}`;
  document.getElementById("totalCost").innerHTML = `&dollar;${totalCost.toFixed(2)}`;
  return paymentData;
}

function displayLoanInformation(totalLoanAmount, paymentData) {
  let tableBody = document.getElementById("results");
  let tableTemplate = document.getElementById("loanTemplate");

  tableBody.innerHTML = "";

  document.getElementById("tableCard").classList.remove("d-none");

  for (let data = 0; data < paymentData.length; data++) {
    let tableRow = document.importNode(tableTemplate.content, true);

    let rowColumns = tableRow.querySelectorAll("td");

    rowColumns[0].textContent = paymentData[data].month;
    rowColumns[1].textContent = paymentData[data].payment;
    rowColumns[2].textContent = paymentData[data].principal;
    rowColumns[3].textContent = paymentData[data].interest;
    rowColumns[4].textContent = paymentData[data].totalInterest;
    rowColumns[5].textContent = paymentData[data].balance;

    tableBody.appendChild(tableRow)
  }

}