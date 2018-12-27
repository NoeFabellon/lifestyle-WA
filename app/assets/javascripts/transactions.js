$(document).on("turbolinks:load", () => {
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
    $('#transactions-table tbody').append(`
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
  //change dropdrown label when click dropdown option
  $('.transactions-filter').on("click", e => {
    document.getElementById("transactions-dropdown-label").innerHTML = e.currentTarget.innerHTML;
  });
  $('#transactions-search-field').on("keyup", e => {
    searchby = document.getElementById("transactions-dropdown-label").innerHTML;
    if (searchby == 'Search from' || searchby == 'Reference No') {
      td_index = 0;
    }
    else if (searchby == 'Customer') {
      td_index = 1;
    }
    else if (searchby == 'Method') {
      td_index = 2;
    }
    else if (searchby == 'Amount') {
      td_index = 3;
    }
    else if (searchby == 'Date') {
      td_index = 4;
    }
    else if (searchby == 'Status') {
      td_index = 5;
    }
    input = document.getElementById("transactions-search-field");
    filter = input.value.toUpperCase();
    table = document.getElementById("transactions-table");
    tr = table.getElementsByTagName("tr");
    $('#transactions-table').removeClass('uk-table-striped');
    searchData(td_index, input, filter, table, tr);
  });
});