import React, { useEffect, useRef } from "react";

const Map = ({ origin, destination }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 }, // Default center
        zoom: 12,
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: "blue",
          strokeWeight: 4,
        },
      });

      if (origin && destination) {
        const request = {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true, // This allows for multiple routes
        };

        directionsService.route(request, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const routes = result.routes;

            // Loop through the alternative routes and display them
            routes.forEach((route, index) => {
              const renderer = new window.google.maps.DirectionsRenderer({
                map: map,
                directions: result,
                routeIndex: index, // Display each route separately
                polylineOptions: {
                  strokeColor: index === 0 ? "blue" : "gray",
                  strokeWeight: 4,
                  strokeOpacity: 0.7,
                },
              });
            });
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        });
      }
    };

    if (window.google) {
      loadMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=APIKEY&libraries=places`;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, [origin, destination]);

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>;
};

export default Map;
