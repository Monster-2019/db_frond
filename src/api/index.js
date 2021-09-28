import fetch from '../plugins/fetch'
const baseURL = 'https://dongxin.cool/api'

const getPostList = (params) => fetch.get(baseURL + '/topic', params)

export default {
    getPostList
}