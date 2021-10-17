import { useRef, useEffect } from 'react';
import {Marker, Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Point } from '../../types/map';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';

type MapProps = {
  city: City;
  points: Point[];
  selectedPoint: Point | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ city, points, selectedPoint }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
