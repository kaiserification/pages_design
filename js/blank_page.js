$(function() {

    function catObjects(array) {
        if (array.length === 0) {
            return {}
        }
        let obj = array.pop();
        return Object.assign(obj, catObjects(array));
    }

    $('#back-link').click(function(event) {
        event.preventDefault()
        javascript: history.back()
    })


    const datepicker_options = {
        language: 'fr',
        dateFormat: 'yyyy-mm-dd',
    }

    const $arrival_date_field = $('#arrival_date')
    const arrival_date_value = $arrival_date_field.val()

    const $generated_at_field = $('#generated_at')
    const generated_at_value = $generated_at_field.val()

    $arrival_date_field.datepicker(datepicker_options)

    $generated_at_field.datepicker(datepicker_options)

    if ($arrival_date_field.data('datepicker') && $arrival_date_field.data('datepicker')) {
        $arrival_date_field.data('datepicker').selectDate(new Date(arrival_date_value))
        $generated_at_field.data('datepicker').selectDate(new Date(generated_at_value))
    }

    $('#print-btn').click(function() {
        window.print()
    })


})