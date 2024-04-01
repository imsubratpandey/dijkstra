import L, { LatLngExpression } from 'leaflet';
import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "../css/Map.css";
import SearchBox from './SearchBox';

interface Props {
    nodes: { x: number, y: number }[],
    setNodes: any,
    showMap: boolean,
    setShowMap: any,
    selectedPositon: any,
    setSelectedPosition: any,
    setLoading: any
    locate: boolean,
    setLocate: any
}

const icon = L.icon({
    iconUrl: "./placeholder.svg",
    iconSize: [38, 38]
});
const position: LatLngExpression = [51.505, -0.09];
function ResetCentreView({ selectedPositon }: Props) {
    const map = useMap();
    useEffect(() => {
        if (selectedPositon) {
            map.setView(L.latLng(selectedPositon?.lat, selectedPositon?.lon), map.getZoom(), { animate: true });
        }
    }, [map, selectedPositon]);
    return null;
}

function LocationMarker({ setSelectedPosition }: Props) {
    const [position, setPosition] = useState<any>(null);

    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setSelectedPosition({ lat: e.latlng.lat, lon: e.latlng.lng });
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        });
    }, [map, setSelectedPosition]);
    return position === null ? null : (
        <Marker position={position} icon={icon}>
            <Popup>
                You are here
            </Popup>
        </Marker>
    );
}



function ClickedMarker({ setLocate, setSelectedPosition }: Props) {
    useMapEvents({
        click(e) {
            setLocate(false);
            setSelectedPosition({ lat: e.latlng.lat, lon: e.latlng.lng });
        }
    })
    return null;
}

