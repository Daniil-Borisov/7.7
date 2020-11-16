import React from "react";

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        const city = this.props.value
        const url = "https://community-open-weather-map.p.rapidapi.com/forecast/daily?cnt=10&units=metric&q=" + city
        fetch( url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "8948d5b5d8msh7598122ce0ab0cap172c7cjsnd7fbfc8b69fb",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.list
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        const tempMin =[],
            tempMax = [];
        if (this.props.temp && items){
            tempMin.length = 0;
            tempMax.length = 0;
            items.map(item => {
                tempMin.push(Math.floor(item.temp.min) + String.fromCharCode(8451))
                tempMax.push(Math.floor(item.temp.max) + String.fromCharCode(8451))
            })
        } else if(!this.props.temp && items) {
            tempMin.length = 0;
            tempMax.length = 0;
            items.map(item => {
                tempMin.push((Math.floor(item.temp.min * 1.8 + 32)) + String.fromCharCode(8457))
                tempMax.push((Math.floor(item.temp.max * 1.8 + 32)) + String.fromCharCode(8457))
            })
        }
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else if(!items){
            return <div>Enter correct name</div>
        } else {
            if(!this.props.fav.includes(this.props.value)) {
                this.props.fav.push(this.props.value);
            }
            return (
                <div className="table">
                    <p>Weather in {this.props.value}</p>
                    <div className="table-row">
                        <div className="date">Date</div>
                        <div className="temp">Temp min/max</div>
                        <div className="description">Description</div>
                        <div className="wind">Wind</div>
                        <div className="pressure">Pressure</div>
                        <div className="humidity">Humidity</div>
                    </div>

                    {items.map((item, i) => (
                        <div key={item.dt} className={'table-row'}>
                            <div className="date">
                                {new Date(item.dt*1000).toLocaleDateString()}
                            </div>
                            <div className="temp">
                                {tempMin[i]} / {tempMax[i]}
                            </div>
                            <div className="description">
                                {item.weather[0].description}
                            </div>
                            <div className="wind">
                                {Math.floor(item.speed)+' m/s'}
                            </div>
                            <div className="pressure">
                                {item.pressure}
                            </div>
                            <div className="humidity">
                                {item.humidity}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default Weather