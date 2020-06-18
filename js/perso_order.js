import { state  } from './perso_order_states.js'
const website_input           = document.getElementById('website_input')
const headers                 = { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') }
const isNumber                = (string) => Number.isFinite(parseFloat(string))
const getDataFromLocalStorage = (offset) => localStorage.getItem(offset) !== null ? JSON.parse(localStorage.getItem(offset)) : '';
const successfullImage        = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ0CyhN2WxyGK7ncJp5SHO6A1Y_6wZ_7nHU52WbeJBIsgqyomdC&usqp=CAU'
const loader                  = document.getElementById('loader');

const showLoader = () => {
	loader.style.display = null;
}

const hideLoader = () => {
	loader.style.display = 'none';
}

const isValidUrl = (string) => {
	let url;
	try {
		url = new URL(string);
	} catch (_) {
		return false;  
	}
	return true;
}


Vue.component('cart-details', {
	data () {
		return {
			state,
			is_visible: false
		}
	},
	methods: {
		openProductsDetails() {
			this.is_visible = true
		},
		closeProductsDetails() {
			this.is_visible = false
		},
		removeFromCart(index) {
			this.state.products.splice(index, 1)
		}
	},
	computed: {
		cart_count_status() {
			if  (this.state.products.length > 1) {
				return `${this.state.products.length} articles ajoutés`
			}
			return `${this.state.products.length} article ajouté`
		},
	},

	template: `
		<div>
			<button v-if="state.products.length" class="cart-situation-button" @click.prevent="openProductsDetails()">
				<span class="fa fa-shopping-cart"></span>
				<span>{{ state.products.length }}</span>
			</button>

			<div class="cart-situation-content" :class="{active: is_visible}">
				<div class="mb-20 d-flex align-items-center justify-content-between">
					<h2 class="cart-situation-title">{{ cart_count_status }}</h2>
					<button @click.prevent="closeProductsDetails()" class="cart-situation-content-close"><i class="ti-close"></i></button>
				</div>
				<h2 v-if="!state.products.length">Aucun article dans votre panier...</h2>

				<div class="cart-situation-content-row" v-for="(product, index) in state.products" :key="index">
					<button type="button" class="cart-situation-content-row-close" @click.prevent="removeFromCart(index)">
						<i class="ti-close"></i>
					</button>
					<div class="d-flex align-items-start flex-column justify-content-between">
						<span>Nom de l'article</span>
						<span>{{ product.product_name }}</span>
					</div>
					<div class="d-flex align-items-start flex-column justify-content-between">
						<span>Prix de l'article</span>
						<span>{{ product.price }} {{ product.currency }} X {{ product.quantity }}</span>
					</div>
					<div class="d-flex align-items-start flex-column justify-content-between">
						<span>Depuis le site</span>
						<span><a :href="product.website_domain" target="_blank">{{ product.website_domain }}</a></span>
					</div>
					<div class="d-flex align-items-start flex-column justify-content-between">
						<span>Viendra par</span>
						<span>{{ product.transport_name }}</span>
					</div>
					<div class="d-flex align-items-start flex-column justify-content-between">
						<span>Pays de provenance</span>
						<span>{{ product.country_name }}</span>
					</div>
					<div class="d-flex align-items-start flex-column justify-content-between">
						<span>Catégorie</span>
						<span>{{ product.category_name }}</span>
					</div>
				</div>
			</div>
		</div>
	`
})


Vue.component('modal-cgu', {
	data() {
		return {
			state
		}
	},
	methods: {
		acceptCGU() {
			this.state.cgu_visible = false 
			Cookies.set(this.state.cgu_cookie_key, 'ok', { expires: 7 });
		},
	},

	template: `
		<div class="modal-cgu-overlay" id="modal-cgu-overlay" v-if="state.cgu_visible">
			<div class="modal-cgu" id="modal-cgu">
				<div class="modal-cgu-header">
					<h5 class="modal-cgu-heading">Conditions générales d'utilisation</h5>
				</div>
				<div class="modal-cgu-body flex-1 d-flex justify-content-center align-items-center">
					<a href="/conditions-generales-uilisation" target="_blank" class="accept-button">Lire le conditions générales d'utilisation</a>
				</div>
				<div class="modal-cgu-footer">
					<button @click="acceptCGU()">Accepter les conditions générales d'utilisation</button>
				</div>
			</div>
		</div>
	`
})

Vue.component('website-modal', {
	template: `
		<transition name="fade">
			<div class="modal-wrapper" v-if="state.is_modal">
				<button class="modal-closer" @click="state.is_modal = false"><i class="ti-close"></i></button>
				<div class="modal" @click.prevent.stop>
					<div class="modal-header">
						<h5>Saisissez ou collez le lien du site sur lequel vous avez acheté le produit</h5>
						<button @click.prevent="state.is_modal = false" type="button" class="btn-modal-closer"><i class="ti-close"></i></button>
					</div>		
					<div class="modal-body">
						<form method="get" @submit.prevent="onSaveWebsite()">
							<div class="field">
								<input ref="website_link_input" @focus="event => selectField(event)" v-model="state.website_link" type="text" placeholder="Exemple: https://www.amazon.com" autofocus>
								<button type="button" @click.prevent="pasteUrl()">Coller <i class="fa fa-paste"></i></button>
							</div>
						</form>
					</div>
					<transition name="fade">
						<div class="website-explanation" v-if="hasError">
							<span>Vous devez saisir un url valide.</span>
							<img src="/images/website_ecommerce.PNG" alt="" />
						</div>
					</transition>
					<div class="modal-footer">
						<button type="submit" @click.prevent="onSaveWebsite()">Enregistrer <i class="fa fa-check"></i></button>
					</div>
				</div>
			</div>
		</transition>
	`,
	data() {
		return {
			state: state,
			hasError: false,
		}
	},
	computed: {
		isValidUrl () {
			return this.state.website_link && isValidUrl(this.state.website_link);
		},
		domainName () {
			const url = new URL(this.state.website_link)
			const hostname = url.hostname
			const domainName = hostname.split('.')[1] 
			return domainName
		}
	},

	watch: {
		"state.is_modal": function(value) {
			if (value) {
				this.$nextTick(_ => {
					this.$refs.website_link_input.focus();
				});
			}
		},
	},

	methods: {
		selectField(event) {
			event.target.select();
		},
		pasteUrl() {
			navigator.clipboard.readText().then(textToPaste => this.state.website_link = textToPaste && textToPaste.trim())
		},
		onSaveWebsite() {
			if (isValidUrl(this.state.website_link)) {
				const hostname = new URL(this.state.website_link).hostname
				this.hasError = false
				const website = {
					name: this.domainName,
					path: `https://logo.clearbit.com/${hostname}`,
					domain: this.state.website_link,
					type: 'website',
				}
				this.state.website = website

				const index = this.state.added_elements.findIndex(element => element.type == 'website')

				if (index == -1) {
					this.state.added_elements.unshift(website);
				} else {
					this.state.added_elements.splice(index, 1, website)
				}
				this.state.website_link = ''
				this.state.is_modal = false
				this.state.third_step = false
				this.state.fourth_step  = true
			} else {
				this.hasError = true
			}
		},
	},
});

Vue.component('stage-one', {
	template: `
		<transition name="fade" key="stage-one">
			<div class="form-container step1 d-flex flex-column justify-content-start" v-if="state.first_step">
				<div class="progress-container">
					<div class="progress-bar is-1">
						<span class="progress-dot">1</span>
						<span class="progress-dot">2</span>
						<span class="progress-dot">3</span>
						<span class="progress-dot">4</span>
						<span class="progress-dot">5</span>
					</div>
				</div>

				<h4 class="mb-30">Quel est le pays d'origine du produit ?</h4>
				
				<h5 style="position:absolute;top:30%;left:50%;transform:translate(-50%, -30%);">
					{{ selected_country && selected_country.name }}
				</h5>

				<div class="form-country-buttons" style="margin: auto;transform:translateY(-30px);">

					<div class="form-country-button" :class="{active: isSelected('fr')}" @click.prevent="onSelectCountry('fr')">
						<img src="https://www.countryflags.io/fr/flat/64.png" alt="">
					</div>
					<div class="form-country-button" :class="{active: isSelected('us')}" @click.prevent="onSelectCountry('us')">
						<img src="https://www.countryflags.io/us/flat/64.png">
					</div>
					<div class="form-country-button" :class="{active: isSelected('cn')}" @click.prevent="onSelectCountry('cn')">
						<img src="https://www.countryflags.io/cn/flat/64.png">
					</div>
				</div>

				<div class="form-footer" style="margin-top:auto;">
					<button class="next" type="button" @click="onAddCountry()">Avion ou Bateau ? <i class="fa fa-arrow-right"></i></button>
				</div>
			</div>
		</transition>
	`,
	data () {
		return {
			selected_country: {},
			country_name: '',
			state: state,
			country_mapper: {
				fr: {
					name: 'France',
					prefix: 'fr',
					path: 'https://www.countryflags.io/fr/flat/64.png',
					type: 'country',
				},
				us: {
					name: 'USA',
					prefix: 'us',
					path: 'https://www.countryflags.io/us/flat/64.png',
					type: 'country',
				},
				cn: {
					name: 'Chine',
					prefix: 'cn',
					path: 'https://www.countryflags.io/cn/flat/64.png',
					type: 'country',
				}
			}
		}
	},
	methods: {
		onSelectCountry(country_prefix) {
			this.state.selected_country = this.country_mapper[country_prefix]
		},

		isSelected(country_prefix) {
			return this.state.selected_country.prefix == country_prefix
		},

		onAddCountry() {
			const selected_country  = this.state.selected_country

			if (selected_country.hasOwnProperty("name")) {
				this.state.country_name = selected_country.name.toLowerCase();

				const index = this.state.added_elements.findIndex(element => element.type == 'country')

				if (index == -1) {
					this.state.added_elements.unshift(selected_country)
				} else {
					this.state.added_elements.splice(index, 1, selected_country)
				}
				this.state.first_step  = false
				this.state.second_step = true
			} else {
				errorMessage('Vous devez d\'abord sélectionner un pays')
			}
		}
	},
})

Vue.component('stage-two', {
	template: `
		<transition name="fade">
			<div class="form-container step1 d-flex flex-column justify-content-start" v-if="state.second_step">
				<div class="progress-container">
					<div class="progress-bar is-2">
						<span class="progress-dot">1</span>
						<span class="progress-dot">2</span>
						<span class="progress-dot">3</span>
						<span class="progress-dot">4</span>
						<span class="progress-dot">5</span>
					</div>
				</div>
				<h4>Quel est le moyen de transport ?</h4>
				<h5 style="position:absolute;top:30%;left:50%;transform:translate(-50%, -30%);">
					{{ selected_transport && selected_transport.name }}
				</h5>
				<div class="form-country-buttons" style="margin: auto;transform:translateY(-20px); grid-template-columns:repeat(2, 1fr);">
					<div class="form-country-button" :class="{active: isSelected('plane')}" @click.prevent="onSelectTransport('plane')">
						<img src="/images/mode_of_transport/plane.jpg" alt="Avion" class="img-64">
					</div>
					<div class="form-country-button" :class="{active: isSelected('boat')}" @click.prevent="onSelectTransport('boat')">
						<img src="/images/mode_of_transport/boat.jpg" alt="Bateau" class="img-64">
					</div>
				</div>

				<div class="form-footer" style="margin-top:auto;">
					<button type="button" @click.prevent="onPreviousStep()"><i class="fa fa-arrow-left"></i> Précédent</button>
					<button class="next" type="button" @click.prevent="onAddTransport()">Sur quel site ? <i class="fa fa-arrow-right"></i></button>
				</div>
			</div>
		</transition>
	`,
	data() {
		return {
			state: state,
			selected_transport: {},
			transport_mapper: {
				plane: {
					name: 'Avion',
					path: '/images/mode_of_transport/plane.jpg',
					type: 'transport',
					prefix: 'plane',
				},
				boat: {
					name: 'Bateau',
					path: '/images/mode_of_transport/boat.jpg',
					type: 'transport',
					prefix: 'boat'
				}
			}
		}
	},

	methods: {
		onPreviousStep() {
			this.state.second_step = false;
			this.state.first_step  = true;
		},

		onSelectTransport(transport) {
			const selected_transport = this.transport_mapper[transport]
			this.state.selected_transport = selected_transport
		},

		isSelected(transport) {
			return transport == this.state.selected_transport.prefix
		},

		onAddTransport() {
			const selected_transport = this.state.selected_transport
			if(selected_transport.hasOwnProperty("name")) {
				const index = this.state.added_elements.findIndex(element => element.type == 'transport')
				if (index == -1) {
					this.state.added_elements.unshift(selected_transport)
				} else {
					this.state.added_elements.splice(index, 1, selected_transport)
				}
				this.state.second_step = true
				this.state.third_step  = true
			} else {
				errorMessage('Vous devez d\'abord sélectionner un moyen de transport.');
			}
		}
	},
});

Vue.component('stage-three', {
	template: `
		<transition name="fade">
			<div class="form-container step1" style="min-height: 480px; display: flex;flex-direction: column;justify-content: flex-start;" v-if="state.third_step">
				<div class="progress-container">
					<div class="progress-bar is-3">
						<span class="progress-dot">1</span>
						<span class="progress-dot">2</span>
						<span class="progress-dot">3</span>
						<span class="progress-dot">4</span>
						<span class="progress-dot">5</span>
					</div>
				</div>
				
				<div class="d-flex align-items-center justify-content-center full-width" style="padding-left:10px;padding-right:20px;">
					<h5 class="form-title">Sur quel site avez vous acheté ?</h5>
				</div>

				<div class="website-grids">
					<div v-if="website.is_website" :class="{active: isSelected(website.name)}" @click.prevent="onSelectWebsite(website)" class="website-grid" v-for="website in websites" :key="website.name">
						<img :src="website.path" :alt="website.name" draggable="false">
					</div>
					<div @click="state.is_modal = true" v-if="!website.is_website" :class="{active: isSelected(website.name)}" class="website-grid add-website" v-for="website in websites">
						<span>Autres sites...</span>
					</div>
				</div>

				<div class="form-footer" style="margin-top: auto;">
					<button type="button" @click.prevent="onPreviousStep()"><i class="fa fa-arrow-left"></i> Précédent</button>
					<button class="next" type="button" @click.prevent="onAddWebsite()">Quel produit ? <i class="fa fa-arrow-right"></i></button>
				</div>
			</div>
		</transition>
	`,
	data() {
		return {
			websites: new Array(),
			selected_website: {},
			state: state,
		}
	},

	methods: {
		onPreviousStep() {
			this.state.second_step = true
			this.state.third_step  = false
		},

		onSelectWebsite(website) {
			this.state.selected_website = website
		},

		isSelected(website) {
			return this.state.selected_website.name == website
		},

		onAddWebsite() {
			const selected_website = this.state.selected_website

			if (selected_website.hasOwnProperty("name")) {
				const index = this.state.added_elements.findIndex(element => element.type == 'website')
				if (index == -1) {
					this.state.added_elements.unshift(selected_website)
				} else {
					this.state.added_elements.splice(index, 1, selected_website)
				}
				this.state.third_step = false
				this.state.fourth_step  = true
			} else {
				errorMessage('Vous devez sélectionner un site web.');
			}			
		},

		set_websites(country_name) {
			this.websites = this.state.websites[country_name.toLowerCase()];
		}
	},

	watch: {
		'state.website': function(value) {
			this.state.selected_website = value;
		},
		'state.country_name': function(country_name) {
			this.set_websites(country_name);
		}
	},
})

Vue.component('stage-four', {
	props: ['categories'],

	template: `
		<transition name="fade">
			<div class="form-container step1" v-if="state.fourth_step">
				<div class="progress-container" style="margin-bottom:auto;">
					<div class="progress-bar is-4">
						<span class="progress-dot">1</span>
						<span class="progress-dot">2</span>
						<span class="progress-dot">3</span>
						<span class="progress-dot">4</span>
						<span class="progress-dot">5</span>
					</div>
				</div>
				
				
				<div style="position:absolute;width:80%;">
					<div class="form-group mb-10">
						<label style="width:100%;font-size:.8em;" class="control-label d-inline-block text-muted text-bold text-uppercase mb-5">
						Nom du produit
						</label>
						<input type="text" v-model="state.product_name" class="form-control full-width" placeholder="Nom du produit" />
					</div>
					<div class="form-group mb-10">
						<label style="width:100%;font-size:.8em;" class="control-label d-inline-block text-muted text-bold text-uppercase mb-5">
							Sélectionnez la catégorie de l'article
						</label>
						<select v-model="state.category_name" class="form-control custom-select" style="width:100%;">
							<option value="">Sélectionner la catégorie de l'article</option>
							<option :value="category.name" v-for="category in categories">{{ category.name }}</option>
						</select>
					</div>
					<div class="form-group mb-10">
						<label style="width:100%;font-size:.8em;" class="control-label d-inline-block text-muted text-bold text-uppercase mb-5">
							Devise
						</label>
						<select v-model="state.currency" class="form-control custom-select" style="width:100%;">
							<option value="">Devise</option>
							<option :key="currency.key" :value="currency.key" v-for="currency in currencies">{{ currency.value }}</option>
						</select>
					</div>
					<div class="form-group mb-10">
						<label style="width:100%;font-size:.8em;" class="control-label d-inline-block text-muted text-bold text-uppercase mb-5">
							Prix
						</label>
						<input type="number" @focus="event => selectField(event)" v-model="state.price" class="form-control" style="width:100%;" />
					</div>
					<div class="form-group">
						<label style="width:100%;font-size:.8em;" class="control-label d-inline-block text-muted text-bold text-uppercase mb-5">
							Quantité
						</label>
						<input type="number" @focus="event => selectField(event)" v-model="state.quantity" class="form-control" style="width:100%;" />
					</div>
				</div>

				<div class="form-footer" style="margin-top:auto;">
					<button type="button" @click.prevent="onPreviousStep()"><i class="fa fa-arrow-left"></i> Précédent</button>
					<button class="next" type="button" @click.prevent="addToCart()">Ajouter au panier <i class="fa fa-shopping-cart"></i></button>
				</div>
			</div>
		</transition>
	`,

	data() {
		return {
			state: state,
			currencies: [{
				key: '€',
				value: 'EURO',
			}, {
				key: '$',
				value: 'DOLLAR'
			}, {
				key: '£',
				value: 'LIVRE STERLING'
			}],
		}
	},

	methods: {
		selectField(event) {
			event.target.select();
		},

		onPreviousStep() {
			this.state.fourth_step = false
			this.state.third_step  = true
		},

		findCategoryId(category_name) {
			const category = this.categories.find(category => category.name == category_name);
			return category ? category.id : 0;
		},

		addToCart() {
			const product_name  = this.state.product_name
			const category_name = this.state.category_name
			const category_id   = this.findCategoryId(this.state.category_name) 
			const currency      = this.state.currency
			const price         = parseFloat(this.state.price)
			const quantity      = parseInt(this.state.quantity)

			const type          = 'money_details'

			if (!(product_name && product_name.trim())) {
				errorMessage('Vous devez saisir le nom du produit.');
				return;
			}

			if(! this.category_names.includes(category_name)) {
				errorMessage('Vous devez sélectionner une catégorie');
				return;
			}

			if (! this.only_currencies.includes(currency)) {
				errorMessage('Vous devez sélectionner une devise.');
				return;
			}
			if (!(price > 0 && isNumber(price))) {
				errorMessage('Vous devez saisir un prix valide.');
				return;
			}
			if (!(quantity > 0 && isNumber(quantity))) {
				errorMessage('Vous devez saisir une quantité.');
				return;
			}
			const index = this.state.added_elements.findIndex(element => element.type == 'money_details');
			const money_payload = { category_name, category_id, product_name, quantity, price, currency, type }

			if (index == -1) {
				this.state.added_elements.unshift(money_payload)
			} else {
				this.state.added_elements.splice(index, 1, money_payload)
			}
			this.state.fourth_step = false 
			this.state.fifth_step  = true

			const [money_details, website, transport, country] = this.state.added_elements 

			const data = {
				country_name: country.name,
				transport_name: transport.name,
				website_domain: website.domain,
				product_name: product_name,
				parent_category_id: category_id,
				category_name: category_name,
				currency: currency,
				price: price,
				quantity: quantity
			}

			if (_.find(this.state.products, data) == null) {
			    this.state.products.unshift(data);
			    localStorage.setItem('cart_content', JSON.stringify(this.state.products));
			}
		}
	},

	computed: {
		category_names() {
			return this.categories.map(category => category.name)
		},
		only_currencies() {
			return this.currencies.map(currency => currency.key)
		},
	}
})

Vue.component('stage-five', {
	template: `
		<transition name="fade">

			<div class="form-container step1 d-flex flex-column justify-content-start" v-if="state.fifth_step">
				<div class="progress-container">
					<div class="progress-bar is-5">
						<span class="progress-dot">1</span>
						<span class="progress-dot">2</span>
						<span class="progress-dot">3</span>
						<span class="progress-dot">4</span>
						<span class="progress-dot">5</span>
					</div>
				</div>
				
				<div style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);" class="d-flex flex-column justify-content-end align-items-center full-width">
					<button type="button" @click="addAnotherProduct()" class="perso-button mb-30">Ajouter un autre article <i class="fa fa-plus"></i></button>
					<button type="button" @click.prevent="onSendOrder()" class="perso-button">Finaliser ma commande <i class="fa fa-check"></i></button>
					
					<div class="accept-cgu-checkbox mt-50" :class="shake_class">
						<input type="checkbox" v-model="accept_cgu" id="accept_cgu"/>
						<label for="accept_cgu">Veuillez accepter les conditions générales d'utilisation</label>
					</div>
					<div>
						<a href="/conditions-generales-utilisation" target="_blank" class="d-inline-block text-small mt-20">Lire les conditions générales d'utilisation</a>
					</div>
				</div>

				<div class="form-footer text-left" style="margin-top:auto;">
				</div>
			</div>
		</transition>
	`,
	data () {
		return {
			state,
			accept_cgu: false,
			shake_class: '',
		}
	},
	methods: {
		onPreviousStep() {
			this.state.fifth_step = false
			this.state.fourth_step = true
		},

		showCGU() {
			this.state.cgu_visible = true;
		},

		addAnotherProduct() {
			App.restart();
		},

		onSendOrder() {
			
			if (! this.accept_cgu) {
				this.shake_class = 'animated shake';
				setTimeout(() => {
					this.shake_class = ''
				}, 700)
				return;
			}

			showLoader();

			axios({
				method: 'POST',
				url: '/passer-une-commande-perso',
				data: { perso_order_items: JSON.stringify(this.state.products) },
				headers: headers,
			}).then(({data}) => {
				if (data.success) {
					location.href = '/thanks-for-passing-perso-order';
				} else {
					errorMessage(`Une erreur interne est survenue lors de l'envoi de la commande`);
				}
			}).catch((response) => {
				errorMessage(`Une erreur interne est survenue lors de l'envoi de la commande`);
			}).finally(_ => {
				hideLoader();
			});
		},
	},

	mounted() {
	}
})

Vue.component('added-elements', {
	template: `
		<div class="page-preview">
			<transition-group name="list">
				<div @click.prevent="goto(element.type, true)" v-if="element.type == 'money_details'" class="panel mb-10 d-flex flex-column align-items-start" v-for="(element, index) in state.added_elements" :key="index">
					<div class="d-flex align-items-center justify-content-between full-width">
						<span class="text-underline category-name">Catégorie</span>
						<span class="text-bold">{{ element.category_name }}</span>
					</div>
					<div class="d-flex align-items-center justify-content-start full-width">
						<span class="product-name">{{ element.product_name }}</span>
					</div>
					<div class="d-flex align-items-center justify-content-between full-width">
						<span class="text-bold">{{ element.price.toFixed(2).toString().replace(".", ",") }} <sup>{{ element.currency }}</sup></span>
						<span>X {{ element.quantity }}</span>
					</div>
				</div>
			</transition-group>
			
			<transition-group name="list">
				<div @click.prevent="goto(element.type, true)" v-if="element.type != 'money_details'" class="panel" v-for="element in state.added_elements" :key="element.name">
					<img :src="element.path" :alt="element.name" class="img-64" draggable="false"> 
					<span class="text-uppercase text-bold image-title">{{ element.name }}</span>
				</div>
			</transition-group>
		</div>
	`,
	data () {
		return { state }
	},
	methods: {
		goto (type, exact = false) {
			if (exact) {
				this.state.first_step   = type == 'country';
				this.state.second_step  = type == 'transport';
				this.state.third_step   = type == 'website';
				this.state.fourth_step  = type == 'money_details';
				this.state.fifth_step   = false;
			} else {
				if(type == 'country') {
					this.state.second_step = true;
				} else if (type == 'transport') {
					this.state.third_step = true;
				} else if (type == 'website') {
					this.state.fourth_step = true;
				} else if (type == 'money_details') {
					this.state.fifth_step = true;
				}
			}
		}
	},

	mounted() {
		if (this.state.added_elements.length > 0) {
			const current_element = this.state.added_elements[0]
			this.goto(current_element.type);
		}
	}
});


export const App = new Vue({
	el: '#app',
	data: { state },
	methods: {
		restart() {
			this.state.first_step     = true
			this.state.second_step    = false
			this.state.third_step     = false
			this.state.fourth_step    = false
			this.state.fifth_step     = false
			this.state.added_elements = []
			this.state.selected_country = {}
			this.state.selected_transport = {}
			this.state.selected_website = {}

			this.state.category_name = ''
			this.state.product_name  = ''
			this.state.currency      = ''
			this.state.price         = 0
			this.state.quantity      = 0
		},
	},
});

