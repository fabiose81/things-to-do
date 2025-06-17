export function Request(param, method, body) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:4000/'.concat(param), {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Credentials': true
            },
            body: body
        })
            .then(response => {
                if (response.status !== 200) {
                    reject('Failed!');
                }
                return response.json();
            })
            .then(responseData => {
                resolve(responseData)
            })
            .catch(err => {
                reject(err);
            });
    });
}