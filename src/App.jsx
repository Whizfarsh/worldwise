import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CityContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import PageProtected from "./pages/PageProtected";

import CityLists from "./components/CityLists";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import Pagenotfound from "./pages/Pagenotfound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Pagenotfound = lazy(() => import("./pages/Pagenotfound"));

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route path="" element={<Homepage />} />
							<Route path="product" element={<Product />} />
							<Route path="pricing" element={<Pricing />} />
							<Route path="login" element={<Login />} />
							<Route
								path="app"
								element={
									<PageProtected>
										<AppLayout />
									</PageProtected>
								}
							>
								<Route index element={<Navigate replace to="cities" />} />
								<Route path="cities" element={<CityLists />} />
								<Route path="cities/:id" element={<City />} />
								<Route path="countries" element={<CountryList />} />
								<Route path="form" element={<Form />} />
							</Route>
							<Route path="*" element={<Pagenotfound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
