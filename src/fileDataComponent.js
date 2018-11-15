import React, { Component } from 'react';
import './App.css';
import data from './companyList.json';

class FileDataComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [...data]
        };
    }
  
    //handle changes in names of company and set it in state.
    handleChangeName(index, event) {
        let tmp = [...this.state.data];
        tmp[index].name = event.target.value;
        this.setState({
            data: tmp
        });
    }

    //handle changes in GST number of company and set it in state.
    handleChangeNumber(index, event) {
        let tmp = [...this.state.data];
        tmp[index].gst_no = event.target.value;
        this.setState({
            data: tmp
        });
    }
    
    //button click, calling parent function
    verifyGST = () => {
        this.props.onVerifyClick(this.state.data);
    }

    //This function is to render file's data, and made it editable
    showDataFromFile = () => {
        return this.state.data.map((v, i) => <tr>
            <td><input type="text" value={v.name} onChange={this.handleChangeName.bind(this, i)} /></td>
            <td><input type="text" value={v.gst_no} onChange={this.handleChangeNumber.bind(this, i)} /></td>
        </tr>);
    }

  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
            <th>Company Name</th>
              <th>GST No.</th>
              </tr>
          </thead>
          <tbody>
            {this.showDataFromFile()}
          </tbody>
        </table>
        <button onClick={this.verifyGST}>Verify</button>
      </div>
    );
  }
}

export default FileDataComponent;
