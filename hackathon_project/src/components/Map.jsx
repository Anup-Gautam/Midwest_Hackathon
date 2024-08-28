import React, { useEffect, useRef } from "react";

const Map = ({ origin, destination }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      if (origin && destination) {
        const request = {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        });
      }
    };

    if (window.google) {
      loadMap();
    } else {
      // Load Google Maps script if not available
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=APIKEY&libraries=places`;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, [origin, destination]);

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>;
};

export default Map;
