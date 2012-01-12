var authors;
var limit = 20;
var skip = 0;

$(document).ready(function () {
  $.get('/authors',
    function (data) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        alert('YOU\'VE GOT TO BE KIDDING ME. UPGRADE YOUR BROWSER');
      }
      authors = data.rows.sort(function (a, b) {
        if (a.value != b.value) {
          return b.value - a.value; // value descending
        } else {
          var a = a.key.toLowerCase();
          var b = b.key.toLowerCase();
          if (a < b) return -1;
          if (a > b) return 1;
        }
      });
      $('#content').text('');
      renderTop();
      $(document).scroll(function () {
        if ($(this).scrollTop() + $(window).height() >= $(this).height() - 50) {
          renderTop();
        }
      });
    }
  );
});

function renderTop () {
  $('#content').append('<pre>rank     packages   author\n\
----------------------------------------------</pre>');
  for (var i = skip; i < limit + skip; i++) {
    $('#content').append(
      '<pre><strong>#' + (i + 1) + '</strong>' + '       ' +
      authors[i].value + '        ' + authors[i].key + '</pre>'
    );
  }   
  skip += limit;
}
