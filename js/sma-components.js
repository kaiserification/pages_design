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


new Vue({
	el: '#is-vue'
});

