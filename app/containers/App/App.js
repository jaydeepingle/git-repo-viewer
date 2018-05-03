import React from 'react';
import { connect } from 'react-redux';

import Sidebar from '../Sidebar/Sidebar';
import CommandPalette from '../CommandPalette/CommandPalette';
import Workspace from '../Workspace/Workspace';

const App = (props) => {
  return (
    <div className="main">
      <div className="sidebar">
        <Sidebar folder={props.folder} />
      </div>
      <div className="workspace">
        <Workspace />
      </div>
      {false && <CommandPalette /> }
    </div>
  );
};

App.propTypes = {
  folder: React.PropTypes.shape({
    name: React.PropTypes.string,
    type: React.PropTypes.string,
    childNodes: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string,
      type: React.PropTypes.string
    }))
  })
};

const mapStateToProps = ({folder}) => {
  return {
    folder
  };
};

export default connect(mapStateToProps)(App);
