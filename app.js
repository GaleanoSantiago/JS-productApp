class Product{
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product){
        const productList = document.getElementById("product-list")     //Creo la constante de element que contiene la ubicacion del div
        const element = document.createElement("div");
        element.innerHTML = `
        <div class='card text-center mb-4 '>
            <div class='card-body'>
                <strong>Product Name</strong>: ${product.name}
                <strong>Product Price</strong>: ${product.price}
                <strong>Product Price</strong>: ${product.year}
                <a href="#" class='btn btn-danger' name='delete'>Delete</a>
            </div>
        </div>
        `;          //Este elemeto contiene todo el texto que se va a mostrar en el documento final
        productList.appendChild(element);       //Codigo para que el elemento se muestre en el documento
    
    }

    resetForm(){            //Creo un evento para resetear el formulario
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if(element.name === "delete"){
            console.log(element.parentElement.parentElement.parentElement.remove());
            this.showMessage("Producto Eliminado Satisfactoriamente", "danger")
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement("div");
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
    //Mostrando en el DOM
        const container = document.querySelector(".container");
        const app = document.querySelector("#App")
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 1000)
    }
}

//Eventos del Dom. Como cuando un usuario da clic en un boton, etc
document.getElementById('product-form')
    .addEventListener('submit', function(e){
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const year = document.getElementById("year").value;
        console.log(name, price, year);
        
        const product= new Product(name, price, year);  //Creo un nuevo objeto product
        
        const uI = new UI();            //Creo un nuevo objeto ui
        
        if(name === "" || price === "" || year === ""){
            return uI.showMessage("Complete los campos", "danger");
        }
        uI.addProduct(product);         //Le asigno al nuevo ui el parametro de product
        uI.resetForm();

        uI.showMessage("Producto Agregado Satisfactoriamente", "success")

        e.preventDefault();         //Prevee el comportamiento por defecto de la pagina. como actualizar al apretar un submit
    })

document.getElementById('product-list').addEventListener('click', function(e){

    const uI = new UI();
    uI.deleteProduct(e.target);

})
