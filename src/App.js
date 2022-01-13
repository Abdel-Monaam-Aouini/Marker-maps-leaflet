import React, { useEffect, useState } from "react";
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Maps } from "./components";
import CountriesList from "./data/countriesList.json";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 10,
    marginBottom: 20,
  },
}));

function App() {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (CountriesList) {
      setCountries(CountriesList);
    }
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <>
      <Container>
        <Grid xs={3} justify="center">
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="countries-simple">Countries</InputLabel>
            <Select
              label="countries"
              onChange={handleChange}
              inputProps={{
                name: "countries",
                id: "countries-simple",
              }}
            >
              {countries.map((country) => {
                return (
                  <MenuItem value={country.id} key={country.id}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          <Maps />
        </Grid>
      </Container>
    </>
  );
}

export default App;
