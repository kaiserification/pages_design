menulistbot = {

    http: {
        emulateJSON: true,
        emulateHTTP: true
    },
    template: `<div class="well" style="max-height: 300px;overflow: auto; padding:0;">
    <div class="form-group">
      <input type="text" class="form-control" v-model="search"  placeholder="Que recherchez-vous ?">
    </div>
    <ul class="list-group checked-list-box">
      <li  class="list-group-item" v-for="(categoryy, iky) in filteredList" >
        <label class="checkcontainer"  @click="getIdentifiant(categoryy)">
          <input type="radio" checked="checked" name="radio">
          <span class="radiobtn"></span>{{categoryy.name}}
         </label>
      </li>
       <li class="list-group-item" v-for="(category, ik) in categories.parent_categories"
        :key="ik" >
          <label class="checkcontainer" v-if="category.children.length">
            {{category.name}}
            <li class="list-group-item" style="font-size:15px !important; font-weight:normal !important"  v-for="(child, ic) in category.children[0].categories"
            :key="ic"
            link >
                <label class="checkcontainer" @click="getIdentifiant(child)" >
                  <input type="radio" checked="checked" name="radio">
                  <span class="radiobtn"></span>{{child.name}}
                 </label>
            </li>
           </label>
          <label class="checkcontainer" v-else @click="getIdentifiant(category)">
           <input type="radio" checked="checked" name="radio">
           <span class="radiobtn"></span>{{category.name}}
          </label>
     </li>
</ul>
<button class="btn btn-primary col-xs-12" id="get-checked-data" @click.prevent="validateCategory()" style="position:fixed;bottom:0!important">Valider</button>
</div>
`,
    props: {
        messenger_id: Number,
    },
    data: () => ({
        admins: [
            ['Management', 'people_outline'],
            ['Settings', 'settings'],
        ],

        cruds: [
            ['Create', 'add'],
            ['Read', 'insert_drive_file'],
            ['Update', 'update'],
            ['Delete', 'delete'],
        ],
        categories: {
            parent_categories: []
        },
        Allcategories: [],
        linkApiCategory: "http://shopmeaway.com/api/v1/categories",
        redirect: 'https://datas-impact.com',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        the_id: null,
        the_name: null,
        user_id: '2009480525817307',
        bot_id: '5e74dfe43d1c916381edd469',
        chatfuel_token: 'mELtlMAHYqR0BvgEiMq8zVek3uYUK3OJMbtyrdNPTrQB9ndV0fM7lWTFZbM4MZvD',
        block_name: 'block_selected',
        attribut_name: 'id_under_category',
        category_name: 'category_name',
        category_selected: null,
        search: '',

    }),
    computed: {
        // a computed getter
        //'5c9387c13532dfbd14b74a55',
        filteredList() {
            Oldthis = this;
            //console.log("filteredList Allcategories",this.Allcategories);
            if (this.categories.parent_categories.length) {
                return Oldthis.Allcategories.filter(post => {
                    return post.name.includes(this.search.toUpperCase());
                })
            }
        }
    },
    mounted() {

        //do something after mounting vue instance
        //do something after mounting vue instance
        window.extAsyncInit = function() {
            // the Messenger Extensions JS SDK is done loading
            console.log("the Messenger Extensions JS SDK is done loading");
        };
        this.getlistMenu();
    },

    methods: {


        getListCategories() {
            Oldthis = this;
            $new_category = [];
            _.forEach(Oldthis.categories.parent_categories, function(category) {
                if (category.children.length) {
                    _.forEach(category.children, function(child) {
                        $new_category.push({
                            id: child.id,
                            name: child.name,
                            children: []
                        });
                        _.forEach(child.categories, function(cate) {
                            $new_category.push({
                                id: cate.id,
                                name: cate.name,
                                children: []
                            });
                        });
                    });
                } else {
                    $new_category.push({
                        id: category.id,
                        name: category.name,
                        children: []
                    });
                }
            });
            return $new_category;
        },
        closeWebview() {
            console.log("Messenger Extension", MessengerExtensions);
            MessengerExtensions.requestCloseBrowser(function success(success) {
                // webview closed
                console.log("On vient de fermer la webview", success);
            }, function error(err) {
                // an error occurred
                //requestCloseBrowser
                console.log("Erreur lors de la fermeture du webview", err);
            });
        },
        getlistMenu() {
            //this.categories =
            Oldthis = this
            this.$http.get(Oldthis.linkApiCategory).then(function(response) {
                //console.log("function getlistMenu",response.data.parent_categories);
                if (response.data.parent_categories) {
                    Oldthis.categories = response.data;
                    //console.log("all_categories",Oldthis.categories);
                    Oldthis.Allcategories = Oldthis.getListCategories();
                }
            }, function(response) {
                console.log("on a une erreur", response)
                Oldthis.errors = response.bodyText;
            });
        },
        getIdentifiant(data) {
            this.the_id = data.id;
            this.the_name = data.name;
            console.log('getIdentifiant', data);
            //this.closeWebview();
        },
        validateCategory() {
            this.postIdtoChatfuel();
        },
        postIdtoChatfuel() {
            //https://api.chatfuel.com/bots/%3CBOT_ID%3E/users/%3CUSER_ID%3E/send?chatfuel_token=%3CTOKEN%3E&chatfuel_message_tag=%3CCHATFUEL_MESSAGE_TAG%3E&chatfuel_block_name=%3CBLOCK_NAME%3E&%3CUSER_ATTRIBUTE_1%3E=%3CVALUE_1%3E&%3CUSER_ATTRIBUTE_2%3E=%3CVALUE_2
            //$link  = "https://api.chatfuel.com/bots/"+this.bot_id+"/users/"+this.user_id+"/send";
            $link = "https://api.chatfuel.com/bots/" + this.bot_id + "/users/" + this.messenger_id + "/send?chatfuel_token=" + this.chatfuel_token + "&chatfuel_block_name=" + this.block_name + "&" + this.attribut_name + "=" + this.the_id + "&" + this.category_name + "=" + this.the_name;
            Oldthis = this;
            this.$http.post($link).then(function(response) {
                console.log('la liste des startups donné', response.data);
                if (response.data.success) {
                    window.location.href = "https://www.messenger.com/closeWindow/?image_url=http://www.shopmeaway.com/assets/banneR3-f21e094656658ce32309a8ae7335840d69d8e05637db5754c9f23abcfe81d692.jpg&display_text=Catégorie Selectionnee";
                }
            }, function(response) {
                console.log("on a une erreur", response)
                Oldthis.errors = response.bodyText;
            });
        }

    }

}