const form = document.getElementById('form')
const list = document.querySelector('.list')

let editIndex = null

const saved = localStorage.getItem('contacts')
let contacts
if (saved) {
    contacts = JSON.parse(saved)
} else {
    contacts = []
}
addContacts()


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const contact = {
        firstName: form.name.value.trim(),
        surname: form.surname.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim()
    }
    if (editIndex !== null){
        contacts[editIndex] = contact
        editIndex = null
    } else {
        contacts.push(contact)
    }
    localStorage.setItem('contacts', JSON.stringify(contacts))

    form.reset()

    addContacts()
})

function addContacts(contact, index){
    list.innerHTML = ''

    contacts.forEach((contact, index) => {
        const li = document.createElement('li')
        
        const pName = document.createElement('p')
        pName.textContent = "Ім'я:" + ' ' + contact.firstName
        pName.classList.add('name')

        const pSurname = document.createElement('p')
        pSurname.textContent = "Прізвище:" + ' ' + contact.surname
        pSurname.classList.add('surname')

        const pPhone = document.createElement('p')
        pPhone.textContent = "Телефон:" + ' ' + contact.phone
        pPhone.classList.add('phone')

        const pEmail = document.createElement('p')
        pEmail.textContent = "Почта:" + ' ' + contact.email
        pEmail.classList.add('email')

        const btnDelet = document.createElement('button')
        btnDelet.textContent = 'Delete'


        btnDelet.addEventListener('click', () => {
            contacts.splice(index, 1)
            localStorage.setItem('contacts', JSON.stringify(contacts))
            addContacts()
        })

        const editBtn = document.createElement('button')
        editBtn.textContent = 'Edit'


        editBtn.addEventListener('click', () => {
            form.name.value = contact.firstName;
            form.surname.value = contact.surname;
            form.phone.value = contact.phone;
            form.email.value = contact.email

            editIndex = index
        })



        li.appendChild(pName)
        li.appendChild(pSurname)
        li.appendChild(pPhone)
        li.appendChild(pEmail)
        li.appendChild(btnDelet)
        li.appendChild(editBtn)
    
        list.appendChild(li)
    });
}
