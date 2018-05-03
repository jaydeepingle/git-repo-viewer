import React from 'react';

const TabPanel = (props) => {
  return <div>{props.children}</div>;
};

TabPanel.propTypes = {
  label: React.PropTypes.string.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.element.isRequired,
    React.PropTypes.string.isRequired
  ])
};

export default TabPanel;
