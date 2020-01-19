<template>
    <div>
        <form enctype="multipart/form-data" method="post" @submit.prevent="sendForm">
            <fieldset class="uk-fieldset">

                <legend class="uk-legend">Ajouter un article</legend>

                <div class="uk-margin">
                    <label for="category">
                        Liste des catégorie
                    </label>
                    <select id="category" class="uk-select" v-model="category" required>
<!--                        <option value="" selected>Choisir une catégorie</option>-->
                        <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
                            {{category.name}}
                        </option>
                    </select>
                </div>

                <div class="uk-margin">
                    <input class="uk-input" type="text" placeholder="Titre de l'article" v-model="title">
                </div>

                <div class="uk-margin">
                    <textarea class="uk-textarea" rows="5" placeholder="Contenu de l'article" v-model="content"></textarea>
                </div>
                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    <label>Publier l'article</label>
                    <label><input class="uk-radio" type="radio" name="radio2" :value="1" v-model="published"> Oui</label>
                    <label><input class="uk-radio" type="radio" name="radio2" :value="0" v-model="published"> Non</label>
                </div>

                <div class="uk-margin" uk-margin>
                    <div uk-form-custom="target: true">
                        <input type="file" @change="onFileChange">
                        <input class="uk-input uk-form-width-medium" type="text" placeholder="Choisir une image" disabled>
                    </div>
                </div>

                <div class="uk-margin">
                    <button class="uk-button uk-button-primary" type="submit">
                        Ajouter l'article
                    </button>
                </div>

            </fieldset>
        </form>
    </div>
</template>

<script>
    // import axios from 'axios';
    import AuthToken from "../../services/AuthToken";
    import ApiCategory from "../../services/ApiCategory";
    import ApiArticle from "../../services/ApiArticle";
    export default {
        name: "NewArticle",
        data() {
            return {
                categories: null,
                title: null,
                content: null,
                published: null,
                image: null,
                category: null
            }
        },
        methods: {
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.image = files[0];
            },

            sendForm() {
                ApiArticle.addArticle(this.image, this.category, this.content, this.published, this.title).
                then(response => {
                    if(response.status === 201) {
                        this.$router.push('/admin')
                    }
                })
                .catch(error => {
                    window.console.log(error)
                })
            }
        }
        ,
        mounted() {
            AuthToken.checkLogin()
            ApiCategory.getCategories()
            .then(response => {
                this.categories = response.data
            })
            .catch(error => {
                if(error.status === 500) {
                    localStorage.removeItem('auth-token');
                    this.$router.push('/');
                } else if (error.status === 403) {
                    this.$router.push('/')
                } else {
                    this.$router.push('/')
                }
            })
        }
    }
</script>

<style>

</style>