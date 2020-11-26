import React from "react";
import { connect } from "react-redux";
import { weatherFetchData } from "../store/actions/fetch";

class Weather extends React.Component {

    componentDidMount() {
        this.props.fetchData(this.props.cityName)
    }

    render() {

        const error = this.props.hasErrored,
            isLoaded = this.props.isLoading,
            items = this.props.items,
            tempMin =[],
            tempMax = [],
            imgUrl = [];
        if (this.props.temp && items){
            tempMin.length = 0;
            tempMax.length = 0;
            items.forEach(item => {
                tempMin.push(Math.floor(item.temp.min) + String.fromCharCode(8451))
                tempMax.push(Math.floor(item.temp.max) + String.fromCharCode(8451))

            })
        } else if(!this.props.temp && items) {
            tempMin.length = 0;
            tempMax.length = 0;
            items.forEach(item => {
                tempMin.push((Math.floor(item.temp.min * 1.8 + 32)) + String.fromCharCode(8457))
                tempMax.push((Math.floor(item.temp.max * 1.8 + 32)) + String.fromCharCode(8457))
            })
        }
        if (error) {
            return <div>Error. Enter correct city name</div>;
        } else if (isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            items.forEach(item => {
                imgUrl.push("owf owf-"+ item.weather[0].id +" owf-5x icon-style")
            })

            return (
                <div className="wrapper">
                    <div className="title">Weather in {this.props.cityName} on 7 days</div>
                    <div className="cardWrapper">
                        {this.props.items.map((item, i) => (
                            <div key={item.dt} className={'weatherCard'}>
                                <div className="date">
                                    <div>
                                        {new Date(item.dt*1000).toLocaleDateString('eng', {weekday: 'long'})}
                                    </div>
                                    <div>
                                        {new Date(item.dt*1000).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="descriptionImg">
                                    <i className={imgUrl[i]}></i>
                                </div>
                                <div className="temp">
                                    {tempMin[i]} / {tempMax[i]}
                                </div>
                                <div className="description">
                                    {item.weather[0].description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cityName: state.city.cityName,
        temp: state.city.temp,
        favCity: state.city.favCity,
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(weatherFetchData(url)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather)