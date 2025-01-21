/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CityContext";

import styles from "./Map.module.css";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useURLPosition } from "../hooks/useURLPosition";

function Map() {
	const { cities } = useCities();
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const [mapLat, mapLng] = useURLPosition();
	const {
		isLoading: isLoadingPosition,
		position: geoLocattionPosition,
		getPosition,
	} = useGeolocation();

	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng]
	);

	useEffect(
		function () {
			if (geoLocattionPosition) {
				setMapPosition([geoLocattionPosition.lat, geoLocattionPosition.lng]);
			}
		},
		[geoLocattionPosition]
	);
	return (
		//onClick={() => navigate("form")}
		<div className={styles.mapContainer}>
			{!geoLocattionPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? "Loading..." : "Use Your Position"}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}

				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}

export default Map;
