import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Custom patch for Quill
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Handle the newly inserted node
        const addedNode = mutation.addedNodes[0];
        // Your logic for the added node
      }
    });
  });
  
  // Start observing
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <App />
        <div className='loaderBox d-none'>
            <div className="custom-loader"></div>
        </div>

    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
