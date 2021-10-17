//Main
function login(){
    const Username = document.getElementById("username-input")
    const Password = document.getElementById("password-input")

    console.log(`Sending: Username: ${Username.value} & Password: ${Password.value}`)
    fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: Username.value, password: Password.value })
    }).then(response => response.json()).then(data=>{
        console.log(`Recieved: ${JSON.stringify(data)}`)
    })
}

function register(){
    const Username = document.getElementById("username-input")
    const Password = document.getElementById("password-input")

    console.log(`Sending: Username: ${Username.value} & Password: ${Password.value}`)
    fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: Username.value, password: Password.value })
    }).then(response => response.json()).then(data=>{
        console.log(`Recieved: ${JSON.stringify(data)}`)
    })
}