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
  //Date Format
  formatDate = (date) => {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var day = new Date(date).getDate();
    var monthIndex = new Date(date).getMonth();
    var year = new Date(date).getFullYear();
    var hour = new Date(date).getHours();
    var minute = new Date(date).getMinutes();
    var amPM = (hour > 11) ? "PM" : "AM";
    if (hour > 12) {
      hour -= 12;
    } else if (hour == 0) {
      hour = "12";
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    return monthNames[monthIndex] + ' ' + day + ', ' + year + " " + hour + ":" + minute + amPM;
  }
  //ascending descending of data
  $('.asc-dsc-button').on("click", e => {
    $("tbody").each(function (elem, index) {
      var arr = $.makeArray($("tr", this).detach());
      arr.reverse();
      $(this).append(arr);
    });
  });
});