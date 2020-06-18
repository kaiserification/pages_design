$('.menu-link').click(function() {
    $(this).siblings('.submenu').slideToggle()
});

$('li.menu-item-l2 > a').click(function() {
    $(this).children('i').css('opacity', 1)
})

$('li.menu-item-l1 > a').click(function(e) {
    e.preventDefault()
    if (!$(this).siblings('ul').hasClass('in')) {
        $(this).children('i').removeClass('fa-plus-square').addClass('fa-minus-square')
    } else {
        $(this).children('i').removeClass('fa-minus-square').addClass('fa-plus-square')
    }
})

$('li.menu-item-l2 > button + ul li a.enabled').parent().parent().addClass('in')
$('li.menu-item-l2 > button + ul li a.enabled').parent().parent().parent().parent().addClass('in')

element = document.querySelector('li.menu-item-l2 > button + ul li a.enabled')
if (element) {
    const element2 = element.parentNode.parentNode.parentNode.parentNode.parentNode
    $('.menu-l1 .menu-item-l1:first-child').after(element2)
}



$('li.menu-item-l1 > a').click(function(e) {
    e.preventDefault()
    $('.menu-item-l1 menu-l2').removeClass('in')
})