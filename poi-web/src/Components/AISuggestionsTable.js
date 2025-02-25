import React from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import { CgAdd } from 'react-icons/cg';
import InputSmall from './InputSmall';

class AISuggestionsTable extends React.Component {
  state = {
    expandedRow: null,
    newAttribute: {
      subkey: '',
      value: ''
    },
  }

  setNewAttribute = (event) => {
    if (event.target.name === 'subkey' || event.target.name === 'value') {
      this.setState(prevState => ({ newAttribute: { ...prevState.newAttribute, [event.target.name]: event.target.value } }));
    }
  };

  toggleRow = (key) => {
    const { expandedRow } = this.state;
    this.setState({ expandedRow: (expandedRow === key ? null : key) });
  };

  removeRow = (key) => {
    const { deletePOI } = this.props;
    deletePOI(key)
  };

  addAttribute = (key) => {
    const { newAttribute } = this.state;
    if (newAttribute.subkey) {
      const { addPOIAttribute } = this.props;
      addPOIAttribute(newAttribute.value, newAttribute.subkey, key);
    }
  };

  handleAttributeInputChange = (event, subkey, key) => {
    const value = event.target.value;
    const { updatePOIAttribute } = this.props;
    updatePOIAttribute(value, subkey, key);
  };

  handleAttributeInputDelete = (subkey, key) => {
    const { deletePOIAttribute } = this.props;
    deletePOIAttribute(subkey, key);
  };

  render() {
    const { data } = this.props;
    const { expandedRow, newAttribute } = this.state;

    return (
      <div className="table-container">
        <h2 className="table-heading">POI Attributes List</h2>
        <table className="ai-table">
          <thead>
            <tr>
              <th>POI Name</th>
              <th>POI Attributes</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, values]) => {
              const hiddenKeys = Object.keys(values); // Hide remaining fields in dropdown
  
              return (
                <React.Fragment key={key}>
                  <tr>
                    <td>{key}</td>
                    <td>
                      {hiddenKeys.length > 0 && (
                        <button className="toggle-btn" onClick={() => this.toggleRow(key)}>
                          {expandedRow === key ? 'Hide Details' : 'Show Details'}
                        </button>
                      )}
                      <RxCrossCircled className="delete-poi-icon" size={30} style={{ color: '#fe5000' }} onClick={() => this.removeRow(key)}/>
                    </td>
                  </tr>
                  <tr className={`dropdown-row ${expandedRow === key && hiddenKeys.length > 0 ? "" : "hide-div"}`}>
                    <td colSpan="3">
                      <div>
                        <InputSmall divClassName="no-left-margin" name="subkey" onChange={this.setNewAttribute} value={newAttribute.subkey} />
                        <span>: </span>
                        <InputSmall name="value" onChange={this.setNewAttribute} value={newAttribute.value} />
                        <CgAdd className="delete-attr-icon" size={15} style={{ color: '#007bff' }} onClick={() => this.addAttribute(key)}/>
                      </div>
                      {hiddenKeys.map((hKey) => (
                        <div key={hKey}>
                          {hKey}: <InputSmall onChange={event => this.handleAttributeInputChange(event, hKey, key)} value={values[hKey]} />
                          <RxCrossCircled className="delete-attr-icon" size={15} style={{ color: '#fe5000' }} onClick={() => this.handleAttributeInputDelete(hKey, key)}/>
                        </div>
                      ))}
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default AISuggestionsTable;
