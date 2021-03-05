axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })


axios.post('https://jsonplaceholder.typicode.com/posts',
            {body: "ceva scris in latina",
            id: 101,
            title: "mens sana in corpore sano",
            userId: 55
            })   
    .then(function (response) {
        console.log (response.data);
    })
    .catch(function (error) {
        console.log (error.status);
    })

axios.post('https://jsonplaceholder.typicode.com/posts',
    
    {body: "altceva interesant",
    id: 102,
    title: "nu stiu latina",
    userId: 144})
    .then(function (response) {
    console.log (response.data);
})
    .catch(function (error) {
    console.log (error.status);
})

axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })

axios.put('https://jsonplaceholder.typicode.com/posts/1', {
    title: 'acum nu mai scrie in latina'
    })
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    })
    
axios.delete('https://jsonplaceholder.typicode.com/posts/2')
    .then(function(response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    