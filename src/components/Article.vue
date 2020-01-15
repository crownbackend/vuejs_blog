<template>
  <div>
    <div class="uk-grid" data-ukgrid="">
      <div class="uk-width-2-3@m" v-for="article in articles" v-bind:key="article.id">
        <h4 class="uk-heading-line uk-text-bold"><span>{{ article.category.name }}</span></h4>
        <article class="uk-section uk-section-small uk-padding-remove-top">
          <div>
            <h2 class="uk-margin-remove-adjacent uk-text-bold uk-margin-small-bottom"><a title="Fusce facilisis tempus magna ac dignissim." class="uk-link-reset" href="#">{{ article.title }}</a></h2>
            <p class="uk-article-meta">Article publié le : {{format_date(article.created_at.date)}}</p>
          </div>
          <figure>
            <img  v-bind:src="article.image_name" v-bind:data-src="article.image_name" width="800" height="300" v-bind:alt="article.image_name" class="lazy" data-uk-img="">
            <figcaption class="uk-padding-small uk-text-center uk-text-muted">Caption of the image</figcaption>
          </figure>
          <p>
            {{ article.description}}
          </p>
          <a href="#" title="Read More" class="uk-button uk-button-default uk-button-small">Lire l'article</a>
          <hr>
        </article>

      </div>
      <div class="uk-width-1-3@m">
        <h4 class="uk-heading-line uk-text-bold"><span>Archive</span></h4>
        <ul class="uk-list">
          <li><a href="">March</a></li>
          <li><a href="">February</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "article",
  data() {
    return {
      articles: null
    }
  },
  mounted() {
    axios
    .get('https://127.0.0.1:8000/api/articles')
    .then(response => (this.articles = response.data))
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