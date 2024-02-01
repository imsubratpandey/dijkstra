import React, { useRef, useState } from 'react';
import "../css/NodesInputBox.css";
import "react-toastify/dist/ReactToastify.css";

interface Props {
    nodes: { x: number, y: number }[],
    setNodes: any,
    setShowMap: any,
    isStripeVisible: boolean,
    toast: any,
    toastOptions: any
}

export default function NodesInputBox({ toast, toastOptions, nodes, setNodes, setShowMap, isStripeVisible }: Props) {
    const latRef = useRef<HTMLInputElement>(null), longRef = useRef<HTMLInputElement>(null);
    const [coordinate, setCoordinate] = useState<{ latitude?: number | undefined, longitude?: number | undefined }>();
    const handleChange = (event: any) => { setCoordinate({ ...coordinate, [event.target.name]: event.target.value }) };
    const addCoordinate = () => {
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
                <div className={(nodes.length >= 1) ? "box" : "boxCentered"}>
                    <p className="sourceBoxTitle">Enter The Source Node</p>
                    <div className="inputBoxContainer">
                        <div className="inputBoxContent">
                            <div className="form-group">
                                <input id="form_name1" className="form-control" type="number" name="latitude" required ref={latRef} onChange={(e) => handleChange(e)} autoComplete="off" />
                                <label htmlFor="form_name1">Latitude</label>
                            </div>
                        </div>
                        <div className="inputBoxContent">
                            <div className="form-group">
                                <input id="form_name2" className="form-control" type="number" name="longitude" required ref={longRef} onChange={(e) => handleChange(e)} autoComplete="off" />
                                <label htmlFor="form_name2">Longitude</label>
                            </div>
                        </div>
                    </div>
                    <button className="sourceAddCoordinateButton" onClick={() => { addCoordinate(); }}>Add this Coordinate</button>
                    <p className="mapSelectorTitle" onClick={() => { setShowMap(true); }}>Select on Map</p>
                </div>
            </div>
        </>
    )
}