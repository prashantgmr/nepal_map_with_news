import React, { useState, useEffect, useRef} from 'react';
import { Map, GeoJSON} from "react-leaflet";
import mapData from "./../data/districts.json";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import NewsBrief from './NewsBrief';
const newsDetail =[
    {
        id : 1,
        news: [ {title: "Bhojpur", content:"This is bhojpur"}]
    },
    {
        id: 2,
        news: [
            { title: "Dhankuta", content: "This is Dhankuta" },
            {title : "What is in Dhankuta" , content : "I dont know man"}
        ]
    }
]
export default function NepalMap() {
    const [selectDistrict, setSelectDistrict] = useState('');
    const [news, setNews] = useState([]);
    const geojson = useRef();

    useEffect(() => {
        const newsData = newsDetail.filter(item => item.id == selectDistrict);
        if(newsData.length){
        setNews(newsData[0].news)
        }
        return () => {
            setNews([])
        }
    }, [selectDistrict]);

    var i = 1 ,fillColour;
    Object.keys(mapData.features).map(
    (e) => {
        mapData.features[e]["idx"] = i;
        i++
    });
    const districtStyle = {
        fillColor: fillColour,
        fillOpacity: 1,
        color: "black",
        weight: .75,
        };
    
    const districtClicked = (e) => {
        e.target.setStyle({
            fillColor : "yellow",
            fillOpacity: 1,
            weight:1
        });
        setSelectDistrict(e.target.feature.idx);
        
    }
   
    
    const onEachDistrict = (district, layer) => {
        const id = district.idx;
        if (id < 15) {
            fillColour = "#ffcebc"
        } else if (id < 23) {
            fillColour = "#addeff"
        } else if (id < 36) {
            fillColour = "#daf7a2"
        } else if (id < 47) {
            fillColour = "#e0bdee"
        } else if (id < 59) {
            fillColour = "#ffcc78"
        } else if (id < 69) {
            fillColour = "#b2ee97"
        } else {
            fillColour = "#f5b4ef"
        }
        layer.options.fillColor = fillColour;
        const name = district.properties.जिल्ला;
        layer.bindTooltip(name);
        layer.bindPopup(name);
        layer.on({
            click: districtClicked,
        });
        layer.on({
            mouseout: function (e) {
                // e.target.setStyle({
                //     fillColor : fillColour
                // });
            }
        });
      };
    return (
        <div>
        <Map style={{ height: "80vh" }} center={[28.5,84]} zoom={7.35} minZoom={6} maxZoom={8}>
    
          <GeoJSON
            ref= {geojson}
            style={districtStyle}
            data={mapData.features}
            onEachFeature={onEachDistrict}
          />
        </Map>
        <div className="news_section">
            {news.map((item,id)=>(
                   <NewsBrief  key={id} data={item}/>
            ))}
        </div>
      </div>
    )
}
