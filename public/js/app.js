
const weatherForm=document.querySelector('form');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputText=e.target.elements[0].value;
    messageOne.textContent='Loading..';
    messageTwo.textContent="";
    fetch(`/weather?address=${inputText}`).then((response)=>{
        response.json().then((data)=>{
            if(!data.error){
                messageOne.textContent=data.location;
                messageTwo.textContent=data.forecast;
            }
            else{
                messageOne.textContent=data.error;
            }
        })
    })
})