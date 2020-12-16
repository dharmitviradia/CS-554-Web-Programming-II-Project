import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class SearchBar extends React.Component {
    state = { term: '' }

    onInputChange = (event) => {
        this.setState({ term: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onFormSubmit(this.state.term);
    }

    render() {
        return (
            <div >
                <form onSubmit={this.onFormSubmit} >
                    <div >
                        <label>Stock Search</label>
                        <input
                            type="text"
                            value={this.state.term}
                            onChange={this.onInputChange}
                        />
                    </div>
                </form>
            </div >
        )
    }
}

export default SearchBar;