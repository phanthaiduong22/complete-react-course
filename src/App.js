import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import Person from './components/Person'
// import Radium, { StyleRoot } from 'radium'

const StyledButton = styled.button`
      background-color: ${props => props.alt ? 'red' : 'green'};
      color: white;
      front: inherit;
      border: 3px solid blue;
      padding: 8px;
      cursor: pointer;

      &:hover {
        background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
        color: black;
      }
`

class App extends Component {
  constructor() {
    super();
    this.state = {
      persons: [
        { id: 1, name: 'Duong', age: 18 },
        { id: 2, name: 'Toan', age: 19 },
        { id: 3, name: 'BaoBe', age: 17 }
      ],
      showPerson: true
    }
  }
  onButtonSubmit = (newName) => {
    console.log('submited')
    this.setState({
      persons: [
        { name: newName, age: 18 },
        { name: 'Toan', age: 19 },
        { name: 'BaoBe', age: 17 }
      ]
    })
  }

  deletePersonHandler = (personIndex) => {
    let persons = this.state.persons;
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    })

    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState({ persons: persons })
  }

  toggleShowPerson = () => {
    this.setState({ showPerson: !this.state.showPerson })
  }
  render() {
    // Inline Style
    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   front: 'inherit',
    //   border: '3px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // }

    let persons = null
    if (this.state.showPerson) {
      persons = (
        < div >
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => { this.nameChangeHandler(event, person.id) }}
            />
          })}
        </div>
      );
      // style.backgroundColor = 'red'
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }
    }

    let classes = []
    if (this.state.persons.length <= 2) {
      classes.push('red')
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold')
    }

    return (
      <div className='App' >
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <StyledButton
          className={classes.Button}
          alt={this.state.showPerson}
          // style={style}
          // onClick={this.onButtonSubmit.bind(this, 'Hu')}>Switch name</button>
          onClick={this.toggleShowPerson}>Toggle Person</StyledButton>
        {/* () => this.onButtonSubmit('Max') */}
        {persons}
      </div>
    )
  }
}

export default App;


//StyledButton