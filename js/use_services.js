const confirmationMessage = (message) => Swal.fire({
	title: 'Confirmation',
	text: message,
	icon: 'question',
	confirmButtonColor: 'var(--color-primary)',
	allowOutsideClick: false,
	showCancelButton: true, 
	showCloseButton: true,
	confirmButtonText: 'Je veux',
	cancelButtonText: 'Non, merci',
	showClass: { popup: 'animated fadeInDown faster' },
  	hideClass: { popup: 'animated fadeOutUp faster' }
});


const redirectToPage = (pageUrl, extern_link = false) => {
	if (extern_link) {
		window.open(pageUrl, '_blank');
	} else {
		window.open(`//${location.host}/${pageUrl}`, '_blank');
	}
}

const scrollToBottom = selector => { $(selector).animate({ scrollTop: document.querySelector(selector).scrollHeight }, 2000); }

Vue.component('list-of-messages', {
	props: ['categories'],

	template: `
		<transition-group name="fade" appear>  
			<div class="messages" id="messages" ref="messages" v-for="(message, index) in messages" :key="index">
				<div class="message message-from-me" v-if="message.is_a_answer">
					<span v-html="message.answer"></span>
				</div>
				<div class="message message-from-you">
					<span v-html="message.question"></span>
				</div>
				<div class="message-buttons" v-if="message.is_yes_or_no">
					<button :disabled="!is_loaded" @click="nextQuestionFor($event, message.id, response)" :key="response" v-for="response in message.buttons">
						<span v-html="response"></span>
					</button>
				</div>
				<div class="message-categories" v-else>
					<button v-if="!category.only_text" @click="selectCategory($event, category)" :key="category.id" v-for="category in categories">{{ category.name }}</button>
				</div>
			</div>	
		</transition-group>
	`,

	data () {
		return {
			chosen_category: 0,
			is_loaded: false,
			messages: [{
				id: 1,
				question: "Connaissez vous Amazon, Ebay, etc. ?",
				buttons: ["OUI", "NON"],
				is_yes_or_no: true,
				is_a_answer: false,
			}]
		}
	},

	methods: {
		selectCategory (event, category) {
			scrollToBottom("#service-content-messages")
			const already_pushed = this.messages.find(message => message.id == 30)
			
			if (! already_pushed) {
				this.messages.push({
					id: 30,
					question: `Souhaitez-vous voir les meilleurs produits de la catégorie <strong class="text-uppercase">${category.name}</strong> ?`,
					buttons: ["OUI", "NON"],
					is_yes_or_no: true,
					is_a_answer: true,
					answer: category.name
				})
			}
			this.chosen_category = category
		},

		nextQuestionFor (event, message_id, response) {
			if (message_id != 5 || (message_id != 30 && response != 'NON')) { scrollToBottom("#service-content-messages") }

			if (message_id == 1) {
				event.target.parentNode.style.display = 'none';
				if (response == 'OUI') {
					this.messages.push({
						id: 2,
						question: "Avez vous un compte sur Amazon, Ebay, etc ?",
						buttons: ["OUI", "NON"],
						is_yes_or_no: true,
						is_a_answer: true,
						answer: response
					})
				} else if(response == 'NON') {
					this.messages.push({
						id: 2,
						question: "Quel types de produits aimez vous ?",
						buttons: ["Catégorie 1", "Catégorie 1", "Catégorie 1", "Catégorie 1", "Catégorie 1"],
						is_yes_or_no: false,
						is_a_answer: true,
						answer: response
					})
				}	
			} else if (message_id == 2) {
				event.target.parentNode.style.display = 'none';
				if (response == 'OUI') {
					this.messages.push({
						id: 3,
						question: "Nous pouvons réduire vos frais de livraison de moitié grâce a la Commande Perso",
						buttons: ["Découvrez comment ?"],
						is_yes_or_no: true,
						is_a_answer: true,
						only_text: true,
						answer: response
					});

				} else if (response == 'NON') {
					this.messages.push({
						id: 31,
						question: 'Nous pouvons vous permettre d’acheter sur ces sites et de réduire de moitié vos frais de livraison au Sénégal.',
						buttons: ["Découvrez comment ?"],
						is_yes_or_no: true,
						is_a_answer: true,
						only_text: true,
						answer: response
					});
				}
			} else if (message_id == 3) {
				event.target.parentNode.style.display = 'none';
				if (response == 'Découvrez comment ?') {
					this.messages.push({
						id: 4,
						question: "Shopmeaway regroupe toutes vos commandes sur Paris et les achemine avec celles d’autres clients au Senegal",
						buttons: ['Comment en profiter ?'],
						is_yes_or_no: true,
						is_a_answer: true,
						only_text: true,
						answer: response
					})
				}
			} else if (message_id == 31) {
				if (response == 'Découvrez comment ?') {
					this.messages.push({
						id: 41,
						question: `
							<span class="d-block">Nous achetons pour vous ce que vous souhaitez commander</span>
							<span class="mb-10 mt-10 d-block text-center">Et</span>
							<span class="d-block">Nous regroupons vos commandes sur Paris et les expédions avec celles d’autres clients au Sénégal</span>
						`,
						buttons: ['Comment en profiter ?'],
						is_yes_or_no: true,
						is_a_answer: true,
						only_text: true,
						answer: response
					})
				}
			} else if (message_id == 4) {
				event.target.parentNode.style.display = 'none';
				if (response == 'Comment en profiter ?') {
					this.messages.push({
						id: 5,
						question: `
							<ol>
								<li>Achetez sur le site de votre choix en Europe, USA ou Chine.</li>
								<li>Renseignez l’adresse ShopMeAway du Pays ou vous achetez comme adresse de livraison</li>
								<li>Déclarez nous votre commande perso dans votre espace</li>
							</ol>
						`,
						buttons: [
							'Souhaitez-vous voir nos adresses de livraison dans le monde ?', 
							'Souhaitez-vous voir des témoignages clients ?',
							'Souhaitez-vous connaitre les délais ?',
							'Souhaitez-vous voir les sites webs avec qui nous avons déjà travaillés ?',
							'Souhaitez-vous voir des codes promos webs intéressants ?'
						],
						is_yes_or_no: true,
						is_a_answer: true,
						only_text: true,
						answer: response
					})
				}
			} else if (message_id == 41) {
				if (response == 'Comment en profiter ?') {
					this.messages.push({
						id: 51,
						question: `
							<ol>
								<li>Envoyez nous vos liens</li>
								<li>Validez la commande</li>
							</ol>
						`,
						buttons: [
							'Souhaitez-vous voir des témoignages clients ?',
							'Souhaitez-vous connaitre les délais ?',
							'Souhaitez-vous voir les sites webs avec qui nous avons déjà travaillés ?',
						],
						is_yes_or_no: true,
						is_a_answer: true,
						only_text: true,
						answer: response
					})
				}
			} else if (message_id == 5) {
				if (response == 'Souhaitez-vous voir nos adresses de livraison dans le monde ?') {
					confirmationMessage('Voulez-vous être redirigé.e vers notre page des adresses ?').then(result => {
						redirectToPage('nos-adresses');
					});
				} else if (response == 'Souhaitez-vous voir des témoignages clients ?') {
					confirmationMessage('Voulez-vous être redirigé.e vers notre page des témoignages clients ?').then(result => {
						redirectToPage('https://www.facebook.com/pg/ShopmeawaySenegal/reviews/', true);
					});
				} else if (response == 'Souhaitez-vous connaitre les délais ?') {
					confirmationMessage('Voulez-vous être redirigé.e vers notre page des délais de livraison ?').then(result => {
						redirectToPage('delais-de-livraison');
					});
				} else if (response == 'Souhaitez-vous voir les sites webs avec qui nous avons déjà travaillés ?') {
					confirmationMessage('Voulez-vous être redirigé.e vers notre page des sites webs ?').then(result => {
						redirectToPage('vos-sites');
					});
				} else if (response == 'Souhaitez-vous voir des codes promos webs intéressants ?') {
					confirmationMessage('Voulez-vous être redirigé.e vers notre page des codes promos ?').then(result => {
						redirectToPage('nos-codes-promos');
					});
				}
			} else if (message_id == 51) {
				if (response == 'Souhaitez-vous voir des témoignages clients ?') {
					confirmationMessage('Voulez-vous être redirigé.e vers notre page des témoignages clients ?').then(result => {
						redirectToPage('https://www.facebook.com/pg/ShopmeawaySenegal/reviews/', true);
					});
				} else if (response == 'Souhaitez-vous connaitre les délais ?') {
					confirmationMessage('Voulez-vous être redirigé.e vers notre page des délais de livraison ?').then(result => {
						redirectToPage('delais-de-livraison');
					});
				} else if (response == 'Souhaitez-vous voir les sites webs avec qui nous avons déjà travaillés ?') {
					confirmationMessage('Voulez-vous être redirigé.e vers notre page des sites webs ?').then(result => {
						redirectToPage('vos-sites');
					});
				}
			} else if (message_id == 30) {
				if (response == 'OUI') {
					const url = `/catalogue-de-produits?main_category=${this.chosen_category.id}&slug=${string_to_slug(this.chosen_category.name)}`
					redirectToPage(url)
				} else if (response == 'NON') {
					this.messages = this.messages.filter(message => message.id != 30)
				}
			}
		}
	},

	mounted() {
		this.is_loaded = true;
	}
})

const App = new Vue({
	el: '#use_services'
});