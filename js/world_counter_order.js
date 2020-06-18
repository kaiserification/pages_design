const save_cdm_order_url = document.getElementById('form-save-cdm-order').getAttribute('action');
const CSRF_TOKEN         = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const successFullAudio   = document.getElementById("my_audio")
const headers = { 'X-CSRF-TOKEN': CSRF_TOKEN }

const isValidUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

const isNumber = (string) => Number.isFinite(parseFloat(string))

const data = {
	is_visible_first_stage: true,
	is_visible_second_stage: false,
	is_visible_third_stage: false,
	is_visible_fourth_stage: false,
	is_visible_final_stage: false,
	url: '',
	currency: '',
	price: 0,
	qty: 0,
	color: '',
	size: '',
	loader: false,
}

let state = {
	products: new Array(),
	cgu_cookie_key: 'accepted_cgu_for_world_counter_order',
	cart_sidenav_visible: false,
}

const headings = { success: 'Félicitations !', error: 'Oups !' }
const successfullImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ0CyhN2WxyGK7ncJp5SHO6A1Y_6wZ_7nHU52WbeJBIsgqyomdC&usqp=CAU'

const displayMessage = (message, type) => {
	if(type == 'success') {
		successFullAudio.play();
		return Swal.fire({
			title: headings[type],
			text: message,
			imageUrl: successfullImage,
			imageWidth: '50%',
			imageHeight: 'auto',
			confirmButtonColor: 'var(--color-primary)',
			allowOutsideClick: false,
		})
	} else if(type == 'error') {
		return Swal.fire({
			title: headings[type],
			text: message,
			icon: type,
			confirmButtonColor: 'var(--color-primary)',
			allowOutsideClick: false,
		})
	}
}

Vue.component('button-cart-toggler', {
	data() {
		return { state }
	},
	methods: {
		toggleCartSidenav() {
			this.state.cart_sidenav_visible = !(this.state.cart_sidenav_visible)
		}
	},
	template: `
		<button type="button" class="hamburger-button" id="hamburger-button" @click.prevent="toggleCartSidenav()">
			<span class="hamburger"></span>
		</button>
	`
})

Vue.component('cart-status', {
	data() {
		return { state }
	},
	methods: {
		toggleCartSidenav() {
			this.state.cart_sidenav_visible = !this.state.cart_sidenav_visible
		}
	},
	template: `
		<div class="cart-status" id="cart-status" @click.prevent="toggleCartSidenav()">
			<span class="icon fa fa-shopping-cart"></span>
			<span class="cart-count">{{ state.products.length }}</span>
		</div>
	`,
});

Vue.component('order-details', {
	data() {
		return {
			state: state,
		}
	},
	methods: {
		closeCartSidenav() {
			this.state.cart_sidenav_visible = false
		}
	},
	watch: {
		"state.cart_sidenav_visible": function(value) {
			if (value == true) {
				this.$refs.myOrderDetails.focus();
			}
		}
	},
	computed: {
		cart_count_status() {
			if (this.state.products.length > 1) {
				return `${this.state.products.length} articles ajoutés`
			}
			return `${this.state.products.length} article ajouté`
		},
	},
	template: `
		<div tabindex="0" ref="myOrderDetails" @focusout="closeCartSidenav()" id="my-order-details" class="my-order-details" :class="{active: state.cart_sidenav_visible}">
			<button type="button" class="my-order-details-close" id="my-order-details-close" @click.prevent="closeCartSidenav()">
				<i class="ti-close"></i>
			</button>
			<h4 class="my-order-details-main-heading">{{ cart_count_status }}</h4>
			<div class="my-order-details-list">
				<ul class="my-order-details-list-item" v-for="product in state.products">
					<li>
						<span class="label">Lien</span>
						<span class="value"><a :href="product.url" :title="product.url" target="_blank"><i class="fa fa-link"></i> Lien du produit</a></span>
					</li>
					<li>
						<span class="label">Prix</span>
						<span class="value">{{ product.price }} {{ product.currency }}</span>
					</li>
					<li>
						<span class="label">Quantité</span>
						<span class="value">{{ product.qty }}</span>
					</li>
					<li v-if="product.color">
						<span class="label">Couleur</span>
						<span class="value">{{ product.color }}</span>
					</li>
					<li v-if="product.size">
						<span class="label">Taille</span>
						<span class="value">{{ product.size }}</span>
					</li>
				</ul>
			</div>
		</div>
	`
})

