Vue.component('adding-order-field', {
    props: ['countries', 'scrapper_sites', 'parent_categories'],
    data() {
        return {
            field_rows_count: 1,
        }
    },
    methods: {
        incrementField() {
            this.field_rows_count++
        },
        decrementField() {
            if (this.field_rows_count > 1) {
                this.field_rows_count--
            }
        },
        scrollToLeft() {
            this.$refs.table_area.scrollBy(-100, 0);
        },
        scrollToRight() {
            this.$refs.table_area.scrollBy(100, 0);
        }
    },
    computed: {
        field_rows_count_status() {
            if (this.field_rows_count <= 1) {
                return '1 champ ajouté';
            }
            return `${this.field_rows_count} champs ajoutés`;
        },
    },
    template: `
		<div>
			<div class="form-group">
		      <div class="d-flex align-items-center justify-content-center">
		      	<span class="d-inline-block text-bold" style="margin-right:auto;" v-html>
		      		{{ field_rows_count_status }}
		      	</span>
		      	<button @click="scrollToLeft()" type="button" class="btn btn-primary btn-sm mr-10"><i class="fa fa-long-arrow-left"></i> Défiler à gauche</button>
		      	<button @click="scrollToRight()" type="button" class="btn btn-primary btn-sm mr-10">Défiler à droite <i class="fa fa-long-arrow-right"></i></button>
		        <button type="button" :disabled="field_rows_count == 1" @click.prevent="decrementField" class="btn btn-secondary btn-sm mr-10">Enlever un champ <i class="fa fa-minus"></i></button>
		        <button type="button" @click.prevent="incrementField" class="btn btn-primary btn-sm mr-10">Ajouter un champ <i class="fa fa-plus"></i></button>
		      </div>
		    </div>
		    <div class="form-group d-flex align-items-center justify-content-end">
		    	<span class="text-small text-muted">Vous pouvez les flêches gauche et droite pour faire défiler le tableau</span>
		    </div>


		    <div class="form-group mb-30">
		      <div class="table-responsive" ref="table_area" id="table_area">
		        <table class="table">
		          <thead>
		            <tr>
		              <th>N°</th>
		              <th>N° Cmde fournisseur</th>
		              <th>Nom de l'article</th>
		              <th>Prix</th>
		              <th>Devise</th>
		              <th>Site web</th>
		              <th>Pays d'origine</th>
		              <th style="width:300px;">Url du produit</th>
		              <th>Taille</th>
		              <th>Couleur</th>
		              <th>Catégorie</th>
		              <th>Quantité</th>
		            </tr>
		          </thead>
		          <tbody>
		          	<tr v-for="(row_count, index) in field_rows_count" :key="index">  
					  <td>
					    <span style="display:inline-block;width:30px;height:30px;line-height:30px;background-color:#000;color:#fff;text-align:center;border-radius:50%;font-size:1.1em;"">
					    	{{ row_count }}
					    </span>
					  </td>
					  <td><input class="form-control" style="min-width:150px;" type="text" name="numero_commande_fournisseur[]" :id="'numero_commande_fournisseur' + row_count" required></td>
					  <td><input class="form-control" style="min-width:150px;" type="text" name="names[]" id="'name' + row_count" required></td>
					  <td><input class="form-control" style="min-width:150px;" type="number" step="0.01" name="prices[]" :id="'price' + row_count" required></td>
					  <td>
					    <select style="min-width:100px;" name="currencies[]" :id="'currency' + row_count" required class="form-control">
					      <option value="">DEVISE</option>
					      <option value="€">€ (EURO)</option>
					      <option value="$">$ (DOLLAR)</option>
					      <option value="£">£ (LIVRE STERLING)</option>
					    </select>
					  </td>

					  <td style="vertical-align:middle;min-width:200px;">
					    <select class="form-control custom-select is-chosen-field" style="min-width:200px;" name="websites[]" :id="'website'+ row_count" required>
					      <option value="">Site web</option>
					      <option :value="scrapper_site.domain" v-for="scrapper_site in scrapper_sites" :key="scrapper_site.id">
					      	{{ scrapper_site.domain }}
					      </option>
					    </select>
					  </td>
					  
					  <td><!--<input type="text" name="websites[]" id="website<%= index %>" required>-->
					    <select name="countries[]" :id="'country' + row_count" required class="form-control custom-select" style="min-width:150px"> 
					      <option value="">Pays d'origine</option>
					      <option :value="country.id" v-for="country in countries" :key="country.id">{{ country.name }}</option>
					    </select>
					  </td>

					  <td><input class="form-control" style="min-width:150px;" type="text" name="product_urls[]" :id="'product_url' + row_count" ></td>
					  <td><input class="form-control" style="min-width:150px;" type="text" name="sizes[]" :id="'size' + row_count" ></td>
					  <td><input class="form-control" style="min-width:150px;" type="text" name="colors[]" :id="'color' + row_count" ></td>
					  <td>
					    <select class="linked-select form-control custom-select" style="min-width:250px;" :data-target="'#children_categories'+ row_count" data-source="/list/children_categories/$id" required>
					      <option value="">Sélectionnez une categorie</option>
					      <option :value="category.id" v-for="category in parent_categories" :key="category.id">{{ category.name }}</option>
					    </select>

					    <select style="min-width:250px" :id="'children_categories' + row_count" class="linked-select custom-select form-control d-none" :data-target="'#categories' + row_count" data-source="/list/categories/$id" required>
					      <option value="">Sélectionner une categorie</option>
					    </select>

					    <select class="form-control custom-select d-none" style="min-width:150px;" :id="'categories'+ row_count" name="categories[]" required>
					      <option value="">Sélectionner une categorie</option>
					    </select>
					  </td>
					  <td><input class="form-control" style="min-width:80px;" type="number" name="quantities[]" id="quantity<%= index %>" required></td>
					</tr>
		          </tbody>
		        </table>
		      </div>
		    </div>
		</div>
	`
})


const App = new Vue({
    el: '#order_creation_vue'
});

$('.is-chosen-field').chosen();


$(document).on('change', '.linked-select', function(event) {
    const id = Number($(this).val())
    const target = $(this).data('target')
    const $target = document.querySelector(target)
    const $placeholder = $target.firstElementChild
    const url = $(this).data('source').replace('$id', id);

    $.get(url).done(function(data) {
        $target.innerHTML = data.map(datum => `<option value="${datum.id}">${datum.name} ${datum.weight ? `| poids => ${datum.weight}` : '' }</option>`)
        $target.insertBefore($placeholder, $target.firstElementChild)
        $target.parentNode.classList.remove('d-none')
        $target.classList.remove('d-none')
    })
})

$(window).on('keyup', function(event) {
    if (event.key == 'ArrowRight') {
        document.querySelector('#table_area').scrollBy(100, 0);
    } else if (event.key == 'ArrowLeft') {
        document.querySelector('#table_area').scrollBy(-100, 0);
    }
});