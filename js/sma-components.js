const product_catalogue_path = document.querySelector('meta[name="catalogue_path"]').getAttribute('content');

Vue.component('categories-dropdown', {
	props: {
		categories: {
			type: Array,
			default: []
		},
		images: {
			type: Array,
			default: [],
			required: false,
		},
		target: {
			type: String,
			default: '',
			required: false
		},
		category_link: {
			type: String,
			default: '',
			required: false
		}
	},

	template: `
		<ul class="categories-submenu" :id="target">
			<li>
				<div class="container">
					<div class="row">
						<div :class="categories_container_class">
							<div class="categories-listing">
								<div class="category-listing" :key="index" v-for="(category, index) in categories">
									<h4 class="categories-listing--title"><a :href="get_middle_category(category)">{{ category.name }}</a></h4>
									<ul>
										<li :key="final_category.id" v-for="final_category in category.categories">
											<a :href="category_link_to(final_category)">{{ final_category.name }}</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="col-md-3" v-if="images.length">
							<div class="images-for-categories">
								<a href="">
									<img :key="index" v-for="(image, index) in images" :src="image.path" :alt="image.title" :title="image.title" class="image-for-categories">
								</a>
							</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
	`,

	methods: {
		category_link_to(category) {
			return `${product_catalogue_path}?category=${category.id}&slug=${category.slug}`
		},
		get_middle_category(category) {
			return `${product_catalogue_path}?middle_category=${category.id}&slug=${getSlug(category.name)}`
		}
	},

	computed: {
		categories_container_class () {
			return this.images.length > 0 ? 'col-md-9' : 'col-md-12'
		},
	},

	mounted () {
		//
	},
});


Vue.component('websites-filter', {
	props: ['href', 'websites', 'selected_category_id', 'selected_slug', 'selected_currency', 'selected_sort_price'],

	data () {
		return {
			search: '',
			data_websites: [],
			selected_websites: []
		}
	},

	template: `
		<form method="GET" :action="href" class="mt-10" ref="form_websites" id="form_websites">
	      	<div class="form-group has-icon-left">
	      		<span class="input-group-prepend"><i class="ti-search vertical-align-middle"></i> </span>
	        	<input type="search" v-model="search" @input="filter" class="form-control no-shadow" placeholder="Filtrer par site web">
	      	</div>
	      	<input type="hidden" name="category" :value="selected_category_id" />
	      	<input type="hidden" name="slug" :value="selected_slug" />
	      	<input type="hidden" name="currency" :value="selected_currency" />
	      	<input type="hidden" name="sort_price" :value="selected_sort_price" />

	        <div class="form-group" v-for="(website, index) in filtered_websites" :key="index">
	        	<div class="d-flex align-items-center justify-content-between">
		        	<div class="form-checkbox-square d-flex align-items-center full-width mb-5">
		        		<input type="checkbox" name="websites[]" :id="website.name" v-model="selected_params" @change="check_website" :value="website.name">
		        		<label :for="website.name" class="form-check-label d-flex align-items-center ml-10" style="width:100%;">
		        			{{ website.name }}
		        			<img :src="website.logo" :title="website.name" :alt="website.name"  style="width:16px;height:16px;margin-left:auto;"/>
		        		</label>
		        	</div>
	        	</div>
	        </div>
	        <div class="form-group" v-if="filtered_websites.length == 0">
	        	<label>Aucun résultat pour &laquo; <span class="text-bold text-italic">{{ search }}</span> &raquo;</label>
	        </div>
	    </form>
	`,
	methods: {
		check_website () {
			const formData   = new FormData(this.$refs.form_websites);
			let searchParams = new URLSearchParams(formData);
			location.href    = this.href + '?' + searchParams.toString();
		}
	},

	computed: {
		filtered_websites() {
			return this.data_websites.filter(website => website.name.toLowerCase().includes(this.search.toLowerCase())); 
		},

		selected_params () {
			const params = new URLSearchParams(window.location.search);
			return params.getAll('websites[]');
		}
	},
	mounted () {
		this.data_websites = this.websites
	}
});	

