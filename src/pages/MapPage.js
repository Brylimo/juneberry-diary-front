import React, { useState, useEffect } from 'react';
import { Map as OlMap, View } from 'ol';
import { defaults } from 'ol/control';
import { fromLonLat, get } from 'ol/proj';
import { Tile } from 'ol/layer';
import Button from '../components/common/Button';
import { XYZ } from 'ol/source';
import TileLayer from '../../node_modules/ol/layer/Tile';

const MapPage = () => {
    const [mapObj, setMapObj] = useState({});
    const vKey = "F2F627D1-C73B-3B2B-8314-0655D0165F95";

    useEffect(() => {
        const map = new OlMap({
            controls: defaults({ zoom: false, rotate: false }).extend([]),
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: `http://api.vworld.kr/req/wmts/1.0.0/${vKey}/Base/{z}/{y}/{x}.png`,
                    }),
                })
            ],
            target: 'vmap',
            view: new View({
                projection: get('EPSG:3857'),
                center: fromLonLat([127.9745613, 37.3236563], get('EPSG:3857')),
                zoom: 15,
            })
        })
    }, []);
    return (
        <>
            <div id="vmap" style={{ width: '100%', height: '100vh' }}></div>
        </>        
    );
}

export default MapPage;