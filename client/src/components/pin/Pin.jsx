import React from 'react'
import "./pin.scss";
import { Link } from 'react-router-dom';
import { Marker, Popup } from 'react-leaflet';

function Pin({item}) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popup">
            <img src={item.img} alt="" />
            <div className="textConatiner">
                <Link to={`/${item.id}`} className='title'>{item.title}</Link>
                <br />
                <span className="bed">{item.bedroom} bedroom</span>
                <br />
                <b>$ {item.price}</b>
            </div>
        </div>
      </Popup>
    </Marker>
  )
}

export default Pin
