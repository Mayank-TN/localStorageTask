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
   
    const response = await axios.post("https://crudcrud.com/api/9d460c69a3014fbcadc2a53db862734e/userDetails" , myObj)
    console.log(response.data);
    showUserDetails()

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}


async function showUserDetails(){
    userList.innerHTML = "";
    const userDetails = await axios.get("https://crudcrud.com/api/9d460c69a3014fbcadc2a53db862734e/userDetails")

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
        const id = element._id;
        deleteBtn.addEventListener('click' , ()=>deleteUser(id))
        console.log(li)
        userList.appendChild(li)
        
        
    })
};

async function deleteUser(id){
    
    const deleteUser = await axios.delete('https://crudcrud.com/api/9d460c69a3014fbcadc2a53db862734e/userDetails/'+id)
    console.log(deleteUser)
    showUserDetails()
}



