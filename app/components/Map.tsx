"use client";
import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, Rectangle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

interface MarkerProps {
    onSpotClick: (spotId: String) => void,
    spot: any
}

interface MapProps {
    onSpotClick: (spotId: String) => void,
    spots: any
}

const centerMapPosition: LatLngTuple = [-21.128, 55.531];

const SpotMarker : React.FC<MarkerProps> = ({ spot, onSpotClick }) => {
    const [isFocus, setIsFocus] = useState(false);
    const map = useMap();

    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var blueIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    return (
        <div>
            <Marker
                icon={blueIcon}
                position={spot.location.coordinates}
                riseOnHover
                eventHandlers={{
                    click: (e) => {
                        setIsFocus(!isFocus);
                        if(!isFocus)
                        {
                            map.flyTo(e.latlng, 17);
                            onSpotClick(spot._id);
                        }
                    },
                    mouseover: (event) => event.target.openPopup(),
                    mouseout: (event) => event.target.closePopup(),
                }}>
                <Popup>
                    {spot.spot_name}
                </Popup> : <></>
            </Marker>
            {
                isFocus ?
                    <>
                        <Marker
                            icon={greenIcon}
                            riseOnHover
                            position={spot.nearest_parking_location.coordinates}>
                            <Popup>
                                <p>Parking</p>
                            </Popup>
                        </Marker>
                        {
                            spot.sectors.map((sector: any) => {
                                return (
                                    <Polyline key={sector._id} pathOptions={{ color: 'red' }} positions={sector.area}>
                                        <Popup>
                                            <p>{sector.sector_name}</p>
                                        </Popup>
                                    </Polyline>
                                )
                            })
                        }
                    </> :
                    <></>
            }
        </div>
    );
}

const Map: React.FC<MapProps> = ({ spots, onSpotClick }) => {
    const [userPosition, setUserPosition] = useState(null);

    /*const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setUserPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })*/

    const handleClick = (spotId: String) => {
        onSpotClick(spotId);
    };

    const [focusePosition, setFocusPosition] = useState(null);

    return (
        <div style={{ height: '100%', width: '100%', position: 'relative', zIndex: 1}} className='drop-shadow-xl'>
            {
                !spots &&
                <p className='relative left-0 bottom-0'>Loading...</p>
            }
            <MapContainer
                center={centerMapPosition} zoom={11} scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
                className='drop-shadow-md, rounded-lg'>
                <TileLayer
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    userPosition !== null &&
                    <Marker position={userPosition}>
                        <Popup>You are here</Popup>
                    </Marker>
                }
                {
                    spots !== undefined &&
                    spots.data.map((spot: any) => {
                        return (
                            <SpotMarker key={spot._id} spot={spot} onSpotClick={handleClick}/>
                        )
                    })
                }
            </MapContainer>
        </div >
    );
};

/*export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/spots');
    const initialSpots = await res.json();

    return {
        props: {
            initialSpots,
        },
    };
}*/

export default Map;
