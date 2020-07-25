import React from 'react';
import { Router } from '@reach/router';
import Index from './components/Index';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  return (
    <div className="App">
      <Router>
        <Index path="/" />
        <PrivacyPolicy path="/privacy-policy" />
      </Router>
    </div>
  );
}

export default App;
