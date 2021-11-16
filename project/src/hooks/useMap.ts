import { useEffect, useState, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City, Point } from '../types/map';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City,
  selectedPoint: Point | null,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng,
        },
        zoom: city.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);
      // instance.flyTo([city.lat, city.lng], city.zoom);

      setMap(instance);
    } else if (selectedPoint) {
      map?.flyTo([selectedPoint.lat, selectedPoint.lng], selectedPoint.zoom);
    } else if (city) {
      map?.flyTo([city.lat, city.lng], 12);
    }
  }, [mapRef, map, city, selectedPoint]);

  return map;
}

export default useMap;
