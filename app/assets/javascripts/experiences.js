$(document).on("turbolinks:load", () => {
  // let experiences = ajax("api/experiences", "", "GET");
  // experiences = JSON.parse(experiences.responseText).data;
  // experiences.forEach(experience => {
  //   let newPaymentDate = formatDate(experience.paymentDate);
  //   let newDateCreated = formatDate(experience.paymentDate);
  //   status = ''
  //   if (experience.paymentStatus == 'PAID') {
  //     status = "<span class='uk-text-bold uk-text-success'>PAID</span>"
  //   }
  //   else if (experience.paymentStatus == 'PENDING') {
  //     status = "<span class='uk-text-bold uk-text-warning'>PENDING</span>"
  //   }
  //   $('#experiences-table tbody').append(`
  //     <tr class="uk-padding-remove">
  //       <td class="uk-text-bold">${experience.reference}</td>
  //       <td>${experience.email}</td>
  //       <td>${experience.method}</td>
  //       <td>PHP${experience.amount}</td>
  //       <td>${newDateCreated}</td>
  //       <td>${newPaymentDate}</td>
  //     </tr>
  //   `);
  // });
  //change dropdrown label when click dropdown option
  $('.experiences-filter').on("click", e => {
    document.getElementById("experiences-dropdown-label").innerHTML = e.currentTarget.innerHTML;
  });
  $('#experiences-search-field').on("keyup", e => {
    searchby = document.getElementById("experiences-dropdown-label").innerHTML;
    if (searchby == 'Search from' || searchby == 'Category Name') {
      td_index = 3;
    }
    else if (searchby == 'Country') {
      td_index = 4;
    }
    input = document.getElementById("experiences-search-field");
    filter = input.value.toUpperCase();
    table = document.getElementById("experiences-table");
    tr = table.getElementsByTagName("tr");
    $('#experiences-table').removeClass('uk-table-striped');
    searchData(td_index, input, filter, table, tr);
  });
});