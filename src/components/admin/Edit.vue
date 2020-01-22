<template>
    <div>
        <form enctype="multipart/form-data" method="post" @submit.prevent="sendForm">
            <fieldset class="uk-fieldset">

                <legend class="uk-legend">Ajouter un article</legend>

                <div class="uk-margin">
                    <label for="category">
                        Liste des catégorie
                    </label>
                    <select id="category" class="uk-select" v-model="category" required v-if="isLoading">
                        <option v-for="category in categories" v-bind:key="category.id" :value="category.id">
                            {{category.name}}
                        </option>
                    </select>
                </div>

                <div class="uk-margin" v-if="isLoading">
                    <label for="title">Titre</label>
                    <input class="uk-input" id="title" type="text" placeholder="Titre de l'article" v-model="title">
                </div>

                <div class="uk-margin" v-if="isLoading">
                    <label for="description">description</label>
                    <textarea class="uk-textarea" id="description" rows="5" placeholder="Contenu de l'article" v-model="description">
                    </textarea>
                </div>
                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid" v-if="isLoading">
                    <label>Publier l'article</label>
                    <label>
                        <input class="uk-radio" type="radio" name="radio2" :value="1" v-model="published"> Oui
                    </label>
                    <label>
                        <input class="uk-radio" type="radio" name="radio2" :value="0" v-model="published"> Non
                    </label>
                </div>
                <div>
                    <figure v-if="isLoading">
                        <h1>Image de l'article</h1>
                        <img v-bind:src="article.image_name" v-bind:data-src="article.image_name" width="800" height="300" v-bind:alt="article.image_name" class="lazy" data-uk-img="">
                        <figcaption class="uk-padding-small uk-text-center uk-text-muted">Caption of the image</figcaption>
                    </figure>
                </div>
                <div class="uk-margin" uk-margin>
                    <div uk-form-custom="target: true">
                        <input type="file" @change="onFileChange">
                        <input class="uk-input uk-form-width-medium" type="text" placeholder="Choisir une image" disabled>
                    </div>
                </div>

                <div class="uk-margin">
                    <button class="uk-button uk-button-primary" type="submit">
                        Modifier l'article
                    </button>
                </div>

            </fieldset>
        </form>
    </div>
</template>
<script>
    import ApiArticle from "../../services/ApiArticle";
    import AuthToken from "../../services/AuthToken";
    import ApiCategory from "../../services/ApiCategory";

    export default {
        name: "EditArticle",
        data() {
            return {
                categories: null,
                title: null,
                description: null,
                published: null,
                image: null,
                category: null,
                article: null,
                isLoading: false,
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
                ApiArticle.editArticle(this.image, this.category, this.description,
                    this.published, this.title, this.$route.params.id).
                then(response => {
                    window.console.log(response)
                    if(response.status === 200) {
                        // this.$router.push('/admin')
                    }
                })
                    .catch(error => {
                        window.console.log(error);
                    });
            },
        },
        mounted() {
            AuthToken.checkLogin();
            ApiCategory.getCategories()
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    if(error.status === 500) {
                        localStorage.removeItem('auth-token');
                        this.$router.push('/');
                    } else if (error.status === 403) {
                        this.$router.push('/');
                    } else {
                        this.$router.push('/');
                    }
                });
            ApiArticle.showArticle(this.$route.params.id)
                .then(response => {
                    this.isLoading = true;
                    this.article = response.data;
                    if(response.data.published === true) {
                        this.published = 1;
                    } else {
                        this.published = 0;
                    }
                    this.category = response.data.category.id;
                    this.title = response.data.title;
                    this.description = response.data.description;
                })
        },
    }
</script>

<style>

</style>