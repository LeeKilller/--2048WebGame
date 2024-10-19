const cache = new Map();

const getFileContentSync = (url) => {
    if (cache.has(url)) {
        const ele = cache.get(url);
        if (ele.status = 'fullfilled') return ele.value;
        else if (ele.status = 'rejected') throw ele.value;
    }


    const p = fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        }).then(data => {
            const newEle = {
                status: 'fullfilled',
                value: data
            }
            cache.set(url, newEle);
        }).catch(err => {
            const newEle = {
                status: 'rejected',
                value: err
            }
            cache.set(url, newEle);
        })

    throw p;
}


export default getFileContentSync;