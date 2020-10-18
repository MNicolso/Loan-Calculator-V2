$(document).ready(function () {
    $("#myModal").modal('show');
});

function loginValidate() {



        var username = ["u"];
        let password = ["p"];

        let inputPassword = document.getElementById("inputPassword").value;
        let inputUsername = document.getElementById("inputUsername").value;
        console.log(inputPassword);
        console.log(inputUsername);

        for (i = 0; i < 10; i++) {
            if (inputPassword == password[i] && inputUsername == username[i]) {
                $("#myModal").modal('hide');

            }
        }
}





$(document).ready(function table() {

    var client = "bill";
    var amount = 0;
    var rate = 0;
    var months = 0;

    switch (client) {
        case 'bill':
          amount = 18000;
           rate = 5;
            months = 12;
            break;
        case 'Jim':
            amount = 10000;
            rate = 3;
            months = 8;
            break;

    }

   

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
    monthsCollected.splice(0,0);


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

})

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