//! THEME SWITCHER

const themeSwitcher = document.querySelector('#theme')
const icon = document.querySelector('#icon')
const colorTheme = document.querySelector('.theme')
const app = document.querySelector('.app')

themeSwitcher.addEventListener('click', () => {
    
    if (themeSwitcher.checked) {
        // * WE ARE IN LIGHT MODE
        icon.classList.remove('fa-sun')
        icon.classList.add('fa-moon')
        colorTheme.innerHTML = 'DARK'
        document.body.classList.add('light-mode')
    } else {
        // * WE ARE IN DARK MODE
        icon.classList.add('fa-sun')
        icon.classList.remove('fa-moon')
        colorTheme.innerHTML = 'LIGHT'
        document.body.classList.remove('light-mode')
    }
})


//! USER SEARCH

const searchInput = document.querySelector('.search-input')
const searchButton = document.querySelector('.search-button')
const errorMessage = document.querySelector('.message-error')

searchButton.addEventListener('click', (e) => {
    e.preventDefault()

    const userSearched = searchInput.value
    console.log('user searched:', userSearched)

    const emptyInput = userSearched.length == 0

    if (emptyInput) {
        searchInput.classList.add('error')
        errorMessage.innerHTML = 'Empty username'
        return
    } else {
        searchInput.classList.remove('error')
        errorMessage.innerHTML = ''
    }

    const url = `https://api.github.com/users/${userSearched}`

    fetch(url)
        .then( res => {
            if (!res.ok) {
                searchInput.classList.add('error')
                errorMessage.innerHTML = `User not found`
                return 
            }
            return res
        })
        .then( res => res.json())
        .then( userData => showUserData(userData))        
})

function showUserData(userData) {
    const { 
        avatar_url, 
        name, 
        bio,
        login,
        created_at,
        followers,
        following,
        location,
        twitter_username,
        blog,
        public_repos,
        company
    } = userData

    console.log(userData)

    //* SET THE AVATAR IMAGE
    const avatar = document.querySelector('.user-img')
    avatar.setAttribute('src', avatar_url)


    //* SET THE USER's NAME
    const userName = document.querySelector('.name')
    userName.innerHTML = name


    //* SET THE USER's LOGIN
    const user = document.querySelector('.user')
    user.innerHTML = `@${login}`


    //* SET THE USER's JOINED DATE
    const joinedDate = document.querySelector('.joined')

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(created_at)

    const day = created_at.slice(8, 10)
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    joinedDate.innerHTML = `Joined ${day} ${month} ${year}`


    //* SET THE USER's BIO
    const bioContent = document.querySelector('.content')
    bioContent.innerHTML = bio


    //* SET THE USER's REPOS
    const userRepos = document.querySelector('.repos')
    userRepos.innerHTML = public_repos


    //* SET THE USER's FOLLOWERS
    const userFollowers = document.querySelector('.followers')
    userFollowers.innerHTML = followers


    //* SET THE USER's FOLLOWING
    const userFollowing = document.querySelector('.following')
    userFollowing.innerHTML = following


    //* SET THE USER's LOCATION
    const userLocation = document.querySelector('.location-name')
    checkData(userLocation, location)

    const userSite = document.querySelector('.site-name')
    checkData(userSite, blog)

    const userTwitter = document.querySelector('.twitter-name')
    checkData(userTwitter, twitter_username)

    const userCompany = document.querySelector('.company-name')
    checkData(userCompany, company)

    function checkData(tag, data) {
        if (data == null) {
            tag.innerHTML = 'Not Available'
            tag.parentElement.classList.add('unavailable')
        } else {
            tag.innerHTML = data
            tag.parentElement.classList.remove('unavailable')
        }
    }

}

function showError(message) {
    errorMessage.innerHTML = message
}

//! SHOW OCTOCAT AS DEFAULT USER SEARCHED
function App() {
    const defaultUser = 'octocat'
    fetch(`https://api.github.com/users/${defaultUser}`)
        .then( response => response.json())
        .then( userData => showUserData(userData))
}

App()