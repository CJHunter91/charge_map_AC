import React, { Component } from 'react';


class ChargeInfo extends Component{

	renderInfo(){
		if(this.props.chargeData[0]){
			console.log(this.props.chargeData[0])
			var data = this.props.chargeData[0]
			return(
			<section id="details">
			<article id="address">
			<h3 id="address-title">{data.ChargeDeviceName}</h3>
			
			<ul>
				<li>{data.PaymentRequiredFlag ? `Payments ${data.PaymentDetails}` : "Free to use"}</li>
				<li>{data.ChargeDeviceLocation.Address.BuildingNumber}</li>
				<li>{data.ChargeDeviceLocation.Address.BuildingName}</li>
				<li>County: {data.ChargeDeviceLocation.Address.County}</li>
				<li>PostCode: {data.ChargeDeviceLocation.Address.PostCode}</li>
				<li>Coutry: {data.ChargeDeviceLocation.Address.Country}</li>
				<li>Street: {data.ChargeDeviceLocation.Address.Street}</li>
				<li>Thoroughfare: {data.ChargeDeviceLocation.Address.Throroughfare}</li>
				<li>24H: {data.Accessible24Hours ? "Yes" : "No"}</li>
			</ul>
			</article>
			<article id="connections">
			<label>Connectors</label>
					{data.Connector.map((connector, index) =>{
						return(

							<ul key={index}>
							<li>{connector.ConnectorType}</li>
							<li>{connector.RatedOutputCurrent} Amps</li>
							<li>{connector.RatedOutputVoltage}V</li>
							<li>{connector.RatedOutputkW}kw</li>
							<br/>

							</ul>
							)
					})
						
					}
			</article>
			</section>
				)		
		}
	}

	render(){
		return(
		<article id="devices">
		<article id="connectors">
		<label>  CHAdeMO</label> 
		<input type="checkbox" onChange={()=>{this.props.toggleConnector("JEVS G105 (CHAdeMO) DC")}} value="JEVS G105 (CHAdeMO) DC"/>
		<label>  Type2 Combo</label>
		<input type="checkbox" onChange={()=>{this.props.toggleConnector("Type 2 Combo (IEC62196) DC")}} value="Type 2 Combo (IEC62196) DC"/>
		<label>  Type2 Mennekes</label>
		<input type="checkbox" onChange={()=>{this.props.toggleConnector("Type 2 Mennekes (IEC62196)")}} value="Type 2 Mennekes (IEC62196)"/>
		<label>  3-pin Type G</label>
		<input type="checkbox" onChange={()=>{this.props.toggleConnector("3-pin Type G (BS1363)")}} value="3-pin Type G (BS1363)"/>
		<div id="geo-button">
		<button onClick={this.props.getUserLocation}>My Location</button>
		</div>
		</article>
		{this.renderInfo()}
		</article>
		)
	}
}
export default ChargeInfo