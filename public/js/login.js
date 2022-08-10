document.querySelector("#login").addEventListener("submit", loginFormmmm)

loginFormmmm = async (event) => {
    event.preventDefault();


    const userObj = {
        email:document.querySelector("#login-email").value,
        password:document.querySelector("#login-password").value,
    }
    console.log(userObj)
    fetch("/api/user/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/profile"
        } else {
            alert("trumpet sound")
        }
    })
}

//Signup form
document.querySelector("#signup").addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        name:document.querySelector("#signup-name").value,
        email:document.querySelector("#signup-email").value,
        password:document.querySelector("#signup-password").value,
    }
    console.log(userObj)
    fetch("/api/user",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/profile"
        } else {
            alert("trumpet sound")
        }
    })
})