Vue.component('loader', {
	template: `
		<div class="loader" id="loader" v-if="data.loader">
			<span></span>
		</div>
	`,
	data() {
		return {
			data: data
		}
	}
})

Vue.component('stage-one', {
	template: `
		<div id="stage-one" class="stage stage-one" v-if="data.is_visible_first_stage">
			<div class="stage-steps">
				<div class="progress is-1">
					<span class="progress-dot">1</span>
					<span class="progress-dot">2</span>
					<span class="progress-dot">3</span>
					<span class="progress-dot">4</span>
					<span class="progress-dot">5</span>
				</div>	
			</div>
			<div class="stage-field">
				<label for="">Copiez L'URL de l'article que vous voulez acheter <span class="text-danger">*</span></label>
				<div class="with-button">
					<input type="text" name="url" v-model="data.url" class="stage-input" placeholder="Exemple: https://www.amazon.com/xxxxx" required>
				</div>
			</div>
			<div class="step-buttons-container">
				<button @click.prevent="jumpToNextStage()" type="button" id="next" class="step-button step-button-next">Prix et Quantité <i class="shakeit fa fa-arrow-right"></i></button>
			</div>
		</div>
	`,
	data() {
		return {
			data: data,
		}
	},
	methods: {
		pasteUrl(event) {
			navigator.clipboard.readText().then(textToPaste => this.data.url = textToPaste && textToPaste.trim())
		},
		jumpToNextStage() {
			if (this.urlIsValid) {
				this.data.is_visible_first_stage  = false
				this.data.is_visible_second_stage = true
			} else {
				displayMessage("Vous devez saisir un url valide.", "error");
			}
		}
	},
	computed: {
		urlIsValid() {
			return isValidUrl(this.data.url)
		}
	},
	mounted() {

	}
});

Vue.component('stage-two', {
	template: `
		<div id="stage-two" class="stage stage-two" v-if="data.is_visible_second_stage">
			<div class="stage-steps">
				<div class="progress is-2">
					<span class="progress-dot">1</span>
					<span class="progress-dot">2</span>
					<span class="progress-dot">3</span>
					<span class="progress-dot">4</span>
					<span class="progress-dot">5</span>
				</div>	
			</div>
			<div class="price-and-quantity">
			
				<div class="field">
					<label for="price">Prix <span class="optional-label"></span></label>
					<input type="number" @focus="event => selectField(event)" id="price" name="price" v-model="data.price" step="any" placeholder="Prix de l'article" class="input" required>
				</div>
				
				<div class="field">
					<label for="currency">Devise <span class="optional-label"></span></label>
					<select class="input" name="currency" id="devise-input" required v-model="data.currency">
						<option value="">Devise de l'article</option>
						<option value="€">EURO (€)</option>
						<option value="$">DOLLAR ($)</option>
						<option value="£">LIVRE STERLING (£)</option>
					</select>
				</div>

				<div class="field">
					<label for="qty">Quantité</label>
					<input type="number" @focus="event => selectField(event)" name="qty" id="qty" v-model="data.qty" step="any" placeholder="Combien en voulez vous ?" class="input" required>
				</div>
			</div>
			<div class="step-buttons-container">
				<button @click="jumpToPrevStage()" type="button" class="step-button step-button-prev"><i class="fa fa-arrow-left"></i> Précédent</button>
				<button @click="jumpToNextStage()" type="button" id="next" class="step-button step-button-next">Couleur et Taille <i class="shakeit fa fa-arrow-right"></i></button>
			</div>
		</div>
	`,
	data() {
		return {
			data: data,
			currency: '',
			price: 0,
			qty: 0,
			currencies: ['€', '$', '£']
		}
	},
	methods: {
		jumpToPrevStage() {
			this.data.is_visible_second_stage = false
			this.data.is_visible_first_stage  = true
		},
		jumpToNextStage() {
			if (! this.currencies.includes(this.data.currency)) {
				displayMessage('Vous devez sélectionner une devise', 'error')
				return;
			}
			if (!isNumber(this.data.price) || this.data.price <= 0) {
				displayMessage('Vous devez saisir un prix valide.', 'error')
				return;
			}
			if (!isNumber(this.data.qty) || this.data.qty <= 0) {
				displayMessage('Vous devez saisir une quantité valide.', 'error')
				return;
			}
			this.data.is_visible_second_stage = false
			this.data.is_visible_third_stage  = true
		},
		selectField(event) {
			event.target.select();
		},
	},
});

