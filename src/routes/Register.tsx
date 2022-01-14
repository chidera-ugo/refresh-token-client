import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../generated/graphql"

export const Register: FC = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [register] = useRegisterMutation()

	const navigator = useNavigate()

	return (
		<div>
			<h2>Register</h2>

			<form
				onSubmit={async (e) => {
					e.preventDefault()
					const res = await register({
						variables: {
							email,
							password,
						},
					})

					if (res.data?.register) {
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
						autoComplete="new-password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
}
