import axios from 'axios'
import Vue from "vue";

class ApiCategory {

    getCategories() {
        return axios.get(Vue.prototype.$hostName+"/admin/categories", {
            headers: {
                Authorization: Vue.prototype.$token.getItem('auth-token')
            }
        })
    }

}

export default new ApiCategory;