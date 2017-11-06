import React from 'react';
import ReactDOM from 'react-dom';
import ChargeInfo from '../components/ChargeInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChargeInfo chargeData={{chargeData:{}}}/>, div);
});
