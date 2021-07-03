import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Testimonials from './Components/Testimonials';
import Portfolio from './Components/Portfolio';


const App = () => {
  const [state, setState] = useState({
    foo: 'bar',
    resumeData: {},
    errorMessage: '',
  })

  useEffect(() => {
    function getData() {
      axios.get(`/resumeData.json`)
        .then(res => {
          setState((prevValue) => {
            return {
              ...prevValue,
              resumeData: res.data
            }
          })
        })
        .catch(error => {
          setState((prevValue) => {
            return {
              ...prevValue,
              errorMessage: error.message
            }
          })
          console.error('There was an error !', error);
        });
    }
    getData();
  }, []);

  if (Object.keys(state.resumeData).length === 0) {
    return (
      <h1>OOPS, something went wrong</h1>
    )
  }

  ReactGA.initialize('UA-110570651-1');
  ReactGA.pageview(window.location.pathname);
  return (
    <div className="App">
      <Header data={state.resumeData.main} />
      <About data={state["resumeData"]["main"]} />
      <Resume data={state.resumeData.resume} />
      <Portfolio data={state.resumeData.portfolio} />
      {/* <Testimonials data={state.resumeData.testimonials} /> */}
      <Contact data={state.resumeData.main} />
      <Footer data={state.resumeData.main} />
    </div>
  );
}

export default App;