Vue.component('stage-three', {
	template: `
		<div id="stage-three" class="stage stage-two" v-if="data.is_visible_third_stage">
			<div class="stage-steps">
				<div class="progress is-3">
					<span class="progress-dot">1</span>
					<span class="progress-dot">2</span>
					<span class="progress-dot">3</span>
					<span class="progress-dot">4</span>
					<span class="progress-dot">5</span>
				</div>	
			</div>
			<div class="color-and-size">
				<div class="field">
					<label>Couleur <span class="optional-label">(facultatif)</span></label>
					<input type="text" name="color" v-model="data.color" placeholder="Couleur de l'article">
				</div>
				<div class="field">
					<label for="">Taille <span class="optional-label">(facultatif)</span></label>
					<input type="text" name="size" v-model="data.size" placeholder="Taille de l'article">
				</div>
			</div>
			<div class="step-buttons-container">
				<button @click.prevent="jumpToPrevStage()" type="button" class="step-button step-button-prev"><i class="fa fa-arrow-left"></i> Précédent</button>
				<button type="button" @click="jumpToVerification()" id="next" class="step-button step-button-next">
					Vérifier ce que j'ai saisi <i class="fa fa-eye"></i>
				</button>
			</div>
		</div>
	`,
	data() {
		return {
			data: data,
		}
	},
	methods: {
		jumpToPrevStage() {
			this.data.is_visible_third_stage  = false
			this.data.is_visible_second_stage = true
		},
		jumpToVerification() {
			this.data.is_visible_three_stage  = false
			this.data.is_visible_fourth_stage  = true
		}
	}
})

Vue.component('check-data-stage', {
	template: `
		<div id="final-stage" class="stage stage-two" v-if="data.is_visible_fourth_stage">
			<div class="stage-steps">
				<div class="progress is-4">
					<span class="progress-dot">1</span>
					<span class="progress-dot">2</span>
					<span class="progress-dot">3</span>
					<span class="progress-dot">4</span>
					<span class="progress-dot">5</span>
				</div>	
			</div>

			<ul class="stage-details">
				<li class="text-center">
					<h5 style="text-align: center;">Sont-elles les données que vous avez entrées ?</h5>
				</li>
				<li>
					<span>L'url du produit</span>
					<span>
						<i class="fa fa-link"></i> <a target="_blank" :title="data.url" :href="data.url">Lien du produit</a>
					</span>
				</li>

				<li>
					<span>Prix de l'article</span>
					<span>{{ data.price }} {{ data.currency }}</span>
				</li>

				<li>
					<span>Quantité</span>
					<span>{{ data.qty }}</span>
				</li>

				<li v-if="data.color">
					<span>Couleur</span>
					<span>{{ data.color }}</span>
				</li>

				<li v-if="data.size">
					<span>Taille</span>
					<span>{{ data.size }}</span>
				</li>
			</ul>

			<div class="step-buttons-container">
				<button @click.prevent="jumpToPrevStage()" type="button" class="step-button step-button-prev"><i class="fa fa-arrow-left"></i> Préc.</button>

				<div style="margin-left:auto;" class="d-flex align-items-center">
					<button @click.prevent="addToCart()" id="next" class="step-button step-button-next">
						Ajouter au panier <i class="fa fa-shopping-cart"></i>
					</button>
				</div>
			</div>
		</div>
	`,
	data () {
		return {
			data: data, 
			state
		}
	},
	methods: {
		jumpToPrevStage() {
			this.data.is_visible_fourth_stage = false
			this.data.is_visible_three_stage = true
		},
		
		addToCart() {
			

			const { url, price, currency, qty, color, size } = this.data 
			const data = { url, price, currency, qty, color, size }

			if (_.find(this.state.products, data) == null) {
				this.state.products.unshift(data);
				this.data.is_visible_fourth_stage = false;
				this.data.is_visible_final_stage = true;
			}
		}
	}
})

