$(function() {
  $('#js-links-hook').on('click', 'a', function(e) {
    var row = $(e.delegateTarget);
    var input = row.find('input');
    var inputNameCounter = parseInt(input.attr('name').split('_')[1]);

    if (input.val() === '' || input.val() === ' ') return false;

    var newRow = row.clone();
    newRow.find('.InputGroup').removeClass('InputGroup--icon');
    newRow.insertBefore(row);

    input.val('');
    input.attr('name', 'Link_' + (inputNameCounter + 1));

    return false;
  });
});
