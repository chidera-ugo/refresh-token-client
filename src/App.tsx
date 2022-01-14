import { FC, useEffect, useState } from "react"
import { AppRoutes } from "./Routes"
import axios from "axios"
import { setAccessToken } from "./accessToken"

export const App: FC = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function refreshToken() {
			const res = await axios.get("http://localhost:4000/refresh-token", {
				withCredentials: true,
			})

			if (res.data.accessToken) {
				setAccessToken(res.data.accessToken)
			}
			setLoading(false)
		}

		refreshToken()
	}, [])

	if (loading) return <div>Loading app</div>

	return <AppRoutes />
}
