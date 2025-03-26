document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const searchInput = document.getElementById("search");
    const contactList = document.getElementById("contact-list");
    
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    
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
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newContact = {
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value
        };
        contacts.push(newContact);
        renderContacts();
        form.reset();
    });
    
    window.deleteContact = (index) => {
        contacts.splice(index, 1);
        renderContacts();
    };
    
    window.editContact = (index) => {
        const contact = contacts[index];
        nameInput.value = contact.name;
        phoneInput.value = contact.phone;
        emailInput.value = contact.email;
        contacts.splice(index, 1);
        renderContacts();
    };
    
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll("#contact-list tr").forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            const email = row.cells[2].textContent.toLowerCase();
            row.style.display = name.includes(searchTerm) || email.includes(searchTerm) ? "" : "none";
        });
    });
    
    renderContacts();
});
