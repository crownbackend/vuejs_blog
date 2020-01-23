import axios from 'axios'
import Vue from 'vue'
import router from "../Route";

class AuthToken {

    loginUser(username, password) {
        axios.post(Vue.prototype.$hostName+'/login_check', {
            "Content-Type:": "application/json",
            username: username,
            password: password,
        })
            .then(response => {
                if(response.status === 200) {
                    Vue.prototype.$token.setItem('auth-token', response.data.token);
                    Vue.prototype.$login = true;
                    router.push({path: "/"})
                }

            })
            .catch(error => {
                window.console.log(error)
            })
    }

    checkLogin() {
        const authToken = new FormData();
        authToken.append('authorization', Vue.prototype.$token.getItem('auth-token'));
        axios.post(Vue.prototype.$hostName+"/check/login/verifiy/token", {}, {
            headers: {
                authorization: Vue.prototype.$token.getItem('auth-token'),
            }
        }).then(response => {
            if(response.status === 200) {
                if(!Vue.prototype.$token.getItem('auth-token')) {
                    router.push({path: "/login"});
                }
            }
        }).catch(error => {
            if(error.status === 400) {
                Vue.prototype.$token.clear();
                router.push({path: "/login"});
            }
        });
    }

}


export default new AuthToken;