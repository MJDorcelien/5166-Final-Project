export const useGetUserInfo = () => {
    const { username, password, userID} = JSON.parse(localStorage.getItem("auth"))

    return { username, password, userID }
}