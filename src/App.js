import './App.css';
import { useState } from 'react';
import * as XLSX from 'sheetjs-style';


function App() {

  const [hosted, setHosted] = useState([]);
  const [embedded, setEmbedded] = useState([]);
  const [endpoints, setEndpoints] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [partnerName, setPartnerName] = useState(''); 
  
  const hostedOptions = [
    { value: 'Token (Keyed)', key: 1 },
    { value: 'Vault (Keyed)',  key: 2},
    { value: 'Cryptogram (Keyed)', key: 3},
    { value: 'Token (Swipe)', key: 4},
    { value: 'Vault (Swipe)', key: 5},
    { value: 'Cryptogram (Swipe)', key: 6},
  ];

  const embeddedOptions = [
    { value: 'Embedded Sale', key: 7},
    { value: 'Embedded Token', key: 8},
  ];

  const walletOptions = [
    { value: 'Apple Pay', key: 9},
    { value: 'Google Pay', key: 10},
    { value: 'Paypal', key: 11},
    { value: 'Paze', key: 12}
  ];

  const apiOptions = [
    { value: 'Create Payment', key: 13 },
    { value: 'Authorize Payment', key: 14 },
    { value: 'Refund Payment', key: 15 },
    { value: 'Cancel Payment', key: 16 },
    { value: 'Complete Payment', key: 17 },
    { value: 'Search Payment', key: 18 },
    { value: 'Create Subscription', key: 19 },
    { value: 'Modify Subscription', key: 20 },
    { value: 'Create Payment Method', key: 21 },
    { value: 'Modify Payment Method', key: 22 },
    { value: 'Generate Token', key: 23 },
    { value: 'Create Customer', key: 24 },
    { value: 'Get Customer', key: 25 },
    { value: 'Modify Customer', key: 26 },
    { value: 'Close Batch', key: 27 },
    { value: 'Retrieve Report', key: 28 },
    { value: 'Create Payment Link', key: 29 }

  ]

  const webhookOptions = [
    'Merchant Loaded',
    'Merchant Updated',
    'Payment Processed',
    'CC Batch Processed',
    'ACH/EFT Batch Processed',
    'ACH/EFT Rejected',
    'Vault'
  ]

  const handleHostedChange = (event) => {
    
    if (hosted.indexOf(event.target.value) === -1) {
    setHosted([event.target.value, ...hosted]);
    } else {
    setHosted(hosted.filter(a => a !== event.target.value))
    }
    
  };

  const handleEmbeddedChange = (event) => {

    if (embedded.indexOf(event.target.value) === -1) {
      setEmbedded([event.target.value, ...embedded]);
      } else {
      setEmbedded(embedded.filter(a => a !== event.target.value))
      }
  
    };

    const handleWalletChange = (event) => {

      if (wallets.indexOf(event.target.value) === -1) {
        setWallets([event.target.value, ...wallets]);
        } else {
        setWallets(wallets.filter(a => a !== event.target.value))
        }
    
      };
  
  const handleEndpointChange = (event) => {
    
    if (endpoints.indexOf(event.target.value) === -1) {
    setEndpoints([event.target.value, ...endpoints]);
    } else {
    setEndpoints(endpoints.filter(a => a !== event.target.value))
    }
    
  };

  const handlePartnerChange = (event) => {
    setPartnerName(event.target.value);
  };

  const handleFileExport = (event) => {
    
    const hostedHeader = ['Hosted Payment Form', 'Response Data']
    const embeddedHeader = ['Embedded Payments', 'JWT', 'Response Data']
    const walletHeader = ['Digital Wallets', 'Response Data']
    const endpointHeader = ['API Endpoints', 'Request Data', 'Response Data']
    const webhookHeader = ['Webhook', 'Subscribed? (Y/N)']
  
    const sheetData = []
    
    if (hosted.length !== 0) {
      sheetData.push(hostedHeader);

      hosted.map((option) => (
        sheetData.push([option, '', ''])
      ));

    }

    if (embedded.length !== 0) {
      
      if (sheetData.length !== 0) {
        sheetData.push('');
        sheetData.push(embeddedHeader);
      } else {
        sheetData.push(embeddedHeader);
      }

      embedded.map((option) => (
        sheetData.push([option, '', ''])
      ));

    }

    if (wallets.length !== 0) {
      
      if (sheetData.length !== 0) {
        sheetData.push('');
        sheetData.push(walletHeader);
      } else {
        sheetData.push(walletHeader);
      }

      wallets.map((option) => (
        sheetData.push([option, '', ''])
      ));

    }

    if (endpoints.length !== 0) {

      if (sheetData.length !== 0) {
        sheetData.push('');
        sheetData.push(endpointHeader);
      } else {
        sheetData.push(endpointHeader);
      }
  
      endpoints.map((option) => (
        sheetData.push([option, '', ''])
      ));
  
    }

      if (sheetData.length !== 0) {
        sheetData.push('');
        sheetData.push(webhookHeader);
      } else {
        sheetData.push(webhookHeader);
      }

      webhookOptions.map((option) => (
        sheetData.push([option, ''])
      ));

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    const styledHeadings = ['Hosted Payment Form', 'Response Data', 'Embedded Payments', 'JWT', 'Digital Wallets', 'API Endpoints', 'Request Data', 'Webhook', 'Subscribed? (Y/N)']

    ws['!cols'] = [{ width: 30 }, { width: 30 }, { width: 30 }];

    for (const cell in ws) {
      //console.log(ws[cell].v);
      if (styledHeadings.includes(ws[cell].v)) {
        ws[cell].s = {
          font: {
            bold: true,
            color: "#F2F2F2",
          },
            alignment: {
              horizontal: 'center'
          }
        }
      }
    }
    
    // Build the final sheet
    XLSX.utils.book_append_sheet(wb, ws, "Validation Sheet");
    //XLSX.writeFile(wb, "ValSheet.xlsx");

    if (partnerName.length === 0) {

      XLSX.writeFile(wb, "Validation-Sheet.xlsx");
    
    } else {

    
      const fileName = `${partnerName.replace(' ', '-')}-Validation-Sheet.xlsx`
      XLSX.writeFile(wb, fileName);
    }
    
    
  }

  return (
    <div>
      
      <div className='partner-name'>
      <label >Partner Name</label>
      <input onChange={handlePartnerChange}></input><br/>
      </div>
      
      <h2>Hosted Payment Form Options</h2><br />
      
      {hostedOptions.map((option) => (
        <button style={{backgroundColor: hosted.includes(option.value) ? '#24a0ed' : '#FAFBFC', color: hosted.includes(option.value) ? '#FFFFFF' : '#24292E'}} className='button-4' key={option.key} value={option.value} onClick={handleHostedChange}>
          {option.value}
        </button>
      ))}<br/>

      <h2>Embedded Payment Options</h2><br />
      
      {embeddedOptions.map((option) => (
        <button style={{backgroundColor: embedded.includes(option.value) ? '#24a0ed' : '#FAFBFC', color: embedded.includes(option.value) ? '#FFFFFF' : '#24292E'}} className='button-4' key={option.key} value={option.value} onClick={handleEmbeddedChange}>
          {option.value}
        </button>
      ))}<br/>

      <h2>Digital Wallet Options</h2><br />
      
      {walletOptions.map((option) => (
        <button style={{backgroundColor: wallets.includes(option.value) ? '#24a0ed' : '#FAFBFC', color: wallets.includes(option.value) ? '#FFFFFF' : '#24292E'}} className='button-4' key={option.key} value={option.value} onClick={handleWalletChange}>
          {option.value}
        </button>
      ))}<br/>

      <h2>API Endpoints</h2><br />
      
      {apiOptions.map((option) => (
        <button style={{backgroundColor: endpoints.includes(option.value) ? '#24a0ed' : '#FAFBFC', color: endpoints.includes(option.value) ? '#FFFFFF' : '#24292E'}} className='button-4' key={option.key} value={option.value} onClick={handleEndpointChange}>
          {option.value}
        </button>
      ))}<br/>

      {/* <h2>Current Selections:</h2><br/>
      
      <ul>
        {hosted.map((option) => (
          <li>{option}</li>
      ))}
      {embedded.map((option) => (
          <li>{option}</li>
      ))}   
      {endpoints.map((option) => (
          <li>{option}</li>
      ))}
      </ul> */}
      
      <br /><br />

      <button style={{backgroundColor: '#24a0ed', color: '#FFFFFF'}} className='button-4' onClick={handleFileExport}>Create Validation Sheet</button>

    </div>
  );

}

export default App;
