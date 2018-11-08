const CreateUser = document.querySelector(".CreateUser");

CreateUser.addEventListener("submit", e => {
    e.preventDefault();
    const username = CreateUser.querySelector(".username").value;
    const password = CreateUser.querySelector(".password").value;
    // post new user to the database
    post("/createuser", { username, password });
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
