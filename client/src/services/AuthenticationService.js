import Api from '@/services/Api'

export default {
    upload(post) {
        return Api().post('upload',post,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } 
}