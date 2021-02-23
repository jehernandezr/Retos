/* Punto 1.


secret ([1, 2, 3, 1], encrypt, 1);

Lo cual entrega como resultado:

[2, 3, 4, 2]

Y para desencriptar:

secret ([2, 3, 4, 2], decrypt, 1);

Lo cual entrega como resultado:

[1, 2, 3, 1]*/

secret= function(numeros,encryptdecrypt,S_key){
    if (encryptdecrypt ==="decrypt"){
        numeros.forEach(function (element) {
                return element-S_key;
            });
    }
    if (encryptdecrypt ==="encrypt"){
        numeros.forEach(function (element) {
                return element + S_key;
            });
    }

};

