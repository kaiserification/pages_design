const API_URL = 'https://shopmeaway.com/api'

connexion = {

    http: {
        emulateJSON: true,
        emulateHTTP: true
    },

    template: `
  <div id="connecting">
    <v-app id="inspire">
      <v-content>
        <v-container>
          <v-layout
            style="height:100vh"
            align-center
            justify-center
          >
            <v-flex>
              <v-card>
              
                <v-card-text>
                  <v-alert type="success" v-if="success_message == true">
                    {{message_alert}}
                  </v-alert>
                  <v-alert type="error" v-if="success_message == false">
                    {{message_alert}}
                  </v-alert>

                  <div class="">
                    <h3 class="headline text-uppercase" style="margin-bottom:20px;">Connexion</h3>
                  </div>

                  <v-form>
                    <v-text-field
                      label="Adresse email"
                      @keyup.enter="getinformations()"
                      name="email"
                      prepend-icon="person"
                      type="email" v-model="datauser.email"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Mot de passe"
                      name="password"
                      @keyup.enter="getinformations()"
                      prepend-icon="lock"
                      type="password"  v-model="datauser.password"
                    ></v-text-field>

                    <div class="text-right">
                      <v-btn
                        text
                        color="deep-purple accent-4" :href="'https://shopmeaway.com/users/registration?messenger_id='+messenger_id"
                      >
                        Créer un compte
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :disabled="!is_valid" :loading="loading" block color="primary" @click.prevent="getinformations()">Se connecter</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
  `,

    props: {
        registration_path: {
            type: String,
            required: false,
            default: '',
        },
        messenger_id: Number
    },

    data() {
        return {
            datauser: {
                messenger_id: null,
                email: null,
                password: null,
            },
            loading: false,
            message_alert: '',
            success_message: null,
            chatfuel_token: 'mELtlMAHYqR0BvgEiMq8zVek3uYUK3OJMbtyrdNPTrQB9ndV0fM7lWTFZbM4MZvD',
            block_name: 'connexion',
            the_id: null,
            attribut_name: 'shopmeaway_id',
            link_name: 'link_post_user',
            link: null,
            bot_id: '5e74dfe43d1c916381edd469',
        }
    },

    mounted() {
        //do something after mounting vue instance
        this.datauser.messenger_id = this.messenger_id
    },

    methods: {
        validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },

        postIdtoChatfuel($moredata = '') {
            //https://api.chatfuel.com/bots/%3CBOT_ID%3E/users/%3CUSER_ID%3E/send?chatfuel_token=%3CTOKEN%3E&chatfuel_message_tag=%3CCHATFUEL_MESSAGE_TAG%3E&chatfuel_block_name=%3CBLOCK_NAME%3E&%3CUSER_ATTRIBUTE_1%3E=%3CVALUE_1%3E&%3CUSER_ATTRIBUTE_2%3E=%3CVALUE_2
            //$link  = "https://api.chatfuel.com/bots/"+this.bot_id+"/users/"+this.user_id+"/send";
            $link = "https://api.chatfuel.com/bots/" + this.bot_id + "/users/" + this.messenger_id + "/send?chatfuel_token=" + this.chatfuel_token + "&chatfuel_block_name=" + this.block_name + "&" + this.attribut_name + "=" + this.the_id + $moredata;
            Oldthis = this;

            this.$http.post($link).then((response) => {
                console.log('la liste des startups donné', response.data);
                if (response.data.success) {
                    window.location.href = "https://www.messenger.com/closeWindow/?image_url=http://www.shopmeaway.com/assets/banneR3-f21e094656658ce32309a8ae7335840d69d8e05637db5754c9f23abcfe81d692.jpg&display_text=Vous êtes maintenant connecté";
                }
            }).catch((response) => {
                console.error("on a une erreur", response)
                Oldthis.errors = response.bodyText;
            })
        },

        postDataUser() {
            Oldthis = this;
            this.loading = true
            this.disabled = true

            this.$http.post(`${API_URL}/login`, Oldthis.datauser).then((response) => {
                if (response.data.success) {
                    Oldthis.success_message = response.data.success;
                    Oldthis.message_alert = response.data.message;
                    Oldthis.the_id = response.data.data.id;
                    Oldthis.link_name = `${API_URL}/update_bot/${response.data.data.id}/${Oldthis.messenger_id}`
                    Oldthis.postIdtoChatfuel('&link_confirmation=' + Oldthis.link_name);
                } else {
                    Oldthis.success_message = response.data.success;
                    Oldthis.message_alert = response.data.message;
                }
            }).catch(response => {
                console.log(response.html, 'error')
            }).finally(_ => {
                this.loading = false;
                this.disabled = false;
            });
        },

        getinformations() {
            console.log("soumission des informations rentrées", this.datauser);
            //console.log("ifmail",ifmail);
            if (this.validateEmail(this.datauser.email) && this.datauser.email != '') {
                this.postDataUser();
            }
        }
    },

    computed: {
        is_valid() {
            return this.validateEmail(this.datauser.email) && this.datauser.password != ''
        }
    }

}