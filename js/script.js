let carrito=[];

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
    <div class="col-sm-3">
    <div class="card mb-3">
    <img src="${item.image}" class="card-img-top" alt="${item.name}">
    <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="card-text">
    ${item.description}
    </p>
    <h5>${item.price}</h5>
    <a href="#" onClick="add(this)" data-item='${JSON.stringify(item)}' class="btn btn-dark">Add to car</a>
    </div>
    </div>
    </div>
    `
    ).join(" ");
    document.getElementById(element.name).innerHTML = html;  
    });
    
};

load(url, renderMenu);

const showing =(what)=>{
    if(what==1){
        let e = document.getElementById("navContent");
        e.classList.remove("d-none");
        e.classList.add("d-block");
        e = document.getElementById("car-list");
        e.classList.add("d-none");
        e.classList.remove("d-block");
    }
    else{
        let e = document.getElementById("car-list");
        e.classList.remove("d-none");
        e.classList.add("d-block");
        e = document.getElementById("navContent");
        e.classList.add("d-none");
        e.classList.remove("d-block");

    }
}

const updateCar =() =>{
    document.getElementById("numItems").innerHTML=carrito.length;
}

const add = (button) => {
    var item= button.getAttribute("data-item");
    JSON.parse(item)
    item["item"]= carrito.length +1;
    carrito.push(item);
    updateCar(); 
}
const comdifyQ = (item, caltidad) => {

}

