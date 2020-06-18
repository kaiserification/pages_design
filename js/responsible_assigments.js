let ResponsibleClientsSearch = {

    props: [
        "clients",
        "deletion_path",
        "responsible_id"
    ],

    data() {
        return {
            query: "",
            customers: [],
        }
    },

    template: `<div>
            <div class="row d-flex justify-content-center">
                <input autocomplete="off" type="text" name="search" v-model="query" @input="filter" class="form-control input" placeholder="Recherche par nom, prénom, numéro télephone, email">
            </div>
            <ul class="list-unstyled-unbox">
                <li class="d-flex align-items-center mb-10" v-for="client in customers" :key="client.id">
                    <span style="flex:1" class="text-bold"><a class="btn-link" :href="client_info_link(client)">{{client.first_name }} {{client.last_name }}</a></span>
                    <span style="flex:1" class="text-small text-muted d-inline-block ml-20">&lt;{{  client.email }}&gt;</span>
                    <span>
                        <a
                            data-method="DELETE" 
                            data-confirm="Confirmez vous la suppression ?"  
                            :href="get_deletion_path(client)"
                            class="close-btn"><i class="ti-close"></i>
                        </a>
                    </span>
                </li>
            </ul>
        </div>`,

    mounted() {
        this.customers = this.clients
    },

    methods: {
        filter(event) {
            const query = event.target.value
            this.customers = this.clients.filter((customer) => {
                const fullname = `${customer.first_name} ${customer.last_name}`

                return customer.email.toLowerCase().includes(query.toLowerCase()) ||
                    customer.first_name.toLowerCase().includes(query.toLowerCase()) ||
                    customer.last_name.toLowerCase().includes(query.toLowerCase()) ||
                    customer.phone_number.toLowerCase().includes(query.toLowerCase()) || 
                    fullname.toLowerCase().includes(query.toLowerCase())
            })

        },

        client_info_link(client) {
            return `/dashboard/clients?search=user&who=${client.id}`;
        },
        get_deletion_path(client) {
            return this.deletion_path + `/${this.responsible_id}/${client.id}`
        }
    }

}

const apps = Array.from(document.querySelectorAll('.js-app'))

apps.forEach(app => {
    new Vue({
        el: `#${app.getAttribute('id')}`,
        components: { ResponsibleClientsSearch },
    })
});