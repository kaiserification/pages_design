feather.replace()


const showLoader = function() {
    document.querySelector('#loader-wrapper').style.display = null
}

const hideLoader = function() {
    document.querySelector('#loader-wrapper').style.display = 'none'
}

window.addEventListener('keydown', function(event) {
    if (event.key == 'Escape' || event.key == 'Esc') {
        $('.modal__wrapper').addClass('close');
    }
});


$(document).click(function(event) {
    $('#nav-dropdown').removeClass('show');
});

$('.modal__wrapper').click(function(event) {
    if (event.target.classList.contains('modal__wrapper')) {
        $(this).addClass('close')
    }
})

$('[data-toggle="modal"]').click(function(event) {
    event.preventDefault()
    const target = $(this).data('target')
    $(target).removeClass('close')
})

$('[data-toggle="modal-close"]').click(function(event) {
    event.preventDefault()
    const target = $(this).data('target')
    $(target).addClass('close')
})



$('.nav-search-input').focus(function() {
    $(this).parent().addClass('focused');
});

$('.nav-search-input').blur(function() {
    $(this).parent().removeClass('focused');
});


$('.alert__closer').click(function(event) {
    event.preventDefault()
    $(this).parent().fadeOut(function() {
            $(this).remove();
        })
        // $(this).parent().remove();
})

$('[data-toggle="focus"]').focus(function(event) {
    event.currentTarget.parentElement.classList.add('focused')
})

$('[data-toggle="focus"]').blur(function(event) {
    event.currentTarget.parentElement.classList.remove('focused')
})
$('.sidebar-arrow').css({
    transition: 'all ease .3s'
})

$('[data-toggle="dropdown"]').click(function(e) {
    e.preventDefault()
    e.stopPropagation()
    console.log($(this).data('target'))
    const target = $(this).data('target')
    $(target).toggleClass('show')


    if ($(target).hasClass('show')) {
        $(target)
            .siblings('[data-toggle="dropdown"]').find('.sidebar-arrow').css('transform', 'rotate(90deg)')
    } else {
        $(target)
            .siblings('[data-toggle="dropdown"]').find('.sidebar-arrow').css('transform', 'rotate(0deg)')
    }
});

$('.submenu .sidebar-nav-item .sidebar-nav-link.active').parent().parent().addClass('show');


// const dropzone = document.querySelector('#dropzone')

// if (dropzone !== undefined) {
// 	dropzone.addEventListener('dragover', function(event) {
// 		event.preventDefault()
// 		event.currentTarget.classList.add('dragover');
// 	})

// 	dropzone.addEventListener('dragleave', function(event) {
// 		event.currentTarget.classList.remove('dragover');
// 	})

// 	dropzone.addEventListener('drop', function(event) {
// 		event.preventDefault()
// 		this.classList.remove('dragover')
// 		console.log(event.dataTransfer.files)
// 	})
// }




$('#dropzone_triggerer, #dropzone').click(function(event) {
    event.preventDefault()
    $('#file').trigger('click');
})

$('#scroll-bottom').click(function(e) {
    e.preventDefault()
    $("#content").animate({
        scrollTop: document.querySelector('#content').scrollHeight
    }, 'slow');
})