Vue.component('world-counter-order-form', {
	props: {
		parent_categories: {
			type: Array, 
			default: []
		}
	},

	data () {
		return {
			form_counts: 1,
			children_categories: new Array()
		}
	},

	template: `
		<div>
			<div class="d-flex align-items-center justify-content-between mb-20">
				<div>
					<button type="button" @click="decrementFormCounts" class="button button-decrement"><i class="fa fa-minus"></i></button>		
					<button type="button" @click="incrementFormCounts" class="button button-increment"><i class="fa fa-plus"></i></button>		
				</div>
				<input type="reset" class="button button-submit text-uppercase" style="margin-left:auto;" />
				<button type="submit" class="button button-submit text-uppercase">Enregistrer</button>
			</div>
			<div>
				<fieldset :key="form_count" class="mb-20" style="padding: 10px;border-color: #ccc;" v-for="form_count in form_counts">
					<legend>Produit numéro {{form_count}}</legend>
					<div class="row mb-20">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label control-label-sm"><span class="text-danger">*</span> Lien du produit</label>
								<input type="text" name="urls[]" class="form-control form-control-sm" required>
							</div>
						</div>
						<div class="col-md-6">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label class="control-label control-label-sm"><span class="text-danger">*</span> Prix</label>
										<input type="number" name="prices[]" step="any" class="form-control form-control-sm" required>
									</div>	
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label class="control-label control-label-sm"><span class="text-danger">*</span> Quantité</label>
										<input type="number" name="quantities[]" class="form-control form-control-sm" required>
									</div>	
								</div>
							</div>
						</div>
					</div>
					<div class="row mb-20">
						<div class="col-md-4">
							<div class="form-group">
								<label class="control-label control-label-sm"><span class="text-danger">*</span> Sélectionner une catégorie</label>
								<select required :class="'linkable-select #children_category'+form_count+' form-control form-control-sm custom-select'" @change="event => displayChildrenCategories(event)">
									<option value="0">Sélectionner une catégorie</option>
									<option :value="parent_category.id" v-for="parent_category in parent_categories" :key="parent_category.id">
										{{ parent_category.name }}
									</option>
								</select>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label class="control-label control-label-sm"><span class="text-danger">*</span> Précisez la catégorie</label>
								<select name="children_category_ids[]" required :id="'children_category'+ form_count" class="form-control form-control-sm custom-select">
									<option value="0">Précisez la catégorie</option>
								</select>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label control-label-sm">Couleur <span class="text-small">(Facultatif)</span></label>
								<input type="text" name="colors[]" class="form-control form-control-sm">
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label control-label-sm">Taille <span class="text-small">(Facultatif)</span></label>
								<input type="text" name="sizes[]" class="form-control form-control-sm">
							</div>
						</div>
					</div>
				</fieldset>	
			</div>	

			<div class="d-flex align-items-center justify-content-between mb-20">
				<div>
					<button type="button" @click="decrementFormCounts" class="button button-decrement"><i class="fa fa-minus"></i></button>		
					<button type="button" @click="incrementFormCounts" class="button button-increment"><i class="fa fa-plus"></i></button>		
				</div>
				<input type="reset" class="button button-submit text-uppercase" style="margin-left:auto;" />
				<button type="submit" class="button button-submit text-uppercase">Enregistrer</button>
			</div>
		</div>
	`,

	

	methods: {
		incrementFormCounts () {
			this.form_counts++
		},
		decrementFormCounts () {
			if (this.form_counts > 1) {
				this.form_counts--
			}
		},
		displayChildrenCategories(event) {
			const classList    = event.target.classList 
			const value        = event.target.value
			const target       = classList[1]
			const $target      = document.querySelector(target) 
			const $placeholder = $target.firstElementChild

			const index = this.parent_categories.findIndex(category =>  category.id == value)

			if (index == -1 || value == 0) { return }

			const children_categories = this.parent_categories[index].children_categories

			$target.innerHTML = children_categories.map(child => `<option value="${child.id}">${child.name}</option>`)
			$target.insertBefore($placeholder, $target.firstElementChild)
			$target.selectedIndex = 0
		}
	},
	mounted() {
		console.log(this.parent_categories)
	}
});


