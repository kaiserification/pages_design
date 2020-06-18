$('#first_name').focus()
$('#first_name').parent().addClass('focused')

$('.form-control').focus(function() {
	$(this).parent().addClass('focused');
});

$('.form-control').blur(function() {
	if($(this).val() !== '') {return; }
	$(this).parent().removeClass('focused');
});

$("#user_birthdate").flatpickr({
	locale: 'fr',
	dateFormat: "d/m/Y"
});

feather.replace()

// $('#entreprise').selectize({
//     create: true,
//     sortField: 'text',
//     create: function(input) {
//         return {
//             value: input,
//             text: input
//         }
//     }
// });





$('.field-chooser').change(function() {
	const value = $(this).val()
	
	if (value == 'particulier') {
		$(`#${value}`).removeClass('hide')
		$(`#professionnel`).addClass('hide')
	} else if (value == 'professionnel') {
		$(`#${value}`).removeClass('hide')
		$(`#particulier`).addClass('hide')
	}
}) 