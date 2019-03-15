import React, {Component} from "react"
import "./navigation.css"
export class NavItem extends Component {
    render() {
        return (
            <li  className={this.props.className} onClick={this.props.stateFunc} style={this.props.style}>
                <a id={this.props.activeSection}>
                    <div>{this.props.liName}</div>
                </a>
            </li>
        )
    }
}

export class Navigation extends Component {
    constructor(props) {
        super(props)
        //let checkState=
        //this.state = ({goto: this.props.section!==undefined?this.props.section:"home"})
        this.state = ({goto: this.props.section})
        this.setState = this.setState.bind(this)
        this.getItemState.bind(this)
    }

    getItemState(state_, lift) {
        this.setState({goto: state_});
        lift(state_);
    }

    style(duration, delay) {
        return {transition: `transform ${duration}s ease ${delay}s`};
    }

    render() {
        return (
            <ul className={"navigation " + this.state.goto}>
                {this.props.home?
                    <NavItem
                    className={this.props.menuItemClassName+" home-nav"}
                    stateFunc={() => this.getItemState("home", this.props.onClick)}
                    liName="HOME"/>:null}
                <NavItem key="1" activeSection={this.state.goto==="about"?"activeNavElem":null}
                         stateFunc={() => this.getItemState("about", this.props.onClick)}
                         className={this.props.menuItemClassName+"0"}
                         liName="About me"
                         style={this.style(0.5, 0)}
                />
                <NavItem key="2" activeSection={this.state.goto==="works"?"activeNavElem":null}
                         stateFunc={() => this.getItemState("works", this.props.onClick)}
                         className={this.props.menuItemClassName+"1"}
                         liName="My works"
                         style={this.style(0.4, 0.1)}
                />
                <NavItem key="3" activeSection={this.state.goto==="contacts"?"activeNavElem":null}
                         stateFunc={() => this.getItemState("contact", this.props.onClick)}
                         className={this.props.menuItemClassName+"2"}
                         liName="Contact"
                         style={this.style(0.3, 0.2)}
                />
            </ul>
        );
    }
}