Vue.component('calculator', {
	data () {
		return {
			amount: '',
			length: '',
			height: '',
			width: '',
			weight: '',
			result: 0,

			is_boat: false,
			is_plane: false,

			is_france: false,
			is_usa: false,
			is_china: false,
			threshold_volume: 0.1
		}
	},
	methods: {
		onSelectPlane () {
			// this.eraseCalculation()
			this.is_plane = true
			this.is_boat  = false
		},

		onSelectBoat () {
			// this.eraseCalculation()
			this.is_plane = false
			this.is_boat  = true
		},

		onSelectFrance () {
			this.is_france = true
			this.is_usa    = false
			this.is_china  = false
		},
		onSelectUsa () {
			this.is_france = false
			this.is_usa    = true
			this.is_china  = false
		},

		onSelectChina () {
			this.is_france = false
			this.is_usa    = false
			this.is_china  = true
		},

		

		maxPriceForFrance () {
			let price1 = 0
			let price2 = 0

			if (this.volume > this.threshold_volume) {
				price1 = this.volume * 350
    			price2 = this.amount * 0.1
			} else if (this.volume < this.threshold_volume) {
				price1 = this.weight * 3.4
   				price2 = this.amount * 0.1
			}

			return Math.max(price1, price2).toFixed(2)
		},

		maxPriceForUsa () {
			let price1 = 0
			let price2 = 0

			if (this.volume > this.threshold_volume) {
				price1 = this.volume * 500
				price2 = this.amount * 0.2
			} else if (this.volume < this.threshold_volume) {
				price1 = this.weight * 4.5
   				price2 = this.amount * 0.2
			}

			return Math.max(price1, price2).toFixed(2)
		},
		maxPriceForChina () {
			let price1 = 0
			let price2 = 0

			if (this.volume > this.threshold_volume) {
				price1 = this.volume * 232500
    			price2 = this.amount * 0.1
			} else if (this.volume < this.threshold_volume) {
				price1 = this.weight * 2300
   				price2 = this.amount * 0.1
			}

			return Math.max(price1, price2).toFixed(2)
		},
		scrollTop() {
			if (document.body.scrollTop)
				document.body.scrollTop = 0; // For Safari
			
			if (document.documentElement.scrollTop) 
  				document.documentElement.scrollTop = 0
		},
		onSubmitBoat () {
			this.scrollTop()
			let devise = null
			let result = null

			if (this.is_usa) {
				result = this.maxPriceForUsa()
				devise = '$'
			} else if (this.is_france) {
				result = this.maxPriceForFrance()
				devise = '€'
			} else if (this.is_china) {
				result = this.maxPriceForChina()
				devise = 'FCFA'
			}

			this.result = `${result} ${devise}`
		},

		onSubmitPlane () {
			this.scrollTop()
			let computed_amount = 0
			let computed_weight = 0
			let result          = 0
			let devise          = null

			if (this.is_usa) {
				computed_amount = parseFloat(this.amount) * 0.25
				computed_weight = parseFloat(this.weight) * 23
				devise          = '$' 
			} else if (this.is_france) {
				computed_amount = parseFloat(this.amount) * 0.2
				computed_weight = parseFloat(this.weight) * 14
				devise          = '€' 
			} else if (this.is_china) {
				computed_amount = parseFloat(this.amount) * 0.15
				computed_weight = parseFloat(this.weight) * 7000 //13
				devise          = 'FCFA' 
			}
			result = Math.max(computed_amount, computed_weight).toFixed(2)
			this.result = `${result} ${devise}`
		},

		eraseCalculation () {
			this.amount    = ''
			this.length    = ''
			this.height    = ''
			this.width     = ''
			this.weight    = ''
			this.result    = 0
			this.is_boat   = false
			this.is_plane  = false
			this.is_france = false
			this.is_usa    = false
			this.is_china  = false
		}
	},

	computed: {
		selected_currency() {
			if (this.is_usa) {
				return '$'
			} else if (this.is_france) {
				return '€'
			} else if (this.is_china) {
				return 'FCFA'
			}
			return ''
		},
		is_valid () {
			return this.is_valid_plane || this.is_valid_boat
		},
		is_valid_plane () {
			return (this.is_plane && this.is_france) ||
				(this.is_plane && this.is_usa) || 
				(this.is_plane && this.is_china) 
		},
		is_valid_boat () {
			return (this.is_boat && this.is_france) ||
				(this.is_boat && this.is_usa) || 
				(this.is_boat && this.is_china) 
		},
		volume () {
			return this.length * this.width * this.height
		},
		is_form_for_plane_valid () {
			return this.amount > 0 && this.weight > 0 
		},
		is_form_for_boat_valid () {
			return this.amount > 0 && this.weight > 0 && this.length > 0 && this.width > 0 && this.height > 0
		}
	},
	template: `
		<div class="calculation__wrapper" id="calculation__wrapper">
			<header class="screen">
			    <span>{{ result }}</span>
			</header>

			<section class="mode-of-transport">
			    <button class="button-plane" @click.prevent="onSelectPlane()" :class="{selected: is_plane == true}">Avion</button>
			    <span style="font-size: 1.6em;color: #000;">{{ selected_currency }}</span> 
			    <button class="button-boat" @click.prevent="onSelectBoat()" :class="{selected: is_boat == true}">Bateau</button>
			</section>

			<section class="countries">
			    <img title="FRANCE" src="images/flags/france.png"" @click.prevent="onSelectFrance()" :class="{selected: is_france}">
			    <img title="USA" src="images/flags/usa.png"" @click.prevent="onSelectUsa()" :class="{selected: is_usa}">
			    <img title="CHINE" src="images/flags/china.png"" @click.prevent="onSelectChina()" :class="{selected: is_china}" v-if="(is_plane == false && is_boat == false) || (is_plane == true)">
			</section>

			<form class="form boat" key="form_boat_key" v-if="is_boat && is_valid">
			    <div class="field">
			        <label>Montant</label>
			        <input type="number" v-model="amount">
			    </div>

			    <div class="field">
			        <label for="">Poids</label>
			        <input type="number" v-model="weight">
			    </div>
			    <div class="field">
			        <label for="">Longueur (m)</label>
			        <input type="number" v-model="length">
			    </div>
			    <div class="field">
			        <label for="">Largeur (m)</label>
			        <input type="number" v-model="width">
			    </div>
			    <div class="field" style="grid-column:span 2;">
			        <label for="">Hauteur (m)</label>
			        <input type="number" v-model="height">
			    </div>
			</form>

			<form class="form plane" key="form_plane_key" v-if="is_plane && is_valid">
				
			    <div class="field">
			        <label for="">Valeur (article)</label>
			        <input type="number" v-model="amount">
			    </div>

			    <div class="field">
			        <label for="">Poids (articles)</label>
			        <input type="number" v-model="weight">
			    </div>

			    <div class="field">
			        <label for="">Longueur (cm)</label>
			        <input type="number" v-model="length">
			    </div> 
			    <div class="field">
			        <label for="">Largeur (cm)</label>
			        <input type="number" v-model="width">
			    </div>
			    <div class="field" style="grid-column:span 2;">
			        <label for="">Hauteur (cm)</label>
			        <input type="number" v-model="height">
			    </div>
			</form>

			<section class="submission" v-if="is_valid">
			    <button :disabled="!is_form_for_plane_valid" type="submit" @click.prevent="onSubmitPlane()" v-if="is_plane">
			        <i class="fa fa-calculator"></i> Evaluer
			    </button>
			    <button :disabled="!is_form_for_boat_valid" type="submit" @click.prevent="onSubmitBoat()" v-if="is_boat">
			        <i class="fa fa-calculator"></i> Evaluer
			    </button>
			    <button type="submit" @click.prevent="eraseCalculation()">
			        <i class="fa fa-ban"></i> effacer
			    </button>
			</section>
		</div>
	`
})


new Vue({
	el: '#is-vue'
});

