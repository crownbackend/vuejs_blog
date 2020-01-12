<template>
  <div id="app">
    <Header />
    <br>
    <div class="uk-container">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Header from './components/Header';
import Footer from './components/Footer';
UIkit.use(Icons);
export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
};
</script>

<style>
  @import "~uikit/dist/css/uikit.min.css";
</style>
