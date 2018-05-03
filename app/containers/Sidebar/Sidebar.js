import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tree } from '../../components/Tree/Tree';
import { openFile, openFolder } from '../../modules/sidebar';

class Sidebar extends Component {
  static propTypes = {
    repo: React.PropTypes.object,
    username: React.PropTypes.string,
    repoName: React.PropTypes.string,
    openFile: React.PropTypes.func,
    openFolder: React.PropTypes.func
  };

  constructor (props) {
    super(props);

    this.doubleClickHandler = this.doubleClickHandler.bind(this);
  }

  doubleClickHandler (node) {
    if(node.type === 'dir') {
      const { url } = node;
      this.props.openFolder({id: node.id || node.sha, url: url});
    } else {
      const { username, repoName } = this.props.repo;
      this.props.openFile({ username, repoName, path: node.path, name: node.name, id: node.id || node.sha });
    }
  }

  getChildNodes (node) {
    const {childrenMap} = this.props.repo;
    return childrenMap[node.id || node.sha];
  }

  render() {
    const {root} = this.props.repo;
    return (
      <div>
        <h3>Folders</h3>
        <Tree node={root} onNodeClick={this.doubleClickHandler} getChildNodes={this.getChildNodes.bind(this)}/>
      </div>
    );
  }
}

const mapStateToProps = ({repo}) => {
  return { repo };
};
export default connect(mapStateToProps, { openFile, openFolder })(Sidebar);
