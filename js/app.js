$(document).ready(function() {

    const $forContacts = $('.navbar-row.for-contacts')
    const $forLinks = $('.navbar-row.for-links')
    const $scrollup = $('#scrollup')
    const $navbarCategories = $('#navbar-row-categories');

    function makeBodyOverflow(overflow = true) {
        $('html, body').toggleClass('overflow-hidden', overflow);
    }

    $scrollup.click(function(event) {
        event.preventDefault();
        scrollToTop();
    });

    function cart_counter_html(cart_count) {
        return `Panier <i class="fa-md ti-shopping-cart"></i><span class="cart-counter" id="cart-counter">${cart_count}</span>`;
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    $('[data-toggle="select"]').click(function(event) {
        event.preventDefault()
        event.stopPropagation()
        const $this = $(this)
        $this.find('.icon').toggleClass('rotateY');
        const target = $this.data('target')
        $(target).toggleClass('show')
        $this.toggleClass('btn-active');
    })

    $('[data-toggle="collapse"]').click(function(event) {
        event.preventDefault();
        const target = $(this).data('target')
        $(target).toggleClass('show')
    });


    $('.has-icon-left .form-control, .has-icon-right .form-control').focus(function() {
        $(this).parent().addClass('focused');
    });

    $('.has-icon-left .form-control, .has-icon-right .form-control').blur(function() {
        $(this).parent().removeClass('focused');
    });

    $('[data-toggle="confirmable-modal"]').click(function(event) {
        event.preventDefault()
        document.body.style.overflow = 'hidden'
        const target = $(this).data('target')
        document.querySelector(target).style.display = null
    });

    $('.confirmable-modal-close, .modal-btn-close').click(function(event) {
        event.preventDefault()
        const target = $(this).data('target')
        document.body.style.overflow = 'auto'
        $(target).toggleClass('show');
    });

    $('[data-toggle="qty-modifier"]').click(function(event) {
        showLoader();
        event.preventDefault();
        let href = $(this).attr('href');

        if (href == undefined) {
            href = $(this).data('href');
        }

        let target = $(this).data('target');

        $.get(href).done(function(data, status) {
            $(target).empty().append(data.qty);
            $('#has-cart-count').empty().append(cart_counter_html(data.count))
            $('#subtotal').empty().append(data.subtotal)
            $('#total_shipping_cost').empty().append(data.shipping_cost)
            $('#total').empty().append(data.total)
            $('#cart-inner-content').empty().append(data.cart_navbar)
        }).always(function() {
            hideLoader();
        })
    })

    $('.add-to-cart-btn').click(function(event) {
        event.preventDefault()
        const target   = $(this).data('target');
        const href     = $(this).attr('href');
        const inputqty = $(this).data('inputqty'); 
        // showLoader();
        // $.get(href).done(function(data, status) {
        //     $(target).addClass('show');
        //     $(inputqty).empty().append(data.qty);
        //     $('#has-cart-count').empty().append(cart_counter_html(data.count))
        //     $('#cart-inner-content').empty().append(data.cart_navbar)
        // }).always(function(){
        //     hideLoader();
        // });
    });



    $('.remove-product-from-cart').click(function(event) {
        const cart_row_count = Array.from(document.querySelector('#carts-content').children).length
        if (cart_row_count > 1) {
            event.preventDefault()
            const href = $(this).attr('href')
            const $this = $(this)

            $.get(href).done(function(data, status) {
                $('#has-cart-count').empty().append(cart_counter_html(data.count))
                $('#subtotal').empty().append(data.subtotal)
                $('#total_shipping_cost').empty().append(data.shipping_cost)
                $('#total').empty().append(data.total)
                $('#cart-inner-content').empty().append(data.cart_navbar)
                $this.parent().fadeOut(500, function() { $(this).remove(); })
            })
        }
    })

    function let_confirm(html) {
        $('#confirmable-overlay').addClass('show');
        $('#confirmable-overlay').find('.confirmable-modal-body').empty().html(html)
    }


    $('.for-links a').hover(function() {
        $('.category__dropdown').css('display', 'block')
    });

    $(document).click(function(event) {
        $('#options').removeClass('show');
        $('#cart-inner-content').removeClass('show');
        $('[data-toggle="select"]').removeClass('btn-active');
    });

    $('#cart-inner-content').click(function(event) {
        event.stopPropagation();
    });

    $('#options .option').click(function(event) {
        event.stopPropagation();
    });



    document.querySelectorAll('.form .input').forEach(input => {
        input.addEventListener('focus', e => {
            if (e.target.nextElementSibling && e.target.nextElementSibling.tagName == 'I') {
                e.target.parentNode.classList.add('bordered-gray')
            } else {
                // e.target.classList.add('bordered-gray')
            }
        })
    })
    document.querySelectorAll('.form .input').forEach(input => {
        input.addEventListener('blur', e => {
            if (e.target.nextElementSibling && e.target.nextElementSibling.tagName == 'I') {
                e.target.parentNode.classList.remove('bordered-gray')
            } else {
                // e.target.classList.remove('bordered-gray')
            }
        })
    })

    $(document).click(function() {
        $('.navbar-menu-dropdown-box').removeClass('show');
    });


    $('[data-toggle="dropdown"]').click(function(e) {
        e.preventDefault()
        e.stopPropagation()
            // $('.navbar-menu-dropdown-box').removeClass('show');

        $(this).parent().siblings('.navbar-menu-item').find('.navbar-menu-dropdown-box').removeClass('show')

        let dropdownLinkClass = $(this).hasClass('navbar-menu-link')
        const target = $(this).data('target')
        $(target).toggleClass('show')


        if ($(target).hasClass('show')) {
            // $(this).addClass('outlined')
            if (!dropdownLinkClass) {
                $(target).siblings('[data-toggle="dropdown"]').find('i').addClass('rotate-half')
            }
        } else {
            // $(this).removeClass('outlined')
            if (!dropdownLinkClass) {
                $(target).siblings('[data-toggle="dropdown"]').find('i').removeClass('rotate-half')
            }
        }
    })

    $('[data-toggle="dropdown1"]').click(function(e) {
        e.preventDefault()
        e.stopPropagation()
            // $('.navbar-menu-dropdown-box').removeClass('show');

        $(this).parent().siblings('.navbar-menu-item').find('.navbar-menu-dropdown-box').removeClass('show')

        let dropdownLinkClass = $(this).hasClass('navbar-menu-link')
        const target = $(this).data('target')
        $(target).toggleClass('show')


        if ($(target).hasClass('show')) {
            // $(this).addClass('outlined')
            if (!dropdownLinkClass) {
                $(target).siblings('[data-toggle="dropdown"]').find('i').addClass('rotate-half')
            }
        } else {
            // $(this).removeClass('outlined')
            if (!dropdownLinkClass) {
                $(target).siblings('[data-toggle="dropdown"]').find('i').removeClass('rotate-half')
            }
        }
    })

    $('[data-toggle="paste"]').click(function(event) {
        event.preventDefault()
        const target = $(this).data('target')
        $(target).focus()
        navigator.clipboard.readText().then(clipText => $(target).val(clipText));
    });



    $(window).scroll(function(event) {
        if (window.scrollY > 100) {
            $forContacts.addClass('slide-up');
            $forLinks.addClass('slide-up');
            $scrollup.addClass('show');
            $navbarCategories.addClass('slide-up');
        } else {
            $forContacts.removeClass('slide-up');
            $forLinks.removeClass('slide-up');
            $scrollup.removeClass('show');
            $navbarCategories.removeClass('slide-up');
        }
    });


    $('.field-suggestions .suggestion-item').click(function(event) {
        event.preventDefault()
        const $this = $(this)
        const text = $this.text().trim()
        const $parent = $this.parent()
        const target = $parent.data('target')
        $(target).val(text)
        $parent.remove()
        $(target).parent().parent().parent().submit()
    })

    const header_carousel = $('.owl-carousel.header-slider')

    if (header_carousel.length != 0) {
        header_carousel.owlCarousel({
            // lazyLoad: true,
            smartSpeed: 200,
            // margin: 0,
            // padding: 0,
            loop: true,
            // center: true,
            autoPlay: false,
            // autowidth: false,
            // autoplayHoverPause: true,
            // singleItem: true,
            items: 1,
            dot: false,
            nav: false,
        })
    }



    $('#slide-left').click(function() {
        header_carousel.trigger('prev.owl.carousel')
    })
    $('#slide-right').click(function() {
        header_carousel.trigger('next.owl.carousel')
    })

    $('.modal-bg').click(function(event) {
        if (event.target.className.includes('modal-bg')) {
            $(this).removeClass('show')
        }
    })

    $('[data-toggle="modal"]').click(function(event) {
        event.preventDefault()
        const target = event.target.getAttribute('data-target')
        $(target).addClass('show')
    })

    $('.copy').click(function() {
        const $btn = $(this)
        const target = $btn.data('target')
        $('.copy').find('.copy-label').text('Copier')
        $('.copy').find('.paste-label').removeClass('disappear')
        navigator.clipboard.writeText($(target).text()).then(_ => {
            $btn.find('.copy-label').html('Copié&nbsp;')
            $btn.find('.paste-label').addClass('disappear')
        })
    })


    $('.pagination .pagination-link').click(function(e) {
        if ($(this).hasClass('active')) {
            e.preventDefault()
        }
    })

    // Sidenav categories
    $('.sidenav .level-3 li.active').parent().addClass('show')
    $('.sidenav .level-3 li.active').parent().parent().parent().addClass('show')


    let timeoutID = null;


    


    $('[data-toggle="category-dropdown"]').hover(function(event) {
        event.preventDefault()
        const target = $(this).data('target')
        $(target).addClass('show')
    });

    $('[data-toggle="category-dropdown"]').mouseleave(function(event) {
        event.preventDefault();
        const target = $(this).data('target');
        $(target).removeClass('show');
    });

    

    $(window).keydown(function(event) {
        if (event.key == 'Escape') { category__overlay.style.display = 'none'; }
    });

    $('.suggestionnable').focus(function() {
        $('.focused-shadow').addClass('focused');
        makeBodyOverflow();
    });

    $('.suggestionnable').blur(function() {
        $('.focused-shadow').removeClass('focused');
        makeBodyOverflow(false);
    });
});