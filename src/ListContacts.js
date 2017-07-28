import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeStringRegexp from 'escape-string-regexp'

class ListContacts extends Component {
  
  static protoTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }
  
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }
  render() {
    let showContacts 
    if (this.state.query) {
      const match = new RegExp(escapeStringRegexp(this.state.query), 'i')
      showContacts = this.props.contacts.filter((contact) => match.test(contact.name))
    }
    else {
      showContacts = this.props.contacts
    }
    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input 
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={this.state.query}
            onChangeCapture={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <ol className='contact-list'>
          {showContacts.map((contact) => 
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>
            </li>
          )}
        </ol>
      </div>

    )
  }
}

export default ListContacts