$(document).on("turbolinks:load", () => {
  //change dropdrown label when click dropdown option
  $('.wellness-filter').on("click", e => {
    document.getElementById("wellness-dropdown-label").innerHTML = e.currentTarget.innerHTML;
  });
  $('#wellness-search-field').on("keyup", e => {
    searchby = document.getElementById("wellness-dropdown-label").innerHTML;
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
    input = document.getElementById("wellness-search-field");
    filter = input.value.toUpperCase();
    table = document.getElementById("wellness-table");
    tr = table.getElementsByTagName("tr");
    $('#wellness-table').removeClass('uk-table-striped');
    searchData(td_index, input, filter, table, tr);
  });
});