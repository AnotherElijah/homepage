import React, {Component} from "react"
import "../global-style.css"
import changesInfo from "../global-scripts.js"
import "./popup.css"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Navigation} from "../home/home";
import {Header, Transition} from '../common-components/common-components';
import {CanvasBg} from "../canvas/canvas-bg";
import {GrowingBlock} from "../growing-block/growing-block"

class Popup extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
        this.setState = this.setState.bind(this);
    }
    clickHandler(e) {
        if (this.state.open === false) {
            if (e.target.classList.contains("more")){
                /***OPEN***/
                this.setState({
                    open: true
                });
            }

        }else if (e.target.classList.contains("close") ||
            e.target.classList.contains("fullScreenContainer")) {
            /***CLOSE***/
            this.setState({
                open: false
            });
        }
    }
    render() {
        return (
            <div
                className={"mainContainer"+" "+this.props.class}
                onClick={e => {
                    this.clickHandler(e);
                }}
            >

                <div className="description-wrapper">
                    <img className="more" src={this.props.imgSrc} style={{width: this.props.imgWidth}} />
                    {this.props.description}
                </div>
                {this.state.open === true && (
                    <div
                        className="fullScreenContainer preview"
                        onClick={e => {
                            this.clickHandler(e);
                        }}
                        style={{ position: "fixed" }}
                    >
                        <div className="fullScreenContainer__innerContainer">
                            <button className="close">&times;</button>
                            {this.props.innerComponent}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export {Popup};