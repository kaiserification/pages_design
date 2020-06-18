$(document).ready(function() {
  $('.comment-input').focus(function() {
    $(this).parent().addClass('focused');
  });

  $('.comment-input').blur(function() {
    const value = $(this).val()
    if (! value) {
      $(this).parent().removeClass('focused');
    }
  });

  $('#comment_content').focus(function() {
    $('#comment-actions').removeClass('d-none');
  });

  $('.cancel-comment').click(function(event) {
    event.preventDefault()
    $('#comment_content').val('')
    $(this).parent().addClass('d-none')
  });

  $('.reply-btn').click(function(event) {
    $('.reply-btn').addClass('d-none');
    $('.response-form').addClass('d-none');
    event.preventDefault();
    $(this).siblings('form').removeClass('d-none').find('.comment-input').focus();
    $(this).addClass('d-none');
  });

  $('.cancel-response').click(function(event) {
    event.preventDefault();
    $('.reply-btn').removeClass('d-none');
    $(this).parent().parent().addClass('d-none').siblings('.reply-btn').removeClass('d-none');
  })

  $('.comment-meta').timeago();
})