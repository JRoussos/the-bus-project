import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import '../../assets/css/leafletrouting.css'

class Routing extends MapLayer {
    createLeafletElement(){
        const { map, waypoints } = this.props;
        // console.log(waypoints)
        
        const accessToken = 'pk.eyJ1Ijoiam9objYzMiIsImEiOiJjazZtcm1mZm8waGs2M3VydWhvZjU2bXNrIn0.GCk0_AijdN89AK7LqqxgGw';
        // let options = { profile: 'mapbox/walking' }
        
        let leafletElement = L.Routing.control({
            waypoints,
            lineOptions: {
                styles: [{className: 'animate'}]
            },
            createMarker: function() { return null; },
            router: L.Routing.mapbox(accessToken),
            addWaypoints: false,
            draggableWaypoint: false,
            fitSelectedRoutes: false,
            showAlternatives: false,
            show: false
        }).addTo(map.leafletElement);

        return leafletElement.getPlan();
    }
}

export default withLeaflet(Routing);

