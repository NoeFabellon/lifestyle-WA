
$(document).on('turbolinks:load', () => {
  ajax = (url, data, method) => {
    return $.ajax({
      type: method,
      url: url,
      data: {data: data},
      async: !1,
      cache:false,
      error: function(e) {
        console.log(e.responseText);
          console.log("Error occured")
      }
    });
  }
});