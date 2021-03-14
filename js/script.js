var carrito={};


const url='https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json';



var load = (url, callback)=>{
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        if (data) {
            callback(data);
        } else {
            callback(null);
        }
    })
    .catch(err => { throw err });    
}


var nothing =(data)=>{
    console.log(data);
}



const renderMenu = (data) => {
    data.forEach(element => {
        const html = element.products.map((item) =>
    `
    <div class="card mb-3">
    <img src="${item.image}" class="card-img-top" alt="${item.name}">
    <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="card-text">
    ${item.description}
    </p>
    <a href="#" class="btn btn-primary">add</a>
    </div>
    </div>
    `
    ).join(" ");
    document.getElementById(element.name).innerHTML = html;  
    });
    
};

load(url, renderMenu);

const handleAdd = (evt) => {
    evt.preventDefault();
    const message = document.getElementById("message");
    ws.send(message.value);
    message.value = "";
};

//const btn = document.getElementById("form");
//form.addEventListener("submit", handleSubmit);