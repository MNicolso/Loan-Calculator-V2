﻿function tableFunc() {
    
var amount = 25000;//document.getElementById("amount");
    var rate = 5;// document.getElementById("rate");
    var months = 60;/*document.getElementById("months");*/

    // months.length = 60;
    //    var principal = parseFloat(amount.value);
    //var interest = parseFloat(rate.value) / 100 / 12;
    //var payments = parseFloat(months.value);

    let monthly = ((amount) * (rate / 1200) / (1 - (1 + rate / 1200) ** (~months + 1)));

    // compute the monthly payment figure
     //Math.pow computes powers
    
    //var x = Math.pow(1 + interest, payments);
    //var monthly = (principal * x * interest) / (x - 1);
    
    //var monthlyInterest = (monthly * payments);
    //var totalInterest = ((monthly * payments) - principal);

    let tableBody = document.getElementById("tabledata");
    let datahtml = "";
    
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    
    let monthRound = formatter.format(monthly);

    for (var i = 1; i <= months; i++) {

        
        let perMonth = monthly;
        let balance = amount - (perMonth * i);
        balance = Math.max(0, balance);
        let perfectBalance = formatter.format(balance); // as all things should be

     


        datahtml += `<tr><td>${i}</td><td>${monthRound}</td><td>gg</td><td>gg </td><td> gg</td><td>${perfectBalance}</td></tr>`;
    }
    console.log(datahtml);
    
    tableBody.innerHTML = datahtml;
}