$(window).on('load', function() {
    hideLoader()
});

const URL = document.head.querySelector('meta[name="current-route"]').content

const showLoader = function() {
    $('#loader').css({
        display: 'flex',
        pointerEvents: 'all!important'
    })
}

$('#goto-down').click(function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $(document).height() - $(window).height()
    }, 'slow')
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
        $('#goto-down').fadeOut()
    } else {
        $('#goto-down').fadeIn()
    }
})


const hideLoader = function() {
    $('#loader').css({
        display: 'none',
        pointerEvents: 'none!important'
    })
}


$('.confirmable').click(function(event) {
    const message = $(this).data('message');
    if (!window.confirm(message)) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        showLoader();
    }
})


$(document).on('change', '#sms_manager_form input, #sms_manager_form select', function(e) {
    showLoader()
    let formData = new FormData(document.querySelector('#sms_manager_form'))
    const url = new URLSearchParams(formData)

    const uri = `${URL}?${url}&ajax=1`

    $.get(uri).done(function(data) {
        $('#table-content').html(data.table)
        $('#text-status').html(data.sms_status)
        $('#pagination-row').html(data.pagination)
        history.replaceState(null, '', uri);
    }).fail(function(response) {
        alert('Une erreur est survenue lors du traitement...')
    }).always(function() {
        hideLoader()
    })
})


// PAGINATION
$(document).on('click', '#pagination-row a', function(event) {
    $('#loader').css({
        display: 'flex',
        pointerEvents: 'all'
    })
    event.preventDefault()
    const url = $(this).attr('href') + '&ajax=1'
    $.get(url).done(function(data) {
        $('#table-content').html(data.table)
        $('#pagination-row').html(data.pagination)
        $('#text-status').html(data.sms_status)
        history.replaceState(null, '', url);
    }).fail(function() {
        alert('Une erreur est survenue lors du traitement...')
    }).always(function() {
        $('#loader').css('display', 'none')
    })
})

// $('.sms-triggers a').click(function(event) {
//     event.preventDefault()
//     const message = $(this).data('message')

//     if (confirm(message)) {
//         showLoader()
//         const $this = $(this)
//         const oldtext = $this.text()
//         $this.text('ENVOI EN COURS...')
//         $this.attr('disabled', 'disabled')
//         event.preventDefault()
//         const url = $this.attr('href')

//         $.get(url).done(function(data) {
//             $('#table-content').html(data.table)
//             data.messages.forEach(message => {
//                 $.ajax({
//                     type: "GET",
//                     dataType: "json",
//                     headers: HEADERS,
//                     url: message.url
//                 }).done(function(data) {
//                     console.log(data);
//                 }).fail(function(response) {
//                     debugger
//                     console.error(`Erreur: ` + response.message)
//                 }).always(function() {
//                     hideLoader()
//                 })
//             })
//         })
//     }
// })