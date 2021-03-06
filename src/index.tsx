import React from "react"
import ReactDOM from "react-dom"
import {
	ApolloClient,
	ApolloProvider,
	from,
	HttpLink,
	InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { getAccessToken, setAccessToken } from "./accessToken"
import { App } from "./App"
import { TokenRefreshLink } from "apollo-link-token-refresh"
import jwtDecode from "jwt-decode"

const refreshLink = new TokenRefreshLink({
	accessTokenField: "accessToken",
	isTokenValidOrUndefined: () => {
		const token = getAccessToken()
		if (!token) {
			console.log("JID COOKIED")
			return true
		}

		try {
			const { exp } = jwtDecode(token) as { exp: number }
			if (Date.now() >= exp * 1000) {
				return false
			} else {
				return true
			}
		} catch (error) {
			return false
		}
	},
	fetchAccessToken: () => {
		return fetch("http://localhost:4000/refresh-token", {
			method: "POST",
			credentials: "include",
		})
	},
	handleFetch: (accessToken: string) => {
		setAccessToken(accessToken)
	},
	handleError: (err: Error) => {
		console.error(err)
	},
})

const requestLink = setContext((_, { headers }) => {
	const accessToken = getAccessToken()
	if (!accessToken) {
		return {
			headers,
		}
	}
	return {
		headers: {
			...headers,
			authorization: `Bearer ${getAccessToken()}`,
		},
	}
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		)

	if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
	uri: "http://localhost:4000/graphql",
	credentials: "include",
})

const client = new ApolloClient({
	link: from([refreshLink, errorLink, requestLink, httpLink]),
	cache: new InMemoryCache(),
	credentials: "include",
})

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
