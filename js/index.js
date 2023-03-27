document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list")
    const form = document.getElementById("github-form")
    form.addEventListener("submit", event => {
        event.preventDefault()
        const mySearch = event.target.children[0].value
        fetch(`https://api.github.com/search/users?q=${mySearch}`)
        .then(response => response.json())
        .then(data => {
            userList.innerHTML = ""
            for (const account of data.items) {
                const myLi = document.createElement("div")
                const myP = document.createElement("p")
                const myImg = document.createElement("img")
                const myLink = document.createElement("a")
                myLink.href = account.html_url
                myLink.textContent = "Visit Page"
                myLi.className = "users"
                myP.textContent = account.login
                myImg.src = account.avatar_url
                myLi.append(myP,myImg,myLink)
                userList.appendChild(myLi)
            }
        })
        .then(form.reset())
    })
})