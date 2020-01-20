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
        if(!Vue.prototype.$token.getItem('auth-token')) {
            router.push({path: "/login"})
        }
    }

    checkTokenValid()
    {

    }

}


export default new AuthToken;