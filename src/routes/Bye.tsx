import { FC } from "react"
import { useByeQuery } from "../generated/graphql"

export const Bye: FC = () => {
	const { error, data, loading } = useByeQuery({
		fetchPolicy: "network-only",
	})

	if (loading) return <div>loading</div>
	if (error) return <div>error</div>
	if (!data) return <div>no data</div>

	return (
		<div>
			<pre>{data?.bye}</pre>
		</div>
	)
}
