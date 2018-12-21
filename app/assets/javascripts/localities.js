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
    $('#localities-table table tbody').append(`
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
});