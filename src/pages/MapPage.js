import React, { useState, useEffect } from 'react';
import { Map as OlMap, View } from 'ol';
import { defaults } from 'ol/control';
import { fromLonLat, get } from 'ol/proj';
import { Tile } from 'ol/layer';
import Button from '../components/common/Button';
import { XYZ } from 'ol/source';
import TileLayer from '../../node_modules/ol/layer/Tile';
import SideBar from '../components/geo/SideBar';

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
                extent: [12923474.1905, 3554604.697, 15028131.257091932, 5009377.085697311],
            })
        })

        return () => {
            map.dispose();
        };
    }, []);
    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <SideBar></SideBar>
            <div id="vmap" style={{ width: '100%', height: '100vh' }}></div>
        </div>        
    );
}

export default MapPage;