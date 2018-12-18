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
    $('#users-table table tbody').append(`
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
});