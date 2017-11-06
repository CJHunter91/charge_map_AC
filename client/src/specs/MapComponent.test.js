import React from 'react';
import ReactDOM from 'react-dom';
import MapComponent from '../components/MapComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapComponent 
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<article id='map-loading'style={{ height: `100%` }} />}
        containerElement={<article id='map-container' style={{ height: `400px` }} />}
        mapElement={<article id='map' style={{ height: `100%` }} />}
  	/>, div);
});
