import { FC } from "react"
import { Link } from "react-router-dom"
import { setAccessToken } from "./accessToken"
import { useLogoutMutation, useMeQuery } from "./generated/graphql"

export const Header: FC = () => {
	const { loading, data, error } = useMeQuery()
	const [logout, { client }] = useLogoutMutation()

	if (loading) return <div>loading</div>
	if (error) return <div>error</div>
	if (!data) return <div>no data</div>

	return (
		<header>
			{data.me ? <h1>current user: {data.me?.email}</h1> : <h1>guest user</h1>}
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
			<Link to="/bye">Bye</Link>
			<Link to="/">Home</Link>
			{data.me?.email && (
				<button
					onClick={async () => {
						await logout()
						setAccessToken("")
						await client.resetStore()
					}}
				>
					logout
				</button>
			)}
		</header>
	)
}
