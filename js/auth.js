$(document).ready(function() {
    feather.replace()

    $('#user_email').parent().addClass('focused');

    $('.form-control').focus(function() {
        $(this).parent().addClass('focused');
    });


    $('.form-control').blur(function() {
        $(this).parent().removeClass('focused');
    });

    $('[data-toggle="password-viewer"]').click(function(e) {
        e.preventDefault();
        const target = $(this).data('target');
        const type = $(target).attr('type');
        const $fa = $(this).find('.fa');

        if (type == 'password') {
            $fa.removeClass('fa-eye-slash').addClass('fa-eye');
            $(target).attr('type', 'text');
        } else {
            $fa.removeClass('fa-eye').addClass('fa-eye-slash');
            $(target).attr('type', 'password');
        }
    });
})

