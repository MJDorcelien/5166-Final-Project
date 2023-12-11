export const useGetUserInfo = () => {
    const { username, userID} = JSON.parse(localStorage.getItem("auth"))

    return { username, userID }
}