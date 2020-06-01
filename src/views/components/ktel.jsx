import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { saveRoute } from '../../store/actions/routeAction'
import { Link } from 'react-router-dom';

class ktel extends Component {
    constructor(props){
        super(props);
        this.state = {
            startingPoint: this.props.startingPoint,
            routes: this.props.routes,
            loaded: false
        };
    }

    componentDidUpdate(){
        if(!this.state.loaded){
            this.setState({
                startingPoint: this.state.startingPoint,
                routes: this.props.routes,
                loaded: true
            })
        }
    }

    static getDerivedStateFromProps(props, state){
        if(props.startingPoint !== state.startingPoint){
            return { 
                startingPoint : props.startingPoint,
                routes: props.routes 
            };
        }else return null;
    }

    handleBtnClick = (id) => {
        this.props.dispatch(saveRoute(this.state.routes.routes[id], this.state.startingPoint));
    }

    render() {
        // console.log(this.props)
        if(this.state.loaded){
        return (
            <tbody>
                {this.state.routes.routes.map( (r, index) => {
                    const last = r.route.length;
                    return(
                        <tr key = {index}>
                            <td>
                                <Link to={"/details"}>
                                <button onClick={() => this.handleBtnClick(index)} style={{border: "none", padding: "0", background: "none", outline: "none", cursor: "pointer", textAlign: "left"}}>
                                    <p className="title">{this.state.startingPoint} - {r.route.map((v, index) => {
                                        if(last === index+1){
                                            return v
                                        }else return v+" - "
                                    })}</p>
                                    <p className="text-muted">{r.time.map(t => t+" ")}</p>
                                </button>
                                </Link>
                            </td>
                        </tr>
                    )}) 
                }
            </tbody>
        )}else{
            return null;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { ktel } = state.firestore.data;
    // console.log(state)
    
    if(ktel === undefined){
        return { routes: state.route.routes }
    }else{
        for (let [key, value] of Object.entries(ktel)) {
            if(value.startingPoint === ownProps.startingPoint){
                return {
                    routes: value,
                    routes_id: key,
                    startingPoint: ownProps.startingPoint
                }
            }
        }
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'ktel' }
    ]),
)(ktel);