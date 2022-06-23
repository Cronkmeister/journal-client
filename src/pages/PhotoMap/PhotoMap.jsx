import "./PhotoMap.scss";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../../styles/mapStyles";
import photoData from "../../assests/data/photoLocations.json";
import pin from "../../assests/icons/pin.png";

//map container styles
const containerStyle = {
  width: "100vw",
  height: "90vh",
};

//position of map when page first loaded: Vancouver
const center = {
  lat: 49.283,
  lng: -123.12,
};

//appearance of map and controls
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const mapId = "51250d1ff6cc5f6c";

function PhotoMap() {
  //load google map api with id and API key
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    mapId: "51250d1ff6cc5f6c",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  });

  //state for markers
  const [selectedEntry, setSelectedEntry] = useState(null);
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedEntry(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        onLoad={onMapLoad}
        mapId={mapId}
        options={options}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {photoData.entries.map((entry) => (
          <Marker
            key={entry.properties.ENTRY_ID}
            position={{
              lat: entry.geometry.coordinates[0],
              lng: entry.geometry.coordinates[1],
            }}
            onClick={() => {
              setSelectedEntry(entry);
            }}
            animation={2}
            icon={{
              url: pin,
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        ))}
        {selectedEntry && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedEntry(null);
            }}
            position={{
              lat: selectedEntry.geometry.coordinates[0],
              lng: selectedEntry.geometry.coordinates[1],
            }}
          >
            <div className="info-box">
              <h2 className="info-box__location">
                {selectedEntry.properties.LOCATION}
              </h2>
              <p className="info-box__date">{selectedEntry.properties.DATE}</p>
              <p className="info-box__date">{selectedEntry.category}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}

export default PhotoMap;
