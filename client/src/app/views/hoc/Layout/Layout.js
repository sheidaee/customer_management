import React from 'react';

/**
 * Layout for components
 * 
 * @class Layout
 * @extends {React.Component}
 */
class Layout extends React.Component {        
    render() {
        return (
            <main>
                {this.props.children}
            </main>            
        );
    }
}

export default Layout