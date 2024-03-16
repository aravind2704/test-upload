const ContactForm = document.querySelector('.form-contact'); 


let email = document.getElementById('email');
let name = document.getElementById('name');
let message = document.getElementById('message');

ContactForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    let formData={
        email: email.value,
        name: name.value,
        message: message.value
    }
    let xhr =new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type','application/json');
    xhr.onload =  function(){
        console.log(xhr.responseText);
        if(xhr.responseText=='success'){
            alert('Email Sent');
            email.value='';
            name.value='';
            message.value='';
        }
        else{
            alert('something went wrong')
        }
    }
    xhr.send(JSON.stringify(formData));
})