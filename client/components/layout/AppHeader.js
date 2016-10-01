import React from 'react';

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Brand</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
                            <li><a href="standings">Standings</a></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-haspopup="true" aria-expanded="false">Dropdown <span
                                    className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">One more separated link</a></li>
                                </ul>
                            </li>
                        </ul>
                        {this.props.userNav}
                        {/*<ul className="nav navbar-nav navbar-right">*/}
                            {/*<li className="dropdown">*/}
                                {/*<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"*/}
                                   {/*aria-haspopup="true" aria-expanded="false">Dropdown <span*/}
                                    {/*className="caret"></span></a>*/}
                                {/*<ul className="dropdown-menu">*/}
                                    {/*<li><a href="#">Action</a></li>*/}
                                    {/*<li><a href="#">Another action</a></li>*/}
                                    {/*<li><a href="#">Something else here</a></li>*/}
                                    {/*<li role="separator" className="divider"></li>*/}
                                    {/*<li><a href="#">Separated link</a></li>*/}
                                {/*</ul>*/}
                            {/*</li>*/}
                        {/*</ul>*/}
                    </div>
                </div>
            </nav>
        );
    }
}

AppHeader.propTypes = {
    appTitle : React.PropTypes.string.isRequired,
}

AppHeader.defaultProps = {
    appTitle: "Chicken Tender Party",
    userNav: null
}

export default AppHeader;
