<template>
    <div>
        <h1 v-if="isLoading">
            {{article.title}}
        </h1>
        <p v-if="isLoading" class="uk-article-meta">
            Article publié le : {{format_date(article.created_at)}}
            dans la catégorie : {{article.category.name}}
        </p>


        <p v-if="isLoading">
            {{article.description}}
        </p>

        <figure>
            <img  v-if="isLoading" v-bind:src="article.image_name" v-bind:data-src="article.image_name" width="800" height="300" v-bind:alt="article.image_name" class="lazy" data-uk-img="">
            <figcaption class="uk-padding-small uk-text-center uk-text-muted">Caption of the image</figcaption>
        </figure>

    </div>
</template>

<script>
    import ApiArticle from "../../services/ApiArticle";

    export default {
        name: "Show",
        data() {
            return {
                article: null,
                isLoading: false,
            }
        },
        mounted() {
            ApiArticle.showArticle(this.$route.params.id)
            .then(response => {
                this.isLoading = true;
                this.article = response.data
                document.title = response.data.title
            })
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
            }
        }
    }
</script>

<style>

</style>