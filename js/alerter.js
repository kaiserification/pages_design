$('.alert__closer').click(function(event) {
    event.preventDefault()
    $(this).parent().fadeOut(function() {
        $(this).remove();
    })
})

