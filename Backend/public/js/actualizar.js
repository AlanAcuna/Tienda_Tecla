let form = document.getElementById('nuevoForm');
let nombre = document.getElementById('producto_name');
let precio = document.getElementById('precio');
let imagen = document.getElementById('producto_imagen');
let cantidad = document.getElementById('producto_cantidad');
let idData = document.getElementById('idProducto')
let categoria = document.getElementById('producto_categoria');
let descripcion = document.getElementById('producto_descripcion');

// getCategorias();

// function getCategorias(){
//     fetch('http://localhost:3000/categorias')
//     .then(res => res.json())
//     .then(data => {
//         categorias = data;
//         llenarCategorias(categorias);
//     })
// }

// function llenarCategorias(categorias){
//     categorias.forEach(element => {
        
//         const categoriaOption = document.createElement('OPTION');
//         categoriaOption.textContent = `${element.nombre}`;
//         categoriaOption.value = `${element.nombre}`;
//         categoria.appendChild(categoriaOption);
//     });
// }

//Manda el post
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let data = await JSON.parse(localStorage.getItem('dataUsuario'))
    try {
        let resultado = await fetch("http://localhost:3000/actualizar", { // /nuevousuarios
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
            //'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify( {
            //"producto_id": parseInt(producto_id.textContent),
            "titulo": titulo.value,
            "precio": precio.value,
            "imagen": imagen.value,
            "inventario": inventario.value,
            "categoria": categoria.value,
            "descripcion": descripcion.value
        })
    })
        if(resultado.status == 400){
            swal({
                title: "No tienes permiso para modificar",
                icon: "error",
              });
        } else {
            swal({
                title: "Producto Actualizado Correctamente",
                icon: "success",
              });
              setTimeout(() => {
                location.href = '/listado'
            }, 3000);
        }
    } catch (error) {
        swal({
            title: "No tienes permiso para modificar",
            icon: "error",
          });
    }
})