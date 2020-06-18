import { state } from './perso_order_states.js'
import { App } from './perso_order.js'

const cancel_perso_order_btn = document.getElementById('cancel_perso_order');

cancel_perso_order_btn.addEventListener('click', (event) => {
	event.preventDefault();
	confirmMessage('Voulez vous vraiment quitter l\'application.').then(result => {
		if (result.value) {
			App.restart();
			location.href = '/';
		}
	});
});



window.addEventListener('keydown', function(event) {
	if (state.is_modal == true) {
		if (event.key == 'Escape') {
			state.is_modal = false;
		}
	}
});