Vue.component('final-stage', {
	template: `
		<div id="final-stage" class="stage stage-two" v-if="data.is_visible_final_stage">
			<div class="stage-steps">
				<div class="progress is-5">
					<span class="progress-dot">1</span>
					<span class="progress-dot">2</span>
					<span class="progress-dot">3</span>
					<span class="progress-dot">4</span>
					<span class="progress-dot">5</span>
				</div>	
			</div>

			<div class="validattion-step">
				<button type="button" @click.prevent="addAnotherProduct()">Ajouter un autre article <i class="fa fa-plus"></i></button>
				<button type="button" @click.prevent="finalizeOrder()">Finaliser ma commande <i class="fa fa-check"></i></button>

				<div class="form-check" :class="shakeClass">
					<input type="checkbox" id="accept_cgu_id" class="form-check-input" v-model="has_checked_cgu" />
					<label for="accept_cgu_id" class="form-check-label">Veuillez accepter les conditions générales d'utilisation</label>
				</div>

				<a href="/conditions-generales-utilisation" target="_blank">Lire les conditions générales d'utilisation</a>
			</div>


			<div class="step-buttons-container">
				<button @click.prevent="jumpToPrevStage()" type="button" class="step-button step-button-prev"><i class="fa fa-arrow-left"></i> Préc.</button>
			</div>
		</div>
	`,
	data () {
		return {
			data: data, 
			state,
			shakeClass: '',
			has_checked_cgu: false,
		}
	},
	methods: {
		jumpToPrevStage() {
			this.data.is_visible_final_stage = false
			this.data.is_visible_fourth_stage = true
		},

		addAnotherProduct() {
			confirmMessage(`Êtes-vous sûr.e d'ajouter un autre article`).then(result => {
				if (result.value) {
					App.cancelOperation();
				}
			});
		},

		finalizeOrder() {
			if (this.has_checked_cgu == false) {
				this.shakeClass = 'animated shake';
				setTimeout(() => {this.shakeClass = ''; }, 500);
				return;
			}
			this.data.loader = true

			confirmMessage('Êtes vous sûr.e de finaliser votre commande ?').then((result) => {
				if (result.value) {
					this.letFinalizeOrder();
				}
			});
		},
		
		letFinalizeOrder() {
			axios({
				method: 'POST',
				url: '/passer-une-commande-cdm',
				data: { cdm_orders: JSON.stringify(this.state.products) },
				headers: headers
			}).then(({data}) => {
				if (data.success) {
					location.href = '/thanks-for-passing-cdm-order';
				} else {
					displayMessage(`Une erreur est survenue lors de l'envoi de la commande`, 'error');
				}
			}).catch(() => {
				displayMessage(`Une erreur est survenue lors de l'envoi de la commande`, 'error');
			}).finally(_ => {
				this.data.loader = false
			});
		}
	}
})

const App = new Vue({
	el: '#js-vue',

	data () {
		return { data }
	},

	methods: {
		cancelOperation () {
			this.data.is_visible_first_stage  = true;
			this.data.is_visible_second_stage = false;
			this.data.is_visible_third_stage  = false;
			this.data.is_visible_third_stage  = false;
			this.data.is_visible_fourth_stage = false;
			this.data.is_visible_final_stage  = false;
			this.data.url                     = '',
			this.data.currency                = '',
			this.data.price                   = 0,
			this.data.qty                     = 0,
			this.data.color                   = '',
			this.data.size                    = ''
		}
	}
});

