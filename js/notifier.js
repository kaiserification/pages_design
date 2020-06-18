$notifier = $('.notifier')

$('.notifier__closer').click(function(event) {
    event.preventDefault()
    $(this).parent().fadeOut(100, function() {
        $(this).remove()
    })
})

// if ($notifier) {
//     setTimeout(function() {
//         $notifier.fadeOut(800, () => $notifier.remove())
//     }, 2000)
// }