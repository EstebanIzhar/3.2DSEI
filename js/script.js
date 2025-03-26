document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const searchInput = document.getElementById("search");
    const contactList = document.getElementById("contact-list");

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    /**
     * Muestra la lista de contactos en la tabla.
     * Borra la lista anterior y la vuelve a construir con los contactos almacenados.
     * También guarda los contactos en el almacenamiento local.
     */
    function renderContacts() {
        contactList.innerHTML = "";
        contacts.forEach((contact, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td>
                    <button onclick="editContact(${index})">Editar</button>
                    <button onclick="deleteContact(${index})">Eliminar</button>
                </td>
            `;
            contactList.appendChild(row);
        });
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    /**
     * Agrega un nuevo contacto a la lista cuando se envía el formulario.
     * Antes de agregarlo, valida que el teléfono tenga exactamente 10 números.
     * Si la validación falla, muestra una alerta y no guarda el contacto.
     */
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const phonePattern = /^[0-9]{10}$/; // Acepta solo 10 números sin letras ni símbolos

        if (!phonePattern.test(phoneInput.value)) {
            alert("Por favor, ingresa un número de celular válido (10 dígitos numéricos).");
            return; // Evita que se agregue un número incorrecto
        }

        const newContact = {
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value
        };

        contacts.push(newContact);
        renderContacts();
        form.reset();
    });

    /**
     * Elimina un contacto de la lista cuando el usuario hace clic en "Eliminar".
     * Se actualiza la lista en pantalla y en el almacenamiento local.
     */
    window.deleteContact = (index) => {
        contacts.splice(index, 1);
        renderContacts();
    };

    /**
     * Permite editar un contacto.
     * Llena los campos del formulario con los datos del contacto seleccionado.
     * Luego, lo elimina temporalmente de la lista para que pueda ser actualizado.
     */
    window.editContact = (index) => {
        const contact = contacts[index];
        nameInput.value = contact.name;
        phoneInput.value = contact.phone;
        emailInput.value = contact.email;
        contacts.splice(index, 1);
        renderContacts();
    };

    /**
     * Filtra los contactos a medida que el usuario escribe en el buscador.
     * Muestra solo los contactos cuyo nombre o email coincidan con la búsqueda.
     */
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll("#contact-list tr").forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            const email = row.cells[2].textContent.toLowerCase();
            row.style.display = name.includes(searchTerm) || email.includes(searchTerm) ? "" : "none";
        });
    });

    // Muestra los contactos al cargar la página
    renderContacts();
});
