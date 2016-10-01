import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-container">
                Hello, world.
                <main className="container">
                    {this.props.content}
                </main>
            </div>
        );
    }
}

export default App;