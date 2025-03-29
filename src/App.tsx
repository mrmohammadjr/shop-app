import React from 'react';
import { Header,SmallHeader } from './components/Header'
import Footer from './components/Footer'
import Routers from './Router'
import 'primeicons/primeicons.css';
function App() {
  return (
    <div className="">
      <Header />
      <SmallHeader />
      <Routers />
      <Footer />
    </div>
  );
}

export default App;
