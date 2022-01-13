import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Card, CardContent } from "@material-ui/core";
import CountriesGeoJson from "./../data/countries.json";

function Map() {
  const [markers, setMarkers] = useState([]);

  // create map
  const mapRef = useRef(null);
  useEffect(() => {
    mapRef.current = L.map("map", {
      center: [44.945361, 44.040617],
      zoom: 2,
      maxZoom: 20,
      attributionControl: true,
      zoomControl: true,
      doubleClickZoom: true,
      scrollWheelZoom: true,
      dragging: true,
      animate: true,
      easeLinearity: 0.35,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
  }, []);

  // add layer
  const layerRef = useRef(null);
  useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  // add GeoJSON to map
  useEffect(() => {
    new L.geoJSON(CountriesGeoJson, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const { name } = properties;
        if (!name) return;
        layer.bindPopup(name);
        layer.on({
          click: (event) => {
            event.target.setStyle({ color: "blue" });
            setMarkers([
              ...markers,
              {
                title: name,
                latLng: {
                  lat: event.latlng.lat,
                  lng: event.latlng.lat,
                },
              },
            ]);
          },
        });
      },
      style: () => {
        return {
          color: "#3A8F7F2E",
          weight: 2,
        };
      }
    }).addTo(mapRef.current);
  }, [markers]);

  // update markers
  useEffect(() => {
    layerRef.current.clearLayers();
    markers.forEach((marker) => {
      L.marker(marker.latLng, { title: marker.title }).addTo(layerRef.current);
    });
  }, [markers]);

  return (
    <Card style={{ height: "80vh" }}>
      <CardContent id="map"></CardContent>
    </Card>
  );
}

export default Map;
