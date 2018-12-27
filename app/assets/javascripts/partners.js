$(document).on("turbolinks:load", () => {
  let partners = ajax("api/partners", "", "GET");
  partners = JSON.parse(partners.responseText).data;
  partners.forEach(partner => {
    let newDateCreated = formatDate(partner.dateCreated);
    $('#partners-table tbody').append(`
      <tr class="uk-padding-remove">
        <td>${partner.name}</td>
        <td>${partner.name}</td>
        <td>${partner.id}</td>
        <td>${newDateCreated}</td>
        <td>${partner.applicationStatus}</td>
        <td>${partner.partnerStatus}</td>
        <td>
          <div class='uk-flex'>
            <form action="" method='GET'>
              <button type='submit' class="uk-button-primary uk-border-rounded">
                <img src="/assets/eye-icon.png" class='uk-icon-image partners-eye-icon' />
              </button>
            </form>
            <form action="" method='GET'>
              <button type='submit' class="uk-button-primary uk-border-rounded"><span uk-icon="icon: pencil"></span></button>
            </form>
            <form action="" method='GET'>
              <button type='submit' class="partners-signin-button uk-border-rounded"><span uk-icon="icon: sign-in"></span></button>
            </form>
          </div>
        </td>
      </tr>
    `);
  });
  //change dropdrown label when click dropdown option
  $('.partners-filter').on("click", e => {
    document.getElementById("partners-dropdown-label").innerHTML = e.currentTarget.innerHTML;
  });
  $('#partners-search-field').on("keyup", e => {
    searchby = document.getElementById("partners-dropdown-label").innerHTML;
    if (searchby == 'Search from' || searchby == 'Business Name') {
      td_index = 0;
    }
    else if (searchby == 'Published Business Name') {
      td_index = 1;
    }
    else if (searchby == 'Partner ID') {
      td_index = 2;
    }
    else if (searchby == 'Date Created') {
      td_index = 3;
    }
    else if (searchby == 'App Status') {
      td_index = 4;
    }
    else if (searchby == 'Display Status') {
      td_index = 5;
    }
    input = document.getElementById("partners-search-field");
    filter = input.value.toUpperCase();
    table = document.getElementById("partners-table");
    tr = table.getElementsByTagName("tr");
    $('#partners-table').removeClass('uk-table-striped');
    searchData(td_index, input, filter, table, tr);
  });
});