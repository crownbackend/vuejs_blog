import axios from "axios";
import Vue from "vue";

class ApiArticle {

    getArticles()
    {
        return axios
            .get(Vue.prototype.$hostName+'/admin/articles', {
                headers: {
                    "Authorization": Vue.prototype.$token.getItem('auth-token')
                }
            });
    }

    showArticle(id)
    {
        this.id = id
        return axios.get(Vue.prototype.$hostName+'/admin/article/'+id,{
            headers: {
                "Authorization": Vue.prototype.$token.getItem('auth-token')
            }
        });
    }

    addArticle(image, category, content, published, title)
    {
        this.image = image;
        this.category = category;
        this.content = content;
        this.published = published;
        this.title = title;
        const formData = new FormData();
        formData.append('authorization', Vue.prototype.$token.getItem('auth-token'));
        formData.append('image', this.image);
        formData.append('category', this.category);
        formData.append('description', this.content);
        formData.append('published', this.published);
        formData.append('title', this.title);
        formData.append('Content-Type', 'multipart/form-data');

        return axios.post(Vue.prototype.$hostName+'/admin/articles', formData);
    }

    editArticle(image, category, description, published, title, id) {
        this.image = image;
        this.category = category;
        this.description = description;
        this.published = published;
        this.title = title;
        this.id = id;
        const articleEdit = new FormData();
        articleEdit.append('image', this.image);
        articleEdit.append('category', this.category);
        articleEdit.append('description', this.description);
        articleEdit.append('published', this.published);
        articleEdit.append('title', this.title);
        articleEdit.append('_method', 'PUT');
        return axios.post(Vue.prototype.$hostName+'/admin/article/'+id, articleEdit, {
            headers: {
                authorization: Vue.prototype.$token.getItem('auth-token'),
            }
        });
    }

    deleteArticle(id)
    {
        this.id = id;
        return axios.delete(Vue.prototype.$hostName+'/admin/article/'+id, {
            headers: {
                authorization: Vue.prototype.$token.getItem('auth-token'),
            }
        });
    }


}

export default new ApiArticle;