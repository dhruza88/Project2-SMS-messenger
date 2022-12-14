
const loginForm = async (event) => {
    event.preventDefault();


    const userObj = {
        email:document.querySelector("#login-email").value,
        password:document.querySelector("#login-password").value,
    }
    console.log(userObj)
    const response = await fetch("/api/user/login",{
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
document.getElementById("login-form").addEventListener("submit", loginForm);

//Signup form
// const signForm = async (event) => {
//     event.preventDefault();

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        username:document.querySelector("#signup-name").value,
        email:document.querySelector("#signup-email").value,
        password:document.querySelector("#signup-password").value,
        desc:document.querySelector("#signup-desc").value,
    }

    console.log(userObj)
    fetch("/api/user/signUp",{
        
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

   

// }
document.getElementById("signup-form").addEventListener("submit", signupForm);
