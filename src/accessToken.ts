export let accessToken = ""

export const setAccessToken = (token: string) => {
	console.log("CALLED CALLED")
	accessToken = token
}

export const getAccessToken = () => {
	return accessToken
}
