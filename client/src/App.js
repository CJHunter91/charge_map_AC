import React, { Component } from 'react';
import MapComponent from './components/MapComponent';
import ChargeInfo from './components/ChargeInfo';
import AjaxRequest from './services/AjaxRequest';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      center: [54.3781, -3.4360],
      zoom: 5,
      conFilter:{
        "JEVS G105 (CHAdeMO) DC": false,
        "Type 2 Combo (IEC62196) DC": false,
        "Type 2 Mennekes (IEC62196)": false,
        "3-pin Type G (BS1363)": false}
    }

    this.setLocationData = this.setLocationData.bind(this);
    this.getDeviceData = this.getDeviceData.bind(this);
    this.setDeviceData = this.setDeviceData.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.markerClickEvent = this.markerClickEvent.bind(this);
    this.toggleConnector = this.toggleConnector.bind(this);
  }

  getUserLocation(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) =>{
        this.updateCenter([position.coords.latitude, position.coords.longitude])
        this.updateZoom(15)
      });
  } else {
    console.log("Geolocation not available")
    }
  }

  updateCenter(params){
    this.setState({center:params})
  }  

  updateZoom(zoomLevel){
    if(this.state.zoom === zoomLevel){
      this.setState({zoom: zoomLevel-1})
    }
    else{
     this.setState({zoom: zoomLevel})
    }
  }

  markerClickEvent(id, lat, lng){
    this.updateCenter([lat, lng])
    this.updateZoom(14)
    this.getDeviceData(id)
  }

  setLocationData(data){
    this.setState({locations: data})
  }

  setDeviceData(data){
    this.setState({chargeData: data})
  }

  getDeviceData(id){
    const ajaxRequest = new AjaxRequest('http://localhost:3001/api/locations/'+id);
    ajaxRequest.get(this.setDeviceData);
  }

  componentWillMount() {
    this.setState({ locations: [], chargeData:[] })
  } 

  componentDidMount(){
    var string = "";
    const filter = this.state.conFilter;
    var count = 0;
    for(let connector in filter){
      if(filter[connector] && count === 0){
        string += `?${count}=${connector}`
        count++;
      }
      else if(filter[connector]){
        string += `&${count}=${connector}`
        count++;
      }
     }
    const ajaxRequest = new AjaxRequest('http://localhost:3001/api/locations'+ string);
    ajaxRequest.get(this.setLocationData);
  }

  getLocationsData(){
    var string = "";
    const filter = this.state.conFilter;
    var count = 0;
    for(let connector in filter){
      if(filter[connector] && count === 0){
        string += `?${count}=${connector}`
        count++;
      }
      else if(filter[connector]){
        string += `&${count}=${connector}`
        count++;
      }
     }
    const ajaxRequest = new AjaxRequest('http://localhost:3001/api/locations'+ string);
    ajaxRequest.get(this.setLocationData);
  }

  toggleConnector(connectorName){
    const connector = this.state.conFilter[connectorName]
    this.setState({conFilter: {...this.state.conFilter,[connectorName]: !connector}}, 
      this.getLocationsData);
  }

  render() {
    return (
      <section>
      <MapComponent

        center={this.state.center}
        zoom= {this.state.zoom} 
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<article id='map-loading'style={{ height: `100%` }} />}
        containerElement={<article id='map-container' style={{ height: `70vh` }} />}
        mapElement={<article id='map' style={{ height: `100%` }} />}
        locationData={this.state.locations}
        markerClickEvent={this.markerClickEvent}

      />
      <ChargeInfo 
      getUserLocation={this.getUserLocation} 
      chargeData={this.state.chargeData}
      toggleConnector={this.toggleConnector}
      />
      </section>
    );
  }
}

export default App;
