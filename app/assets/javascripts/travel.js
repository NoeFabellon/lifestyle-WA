$(document).on("turbolinks:load", () => {
  //change dropdrown label when click dropdown option
  $('.travels-filter').on("click", e => {
    document.getElementById("travels-dropdown-label").innerHTML = e.currentTarget.innerHTML;
  });
  $('#travels-search-field').on("keyup", e => {
    searchby = document.getElementById("travels-dropdown-label").innerHTML;
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
    input = document.getElementById("travels-search-field");
    filter = input.value.toUpperCase();
    table = document.getElementById("travels-table");
    tr = table.getElementsByTagName("tr");
    $('#travels-table').removeClass('uk-table-striped');
    searchData(td_index, input, filter, table, tr);
  });
});