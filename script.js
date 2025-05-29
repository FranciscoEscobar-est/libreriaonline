function actualizarTotal() {
    let total = 0;
    document.querySelectorAll("#compra li").forEach(function (li) {
        // Extraer el precio del texto del li
        const texto = li.firstChild.textContent;
        const partes = texto.split('$');
        if (partes.length === 2) {
            total += parseFloat(partes[1]);
        }
    });
    document.getElementById("totalCompra").innerHTML = `Total: $${total.toFixed(2)}`;
}

document.getElementById("agregar").addEventListener("click", function () {
    const titulo = document.getElementById("titulo").value.trim();
    const precio = document.getElementById("precio").value;
    const mensaje = document.getElementById("mensaje");
    if (titulo === "" || precio === "" || isNaN(precio) || precio <= 0) {
        mensaje.textContent = "Ingrese un título y un precio válido";
        return;
    }
    mensaje.textContent = "";

    const li = document.createElement("li");
    li.textContent = `${titulo} - $${parseFloat(precio).toFixed(2)}`;

    const btnAgregarCarrito = document.createElement("button");
    btnAgregarCarrito.textContent = "agregar al carrito";
    btnAgregarCarrito.className = "btn-carrito";
    btnAgregarCarrito.addEventListener("click", function (e) {
        e.stopPropagation();
        const compraLi = document.createElement("li");
        compraLi.textContent = `${titulo} - $${parseFloat(precio).toFixed(2)}`;

        const btnBorrar = document.createElement("button");
        btnBorrar.textContent = "Borrar";
        btnBorrar.style.marginLeft = "10px";
        btnBorrar.addEventListener("click", function () {
            compraLi.remove();
            actualizarTotal();
        });

        compraLi.classList.add("compra");
        compraLi.appendChild(btnBorrar);
        document.getElementById("compra").appendChild(compraLi);
        actualizarTotal();
    });

    li.appendChild(btnAgregarCarrito);
    document.getElementById("lista").appendChild(li);

    document.getElementById("titulo").value = "";
    document.getElementById("precio").value = "";
});