import { FC } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Bye } from "./routes/Bye"
import { Home } from "./routes/Home"
import { Login } from "./routes/Login"
import { Register } from "./routes/Register"

export const AppRoutes: FC = () => {
	return (
		<BrowserRouter>
			<div>
				<header>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
					<Link to="/bye">Bye</Link>
					<Link to="/">Home</Link>
				</header>

				<Routes>
					<Route path="/">
						<Route index element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/bye" element={<Bye />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	)
}
