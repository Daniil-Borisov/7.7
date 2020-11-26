import React from "react";
import Weather from "./weather";

import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { favoriteCity, setCity, setTempDeg } from "../store/actions/actions";
import { weatherFetchData } from "../store/actions/fetch";


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeCity = this.onChangeCity.bind(this);
    }

    onChangeCity (event) {
        this.props.setCity(event.target.value);
        this.props.fetchData(event.target.value);
        if(!this.props.favCity.includes(this.props.cityName) && !this.props.hasErrored ) {
            this.props.favoriteCity(this.props.cityName);
            console.log(this.props.favCity)
        }
}

    handleClick(){
        this.props.setTempDeg(!this.props.temp)
    }


    render() {

        return(
            <div className={'mainWrapper'}>
                <input
                    id={'city'}
                    placeholder={'Enter your city'}
                    type={'text'}
                    onBlur={this.onChangeCity}
                />
                <button
                    id={'degrees'}
                    onClick={()=>this.handleClick()}
                >
                    C/F
                </button>
                <Weather setCity={this.props.setCity} setTempDeg={this.props.setTempDeg} />
                {this.props.favCity.map((item, index) => (
                    <button className={'fav'} key={index} value={item} onClick={this.onChangeCity}>{item}</button>
                ))}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cityName: state.city.cityName,
        temp: state.city.temp,
        favCity: state.city.favCity,
        hasErrored: state.itemsHasErrored
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCity: bindActionCreators(setCity, dispatch),
        setTempDeg: bindActionCreators(setTempDeg, dispatch),
        fetchData: (url) => dispatch(weatherFetchData(url)),
        favoriteCity: bindActionCreators(favoriteCity, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)