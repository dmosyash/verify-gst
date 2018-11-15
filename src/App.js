import React, { Component } from 'react';
import './App.css';
import FileDataComponent from './fileDataComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  // To verify PAN, if PAN is valid then it will return true else false.
  isValidPAN = str => {
      //checking length
    if (str.length !== 10) {
      return false;
    }

    //checking first 5 characters the String Part of PAN
    let strPart = str.substring(0, 5);
    let regex = new RegExp(/^[A-Z]{3}[CPHFATBLJG][A-Z]$/g);
    let bool = regex.test(strPart);
    if (!bool) {
      return false;
    }

    //checking the serial number part of PAN
    let numberPart = parseInt(str.substring(5, 9));
    if (isNaN(numberPart) || numberPart < 1 || numberPart > 9999) {
      return false;
    }

    //alphabetic check digit
    let lastDigit = str.charAt(9);
    bool = lastDigit.match(/[A-Z]/g);
    if (!bool) {
      return false;
    }

    return true;
  }

  // To verify GST number. If number is valid then it will return true else false.
  isValidGST = str => {
    str = str.toUpperCase();

    //checking length
    if (str.length !== 15) {
      return false;
    }

    //checking state code
    let stateCode = parseInt(str.substring(0, 2));
    if (isNaN(stateCode) || stateCode < 1 || stateCode > 37) {
      return false;
    }

    //checking PAN validation
    let pan = str.substring(2, 12);
    if (!this.isValidPAN(pan)) {
      return false;
    }

    //checking registration number
    let registrationNumber = parseInt(str.charAt(12));
    if (isNaN(registrationNumber)) {
      return false;
    }

    //checking 14th digit whether Z or not.
    let forteenthDigit = str.charAt(13);
    if (forteenthDigit !== 'Z') {
      return false;
    }

    //last digit check, valid only if it is an alphabet or a number
    let lastDigit = str.charAt(14);
    let bool = lastDigit.match(/[A-Z]|[0-9]/g);
    if (!bool) {
      return false;
    }

    return true;
  }

  showInvalidNumbers = (data = []) => {
    let invalidNumberList = [];
    let validNumbers = {};

    //Iterating all companies for GST verification
    data.forEach(company => {
      if (this.isValidGST(company.gst_no)) {
        //Checking for repeatation of same valid GST no.
        if (validNumbers.hasOwnProperty(company.gst_no)) {
          invalidNumberList.push(company);
          if (!validNumbers[company.gst_no].time) {
            validNumbers[company.gst_no] = {
              name: validNumbers[company.gst_no],
              times: 1
            }
            invalidNumberList.push({
              name: validNumbers[company.gst_no].name,
              gst_no: company.gst_no
            });
          } else {
            validNumbers[company.gst_no].times++;
          }
        } else {
          validNumbers[company.gst_no] = company.name;
        }
      } else {
        // Push invalid GST into an array
        invalidNumberList.push(company);
      }
    });
    // storing all invalid GST no. into list variable.
    let list = invalidNumberList.map(company => <tr><td>{company.name}</td><td>{company.gst_no}</td></tr>);

    //setting state with new list to render it on DOM
    this.setState({ list });
  }

  render() {
    return (
      <div className="App">
        <FileDataComponent onVerifyClick={this.showInvalidNumbers} />
        <table>
          <thead>
            <tr>
            <th>Company Name</th>
              <th>GST No.</th>
              </tr>
          </thead>
          <tbody>
            {this.state.list}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
