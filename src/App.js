import React, { Component } from 'react'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts : [],
    screen: 'list'
  }
  
  componentDidMount() {
    ContactAPI.getAll().then(
      (contacts) => this.setState({contacts})
    )
  }

  removeContact = (contact) => {
    this.setState( (state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
    ContactAPI.remove(contact)
  }

  render() {
    return (
      <div className='app'>
        {this.state.screen === 'list' &&
        (
          <ListContacts 
            onDeleteContact={this.removeContact}
            onNavigate={() => {
              this.setState({ screen: 'create'})
            }} 
            contacts={this.state.contacts}
          />
        )}
        {this.state.screen === 'create' &&
        (
          <CreateContact />
        )}
      </div>      
    )
  }
}

export default App;
