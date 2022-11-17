export const paginationResult = (data, pageNo, limit) => {


    let endIndex = pageNo * limit


    let startIndex = endIndex - limit

    const finalData = data.slice(startIndex, endIndex)

    return finalData

}



const getSingleRegisteredUser = (email) => {
    const allUsers = getRegisteredUser()
    if (allUsers.length > 0) {
        return allUsers.find((user) => user.email === email)
    } else {
        return false
    }


}

export const getRegisteredUser = () => {
    const users = JSON.parse(localStorage.getItem("doggosStorage")) || []

    return users

}

export const checkIfUserIsRegistered = (email) => {

    const allUsers = getRegisteredUser()
    console.log("the usrs", allUsers)

    if (allUsers.length > 0) {

        return allUsers.find((user) => user.email === email)
    } else {
        return false
    }

}
export const registerUser = (userData) => {

    const { username, password, email } = userData


    // check if the user is already registered with that email 

    // if already register send error message and return 
    if (checkIfUserIsRegistered(email)) {
        return { message: "This email is already used ..", success: false }
    }

    const newUser = {
        username,
        password,
        email
    }


    if (!email || !password || !username) {
        return { message: "Invalid Credentails", success: false }
    }


    let allUsers = getRegisteredUser()




    localStorage.setItem("doggosStorage", JSON.stringify([...allUsers, newUser]))
    return { message: "Successfully registered", success: true }
}






export const LoginUser = (userData) => {

    const { password, email } = userData


    // check if the user is already registered with that email 

    // if already register send error message and return 

    if (checkIfUserIsRegistered(email)) {

        const theUser = getSingleRegisteredUser(email)

        if (theUser) {
            let { password: orginalPassword } = theUser



            if (orginalPassword === password) {
                localStorage.setItem("doggosLoggedInUser", JSON.stringify(theUser))
                return { message: theUser, success: true }
            } else {
                return { message: "Invalid Credentail", success: false }
            }
        }




    } else {
        return { message: "Invalid Credentails", success: false }
    }




}

export const getLoggedInUser = () => {

    return JSON.parse(localStorage.getItem("doggosLoggedInUser")) || false


}


export const getLoggedOut = () => {
    localStorage.removeItem("doggosLoggedInUser");

}