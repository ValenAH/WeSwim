import React,{ Component } from 'react';
class Stateful extends Component{
    constructor(props){
        super(props)
        this.state = {
            propiedad: 'Hola Vale'
        }
    }
    render(){
        return(
            <h1>{this.state.propiedad}</h1>
        )
    }
}
export default Stateful;