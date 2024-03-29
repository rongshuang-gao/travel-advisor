import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData, getWeatherData } from "./api";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
// import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

import useStyles from "./style.js";

const App = () => {
  const classes = useStyles();

  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });

      getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
        // console.log(data);
        setWeatherData(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, bounds]);

  return (
    <div>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} md={4} className={classes.item}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            rating={rating}
            setType={setType}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} className={classes.item}>
          <Map
            places={filteredPlaces.length ? filteredPlaces : places}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
