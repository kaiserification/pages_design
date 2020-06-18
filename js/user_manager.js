$('form').submit(function(e) {
  let id = $(this).data('form-target')
  let password = $("#password" + id).val()
  let password_confirmation = $("#password-confirm" + id).val()
  if (password.length < 6) {
      e.preventDefault()
      $("#password" + id).addClass('is-invalid')
      $("#password" + id).siblings('span.invalid-feedback').empty().append('Le mot de passe est trop court (minimum: 6 caractères).')
  } else if (password != password_confirmation) {
    e.preventDefault()
    $("#password" + id).addClass('is-invalid')
    $("#password" + id).siblings('span.invalid-feedback').empty().append('Vous devez confirmer le mot de passe.')
  }
});