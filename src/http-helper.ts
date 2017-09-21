
const http = (url: string, method: string, data?: any): Promise<any> => {
    let options: RequestInit = {
        method: method,
        credentials: "same-origin"
    };
    if(data) {
        options.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        options.body = JSON.stringify(data)
    }
    return fetch(url, options)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return response.json()
            } else {
                return Promise.resolve()
            }
        })
        .catch(error => {
            throw error;
        });
}
