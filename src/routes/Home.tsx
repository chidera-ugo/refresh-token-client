import { FC } from "react"
import { useUsersQuery } from "../generated/graphql"

export const Home: FC = () => {
	const { loading, data } = useUsersQuery()

	if (loading || !data) {
		return <div>LOADING </div>
	}

	return (
		<div>
			<ul>
				{data.users.map(({ id, email }) => (
					<li key={id}>{email}</li>
				))}
			</ul>
		</div>
	)
}
