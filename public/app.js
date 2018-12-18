const CreateUser = document.querySelector(".CreateUser");
const Login = document.querySelector(".Login");

CreateUser.addEventListener("submit", e => {
    e.preventDefault();
    const username = CreateUser.querySelector(".username").value;
    const password = CreateUser.querySelector(".password").value;
    // post new user to the database
    post("/createuser", { username, password });
});

Login.addEventListener("submit", e => {
    e.preventDefault();
    const username = Login.querySelector(".username").value;
    const password = Login.querySelector(".password").value;
    post("/login", { username, password }).then(({ status }) => {
        if (status === 200) alert("login success");
        else alert("login failed");
    });
});

function post(path, payload) {
    return window.fetch(path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
}
