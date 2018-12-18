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
});
