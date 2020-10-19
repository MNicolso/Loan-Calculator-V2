
$(document).ready(function () {
    $("#myModal").modal('show');
});

function loginValidate() {



        var username = ["Bill","Jim","Ann"];
        let password = ["password","password2","password3"];

        let inputPassword = document.getElementById("inputPassword").value;
        var inputUsername = document.getElementById("inputUsername").value;
        console.log(inputPassword);
        console.log(inputUsername);

        for (i = 0; i < 10; i++) {
            if (inputPassword == password[i] && inputUsername == username[i]) {
                $("#myModal").modal('hide');
                document.getElementById("myModal").innerHTML = "";
            }
    }



    var client = inputUsername;
    var amount = 0;
    var rate = 0;
    var months = 0;
    var startYear = 0000;

    switch (client) {
        case 'Bill':
            amount = 18000;
            rate = 5;
            months = 24;
            startYear = 2020;
            break;
        case 'Jim':
            amount = 10000;
            rate = 3;
            months = 8;
            startYear = 2019;
            break;
        case 'Ann':
            amount = 15000;
            rate = 8;
            months = 12;
            startYear = 2019;
            break;


    }



    var monthsCollected = [];
    monthsCollected[months] = "";
    currentMonth = 0;
    var y = new Date();
    var ThisYear = y.getFullYear();
    var loanTime = ThisYear - startYear;
    var monthsSinceStart = loanTime * 12;

    var d = new Date();
    var currentDate = d.getMonth() + 1 + monthsSinceStart;

    for (i = 0; i <= months; i++) {
        currentMonth++;

        if (monthsCollected[i] == undefined) {
            monthsCollected[i] = currentMonth;
        }

        if (monthsCollected[i] == currentDate) {
            monthsCollected[i] = "Current Payment";
        } else if (monthsCollected[i] == 1 || monthsCollected[i] == 12 || monthsCollected[i] == 24) {
            monthsCollected[i] = "Jan"
        } else if (monthsCollected[i] == 2 || monthsCollected[i] == 13 || monthsCollected[i] == 25) {
            monthsCollected[i] = "Feb"
        } else if (monthsCollected[i] == 3 || monthsCollected[i] == 14 || monthsCollected[i] == 26) {
            monthsCollected[i] = "Mar"
        } else if (monthsCollected[i] == 4 || monthsCollected[i] == 15 || monthsCollected[i] == 27) {
            monthsCollected[i] = "Apr"
        } else if (monthsCollected[i] == 5 || monthsCollected[i] == 16 || monthsCollected[i] == 28) {
            monthsCollected[i] = "May"
        } else if (monthsCollected[i] == 6 || monthsCollected[i] == 17 || monthsCollected[i] == 29) {
            monthsCollected[i] = "Jun"
        } else if (monthsCollected[i] == 7 || monthsCollected[i] == 18 || monthsCollected[i] == 30) {
            monthsCollected[i] = "Jul"
        } else if (monthsCollected[i] == 8 || monthsCollected[i] == 19 || monthsCollected[i] == 31) {
            monthsCollected[i] = "Aug"
        } else if (monthsCollected[i] == 9 || monthsCollected[i] == 20 || monthsCollected[i] == 32) {
            monthsCollected[i] = "Sep"
        } else if (monthsCollected[i] == 10 || monthsCollected[i] == 21 || monthsCollected[i] == 33) {
            monthsCollected[i] = "Oct"
        } else if (monthsCollected[i] == 11 || monthsCollected[i] == 22 || monthsCollected[i] == 34) {
            monthsCollected[i] = "Nov"
        } else if (monthsCollected[i] == 12 || monthsCollected[i] == 23 || monthsCollected[i] == 35) {
            monthsCollected[i] = "Dec"
        }

    }
    monthsCollected.pop();
    monthsCollected.splice(0, 0);


    //table arrays
    var acountBalance = [amount];
    var monthlyPaymentsCollected = [monthly];
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
    var regex = /[0-9\b]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }

}


