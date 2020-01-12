<template>
  <div>
    <div class="uk-grid" data-ukgrid="">
      <div class="uk-width-2-3@m">
        <h4 class="uk-heading-line uk-text-bold"><span>Latest News</span></h4>
        <article class="uk-section uk-section-small uk-padding-remove-top">
          <div>
            <h2 class="uk-margin-remove-adjacent uk-text-bold uk-margin-small-bottom"><a title="Fusce facilisis tempus magna ac dignissim." class="uk-link-reset" href="#">Fusce facilisis tempus magna ac dignissim.</a></h2>
            <p class="uk-article-meta">Written on March 23, 2019. Posted in <a href="#">Blog</a> | <span data-uk-icon="icon: future" class="uk-icon"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="future"><polyline points="19 2 18 2 18 6 14 6 14 7 19 7 19 2"></polyline><path fill="none" stroke="#000" stroke-width="1.1" d="M18,6.548 C16.709,3.29 13.354,1 9.6,1 C4.6,1 0.6,5 0.6,10 C0.6,15 4.6,19 9.6,19 C14.6,19 18.6,15 18.6,10"></path><rect x="9" y="4" width="1" height="7"></rect><path d="M13.018,14.197 L9.445,10.625" fill="none" stroke="#000" stroke-width="1.1"></path></svg></span> Takes 7 min reading.</p>
          </div>
          <figure>
            <img src="https://picsum.photos/800/300/?random=1" data-src="https://picsum.photos/800/300/?random=1" width="800" height="300" alt="Alt text" class="lazy" data-uk-img="">
            <figcaption class="uk-padding-small uk-text-center uk-text-muted">Caption of the image</figcaption>
          </figure>
          <p>UPDATE 24th October 15.10 BST&#8202;—&#8202;Vivamus sed consequat urna. Fusce vitae urna sed ante placerat iaculis. Suspendisse potenti. Pellentesque quis fringilla libero. In hac habitasse platea dictumst.</p>
          <p>Ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
          <a href="#" title="Read More" class="uk-button uk-button-default uk-button-small">READ MORE</a>
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
    <br>
    <br>
    <br>

    <div v-for="article in articles" v-bind:key="article.id">
      <h1>
        {{article.title}}
      </h1>

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
    .get('https://127.0.0.1:8000/')
    .then(response => (this.articles = response))
  }
}
</script>

<style>

</style>