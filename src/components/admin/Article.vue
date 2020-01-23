<template>
    <div>
        <router-link class="uk-button uk-button-primary" :to="{name: 'adminNewArticle'}">
            Ajouter un article
        </router-link>

        <h1>
            {{error}}
        </h1>
        <div class="uk-grid" data-ukgrid="">
            <div class="uk-width-2-3@m" v-for="article in articles" v-bind:key="article.id">
                <h4 class="uk-heading-line uk-text-bold"><span>{{ article.category.name }}</span></h4>
                <article class="uk-section uk-section-small uk-padding-remove-top">
                    <div>
                        <h2 class="uk-margin-remove-adjacent uk-text-bold uk-margin-small-bottom"><a title="Fusce facilisis tempus magna ac dignissim." class="uk-link-reset" href="#">{{ article.title }}</a></h2>
                        <p class="uk-article-meta">Article publié le : {{format_date(article.createdAt)}}</p>
                    </div>
                    <figure>
                        <img  v-bind:src="article.image_name" v-bind:data-src="article.image_name" width="800" height="300" v-bind:alt="article.image_name" class="lazy" data-uk-img="">
                        <figcaption class="uk-padding-small uk-text-center uk-text-muted">Caption of the image</figcaption>
                    </figure>
                    <p>
                        {{ article.description}}
                    </p>
                    <router-link class="uk-button uk-button-default uk-button-small" :to="{name: 'adminShowArticle', params: {id: article.id}}">
                        Lire l'article
                    </router-link>
                    <router-link class="uk-button uk-button-primary uk-button-small" :to="{name: 'adminEditArticle', params: {id: article.id}}">
                        Editer un article
                    </router-link>
                    <button class="uk-button uk-button-danger uk-button-small" @click="deleteArticle(article.id)">Danger</button>
                    <hr>
                </article>

            </div>
        </div>
    </div>
</template>

<script>

    import AuthToken from "../../services/AuthToken";
    import ApiArticle from "../../services/ApiArticle";

    export default {
        name: "ArticleAdmin",
        data() {
            return {
                articles: null,
                error: null,
            }
        },
        created() {
            document.title = "Liste des articles"
        },
        mounted() {
            AuthToken.checkLogin();
            ApiArticle.getArticles()
                .then(response => {
                    if(response.data && response.status === 200) {
                        this.articles = response.data
                    } else {
                        this.error = 'Problème serveur';
                    }
                })
                .catch(
                    error => {
                        if(error.response.status === 500) {
                            localStorage.removeItem('auth-token');
                            this.$router.push('/');
                        } else if (error.response.status === 403) {
                            this.$router.push('/')
                        }
                    }
                );

        },
        methods: {
            format_date(value) {
                if(value) {
                    const d = new Date(value);
                    let year = d.getFullYear();
                    let month = (1 + d.getMonth()).toString().padStart(2, '0');
                    let day = d.getDate().toString().padStart(2, '0');
                    let hour = d.getHours();
                    let minute = d.getMinutes()

                    return month + '/' + day + '/' + year +' à '+ hour +':'+ (minute<10?'0':'') + minute;
                }
            },
            deleteArticle(id) {
                ApiArticle.deleteArticle(id)
                    .then(response => {
                        if(response.status === 204) {
                            ApiArticle.getArticles()
                                .then(response => {
                                    if(response.data && response.status === 200) {
                                        this.articles = response.data
                                    } else {
                                        this.error = 'Problème serveur';
                                    }
                                })
                                .catch(
                                    error => {
                                        if(error.response.status === 500) {
                                            localStorage.removeItem('auth-token');
                                            this.$router.push('/');
                                        } else if (error.response.status === 403) {
                                            this.$router.push('/')
                                        }
                                    }
                                );
                        }
                    })
                    .catch(error => {
                        alert(error.response.data);
                    });
            }
        }
    }
</script>

<style>

</style>