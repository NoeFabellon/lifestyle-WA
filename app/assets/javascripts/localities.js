$(document).on("turbolinks:load", () => {
  let localities = ajax("api/localities", "", "GET");
  localities = JSON.parse(localities.responseText).data;
  localities.forEach(locality => {
    if (locality.province == null) {
      province_name = ''
      superLocale_name = ''
      countryName = ''
    }
    else {
      province = locality.province;
      province_name = locality.province.name
      superLocale_name = locality.province.superLocale.name
      countryName = locality.province.superLocale.country.countryName
    }
    $('#localities-table tbody').append(`
      <tr class="uk-padding-remove">
        <td><img src='${locality.image}' class='localities-images') /></td>
        <td>${locality.name}</td>
        <td>${province_name}</td>
        <td>${superLocale_name}</td>
        <td>${countryName}</td>
        <td>
          <form action="" method='GET'>
            <button type='submit' class="uk-button-primary uk-border-rounded"><span uk-icon="icon: pencil"></span></button>
          </form>
        </td>
      </tr>
    `);
  });
  //change dropdrown label when click dropdown option
  $('.localities-filter').on("click", e => {
    document.getElementById("localities-dropdown-label").innerHTML = e.currentTarget.innerHTML;
  });
  $('#localities-search-field').on("keyup", e => {
    searchby = document.getElementById("localities-dropdown-label").innerHTML;
    if (searchby == 'Search from' || searchby == 'Locality') {
      td_index = 1;
    }
    else if (searchby == 'Province') {
      td_index = 2;
    }
    else if (searchby == 'Super Locale') {
      td_index = 3;
    }
    else if (searchby == 'Country') {
      td_index = 4;
    }
    input = document.getElementById("localities-search-field");
    filter = input.value.toUpperCase();
    table = document.getElementById("localities-table");
    tr = table.getElementsByTagName("tr");
    $('#localities-table').removeClass('uk-table-striped');
    searchData(td_index, input, filter, table, tr);
  });
});