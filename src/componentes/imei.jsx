import React from 'react';
import { v4 as uuidv4 } from 'uuid';

class UniqueIdGenerator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uniqueId: ''
    };
  }

  componentDidMount() {
    let uniqueId = localStorage.getItem('uniqueId');

    if (!uniqueId) {
      uniqueId = this.generateUniqueId();
      localStorage.setItem('uniqueId', uniqueId);
    }

    this.setState({ uniqueId });
  }

  generateUniqueId() {
    return uuidv4().replace(/-/g, '').substring(0, 16);
  }

  render() {
    const { uniqueId } = this.state;

    return (
      <div>
         {uniqueId}
      </div>
    );
  }
}

export default UniqueIdGenerator;