const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener('click', ()=>{
    const loginUser = document.getElementById("login-username");
    const loginPass = document.getElementById("login-password");
    if(loginUser.value === 'admin' && loginPass.value === 'admin123'){
        alert("Login Success")
    }else{
        alert("Wrong username or password")
    }
})