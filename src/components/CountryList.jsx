/* eslint-disable react/prop-types */
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";

function CountryList() {
	const { cities, isLoading } = useCities();
	// console.log(cities);
	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message message="Add your first city by clicking on a city on the map" />
		);

	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country))
			return [...arr, { country: city.country, emoji: city.emoji }];
		else return arr;
	}, []);
	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				// console.log(country)

				<CountryItem country={country} key={country.name} />
			))}
		</ul>
	);
}

export default CountryList;
