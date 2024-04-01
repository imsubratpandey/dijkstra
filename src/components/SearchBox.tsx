import React, { useRef, useState } from 'react';
import "../css/SearchBox.css";

interface Props {
    ListPlace: any,
    setListPlace: any,
    setSelectedPosition: any,
    setLoading: any
    setLocate: any
}

const NOMINATIM_BASE_URL: string = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox({ setLoading, ListPlace, setListPlace, setSelectedPosition, setLocate }: Props) {
    const [searchBoxText, setSearchBoxText] = useState<string>("");
    const inputRef = useRef<any>(null);
    const fetchResult = async () => {
        const params: any = {
            q: searchBoxText,
            format: 'json',
            addressdetails: 1,
            polygon_geojson: 0
        };
        const queryString: string = new URLSearchParams(params).toString();
        const requestOptions: any = {
            method: "GET",
            redirect: "follow"
        };
        setLoading(true);
        await fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                setListPlace(JSON.parse(result));
            })
            .catch((err) => console.log("err: ", err));
        setLoading(false);
    };
    return (
        <>
            <div className="searchBoxContainer">
                <div className="searchBox">
                    <input placeholder="Search on Maps" type="text" name="searchText" required onChange={(e) => setSearchBoxText(e.target.value)} autoComplete="off" ref={inputRef} onKeyDownCapture={(e) => {
                        if (e.key === 'Enter') {
                            fetchResult();
                        }
                    }} />
                    <svg className="searchIcon" viewBox="113.9186 77.7589 301.9303 317.0097" xmlns="http://www.w3.org/2000/svg" onClick={() => { fetchResult(); }}>
                        <path fill="rgb(129, 129, 0)" opacity="1.000000" stroke="none" d="M 259.669 79.206 C 300.488 86.614 331.68 108.186 350.946 144.957 C 374.87 190.616 371.342 235.726 343.632 278.972 C 342.086 281.387 340.318 283.687 338.418 285.825 C 336.933 287.494 337.155 288.46 338.659 290.036 C 357.419 309.684 376.096 329.414 394.794 349.123 C 400.086 354.701 405.409 360.249 410.663 365.864 C 415.195 370.706 417.04 376.388 415.058 382.905 C 413.168 389.118 408.923 392.984 402.643 394.371 C 397.674 395.468 393.159 394.272 389.2 391.069 C 387.933 390.045 386.789 388.851 385.662 387.664 C 361.945 362.685 338.223 337.709 314.563 312.675 C 313.063 311.088 312.074 310.719 310.131 312.062 C 292.116 324.517 272.121 331.547 250.455 333.282 C 228.909 335.007 208.141 331.553 188.368 322.358 C 166.965 312.404 149.482 297.69 136.159 278.076 C 123.84 259.94 116.5 239.852 114.501 217.825 C 112.612 197.014 115.265 176.841 123.239 157.583 C 135.508 127.951 155.739 105.67 184.16 91.161 C 207.989 78.997 233.124 75.403 259.669 79.206 Z" />
                        <path fill="#F7F7F7" opacity="1.000000" stroke="none" d="M 325.445 167.443 C 337.527 196.957 336.303 225.639 320.674 253.164 C 307.148 276.986 286.703 292.093 260.265 297.974 C 233.628 303.9 208.714 298.854 186.357 282.805 C 165.949 268.156 153.236 248.163 148.568 223.268 C 140.364 179.507 163.415 136.061 203.748 118.594 C 242.778 101.691 288.995 114.271 314.489 148.68 C 318.783 154.474 322.389 160.649 325.445 167.443 Z" />
                    </svg>
                </div>
                {(ListPlace.length !== 0) && (
                    <div className="searchBoxResult">
                        {
                            ListPlace.map((place: any, i: number) => {
                                return (
                                    <div className="resultBox" key={i} onClick={() => { setLocate(false); setSelectedPosition(place); setListPlace([]); }}>
                                        <svg className="resultGPSIcon" viewBox="26.1485 -110.2832 788.6603 1133.0071" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="rgb(129, 129, 0)" opacity="1.000000" stroke="none" d="M 427.565 1017.768 C 421.387 1024.613 419.22 1024.52 413.076 1016.534 C 376.923 969.545 340.226 922.958 304.884 875.366 C 243.58 792.811 187.532 706.765 138.295 616.436 C 109.056 562.795 81.135 508.463 60.188 450.871 C 46.216 412.456 35.306 373.242 29.987 332.653 C 24.499 290.774 24.532 248.886 32.461 207.284 C 44.459 144.338 71.561 88.486 112.315 39.109 C 149.86 -6.381 193.348 -44.607 246.583 -70.826 C 279.458 -87.017 314.019 -98.229 350.247 -104.182 C 384.594 -109.825 419.144 -111.899 453.819 -108.936 C 498.12 -105.151 540.653 -94.014 581.215 -75.744 C 636.427 -50.876 683.831 -15.571 722.997 30.748 C 766.249 81.9 794.503 140.258 807.526 205.934 C 815.358 245.435 816.843 285.192 812.126 325.246 C 806.864 369.931 793.262 412.242 777.09 453.944 C 747.143 531.165 708.505 604.004 666.232 675.025 C 615.943 759.512 560.753 840.74 502.39 919.81 C 478.063 952.768 452.688 984.952 427.565 1017.768 M 348.279 128.918 C 331.299 136.393 316.277 146.952 303.329 160.008 C 264.362 199.3 246.942 246.665 253.766 301.806 C 260.498 356.192 287.661 398.86 335.24 425.591 C 398.383 461.066 461.668 458.025 520.791 415.506 C 563.512 384.783 585.662 341.223 589.29 288.84 C 591.247 260.578 584.864 233.628 572.311 208.145 C 555.009 173.02 529.374 145.96 493.898 129.26 C 445.895 106.661 397.38 107.02 348.279 128.918 Z" />
                                        </svg>
                                        <input className="resultIndiv" placeholder={`${place?.display_name}`} type="text" name="searchText" required onChange={(e) => setSearchBoxText(e.target.value)} autoComplete="off" />
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
            </div>
        </>
    )
}