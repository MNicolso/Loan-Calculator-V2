﻿
function homeLoan() {

    var amount = document.getElementById("amount");
    var rate = document.getElementById("rate");
    var months = document.getElementById("months");
 

    var principal = parseFloat(amount.value);
    var interest = parseFloat(rate.value) / 100 / 12;
    var payments = parseFloat(months.value);

    // compute the monthly payment figure
    var x = Math.pow(1 + interest, payments); //Math.pow computes powers
    var monthly = (principal * x * interest) / (x - 1);

    var totalInterest = (monthly * payments);
    var monthlyInterest = ((monthly * payments) - principal);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    let amountRound = formatter.format(principal || 0); // || || 0 sets value to 0 if no input is found.
    let monthRound = formatter.format(monthly || 0);
    let interestRound = formatter.format(monthlyInterest || 0);
    let totalRound = formatter.format(totalInterest || 0);

    document.getElementById("principalOut").innerHTML = `${amountRound}`;
    document.getElementById("monthlyOut").innerHTML = `${monthRound}`;
    document.getElementById("interestOut").innerHTML = `${interestRound}`;
    document.getElementById("costOut").innerHTML = `${totalRound}`;

}

document.getElementById("homeLoanButton").addEventListener("click", table)


function table() {
    var amount = document.getElementById("amount").value;
    var rate = document.getElementById("rate").value;
    var months = document.getElementById("months").value;

    var monthsCollected = [];
    monthsCollected[months] = "";
    currentMonth = 0;

    for (i = 0; i <= months; i++) {
        currentMonth++;

        if (monthsCollected[i] == undefined) {
            monthsCollected[i] = currentMonth;
        }

    }
    monthsCollected.pop();

    //table arrays
    var acountBalance = [amount];
    var InterestBalance = [];
    var totalPayments = [];
    var principalBalance = [];

    let tableBody = document.getElementById("tabledata");
    var monthsTableOutput = "";

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    for (i = 0; i < months; i++) {

        //interest Payment  
        var iBalance = acountBalance[i] * (rate / 1200);
        InterestBalance.push(iBalance);

        //sum interest
        var sum = InterestBalance.reduce(function (a, b) {
            return a + b;
        }, 0);

        //Total Payment

        var a = rate / 1200;
        var b = (1 + a) ** -months;
        var monthly = amount * a / (1 - b);

        totalPayments.push(monthly);

        //Principle
        var pBalance = monthly - InterestBalance[InterestBalance.length - 1];
        principalBalance.push(pBalance);

        //balance
        var balance = acountBalance[i] - principalBalance[i];
        acountBalance.push(balance);

        monthsTableOutput += "<tr>" + "<td>" + monthsCollected[i] + "</td>" + "<td>" + formatter.format(monthly) + "<td>" + formatter.format(principalBalance[principalBalance.length - 1]) + "</td>" + "</td>" + "<td>" + formatter.format(InterestBalance[InterestBalance.length - 1]) + "</td>" + "<td>" + formatter.format(sum) + "</td>" + "<td>" + formatter.format(acountBalance[acountBalance.length - 1]) + "</td>" + "</tr>";


    }
    tableBody.innerHTML = monthsTableOutput;

}

function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key); 
    }
    var regex = /[0-9\b\t]|\./; // Regex to prevent keystrokes besides 0-9, backspace, and tab. 
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

// If the regex keys are pressed, allow it. If not, prevent them from being input.