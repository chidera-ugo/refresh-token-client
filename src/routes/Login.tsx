import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { setAccessToken } from "../accessToken"
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql"

export const Login: FC = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [login] = useLoginMutation()

	const navigator = useNavigate()

	return (
		<div>
			<h2>Login</h2>

			<form
				onSubmit={async (e) => {
					e.preventDefault()
					const res = await login({
						variables: {
							email,
							password,
						},
						update: (store, { data }) => {
							if (!data) return null
							store.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: "Query",
									me: data.login.user,
								},
							})
						},
					})

					if (res.data?.login) {
						setAccessToken(res.data.login.accessToken as string)
						navigator("/")
					}
				}}
			>
				<label htmlFor="email">
					<input
						autoComplete="username"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<br />
				<label htmlFor="password">
					<input
						autoComplete="current-password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}
