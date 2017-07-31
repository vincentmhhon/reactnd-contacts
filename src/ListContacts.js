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

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state

    let showContacts 
    if (query) {
      const match = new RegExp(escapeStringRegexp(query), 'i')
      showContacts = contacts.filter((contact) => match.test(contact.name))
    }
    else {
      showContacts = contacts
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
          <a 
            href='#create'
            onClick={this.props.onNavigate}
            className='add-contact'
          >Add Contact</a>
        </div>

        {showContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

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
              <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
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