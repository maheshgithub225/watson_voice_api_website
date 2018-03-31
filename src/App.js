import React, { Component } from 'react';
import Header from './Components/Header/Header';
import AboveMain from './Components/AboveMain/AboveMain';
import MainContent from './Components/MainContent/MainContent';
import Footer from './Components/Footer/Footer';
import logo from './logo.svg';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';



class App extends Component {
  render() {
    

    return (
      <div className="App">
        <Header />
        <AboveMain />
        <MainContent />
        <Footer />
      </div>
    );
  }
}

export default App;
