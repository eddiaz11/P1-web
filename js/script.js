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

const renderCar=()=>{
    let html="";
    if(carrito.length==0){
        html=`
        <div class="card text-center">
        <div class="card-header">
        Shopping car empty
        </div>
        <div class="card-body">
        <h5 class="card-title">Your shopping car is empty</h5>
        <p class="card-text text-center">Select some delicius products from our menu</p>
        <a href="#" onclick="showing(1)" class="btn btn-dark">See the menu</a>
        </div>
        </div>
        `
    }
    else{
        html=`
        <table class="table table-striped">
        <thead>
        <tr>
        <th scope="col">Item</th>
        <th scope="col">Qty.</th>
        <th class="w-50" scope="col">Description</th>
        <th scope="col">Unit Price</th>
        <th scope="col">Amount</th>
        <th scope="col">Modify</th>
        </tr>
        </thead>
        <tbody>
        
        `
        +
        carrito.map((item) =>
        `
        <tr>
        <th scope="row">${item.item}</th>
        <td>${item.quantity}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
        <td>${item.price*item.quantity}</td>
        <td>
        <button class="btn btn-secondary" onclick="mdq(${item.item-1},1)">+</button>
        <button class="btn btn-secondary" onclick="mdq(${item.item-1},-1)">-</button>
        </td>
        </tr>
        
        `
        ).join(" ")
        +
        `
        </tr>
        </tbody>
        </table>
        <div class="row">
        <div class="col">
        <b>Total: ${totalCar()}<b>
        </div>
        <div class="col text-end">
        <button class="btn cancel" data-bs-toggle="modal" data-bs-target="#cancel">Cancel</button>
        <button class="btn confirm">Confirm order</button>
        </div>
        </div>
        `
        ;
    }
    document.getElementById("car").innerHTML = html;  
    
    
}

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
        renderCar();
        
    }
}

const updateCar =() =>{
    document.getElementById("numItems").innerHTML=numItems();
}

const numItems =()=>{
    let n=0;
    carrito.forEach(element => {
        n+=element.quantity;
    });
    return n;
}
const totalCar =()=>{
    let n=0;
    carrito.forEach(element => {
        n+=element.quantity * element.price;
    });
    return n;
}

const add = (button) => {
    var item= button.getAttribute("data-item");
    item = JSON.parse(item);
    var e=false;
    for (let i = 0; i < carrito.length && e!= true; i++) {
        const element = carrito[i]; 
        if(element.name===item.name){
            e=true;
            mdq(i,1);
        }
    }
    console.log(e);
    if(!e){
        item.item= carrito.length +1;
        item.quantity =1;
        carrito.push(item );
    }
    
    updateCar(); 
    console.log(carrito);
}
const mdq = (item, cantidad) => {
    item =carrito[item];
    item.quantity+=cantidad;
    
    if(item.quantity==0){
        carrito.splice(item, 1);
        
        for (let i = 0; i < carrito.length; i++) {
            const element = carrito[i]; 
            element.item=i+1;
        }
    }
    renderCar();
}

