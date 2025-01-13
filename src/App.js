import './App.css';
import { useState, useEffect } from 'react';
import * as XLSX from 'sheetjs-style';


function App() {

  const [hosted, setHosted] = useState([]);
  const [embedded, setEmbedded] = useState([]);
  const [endpoints, setEndpoints] = useState([]);
  const [partnerName, setPartnerName] = useState('');
  
  const hostedOptions = [
    { value: 'Token (Keyed)', label: 'HPF: Token (Keyed)', key: 1 },
    { value: 'Vault (Keyed)', label: 'HPF: Vault (Keyed)', key: 2},
    { value: 'Cryptogram (Keyed)', label: 'HPF: Cryptogram (Keyed)', key: 3},
    { value: 'Token (Swipe)', label: 'HPF: Token (Swipe)', key: 4},
  ];

  const embeddedOptions = [
    { value: 'Sale', label: 'Embedded: Sale', key: 6},
    { value: 'Token', label: 'Embedded: Token', key: 7}
  ];

  const apiOptions = [
    { value: 'Create Payment', label: 'Create Payment', key: 8 },
    { value: 'Authorize Payment', label: 'Authorize Payment', key: 9 },
    { value: 'Refund Payment', label: 'Refund Payment', key: 10 },
    { value: 'Cancel Payment', label: 'Cancel Payment', key: 11 },
  ]
  
  useEffect(() => {
    console.log(hosted);
  }, [hosted])

  const handleHostedChange = (event) => {
    
    if (hosted.indexOf(event.target.value) === -1) {
    setHosted([event.target.value, ...hosted]);
    } else {
    setHosted(hosted.filter(a => a.key !== event.target.value.key))
    }
    
  };

  const handleEmbeddedChange = (event) => {

    if (embedded.indexOf(event.target.value) === -1) {
      setEmbedded([event.target.value, ...embedded]);
      } else {
      setEmbedded(embedded.filter(a => a.key !== event.target.value.key))
      }
  
    };
  
  const handleEndpointChange = (event) => {
    
    if (endpoints.indexOf(event.target.value) === -1) {
    setEndpoints([event.target.value, ...endpoints]);
    } else {
    setEndpoints(endpoints.filter(a => a.key !== event.target.value.key))
    }
    
  };

  const handlePartnerChange = (event) => {
    setPartnerName(event.target.value);
  };

  const handleFileExport = (event) => {
    
    const hostedHeader = ['Hosted Payment Form', 'Response Data']
    const embeddedHeader = ['Embedded Payments', 'JWT', 'Response Data']
    const endpointHeader = ['API Endpoints', 'Request Data', 'Response Data']
  
    const sheetData = []
    
    if (hosted.length !== 0) {

      sheetData.push(hostedHeader);

      hosted.map((option) => (
        sheetData.push([option, '', ''])
      ));

      console.log(sheetData);

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
  
  ws['!cols'] = [{ width: 30 }, { width: 30 }];

    
    ws['A1'].s = {
      font: {
          bold: true,
          color: "#F2F2F2",
      },
      alignment: {
        horizontal: 'center'
      }
    }

    ws['B1'].s = {
      font: {
          bold: true,
          color: "#F2F2F2",
      },
      alignment: {
        horizontal: 'center'
      }
    }

    
    // Build the final sheet
    XLSX.utils.book_append_sheet(wb, ws, "Validation Sheet");
    
    XLSX.writeFile(wb, "ValSheet.xlsx");
    
    
  }


  }

  return (
    <div>
      
      <div className='partner-name'>
      <label onChange={handlePartnerChange}>Partner Name</label>
      <input></input><br/>
      </div>
      
      <h2>Hosted Payment Form Options</h2>
      
      {hostedOptions.map((option) => (
        <button className='button-4' key={option.key} value={option.value} onClick={handleHostedChange}>
          {option.label}
        </button>
      ))}<br/>

      <h2>Embedded Payments Options</h2>
      
      {embeddedOptions.map((option) => (
        <button className='button-4' key={option.key} value={option.value} onClick={handleEmbeddedChange}>
          {option.label}
        </button>
      ))}<br/>

      <h2>API Endpoints</h2>
      
      {apiOptions.map((option) => (
        <button className='button-4' key={option.key} value={option.value} onClick={handleEndpointChange}>
          {option.label}
        </button>
      ))}<br/>

      <h2>Current Selections</h2>

      <ul>
        {hosted.map((option) => (
          <li>{option}</li>
      ))}
      </ul>
      
      <br />

      <button className='button-4' onClick={handleFileExport}>Create Validation Sheet</button>

    </div>
  );
}

export default App;
