$(document).on("turbolinks:load", () => {
  //change dropdrown label when click dropdown option
  $('.lodgings-filter').on("click", e => {
    document.getElementById("lodgings-dropdown-label").innerHTML = e.currentTarget.innerHTML;
  });
  $('#lodgings-search-field').on("keyup", e => {
    searchby = document.getElementById("lodgings-dropdown-label").innerHTML;
    if (searchby == 'Search from' || searchby == 'Title') {
      td_index = 0;
    }
    else if (searchby == 'Partner') {
      td_index = 1;
    }
    else if (searchby == 'Category') {
      td_index = 2;
    }
    else if (searchby == 'Sub') {
      td_index = 3;
    }
    else if (searchby == 'Status') {
      td_index = 5;
    }
    input = document.getElementById("lodgings-search-field");
    filter = input.value.toUpperCase();
    table = document.getElementById("lodgings-table");
    tr = table.getElementsByTagName("tr");
    $('#lodgings-table').removeClass('uk-table-striped');
    searchData(td_index, input, filter, table, tr);
  });
});