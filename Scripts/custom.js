
function homeLoan(){

    var amount = document.getElementById("amount");
    var rate = document.getElementById("rate");
    var months = document.getElementById("months");

    var principal = parseFloat(amount.value);
    var interest = parseFloat(rate.value) / 100 / 12;
    var payments = parseFloat(months.value);

    // compute the monthly payment figure
    var x = Math.pow(1 + interest, payments); //Math.pow computes powers
    var monthly = (principal * x * interest) / (x - 1);

    var monthlyInterest = (monthly * payments);
    var totalInterest = ((monthly * payments) - principal);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    let amountRound = formatter.format(principal);
    let monthRound = formatter.format(monthly);
    let interestRound = formatter.format(monthlyInterest);
    let totalRound = formatter.format(totalInterest);

    document.getElementById("principalOut").innerHTML = `${amountRound}`;
    document.getElementById("monthlyOut").innerHTML = `${monthRound}`;
    document.getElementById("interestOut").innerHTML = `${interestRound}`;
    document.getElementById("costOut").innerHTML = `${totalRound}`;
}