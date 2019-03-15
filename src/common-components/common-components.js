import React, {Component} from "react"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Header(props) {
    return (
        <header className={props.headerClass}>
            <div className="filter header-inner">
                <div className="about-head-wrapper">
                    <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={1000}
                        transitionEnter={true}
                        transitionEnterTimeout={0}
                        transitionLeaveTimeout={0}
                        transitionLeave={true}>
                        <h1 key="1" className="about-head__main-header">{props.txtHeader}</h1>
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        </header>
    )
}

export {Header};