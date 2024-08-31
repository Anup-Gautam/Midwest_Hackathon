import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const accessKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const MapComponent = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDirections();
  };

  const fetchDirections = () => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: source,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,  // Request multiple routes
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  };

  const handleRouteSelect = (index) => {
    setSelectedRouteIndex(index);
  };

  return (
    <div>
      {/* Form for inputting source and destination */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label>
            Source:
            <input
              type="text"
              value={source}
              onChange={handleSourceChange}
              placeholder="Enter source address"
              style={{ margin: '0 10px', padding: '5px' }}
            />
          </label>
        </div>
        <div>
          <label>
            Destination:
            <input
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Enter destination address"
              style={{ margin: '0 10px', padding: '5px' }}
            />
          </label>
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '5px 10px' }}>
          Get Directions
        </button>
      </form>

      {/* List of Routes with Estimated Travel Times */}
      {directionsResponse && directionsResponse.routes.map((route, index) => (
        <div key={index} style={{ margin: '10px 0' }}>
          <button onClick={() => handleRouteSelect(index)}>
            Route {index + 1} - {route.legs[0].duration.text}
          </button>
        </div>
      ))}

      {/* Google Maps Component */}
      <LoadScript googleMapsApiKey={accessKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: 36.17543, lng: -86.80765 }} // Default center
          zoom={13}
        >
          {/* Render Selected Route */}
          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
              routeIndex={selectedRouteIndex}  // Display the selected route
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
