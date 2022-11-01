const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');







window.addEventListener('DOMContentLoaded', showUserDetails());

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } 
  else {


    let myObj = {
        name : nameInput.value,
        mail : emailInput.value
    }
   
    const response = await axios.post("https://crudcrud.com/api/0a50d841748347f1bd52211da386982e/userDetails" , myObj)
    console.log(response.data);
    window.location.reload(true)

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}

function removeUserFromScreen(email){
  const child = document.getElementById(`${email}`)
  if(child){
    userList.removeChild()
  }
}

async function showUserDetails(){
    const userDetails = await axios.get("https://crudcrud.com/api/0a50d841748347f1bd52211da386982e/userDetails")

    userDetails.data.forEach(element => {
        const li = document.createElement('li')
        li.textContent = `${element.name} : ${element.mail}`
        li.id = element._id
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.backgroundColor = 'red';
        deleteBtn.style.margin = '0 20px'
        deleteBtn.style.float = 'right'
        const editBtn = document.createElement('button')
        editBtn.style.backgroundColor = 'skyblue'
        editBtn.style.float = 'right';
        editBtn.textContent = 'Edit' ;
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        console.log(li)
        userList.appendChild(li)
    })
};
