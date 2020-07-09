
document.getElementsByClassName('button-confirm')[0].addEventListener('click',isValid)


function isValid(){
    valid = true;
    if ( document.getElementsByClassName('user-name').innerText=="")
    {
        alert ( "Please fill in the 'Your Name' box." );
        valid = false;
    }

    return valid;
    confirmClicked()
}


function confirmClicked(){

    
    if(valid==true){
        alert("Your order has been taken! Thank you")
    }
    
   

}