$('.is-convertible').each(function(index, convertible) {
  const currency = convertible.getAttribute('data-currency')

  if (['USD', '$'].includes(currency)) {
    let price               = parseFloat(convertible.textContent.replace(currency, '').trim())
    let new_price           = parseInt(Math.floor((price * 606.57) / 100) * 100)
    convertible.textContent = `${new_price} FCFA`  
  } else if (['EUR', '€'].includes(currency)) {
    let price               = parseFloat(convertible.textContent.replace(currency, '').trim())
    let new_price           = parseInt(Math.floor((price * 655.97) / 100) * 100)
    convertible.textContent = `${new_price} FCFA`  
  } else if (['£', 'GBP'].includes(currency)) {
    let price               = parseFloat(convertible.textContent.replace(currency, '').trim())
    let new_price           = parseInt(Math.floor((price * 655.97) / 100) * 100)
    convertible.textContent = `${new_price} FCFA`  
  }
});