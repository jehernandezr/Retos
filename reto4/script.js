/* Punto 1.


secret ([1, 2, 3, 1], encrypt, 1);

Lo cual entrega como resultado:

[2, 3, 4, 2]

Y para desencriptar:

secret ([2, 3, 4, 2], decrypt, 1);

Lo cual entrega como resultado:

[1, 2, 3, 1]*/

secret= function(numeros, callback, s_key){
    let result= document.createElement("div");
    encryptdecrypt= callback(numeros,s_key);
    result.textContent=encryptdecrypt;

    document.body.appendChild(result);

};

decrypt = function(nums, key) {
    nums.forEach((element,index,array) => {
        array[index]=element-key;
    });
    return nums;
};
encrypt = function (nums, key) {
    nums.forEach((element,index,array) => {
        array[index]=element+key;
    });
    return nums;
};

numers=[1, 2, 3, 1];
console.log(numers);
secret(numers,encrypt, 1);
secret(numers,decrypt, 1);

/*
Punto 2.

La función recursiva de Fibonacci se define como f(0)=0, f(1)=1 y f(n) = f(n-1) + f(n-2) para n≥2.

Haga una función arrow, de una sola línea, recursiva que imprima el n término de la sucesión.
*/

console.log((a= n=> n>=2?a(n-1)+a(n-2): n), a(9));

function peticion(url) {
    return new Promise (
        (resolve, reject) => {
            let req = new XMLHttpRequest();
            req.open("GET", url);
            req.onload = () => resolve(req.responseText);
            req.onerror = () => reject(req.statusText);
            req.send();
          });
};
async function punto3 (){
 let list =await peticion("https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json");
 let pedidos = await peticion("https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json");
list= await JSON.parse(list);
pedidos=await JSON.parse(pedidos);
let contados=[];
let count=0;
for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < pedidos.length; j++) {
        if(parseInt(list[i].idproducto)===parseInt(pedidos[j].idproducto)){
            count+=(parseInt(pedidos[j].cantidad,10));
            
        }
        
    }
    contados.push({nombre:list[i].nombreProducto, CantidadvecesPedido:count});
}
console.log(contados);
}

punto3();



