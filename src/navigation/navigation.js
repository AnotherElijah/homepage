import React, {Component} from "react"
import "./navigation.css"

export class NavItem extends Component {
    render() {
        return (
            <li className={this.props.className}
                onClick={this.props.setParentState} style={this.props.style}>
                <a id={this.props.activeSection}>
                    <div>{this.props.liName}</div>
                </a>
            </li>
        )
    }
}

let ticking = false;

export class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = ({
            appState: this.props.section,
            fixed: false
        });
        this.setState = this.setState.bind(this);
        this.stateFromChild.bind(this);
    }

    stateFromChild(state_, lift) {
        this.setState({appState: state_});
        lift(state_);
    }

    shouldComponentUpdate(prevProps, prevState) {
        let should = false;
        /*Prevent updates. DOESNT PREVENT IF COMPARING OBJECTS*/
        for (let key in prevState) {
            if (prevState[key] !== this.state[key]) {
                should = true;
            }
        }
        return should;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let lastScrollY = window.scrollY;
                let screenY = window.innerHeight;
                this.setState({
                    fixed: lastScrollY > ((screenY * 1.4) - screenY) ?
                        true :
                        this.state.fixed === true ? false : null
                });
                setTimeout(
                    () => {
                        ticking = false
                    }, 150
                )
            });
            ticking = true;
        }
    };

    style(duration, delay) {
        return {transition: `transform ${duration}s ease ${delay}s`};
    }

    render() {
        return (
            <ul id={this.state.fixed ? "fixed-menu" : null} className={"navigation " + this.state.appState}>
                {this.props.home &&
                    <><img className="fixed-menu-logo" src={require('../home/img/logo-white.svg')} alt=""/>
                    <NavItem key="0"
                             className={this.props.menuItemClassName + " home-nav"}
                             fixed={this.state.fixed}
                             setParentState={() => this.stateFromChild("home", this.props.stateFromChild)}
                             liName="HOME"/></>}
                <NavItem key="1" activeSection={this.state.appState === "about" && "activeNavElem"}
                         setParentState={() => this.stateFromChild("about", this.props.stateFromChild)}
                         className={this.props.menuItemClassName + "0"}
                         fixed={this.state.fixed}
                         liName={<>Me,<br/>My skills</>}
                         style={this.style(0.5, 0)}
                />
                <NavItem key="2" activeSection={this.state.appState === "works" && "activeNavElem"}
                         setParentState={() => this.stateFromChild("works", this.props.stateFromChild)}
                         className={this.props.menuItemClassName + "1"}
                         fixed={this.state.fixed}
                         liName="Portfolio"
                         style={this.style(0.4, 0.1)}
                />
                <NavItem key="3" activeSection={this.state.appState === "contact" && "activeNavElem"}
                         setParentState={() => this.stateFromChild("contact", this.props.stateFromChild)}
                         className={this.props.menuItemClassName + "2"}
                         fixed={this.state.fixed}
                         liName="Contacts"
                         style={this.style(0.3, 0.2)}
                />
            </ul>
        );
    }
}