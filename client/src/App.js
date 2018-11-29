import React from 'react';

class MinorApp extends React.Component {
  render(){
    const randomList = ["A", "B", "C", "D", "E"][Math.floor(Math.random() * 5)];
    const whatToDo = ["breathe", "stop", "idk", "open window"];
    const inLineTest = {fontSize: '2.5em', margin: '20px', backgroundColor: 'green', color: 'red'}

    return (
      <ul>
        { randomList }
        { whatToDo.map((element, i) => {
          return <li key={i} style={inLineTest}>{element}</li>
        })}
      </ul>
    );
  }
}

class App extends React.Component {
  render(){
    return (
      <div>
        <h2>Simple Test</h2>
        <MinorApp />
      </div>
    );
  }
}

export default App;
