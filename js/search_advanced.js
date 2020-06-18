const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').content
let search_user_name_url = ''
if (document.querySelector('#nameSearchField')) {
    search_user_name_url = document.querySelector('#nameSearchField').dataset.url
}


Vue.component('autocomplete-link-item', {
    props: ['name', 'email'],

    template: `
		<a href="#" @click.prevent="grabName">
            <span class="autocomplete-name">{{ name }}</span>
            <span class="autocomplete-email">{{ email }}</span>
        </a>
	`,
    methods: {
        grabName(event) {
            const name = event.target.querySelector('.autocomplete-name').innerText
            this.$parent.firstname_or_lastname = name
            this.$parent.users = []
        }
    }
})

const app = new Vue({
    el: '#app',
    props: ['name', 'email'],

    data() {
        return {
            typeRecherche: '',
            order_status_selected: false,
            product_status_selected: false,
            firstname_or_lastname_selected: false,
            website_selected: false,
            order_number_selected: false,
            search_type_selected: false,
            tracking_number_selected: false,
            product_name_selected: false,
            mode_of_transport_selected: false,
            order_created_at_selected: false,
            numero_commande_fournisseur_selected: false,
            my_clients: 0,
            others: 0,

            product_name: '',
            order_status: '',
            product_status: '',
            first_name: '',
            last_name: '',
            email: '',
            website: '',
            order_number: '',
            tracking_number: '',
            mode_of_transport: '',
            order_created_at: '',
            params: new Object(),
            users: new Array(),
            selectedFields: new Array(),
            numero_commande_fournisseur: '',
            start_at: '',
            finish_at: ''
        }
    },
    methods: {
        closeBtn(type, event) {
            switch (type) {
                case 'product_name':
                    this.product_name_selected = false
                    this.product_name = ''
                    break;
                case 'order_status':
                    this.order_status_selected = false
                    this.order_status = ''
                    break;
                case 'product_status':
                    this.product_status_selected = false
                    this.product_status = ''
                    break;
                case 'firstname_or_lastname':
                    this.firstname_or_lastname_selected = false
                    this.firstname_or_lastname = ''
                case 'website':
                    this.website_selected = false
                    this.website = ''
                    break;
                case 'mode_of_transport':
                    this.mode_of_transport_selected = false
                    this.mode_of_transport = ''
                    break;
                case 'tracking_number':
                    this.tracking_number_selected = false
                    this.tracking_number = false
                    break;
                case 'order_number':
                    this.order_number_selected = false
                    this.order_number = ''
                    break;
                case 'tracking_number':
                    this.tracking_number_selected = false
                    this.tracking_number = ''
                    break;
                case 'order_created_at':
                    this.order_created_at_selected = false
                    this.order_created_at = ''
                    break;
                case 'numero_commande_fournisseur':
                    this.numero_commande_fournisseur_selected = false
                    this.numero_commande_fournisseur = ''
                    break;

            }
        },

        onChange(event) {
            // const selectedIndex = event.target.selectedIndex 
            // event.target.options[selectedIndex].setAttribute('disabled', 'disabled')
        },

        pasteName(name) {
            this.firstname_or_lastname_selected = name
        },
        async searchName(event) {
            const value = event.target.value
            if (!(value && value)) {
                return
            }
            let response = await fetch(search_user_name_url + '?value=' + value)
            let jsonData = await response.json()
            this.users = jsonData.users
        },
        selectFields(value) {
            if (value == 'PRENOM_OU_NOM') {
                this.firstname_or_lastname_selected = true
            }
            if (value == 'NOM_PRODUIT') {
                this.product_name_selected = true
            }
            if (value == 'NUMERO_COMMANDE') {
                this.order_number_selected = true
            }
            if (value == 'STATUT_PRODUIT') {
                this.product_status_selected = true
            }

            if (value == 'STATUT_COMMANDE') {
                this.order_status_selected = true
            }

            if (value == 'SITE_WEB') {
                this.website_selected = true
            }
            if (value == 'MODE_TRANSPORT') {
                this.mode_of_transport_selected = true
            }
            if (value == 'NUMERO_TRACKING') {
                this.tracking_number_selected = true
            }
            if (value == 'ORDER_CREATED_AT') {
                this.order_created_at_selected = true
            }
            if (value == 'NUMERO_COMMANDE_FOURNISSEUR') {
                this.numero_commande_fournisseur_selected = true
            }
        }
    },
    watch: {
        typeRecherche(value) {
            this.search_type_selected = (value && value.length > 0)
            this.selectFields(value)
        },
    },
    computed: {
        selectedSearchType() {
            return this.params.get('typeRecherche')
        },
        selectedProductName() {
            return this.params.get('product_name')
        },
        selectedOrderStatus() {
            return this.params.get('selectOrders')
        },
        selectedProductStatus() {
            return this.params.get('selectProducts')
        },
        selectedFirstname() {
            return this.params.get('first_name')
        },
        selectedLastname () {
            return this.params.get('last_name')
        },
        selectedEmail () {
            return this.params.get('email')
        },
        selectedWebsite() {
            return this.params.get('siteSearchField')
        },
        selectedOrderNumber() {
            return this.params.get('orderSearchField')
        },
        selectedTrackingNumber() {
            return this.params.get('TrackingSearchField')
        },
        selectedModeOfTransport() {
            return this.params.get('selectModeOfTransport')
        },
        selectedOrderCreatedAt() {
            return this.params.get('order_created_at')
        },
        selectedNumeroCommandeFournisseur() {
            return this.params.get('numero_commande_fournisseur')
        },
        selectedStartAt() {
            return this.params.get('start_at')
        },
        selectedFinishAt() {
            return this.params.get('finish_at')
        }
    },
    mounted() {
        this.params = new URLSearchParams(window.location.href)

        if (this.selectedFirstname || this.selectedLastname || this.selectedEmail) {
            this.firstname_or_lastname_selected = true
        }
        if (this.selectedProductName) {
            this.product_name_selected = true
        }
        if (this.selectedOrderNumber) {
            this.order_number_selected = true
        }
        if (this.selectedProductStatus) {
            this.product_status_selected = true
        }

        if (this.selectedOrderStatus) {
            this.order_status_selected = true
        }

        if (this.selectedWebsite) {
            this.website_selected = true
        }
        if (this.selectedModeOfTransport) {
            this.mode_of_transport_selected = true
        }

        if (this.selectedTrackingNumber) {
            this.tracking_number_selected = true
        }

        if (this.selectedOrderCreatedAt) {
            this.order_created_at_selected = true
        }

        if (this.selectedNumeroCommandeFournisseur) {
            this.numero_commande_fournisseur_selected = true
        }

        this.typeRecherche               = this.selectedSearchType
        this.product_name                = this.selectedProductName
        this.order_status                = this.selectedOrderStatus
        this.product_status              = this.selectedProductStatus
        this.first_name                  = this.selectedFirstname
        this.last_name                   = this.selectedLastname 
        this.email                       = this.selectedEmail 
        this.website                     = this.selectedWebsite
        this.order_number                = this.selectedOrderNumber
        this.tracking_number             = this.selectedTrackingNumber
        this.mode_of_transport           = this.selectedModeOfTransport
        this.order_created_at            = this.selectedOrderCreatedAt
        this.numero_commande_fournisseur = this.selectedNumeroCommandeFournisseur
        this.start_at                    = this.selectedStartAt
        this.finish_at                   = this.selectedFinishAt
    }
})