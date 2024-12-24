"use client";
import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const position: LatLngTuple = [-21.128, 55.531];

const Map = () => {
    return (
        <div style={{ height: '100dvh', width: '100%', position: 'relative', zIndex: 1}} className='py-12' >
            <MapContainer
                center={position} zoom={11} scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
                className='drop-shadow-md, rounded-lg'>
                <TileLayer
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl position="topright">
                    <LayersControl.Overlay name="Marker with popup">
                        <Marker position={position}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Layer group with circles">
                        <LayerGroup>
                            <Circle
                                center={position}
                                pathOptions={{ fillColor: 'blue' }}
                                radius={200}
                            />
                            <Circle
                                center={position}
                                pathOptions={{ fillColor: 'red' }}
                                radius={100}
                                stroke={false}
                            />
                            <LayerGroup>
                                <Circle
                                    center={[51.51, -0.08]}
                                    pathOptions={{ color: 'green', fillColor: 'green' }}
                                    radius={100}
                                />
                            </LayerGroup>
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        </div>
    );
};

export default Map;
