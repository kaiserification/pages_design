$('.btn-add').click(function(e) {
    e.preventDefault()
    let href = $(this).attr('href')
    let id = $(this).data('id')
    $.get(href, {}, function(data, status) {
        $(`span#qty${id}`).empty().html(data.qty)
        $(`span#header_cart_count${id}`).empty().html(data.qty)
        $(`span#shipping_cost${id}`).empty().html(data.shipping_cost_per_product)
        $(`span#amount${id}`).empty().html(data.amount)
        $('#subtotal').empty().html(data.subtotal)
        $('#shipping_cost').empty().html(data.shipping_cost)
        $('#total').empty().html(data.total)

        $('#header_subtotal').empty().html(data.subtotal)
        $('#header_shipping_cost').empty().html(data.shipping_cost)
        $('#header_total').empty().html(data.total)
        $('#header_cart_count').empty().html(data.count)
    }, 'json')
})

$('.btn-minus').click(function(e) {
    e.preventDefault()
    let href = $(this).attr('href')
    let id = $(this).data('id')
    $.get(href, {}, function(data, status) {
        $(`span#qty${id}`).empty().html(data.qty)
        $(`span#header_cart_count${id}`).empty().html(data.qty)
        $(`span#shipping_cost${id}`).empty().html(data.shipping_cost_per_product)
        $(`span#amount${id}`).empty().html(data.amount)
        $('#subtotal').empty().html(data.subtotal)
        $('#shipping_cost').empty().html(data.shipping_cost)
        $('#total').empty().html(data.total)

        $('#header_subtotal').empty().html(data.subtotal)
        $('#header_shipping_cost').empty().html(data.shipping_cost)
        $('#header_total').empty().html(data.total)
        $('#header_cart_count').empty().html(data.count)
    }, 'json')
})

$('.btn-remove').click(function(e) {
    e.preventDefault()
    let id = $(this).data('id')
    let href = $(this).attr('href')
    let html = `<tr><td colspan="7" class="text-center">Aucun produit n'a été ajouté dans le panier pour le moment...</td></tr>`
    $.get(href, {}, function(data, status) {
        $('#subtotal').empty().html(data.subtotal)
        $('#shipping_cost').empty().html(data.shipping_cost)
        $('#total').empty().html(data.total)

        $('#header_subtotal').empty().html(data.subtotal)
        $('#header_shipping_cost').empty().html(data.shipping_cost)
        $('#header_total').empty().html(data.total)
        $('#header_cart_count').empty().html(data.count)
    }, 'json')

    $(`#header_cart_row${id}`).remove()
    $(`#cart_row${id}`).remove()

    if ($('#cart-tbody').children().length == 0) {
        $('#cart-tbody').html(html)
        $('#cart-total-info').remove()
        $('#checkout-btn').remove()
        $('#empty-cart-btn').remove()

        $('#header_cart_subtotal').remove()
        $('#header_cart_shipping_cost').remove()
        $('#header_cart_total').remove()
        $('#header_cart_count').empty().html(0)
        $('#header_button_payment').attr('disabled', 'disabled')
    }
})

$('.header-remove-cart').click(function(e) {
    e.preventDefault()
    let id = $(this).data('id')
    let href = $(this).attr('href')
    let html = `<tr><td colspan="7" class="text-center">Aucun produit n'a été ajouté dans le panier pour le moment...</td></tr>`
    $.get(href, {}, function(data, status) {
        $('#subtotal').empty().html(data.subtotal)
        $('#shipping_cost').empty().html(data.shipping_cost)
        $('#total').empty().html(data.total)

        $('#header_subtotal').empty().html(data.subtotal)
        $('#header_shipping_cost').empty().html(data.shipping_cost)
        $('#header_total').empty().html(data.total)
        $('#header_cart_count').empty().html(data.count)
    }, 'json')

    $(`#header_cart_row${id}`).remove()

    $(`#cart_row${id}`).remove()

    if ($('#cart-tbody').children().length == 0) {
        $('#cart-tbody').html(html)
        $('#cart-total-info').remove()
        $('#checkout-btn').remove()
        $('#empty-cart-btn').remove()

        $('#header_cart_subtotal').remove()
        $('#header_cart_shipping_cost').remove()
        $('#header_cart_total').remove()
        $('#header_cart_count').empty().html(0)
        $('#header_button_payment').attr('disabled', 'disabled')
    }


});