// GooglePlaces.jsx
// Install dependency: npm install @react-google-maps/api

import { useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const API_KEY = "AIzaSyBWDgEb271lv5WnDB4c2PKbST6Clqv71rE";
const LIBRARIES = ["places"];

export default function GooglePlaces() {
  const [autocomplete, setAutocomplete] = useState(null);
  const [place, setPlace] = useState(null);

  const onLoad = (ac) => setAutocomplete(ac);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const result = autocomplete.getPlace();
      setPlace(result);
      console.log("Place:", result);
    }
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={LIBRARIES}>
      <div style={{ maxWidth: 400, margin: "60px auto", fontFamily: "monospace" }}>
        <h2>Places Search</h2>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search for a place..."
            style={{ width: "100%", padding: 10, fontSize: 16, boxSizing: "border-box" }}
          />
        </Autocomplete>

        {place && (
          <div style={{ marginTop: 20, padding: 12, border: "1px solid #eee" }}>
            <strong>{place.name}</strong>
            <p>{place.formatted_address}</p>
            <p>📍 {place.geometry?.location.lat()}, {place.geometry?.location.lng()}</p>
          </div>
        )}
      </div>
    </LoadScript>
  );
}