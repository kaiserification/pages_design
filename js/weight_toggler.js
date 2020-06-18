$('.enable-input').click(function(event) {
    event.preventDefault()
    event.target.previousElementSibling.removeAttribute('disabled')
    event.target.previousElementSibling.focus()
    event.target.previousElementSibling.style.border = '1px solid #000'
    event.target.style.display = 'none'
})

$('[data-toggle="weight"]').blur(function(event) {
    event.target.style.border = 'none'
    event.target.nextElementSibling.style.display = null
    event.target.setAttribute('disabled', 'disabled')
    
    // const url = event.target.dataset.url 
    // const weight = parseFloat(event.target.value)


    // $.ajax({
    //     url: url,
    //     type: 'post',
    //     data: {weight: weight},
    //     headers: { 'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').getAttribute('content') },
    //     dataType: 'json'
    // }).done(function(data){
    //     $(data.order_amount_target).empty().append(data.order_amount)
    //     $(data.order_item_amount_target).empty().append(data.order_item_amount)
    //     $(data.shipping_cost_target).empty().append(data.shipping_cost)
    //     event.target.style.border = 'none'
    //     event.target.nextElementSibling.style.display = null
    //     event.target.setAttribute('disabled', 'disabled')
    //     alert("Le poids a bien été mis à jour.")
    // }).fail(function(){
    //     alert('une erreur est survenue lors de la modification du poids')
    // })
})

$('[data-toggle="weight"]').keydown(function(event) {
    const url = $(this).data('url')
    const weight = parseFloat($(this).val())

    if (event.key == 'Enter') {
        event.preventDefault()
        event.stopPropagation()

        $.ajax({
          url: url,
          type: 'post',
          data: {weight: weight},
          headers: { 'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').getAttribute('content') },
          dataType: 'json'
        }).done(function(data){
            $(data.order_amount_target).empty().append(data.order_amount)
            $(data.order_item_amount_target).empty().append(data.order_item_amount)
            $(data.shipping_cost_target).empty().append(data.shipping_cost)
            event.target.style.border = 'none'
            event.target.nextElementSibling.style.display = null
            event.target.setAttribute('disabled', 'disabled')
            alert("Le poids a bien été mis à jour.")
        }).fail(function(){
            alert('une erreur est survenue lors de la modification du poids')
        })
    } else if (event.key == 'Escape') {
        event.target.style.border = 'none'
        event.target.nextElementSibling.style.display = null
        event.target.setAttribute('disabled', 'disabled')
    } 
})