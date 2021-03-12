var carrito={};


const url='https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json';

function addToCar($id){

}
 cargar=()=>{
    fetch(url)
    .then(data=> {data.json()})
    .then((res) => {
        console.log(res);
    })
}

cargar();

function pintar(){
    array.forEach(element => {
        <button className="button-home">Add to car</button>
    });
}
