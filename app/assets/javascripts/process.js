$(document).on("turbolinks:load", () => {
  ajax = (action, data, method) => {
    return $.ajax({
      type: method,
      url: `https://dev2.bliimo.net/${action}`,
      contentType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${gon.global.currentUser.access_token}`);
      },
      data: { data: data },
      async: !1,
      cache: false,
      error: function (e) {
        console.log(e.responseText);
        console.log("Error occured");
      }
    });
  };
  //search function
  searchData = (td_index, input, filter, table, tr) => {
    countresult = 0;
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[td_index];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          $(tr[i]).removeClass('uk-hidden');
          countresult += 1;
          if (countresult % 2 == 1) {
            $(tr[i]).css("background", "#f8f8f8");
          } else {
            $(tr[i]).css("background", "");
          }
        } else {
          $(tr[i]).addClass('uk-hidden');
        }
      }
    }
  }
});