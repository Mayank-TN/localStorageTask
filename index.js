
const url = 'https://crudcrud.com/api/173a35ae00b445abaa770bc88ee5e297/userDetails/'
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const btn = document.getElementById('btn')

window.addEventListener('DOMContentLoaded', showUserDetails);


// Listen for form submit
btn.addEventListener('click', onSubmit);


async function onSubmit(e) {
  e.preventDefault()
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
   
    const response = await axios.post(url , myObj)
    console.log(response)
    showUserDetails()

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}


async function showUserDetails(){
    userList.innerHTML = "";
    const userDetails = await axios.get(url)

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
        editBtn.addEventListener('click' , ()=>editUser(id))
        userList.appendChild(li)
        
        
    })
};

async function deleteUser(id){
    
    const deleteUser = await axios.delete(url+id)
    console.log(deleteUser)
    showUserDetails()
}


async function editUser(id){
    const userDetails = await axios.get(url +id)
    nameInput.value = userDetails.data.name;
    emailInput.value = userDetails.data.mail;
    btn.style.display = 'none'
    const editBtnForm = document.createElement('button')
    editBtnForm.textContent = "EDIT CHANGES"
    myForm.appendChild(editBtnForm)
    editBtnForm.addEventListener('click' , (e)=>editUserDetails(e,id , editBtnForm))

}

async function editUserDetails(e , id ,editBtnForm){
    e.preventDefault();
    
    const obj = {
        name : nameInput.value ,
        mail : emailInput.value
    }
    console.log(obj)
    console.log(id)
    const response = await axios.put(url +id , obj)
    console.log(response)
    btn.value = 'Submit'
    nameInput.value = ""
    emailInput.value = ""
    showUserDetails()
    myForm.removeChild(editBtnForm)
    btn.style.display = 'inline'
    
}



