$(document).on("turbolinks:load", () => {
  function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var day = new Date(date).getDate();
    var monthIndex = new Date(date).getMonth();
    var year = new Date(date).getFullYear();
    var hour = new Date(date).getHours();
    var minute = new Date(date).getMinutes();
    var amPM = (hour > 11) ? "pm" : "am";
    if (hour > 12) {
      hour -= 12;
    } else if (hour == 0) {
      hour = "12";
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    return monthNames[monthIndex] + ' ' + day + ', ' + year + " " + hour + ":" + minute + amPM;
  }
  let transactions = ajax("api/transactions", "", "GET");
  transactions = JSON.parse(transactions.responseText).data;
  transactions.forEach(transaction => {
    let newPaymentDate = formatDate(transaction.paymentDate);
    let newDateCreated = formatDate(transaction.paymentDate);
    status = ''
    if (transaction.paymentStatus == 'PAID') {
      status = "<span class='uk-text-bold uk-text-success'>PAID</span>"
    }
    else if (transaction.paymentStatus == 'PENDING') {
      status = "<span class='uk-text-bold uk-text-warning'>PENDING</span>"
    }
    $('#transactions-table table tbody').append(`
      <tr class="uk-padding-remove">
        <td class="uk-text-bold">${transaction.reference}</td>
        <td>${transaction.email}</td>
        <td>${transaction.method}</td>
        <td>PHP${transaction.amount}</td>
        <td>${newDateCreated}</td>
        <td>${newPaymentDate} / ${transaction.paymentRef}</td>
        <td>${status}</td>
      </tr>
    `);
  });
});