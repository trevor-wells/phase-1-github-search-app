const userList = document.getElementById("user-list")
const form = document.getElementById("github-form")

form.addEventListener("submit", grabSearch)

function grabSearch(event){
    event.preventDefault()
    const mySearch = event.target.children[1].value
    if(event.submitter.name === "users")
        fetchUserData(mySearch)
    else
        fetchRepoData(mySearch)
    userList.innerHTML = ""
    event.target.reset()
}

function fetchUserData(mySearch){
    fetch(`https://api.github.com/search/users?q=${mySearch}`)
    .then(response => response.json())
    .then(data => {
        data.items.forEach(createList)
    })
}

function fetchRepoData(mySearch){
    fetch(`https://api.github.com/search/repositories?q=${mySearch}`)
    .then(response => response.json())
    .then(data => {
        data.items.forEach(showRepo)
    })
}
function createList(account){
    const myDiv = document.createElement("div")
    const myP = document.createElement("p")
    const myImg = document.createElement("img")
    const myLink = document.createElement("a")
    myLink.href = account.html_url
    myLink.textContent = "Visit Page"
    myDiv.className = "users"
    myP.textContent = account.login
    myImg.src = account.avatar_url
    myDiv.append(myP,myImg,myLink)
    userList.appendChild(myDiv)

    myP.addEventListener("click", () => {
        fetchRepos(account)
        userList.innerHTML = `${account.login}'s Repos`
    })
}

function fetchRepos(account){
    fetch(`https://api.github.com/users/${account.login}/repos`)
    .then(response => response.json())
    .then(data => {
        data.forEach(showRepo)
    })
}

function showRepo(repo){
    const myDiv = document.createElement("div")
    const myP = document.createElement("p")
    const myLink = document.createElement("a")
    myDiv.className = "users"
    myP.textContent = repo.name
    myLink.textContent = "Visit Repo"
    myLink.href = repo.clone_url
    myDiv.append(myP,myLink)
    userList.append(myDiv)
}