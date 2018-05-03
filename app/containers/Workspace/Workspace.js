import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, TabPanel } from '../../components/Tabs';
import { closeFile } from '../../modules/sidebar';

class Workspace extends Component {
  static propTypes = {
    repo: React.PropTypes.object,
    files: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      contents: React.PropTypes.string.isRequired,
    })),
    closeFile: React.PropTypes.func
  };

  constructor (props) {
    super(props);

    this.onTabClose = this.onTabClose.bind(this);
  }

  createMarkup (contents) {
    return { __html: contents };
  }

  onTabClose (fileName, event) {
    this.props.closeFile(fileName);
    event.stopPropagation();
  }

  render () {
    const { files, selected } = this.props.repo;
    return (
      <Tabs onClose={this.onTabClose} selected={selected}>
        {
          files.map(({path, title, contents}) => {
            return (
              <TabPanel label={title} key={path} title={path}>
                <div dangerouslySetInnerHTML={this.createMarkup(contents)} />
              </TabPanel>
            );
          })
        }
      </Tabs>
    );
  }
}

const mapStateToProps = ({repo}) => {
  return { repo };
};
export default connect(mapStateToProps, { closeFile })(Workspace);
