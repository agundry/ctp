import React from 'react';
import AppHeader from './layout/AppHeader';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    showUserNav(){
        return  <ul className="nav navbar-nav navbar-right">
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
        </ul>;
    }

    render() {
        return (
            <div className="app-container">
                <AppHeader appTitle="Chicken Tender Party" userNav={this.showUserNav()}/>
                <main className="container">
                    {this.props.content}
                </main>
            </div>
        );
    }
}

export default App;