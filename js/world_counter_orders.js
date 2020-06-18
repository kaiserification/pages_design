Vue.component('world_counter_orders_form', {

	props: {
		parent_categories: {
			type: Array, 
			default: []
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
				<fieldset :key="" class="mb-20" style="padding: 10px;border-color: #ccc;" v-for="form_count in form_counts">
					<legend>Produit numéro {{form_count}}</legend>
					<div class="row mb-20">
						<div class="col-md-4">
							<div class="form-group">
								<label class="control-label control-label-sm"><span class="text-danger">*</span> Lien du produit</label>
								<input type="text" name="urls[]" class="form-control form-control-sm" required>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label class="control-label control-label-sm"><span class="text-danger">*</span> Quantité</label>
								<input type="number" name="quantities[]" class="form-control form-control-sm" required>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label class="control-label control-label-sm"><span class="text-danger">*</span> Quantité</label>
								<select class="form-control form-control-sm custom-select">
									<option :value="parent_category.id" v-for="parent_category in parent_categories" :key="parent_category.id">
										{{ parent_category.name }}
									</option>
								</select>
							</div>
							<div class="form-group" style="display:none;">
								<label class="control-label control-label-sm"><span class="text-danger">*</span> Quantité</label>
								<input type="number" name="quantities[]" class="form-control form-control-sm" required>
							</div>
						</div>
					</div>
					<div class="row mb-20">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label control-label-sm"><span class="text-danger">*</span> Prix</label>
								<input type="number" name="prices[]" class="form-control form-control-sm" required>
							</div>
						</div>
						<div class="col-md-3">
							<div class="form-group">
								<label class="control-label control-label-sm">Couleur <span class="text-small">(Facultatif)</span></label>
								<input type="text" name="colors[]" class="form-control form-control-sm">
							</div>
						</div>
						<div class="col-md-3">
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

	data () {
		return {
			form_counts: 1
		}
	},

	methods: {
		incrementFormCounts () {
			this.form_counts++
		},
		decrementFormCounts () {
			if (this.form_counts > 1) {
				this.form_counts--
			}
		}
	},
	mounted() {
		console.log(this.parent_categories)
	}
});

new Vue({
	el: '#world_counter_app',
});