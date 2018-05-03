import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadRepo } from '../../modules/home';

import './Home.scss';

class Home extends Component {
  static propTypes = {
    home: React.PropTypes.object,
    loadRepo: React.PropTypes.func.isRequired
  };
  constructor (props) {
    super(props);

    this.state = {
      value: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (e) {
    e.preventDefault();
    this.props.loadRepo(this.refs.repo_url.value);
  }

  render() {
    const { error, isLoading } = this.props.home;
    return (
      <div className="home-screen">
        <header>Github Repo Viewer</header>
        <form onSubmit={this.onSubmit}>

          { error && <div className="alert alert__danger">{error}</div> }
          <div className="form">
            <input
              type="text"
              ref="repo_url"
              placeholder="Paste github url here"
              defaultValue={this.state.value} />
          </div>

          <div className="form-group">
            <button className="btn btn__primary" disabled={isLoading}>Lets Go!</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(s => s, { loadRepo })(Home);
