import React, { Component } from 'react';

export default class Botao extends Component {
    
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    render() {
        return(
            <div>
                <div>
                    <button onClick={this.props.acao}>{this.props.nome}</button>
                </div>
            </div>
        );
    }
}