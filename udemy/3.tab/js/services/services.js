let postData = async (url, data) => {

    let req = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await req.json();
};

let getResourses = async (url) => {
    let req = await fetch(url);

    if (!req.ok) {
        throw new Error(`Could not fetch ${url} ${req.status}`);
    }
    return await req.json();
};

export {postData};
export {getResourses};