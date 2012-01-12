var LIMIT = 20;

$(document).ready(function () {
  $.get('http://search.npmjs.org/_view/author?group=true',
    function (data) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        alert('YOU\'VE GOT TO BE KIDDING ME. UPGRADE YOUR BROWSER');
      }
      var authors = data.rows.sort(function (a, b) {
        return b.value - a.value; // value descending
      });
      $('#content').text('');
      renderTop(authors, 0, LIMIT);
      $(document).scroll(function () {
        if ($(this).scrollTop() + $(window).height() >= $(this).height() - 50) {
          renderTop();
        }
      });
    }
  );
});

function renderTop (authors, skip, limit) {
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
