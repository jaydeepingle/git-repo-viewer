import React, { Component } from 'react';
import classNames from 'classnames';
import './Tree.scss';

export class Tree extends Component {
  static propTypes = {
    node: React.PropTypes.object.isRequired,
    onNodeClick: React.PropTypes.func,
    getChildNodes: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggle = () => {
    this.setState({visible: !this.state.visible});
  };

  open = (e) => {
    e.preventDefault();
    const { node } = this.props;
    const needToggle = !this.state.visible && node.type === 'dir';
    this.props.onNodeClick(node);
    if (needToggle) {
      this.toggle();
    }
  }

  render() {
    const { node } = this.props;
    let childNodes;
    const nodeChildren = !!this.props.getChildNodes && this.props.getChildNodes(node);
    if (!!nodeChildren) {
      childNodes = nodeChildren.map((childNode, idx) => {
        return <li key={idx}><Tree node={childNode} onNodeClick={this.props.onNodeClick} getChildNodes={this.props.getChildNodes}/></li>;
      });
    }

    const classes = {
      'icon-folder-open': node.type === 'dir' && this.state.visible,
      'icon-folder': node.type === 'dir' && !this.state.visible,
      'icon-minus': node.type === 'file'
    };

    let style;
    if (!this.state.visible) {
      style = { display: 'none' };
    }
    return (
      <div className="tree">
        <i className={classNames(classes)}></i>
        <h5 onClick={this.toggle} onDoubleClick={this.open}>
          {node.name}
        </h5>
        <ul style={style}>
          {childNodes}
        </ul>
      </div>
    );
  }
}
