import React, {Component} from "react"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Header(props) {
    return (
        <header className={props.headerClass}>
            <div className="filter header-inner">
                <div className="head-wrapper">
                    <h1 key="1" className="head__main-header">{props.txtHeader}</h1>
                </div>
            </div>
        </header>
    )
}
function Transition({direction, nestedElem, wrapperNumber, flag, ...other}) {
    return (
        <div className={"block-border" + wrapperNumber + direction} id={other.id}>
            <ReactCSSTransitionGroup
                component="div"
                className={"block"}
                transitionName={"txtBlockAnimation-" + direction}
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                transitionEnter={true}
                transitionLeave={true}>
                {flag === true ? nestedElem : null}
            </ReactCSSTransitionGroup>
        </div>
    )
}
export {Header, Transition};