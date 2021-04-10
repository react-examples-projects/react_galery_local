import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'suneditor/dist/css/suneditor.min.css'; 
import Routers from './routers/Routers';

ReactDOM.render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>,
  document.getElementById('root')
);
