export const getJson = (urlItem, callback) => {
    return fetch(urlItem, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
     })
    .then( res => res.json())
    .then((data) => {     
        return callback(data);        
    });
};

export const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};