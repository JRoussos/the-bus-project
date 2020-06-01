
import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Routing from './LeafletRouting'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import { Button } from 'reactstrap';

// url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
// url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    
// url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
// url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"

const accessToken = 'pk.eyJ1Ijoiam9objYzMiIsImEiOiJjazZtcm1mZm8waGs2M3VydWhvZjU2bXNrIn0.GCk0_AijdN89AK7LqqxgGw';

const customIcon = new L.icon({
    iconUrl: require('../../assets/img/marker.png'),
    iconSize: [25, 25]
});

const bounds = new L.latLngBounds([[37.464376, 24.955062], [37.463966, 24.858215], [37.356525, 24.826317], [37.367986, 25.005843]]);
// const darkTiles = new L.tileLayer( "https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=" + accessToken ,{id: 'MapID', attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
// const lightTiles = new L.tileLayer( "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=" + accessToken ,{id: 'MapID', attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});

// const baseMaps = {
//     "DarkTiles": darkTiles,
//     "LightTiles": lightTiles
// }

class Leaflet extends Component {
    constructor(props){
        super(props)
        this.state = {
            isMapInit: false,
            center: [37.4349, 24.9138],
            showStopsOnMap: false,
            waypoints: []
        };        
    }

    componentDidMount(){
        this.map = this.mapInstance.leafletElement
        // L.control.layers(baseMaps).addTo(this.map);
    }

    componentDidUpdate(prevProps, prevState){
        // console.log(prevProps, this.props)
        if(prevProps.stops !== this.props.stops){
            
            let waypoints = []
            this.props.passedRoutes.route.forEach(village => {
                for (let [key, value] of Object.entries(this.props.stops)) {
                    if(value.v_name === village){
                        if(waypoints.length === 0){
                            if(value.v_id > this.props.strId){
                                waypoints.push(this.props.strStops[0].coordinates)
                            }else{
                                waypoints.push(this.props.strStops[(this.props.strStops.length-1)].coordinates)
                            }
                        }
                        waypoints.push(value.v_center)
                    }
                }
            });

            // console.log(waypoints)
            this.setState({
                center: this.props.strCenter,
                isMapInit: true,
                waypoints
            })
        }
    }

    handleClick = () =>{
        this.setState({ 
            showStopsOnMap:!this.state.showStopsOnMap
        })
        if(this.state.showStopsOnMap){ this.map.flyTo(this.state.center, 12) }
        else{ this.map.flyTo(this.state.center, 14) }
    }
    
    render() {
        return (
            <div style={{margin: "0 -15px"}} >
                <Button className="btn-link" color="info" onClick={() => this.handleClick()}>{this.state.showStopsOnMap ? "Hide Stops" : "Show Stops"}</Button>
                <Map
                    id='mapid'
                    maxBounds={bounds}
                    tap={false} 
                    noMoveStart={false} 
                    dragging={window.innerWidth < 993 ? false : true} 
                    scrollWheelZoom={false} 
                    center={this.state.center} 
                    zoom={12}
                    minZoom={12}
                    style={{height: "400px"}} 
                    // layers={[lightTiles, darkTiles]}
                    ref={e => {this.mapInstance = e}}
                >
                    {this.props.dark ? 
                    <TileLayer
                        url={"https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=" + accessToken}
                        attribution='© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    /> :
                    <TileLayer
                        url={"https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=" + accessToken}
                        attribution='© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    /> }

                    {this.state.isMapInit && <Routing waypoints={this.state.waypoints} map={this.mapInstance}/>}
                    <div>
                        {this.state.showStopsOnMap && this.props.strStops.map((s, index) => {                            
                            return(
                                <Marker key={index} icon={customIcon} position={s.coordinates}>
                                    <Popup>{s.name}</Popup>
                                </Marker>
                            )
                        })}
                    </div>
                    {/* {this.state.isMapInit && this.state.waypoints.map((s, index) => {
                        return(
                            <Marker key={index} icon={customIcon} position={s}>
                                <Popup>{s[0] + " - " + s[1] }</Popup>
                            </Marker>
                        )
                    })} */}
                </Map>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { stops } = state.firestore.data;
    if(stops === undefined){
        return { 
            stops: state.stops.stopsKtel,
        }
    }else{
        for (let [key, value] of Object.entries(stops)) {
            if(value.v_name === ownProps.startingPoint) {
                return{
                    strStops: value.stops,
                    strId: value.v_id,
                    strCenter: value.v_center,
                    stopId: key,
                    stops,
                    passedRoutes: state.route.routePassedToDetails
                }
            }
        }
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'stops'}
    ])
)(Leaflet);