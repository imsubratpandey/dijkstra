import React, { useRef, useState } from 'react';
import "../css/NodesInputSideBar.css";
import "react-toastify/dist/ReactToastify.css";

interface Props {
    nodes: { x: number, y: number }[],
    setNodes: any,
    setShowMap: any,
    isStripeVisible: boolean,
    animationBegin: boolean,
    setDisplayScatter: any,
    toast: any,
    toastOptions: any
}

export default function NodesInputSideBar({ toast, toastOptions, nodes, setNodes, setShowMap, isStripeVisible, animationBegin, setDisplayScatter }: Props) {
    const latRef = useRef<HTMLInputElement>(null), longRef = useRef<HTMLInputElement>(null);
    const [coordinate, setCoordinate] = useState<{ latitude?: number | undefined, longitude?: number | undefined }>();
    const handleChange = (event: any) => { setCoordinate({ ...coordinate, [event.target.name]: event.target.value }) };
    const addCoordinate = async () => {
        if (latRef.current && longRef.current) {
            latRef.current.value = "";
            longRef.current.value = "";
        }
        if (coordinate?.latitude && coordinate?.longitude && coordinate.latitude >= -90 && coordinate.latitude <= 90 && coordinate.longitude >= -180 && coordinate.longitude <= 180) {
            setNodes([...nodes, { x: coordinate.latitude, y: coordinate.longitude }]);
            setCoordinate(undefined);
        }
        else {
            toast.error("Enter valid coordinates", toastOptions);
        }
    };
    return (
        <>
            <div className={(isStripeVisible === true) ? "nodesInputContent nodesInputContentHidden" : `${(nodes.length >= 1) ? "nodesInputContentBar preventSelect" : "nodesInputContent preventSelect"}`}>
                <div className={(nodes.length >= 1) ? "sideBar" : "sideBarCentered"}>
                    <p className="sideBarTitle">Dijkstra</p>
                    <div className="inputBoxUtilsContainer">
                        <div className="inputBoxContainer">
                            <div className="inputBoxContentSideBar">
                                <div className="form-group">
                                    <input id="form_name3" className="form-control" type="number" name="latitude" required ref={latRef} onChange={(e) => handleChange(e)} autoComplete="off" />
                                    <label htmlFor="form_name3">Latitude</label>
                                </div>
                            </div>
                            <div className="inputBoxContentSideBar">
                                <div className="form-group">
                                    <input id="form_name4" className="form-control" type="number" name="longitude" required ref={longRef} onChange={(e) => handleChange(e)} autoComplete="off" />
                                    <label htmlFor="form_name4">Longitude</label>
                                </div>
                            </div>
                        </div>
                        <div className="coordinateButtonCover">
                            <button className="addCoordinateButton" onClick={() => { addCoordinate(); }}>Add this Coordinate</button>
                            <svg className="gpsIcon" viewBox="59.437 17.4309 336.0613 432.0891" xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowMap(true); }}>
                                <path opacity="1.000000" stroke="none" d="M 206.213 431.617 C 165.22 395.318 128.648 355.623 99.931 309.17 C 81.978 280.128 68.236 249.373 62.12 215.45 C 46.828 130.635 98.298 47.529 180.963 24.004 C 269.133 -1.088 360.058 47.732 387.722 135.11 C 400.236 174.64 396.914 213.622 382.993 252.092 C 368.663 291.691 345.944 326.354 319.491 358.729 C 292.201 392.129 261.47 422.074 227.42 449.52 C 220.401 443.6 213.439 437.728 206.213 431.617 M 222.251 105.494 C 222.084 105.507 221.918 105.518 221.752 105.532 C 179.284 109.039 148.588 143.018 147.582 182.74 C 146.305 233.159 188.648 270.789 238.914 264.472 C 283.271 258.896 314.888 214.248 306.068 170.323 C 298.389 132.081 264.399 103.583 222.251 105.494 Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}