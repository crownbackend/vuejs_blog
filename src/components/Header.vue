<template>
    <div id="app">

        <!--HEADER-->
        <header id="header" style="background-color: #fff;" data-uk-sticky="show-on-up: true; animation: uk-animation-fade; media: @l">
            <div class="uk-container">
                <nav id="navbar" data-uk-navbar="mode: click;">
                    <div class="uk-navbar-left nav-overlay uk-visible@m">
                        <ul class="uk-navbar-nav">
                            <li>
                                <router-link to="/">Accueil</router-link>
                            </li>
                            <li>
                                <router-link to="/articles">Articles</router-link>
                            </li>
                            <li v-if="!login">
                                <router-link to="/login">Connexion</router-link>
                            </li>
                            <li v-if="!login">
                                <router-link to="/register">Inscription</router-link>
                            </li>
                            <li v-if="login">
                                <router-link to="/admin">Back-office</router-link>
                            </li>
                            <li v-if="login" @click="logout">
                                <a href="#">
                                    déconnexion
                                </a>

                            </li>
                        </ul>
                    </div>
                    <div class="uk-navbar-right nav-overlay">
                        <a class="uk-navbar-toggle uk-visible@m" data-uk-search-icon data-uk-toggle="target: .nav-overlay; animation: uk-animation-fade" href="#"></a>
                        <div class="uk-navbar-item">
                            <a class="uk-navbar-toggle uk-hidden@m" data-uk-toggle data-uk-navbar-toggle-icon href="#offcanvas-nav"></a>
                        </div>

                    </div>
                    <div class="nav-overlay uk-navbar-left uk-flex-1" hidden>
                        <div class="uk-navbar-item uk-width-expand">
                            <form class="uk-search uk-search-navbar uk-width-1-1">
                                <input class="uk-search-input" type="search" placeholder="Search...">
                            </form>
                        </div>
                        <a class="uk-navbar-toggle" data-uk-close data-uk-toggle="target: .nav-overlay; animation: uk-animation-fade" href="#"></a>
                    </div>
                </nav>
            </div>
        </header>
        <!--/HEADER-->
        <div id="offcanvas-nav" uk-offcanvas="overlay: true">
            <div class="uk-offcanvas-bar">

                <ul class="uk-nav uk-nav-default">
                    <li class="uk-active"><a href="#">Accueil</a></li>
                    <li><a href="#">Articles</a></li>
                    <li><a href="#">Connexion</a></li>
                </ul>

            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'header',
        data() {
            return {
                login: null
            }
        },
        methods: {
          logout() {
              if(this.login === true) {
                  this.login = false;
                  localStorage.removeItem('token');
                  this.$router.push('/');
              }
          },

        },
        mounted() {
            if(this.$token.getItem('token')) {
                this.login = true
            }
        }
    }
</script>

<style>

</style>
