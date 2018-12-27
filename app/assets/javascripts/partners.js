$(document).on("turbolinks:load", () => {
  let partners = ajax("api/partners", "", "GET");
  partners = JSON.parse(partners.responseText).data;
  partners.forEach(partner => {
    let newDateCreated = formatDate(partner.dateCreated);
    $('#partners-table table tbody').append(`
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
});