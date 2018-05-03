import React, { Component } from 'react';

import './Tabs.scss';

export default class Tabs extends Component {
  static propTypes = {
    selected: React.PropTypes.number,
    children: React.PropTypes.arrayOf(React.PropTypes.element),
    onClose: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { selected: this.props.selected || 0 };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selected !== this.state.selected) {
      this.setState({
        selected: nextProps.selected
      });
    }
  }

  _renderTitles() {
    function labels(child, idx) {
      let activeClass = (this.state.selected === idx ? 'active' : '');
      return (
        <li role="tab" key={idx} aria-controls={`panel${idx}`}>
          <a className={activeClass} title={child.props.title} onClick={this.onClick.bind(this, idx)} href="#">
            {child.props.label}
            <i className="icon-cross" onClick={(event) => this.props.onClose(child.props.title, event)}></i>
          </a>
        </li>
      );
    }

    return (
      <ul className="tabs__labels" role="tablist">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }

  onClick(index, event) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  }

  render() {
    return (
      <div className="tabs">
        {this._renderTitles()}

        <div className="tabs__content">
          {this.props.children[this.state.selected]}
        </div>
      </div>);
  }
}
