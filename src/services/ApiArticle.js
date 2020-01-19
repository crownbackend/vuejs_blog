import axios from "axios";
import Vue from "vue";

class ApiArticle {

    getArticles() {
        return axios
            .get(Vue.prototype.$hostName+'/admin/articles', {
                headers: {
                    "Authorization": Vue.prototype.$token.getItem('auth-token')
                }
            })
    }

    showArticle(id) {
        this.id = id
        return axios.get(Vue.prototype.$hostName+'/admin/article/'+id,{
            headers: {
                "Authorization": Vue.prototype.$token.getItem('auth-token')
            }
        })
    }

    addArticle(image, category, content, published, title) {
        this.image = image
        this.category = category
        this.content = content
        this.published = published
        this.title = title
        const formData = new FormData();
        formData.append('image', this.image);
        formData.append('category', this.category)
        formData.append('authorization', Vue.prototype.$token.getItem('auth-token'))
        formData.append('description', this.content)
        formData.append('published', this.published)
        formData.append('title', this.title)
        formData.append('Content-Type', 'multipart/form-data')

        return axios.post('https://127.0.0.1:8000/api/admin/articles', formData)
    }


}

export default new ApiArticle;