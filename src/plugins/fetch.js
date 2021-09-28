const fetchApi = async (url, opts) => {
    const options = {
        ...opts
    }

    return await fetch(url, options).then(async res => {
        let { code, data, msg } = await res.clone().json()
        return code === 1 ? data : msg
    })
}

fetchApi.get = async (url, params = {}) => {
    if (JSON.stringify(params) !== '{}') {
        url += (url.indexOf('?') > -1 ? '&' : '?') + getUrlString(params);
    }

    return await fetchApi(url, {
        method: 'GET'
    })
}

fetchApi.post = async (url, data) => {
    return await fetchApi(url, {
        method: 'POST',
        body: data
    })
}

const getUrlString = (data) => {
    let dataArr = [];
    if (Object.keys(data).length) {
        Object.keys(data).forEach(key => {
            dataArr.push(key + '=' + data[key])
        })
    } else {
        return ''
    }
    return dataArr.join('&')
}



export default fetchApi