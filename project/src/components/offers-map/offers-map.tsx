import { useRef, useEffect } from 'react';
import {Marker, Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Point } from '../../types/map';
import useMap from '../../hooks/useMap';

type MapProps = {
  city: City;
  points: Point[];
  selectedPoint: Point | null;
  fixedOfferMarkerId?: number;
}

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const fixedIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function OffersMap({ city, points, selectedPoint, fixedOfferMarkerId }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  if (fixedOfferMarkerId && map) {
    points = points.filter((point) => {
      if (point.id === fixedOfferMarkerId) {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng,
        });

        marker
          .setIcon(fixedIcon)
          .addTo(map);
      }
      return point.id !== fixedOfferMarkerId;
    });
  }

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng,
        });

        marker
          .setIcon(selectedPoint && point.id === selectedPoint.id ? currentCustomIcon : defaultCustomIcon)
          .addTo(map);
      });
    }
  }, [city, map, points, selectedPoint]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default OffersMap;
