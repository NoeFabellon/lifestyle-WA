$(document).on("turbolinks:load", () => {
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
    $('#vouchers-table tbody').append(`
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
  //change dropdrown label when click dropdown option
  $('.vouchers-filter').on("click", e => {
    document.getElementById("vouchers-dropdown-label").innerHTML = e.currentTarget.innerHTML;
  });
  $('#vouchers-search-field').on("keyup", e => {
    searchby = document.getElementById("vouchers-dropdown-label").innerHTML;
    if (searchby == 'Search from' || searchby == 'Code') {
      td_index = 0;
    }
    else if (searchby == 'Activity/Event') {
      td_index = 1;
    }
    else if (searchby == 'Customer') {
      td_index = 2;
    }
    else if (searchby == 'Amount') {
      td_index = 3;
    }
    else if (searchby == 'Quantity') {
      td_index = 4;
    }
    else if (searchby == 'Schedule') {
      td_index = 5;
    }
    else if (searchby == 'Location') {
      td_index = 6;
    }
    else if (searchby == 'Date Created') {
      td_index = 7;
    }
    else if (searchby == 'Status') {
      td_index = 8;
    }
    input = document.getElementById("vouchers-search-field");
    filter = input.value.toUpperCase();
    table = document.getElementById("vouchers-table");
    tr = table.getElementsByTagName("tr");
    $('#vouchers-table').removeClass('uk-table-striped');
    searchData(td_index, input, filter, table, tr);
  });
});