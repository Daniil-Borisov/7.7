import React from "react";
import Weather from "./weather";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            value: 'Kiev',
            temp: true,
            fav: []
        }
        this.onChangeCity = this.onChangeCity.bind(this);
    }

    onChangeCity(event) {
        if(!(+event.target.value)) {
            this.setState({value: event.target.value});
        } else{
            this.setState({value: ''})
        }
    }

    handleClick(){
        this.setState({temp: !this.state.temp,});
    }

    render() {
        return(
            <div>
                <div className={'inputWrapper'}>
                    <input id={'city'} placeholder={'Enter your city'} type={'text'} onBlur={this.onChangeCity}></input>
                    <button id={'degrees'} onClick={()=>this.handleClick()}>C/F</button>
                </div>
                <Weather key={this.state.value} value={this.state.value} temp={this.state.temp} fav={this.state.fav}/>
                {this.state.fav.map((item, index) => (
                    <button className={'fav'} key={index} value={item} onClick={this.onChangeCity}>{item}</button>
                ))}
            </div>
        )
    }
}

export default Main