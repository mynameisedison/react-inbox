import React, {Component} from 'react'
import Message from './message'

class MessageList extends Component {
  render() {
    return (
      <div>
        {this.props.messages.map(e=>{
        return  <Message
          key={e.id}
          message={e}
          subject={e.subject}
          read={e.read}
          starred={e.starred}
          selected={e.selected}
          labels={e.labels}
          toggleRead={this.props.toggleRead}
          toggleStar={this.props.toggleStar}
          toggleSelect={this.props.toggleSelect}/>
        })
      }
      </div>
    )
  }
}
export default MessageList
