$(document).on("turbolinks:load", () => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1) + " ";
  }
  let admin = ajax("api/admins", "", "GET");
  admin = JSON.parse(admin.responseText).data;
  admin.forEach(user => {
    let status = (user.enabled) ? 'Enabled' : 'Disabled';
    new_role = "";
    if (Object.keys(user.roles).length > 1) {
      user.roles.forEach(role => {
        new_role += capitalizeFirstLetter(role.substr(role.lastIndexOf("_") + 1).toLowerCase());
      });
    }
    else {
      new_role = capitalizeFirstLetter(user.roles[0].substr(user.roles[0].lastIndexOf("_") + 1).toLowerCase());
    }
    $('#users-table tbody').append(`
      <tr class="uk-padding-remove">
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td>${new_role}</td>
        <td>${status}</td>
        <td>${user.dateCreated} </td>
        <td>
          <form action="/admin/users/${user.id}/edit" method='GET'>
            <button type="submit" class='uk-button-primary uk-border-rounded'><span uk-icon="icon: pencil"></button>
          </form>
        </td>
      </tr>
    `);
  });
  //change dropdrown label when click dropdown option
  $('.users-filter').on("click", e => {
    document.getElementById("users-dropdown-label").innerHTML = e.currentTarget.innerHTML;
  });
  $('#users-search-field').on("keyup", e => {
    searchby = document.getElementById("users-dropdown-label").innerHTML;
    if (searchby == 'Search from' || searchby == 'Name') {
      td_index = 0;
    }
    else if (searchby == 'Email') {
      td_index = 1;
    }
    else if (searchby == 'Roles') {
      td_index = 2;
    }
    else if (searchby == 'Status') {
      td_index = 3;
    }
    else if (searchby == 'Date Created') {
      td_index = 4;
    }
    input = document.getElementById("users-search-field");
    filter = input.value.toUpperCase();
    table = document.getElementById("users-table");
    tr = table.getElementsByTagName("tr");
    $('#users-table').removeClass('uk-table-striped');
    searchData(td_index, input, filter, table, tr);
  });
  //ascending descending
  $('#users-asc-dsc-button').on("click", e => {
    $("tbody").each(function (elem, index) {
      var arr = $.makeArray($("tr", this).detach());
      arr.reverse();
      $(this).append(arr);
    });
  });


});