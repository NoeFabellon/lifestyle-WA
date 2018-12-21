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
    var amPM = (hour > 11) ? "PM" : "AM";
    if (hour > 12) {
      hour -= 12;
    } else if (hour == 0) {
      hour = "12";
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    return monthNames[monthIndex] + ' ' + day + ', ' + year + " " + hour + ":" + minute + " " + amPM;
  }
  let vouchers = ajax("api/vouchers", "", "GET");
  vouchers = JSON.parse(vouchers.responseText).data;
  vouchers.forEach(voucher => {
    status = ''
    if (voucher.redemptionStatus == 'UNREDEEMED') {
      status = "<span class='uk-text-bold uk-text-success'>UNREDEEMED</span>"
    }
    else if (voucher.redemptionStatus == 'REDEEMED') {
      status = "<span class='uk-text-bold uk-text-danger'>REDEEMED</span>"
    }
    schedule = ''
    if (voucher.schedule != null) {
      schedule = voucher.schedule;
    }
    fullname = voucher.customer.firstName + " " + voucher.customer.lastName
    let newDateCreated = formatDate(voucher.dateCreated);
    $('#vouchers-table table tbody').append(`
      <tr class="uk-padding-remove">
        <td class="uk-text-bold">${voucher.code}</td>
        <td>${voucher.content.title}</td>
        <td>${fullname}</td>
        <td>${voucher.totalPrice}</td>
        <td>${voucher.quantity}</td>
        <td>${schedule}</td>
        <td>${voucher.content.location.address}</td>
        <td>${newDateCreated}</td>
        <td>${status}</td>
      </tr>
    `);
  });
});