export default function Maps({ setLoading, showMap, setShowMap, selectedPositon, setSelectedPosition, locate, setLocate, nodes, setNodes }: Props) {
    const locationSelection: LatLngExpression = [selectedPositon?.lat, selectedPositon?.lon];
    const [ListPlace, setListPlace] = useState<any>([]);
    const inputRef = useRef<any>(null);
    return (
        <>
            <div className={(showMap === true) ? "mapContainer" : "mapContainerHidden"}>
                <div className="locationIconContainer">
                    <svg className="locationIcon" viewBox="83.0726 87.587 322.0815 325.6562" xmlns="http://www.w3.org/2000/svg" onClick={async () => { setLoading(true); setLocate(false); await new Promise(res => setTimeout(res, 500)); setLocate(true); setLoading(false); }}>
                        <path fill="#020202" opacity="1.000000" stroke="none" d="M 149.812 341.315 C 129.336 319.279 117.489 293.468 114.479 263.583 C 114.232 261.123 113.768 259.861 110.816 260.027 C 105.277 260.34 99.708 260.127 94.152 260.114 C 87.365 260.099 83.025 256.255 83.073 250.327 C 83.121 244.422 87.447 240.721 94.324 240.714 C 99.88 240.709 105.442 240.577 110.991 240.776 C 113.409 240.863 114.23 240.094 114.44 237.705 C 116.24 217.332 122.436 198.366 133.299 181.14 C 155.088 146.591 186.105 126.15 226.226 119.952 C 227.054 119.824 227.874 119.636 228.705 119.528 C 234.34 118.797 234.341 118.801 234.341 112.882 C 234.341 108.006 234.29 103.129 234.354 98.254 C 234.437 91.919 238.393 87.594 244.001 87.587 C 249.632 87.58 253.594 91.925 253.628 98.218 C 253.66 104.26 253.704 110.304 253.596 116.344 C 253.562 118.259 253.963 119.092 256.06 119.344 C 306.782 125.429 342.668 152.182 363.891 199.019 C 369.51 211.417 372.538 224.617 373.661 238.213 C 373.839 240.38 374.629 240.787 376.551 240.753 C 382.63 240.645 388.712 240.685 394.792 240.721 C 400.87 240.757 405.078 244.665 405.153 250.266 C 405.23 256.003 400.981 260.066 394.77 260.107 C 388.584 260.149 382.398 260.165 376.213 260.086 C 374.541 260.064 373.854 260.476 373.692 262.322 C 368.874 317.399 330.312 362.849 279.153 377.258 C 271.675 379.364 264.093 380.943 256.34 381.461 C 254.195 381.604 253.526 382.319 253.578 384.508 C 253.725 390.652 253.666 396.803 253.618 402.95 C 253.571 408.831 249.669 413.088 244.29 413.239 C 238.772 413.394 234.51 409.202 234.374 403.184 C 234.233 396.933 234.266 390.676 234.378 384.423 C 234.413 382.439 233.886 381.678 231.825 381.472 C 199.713 378.266 172.465 364.825 149.812 341.315 Z" />
                        <path fill="#F6F6F6" opacity="1.000000" stroke="none" d="M 145.301 198.874 C 163.329 165.466 190.691 145.294 227.61 139.338 C 287.224 129.722 344.291 172.06 353.635 232.269 C 362.878 291.833 325.118 347.747 267.141 360.346 C 205.631 373.713 145.391 332.415 134.579 269.364 C 130.363 244.78 134.029 221.335 145.301 198.874 Z" />
                        <path fill="#010101" opacity="1.000000" stroke="none" d="M 273.205 308.457 C 234.271 327.514 190.024 305.817 180.893 263.403 C 173.196 227.651 198.283 191.225 234.141 186.09 C 269.079 181.087 300.242 203.272 307.233 238.123 C 312.856 266.153 299.062 294.795 273.205 308.457 Z" />
                    </svg>
                </div>
                <div className="closeIconContainer">
                    <button onClick={() => { setShowMap(false); setSelectedPosition(null); inputRef.current.value = ""; }}>Close</button>
                    {
                        (selectedPositon !== null) ?
                            <>
                                <button onClick={() => { setNodes([...nodes, { x: selectedPositon?.lat, y: selectedPositon?.lon }]); setShowMap(false); setSelectedPosition(null); inputRef.current.value = ""; }}>Select this Coordinate<p>({selectedPositon?.lat},{selectedPositon?.lon})</p>?</button>
                            </>
                            :
                            <>
                            </>
                    }
                </div>
                <div className="searchCover">
                    <SearchBox inputRef={inputRef} setLoading={setLoading} ListPlace={ListPlace} setListPlace={setListPlace} setSelectedPosition={setSelectedPosition} setLocate={setLocate} />
                    <div className="mapCover" onClick={() => { setListPlace([]); }}>
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }} closePopupOnClick>
                            <TileLayer
                                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}@2x.png?key=aitlRGoRV2ZMdqQKKbXf"
                            />
                            {selectedPositon &&
                                (<Marker position={locationSelection} icon={icon}>
                                    <Popup>
                                        {selectedPositon?.display_name ? selectedPositon?.display_name : `(${selectedPositon?.lat},${selectedPositon?.lon})`}
                                    </Popup>
                                </Marker>)
                            }
                            <ClickedMarker setLoading={setLoading} showMap={showMap} setShowMap={setShowMap} selectedPositon={selectedPositon} setSelectedPosition={setSelectedPosition} locate={locate} setLocate={setLocate} nodes={nodes} setNodes={setNodes} />
                            {
                                (locate === true) ?
                                    <>
                                        <LocationMarker setLoading={setLoading} showMap={showMap} setShowMap={setShowMap} selectedPositon={selectedPositon} setSelectedPosition={setSelectedPosition} locate={locate} setLocate={setLocate} nodes={nodes} setNodes={setNodes} />
                                    </>
                                    :
                                    <>
                                    </>
                            }
                            <ResetCentreView setLoading={setLoading} showMap={showMap} setShowMap={setShowMap} selectedPositon={selectedPositon} setSelectedPosition={setSelectedPosition} locate={locate} setLocate={setLocate} nodes={nodes} setNodes={setNodes} />
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    )
}