import React, {Component} from 'react';
import Toolbar from './components/toolbar'
import MessageList from './components/messageList'
import Compose from './components/compose'

class App extends Component {
  state = {
    messagez: [],
    selectAllClass: "-minus",
    composeVisible: false
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({messagez: json})
  }

  patchBlock = async (id, command, prop, value) => {
    let item = {
      messageIds: id,
      command: command,
      [prop]: value
    }
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const message = await response.json()
    this.setState({messagez: message})
  }

  createMessage = async(subject,body)=>{
    let item = {
      id: this.state.messagez.length + 1,
      subject: "subject",
      body: "body"
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const message = await response.json()
    this.setState({messagez: message})
  }

  toggleRead = (e) => {
    let index = this.state.messagez.indexOf(e)
    let selectedMessage = this.state.messagez.slice(0)
    selectedMessage[index].read = true
    this.setState({messagez: selectedMessage})
  }
  toggleReadSelect = async (truFals) => {
    // this.state.messagez.forEach(e => {
    // if (e.selected) {
    //   e.read = thing
    // }
    // })
    // this.setState({messagez: this.state.messagez})
    // let index = e.id
    // let selectedMessage = this.state.messagez.slice(0)
    // let star = selectedMessage.filter(e => e.id === index)[0]

    let messageId = this.state.messagez.filter(e => e.selected).map(e => e.id)
    // let isRead = this.state.messagez.filter(e => e.selected === true).forEach(e => e.read = truFals)

    let item = {
      messageIds: messageId,
      command: 'read',
      'read': truFals
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const message = await response.json()
    this.toggleSelectAll()
    this.setState({messagez: message})
  }

  toggleStar = async (e) => {
    let index = this.state.messagez.indexOf(e) + 1
    let selectedMessage = this.state.messagez.slice(0)
    // selectedMessage[index].starred = !selectedMessage[index].starred
    let star = selectedMessage.filter(e => e.id === index)[0]
    let isStarred = star.starred ? star.starred = false : star.starred = true

    // this.patchBlock([index], 'star', 'starred', isStarred)

    let item = {
      messageIds: [index],
      command: 'star',
      'starred': isStarred
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const message = await response.json()
    this.setState({messagez: message})
  }

  toggleSelect = (e) => {
    let index = this.state.messagez.indexOf(e)
    let selectedMessage = this.state.messagez.slice(0)
    selectedMessage[index].selected = !selectedMessage[index].selected

    this.setState({messagez: selectedMessage})

    if (this.allSelected() === "some") {
      this.state.selectAllClass = "-minus"
    }
    else if(this.allSelected()){
      this.state.selectAllClass = "-check"
    }

    this.setState({selectAllClass: this.state.selectAllClass})
  }

  toggleSelectAll = () => {
    let selectedMessages = this.state.messagez.slice(0)

    if (!this.allSelected()) {
      this.state.selectAllClass = "-check"
      this.setState({selectAllClass: "-check"})
      selectedMessages.forEach((e) => {
        e.selected = true
      })
    } else if (this.allSelected()) {
      this.state.selectAllClass = ""
      this.setState({selectAllClass: ""})
      selectedMessages.forEach((e) => {
        e.selected = false
      })
    } else if (this.allSelected() === "some") {
      this.state.selectAllClass = "-minus"
      this.setState({selectAllClass: this.state.selectAllClass})
    }
    this.setState({messagez: selectedMessages})
  }

  allSelected = () => {
    let counter = 0
    this.state.messagez.forEach(e => {
      if (e.selected) {
        counter++
      }
    })
    if (counter === this.state.messagez.length) {
      return true
    } else if (counter === 0) {
      return false
    } else {
      return "some"
    }
  }

  deleteSelected = async() => {
    // this.state.messagez.forEach(e => {
    //   let index = this.state.messagez.indexOf(e)
    //   if (e.selected) {
    //     this.state.messagez.splice(index, 1)
    //   }
    // })
    // this.setState({messagez: this.state.messagez})

    let messageId = this.state.messagez.filter(message => message.selected).map(message => message.id)
    let noDelete = this.state.messagez.filter(message => message.selected !== true)

    let item = {
      messageIds: messageId,
      command: 'delete'
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const message = await response.json()
    this.setState({messagez: message})
  }

  getUnRead = () => {
    let counter = 0
    this.state.messagez.forEach(e => {
      if (!e.read) {
        counter++
      }
    })
    return counter;
  }

  addLabel = async(label) => {
    // this.state.messagez.forEach(e => {
    //   if (e.selected && !e.labels.includes(label)) {
    //     e.labels.push(label)
    //   }
    // })
    // this.setState({messagez: this.state.messagez})
    let messageId = this.state.messagez.filter(message => message.selected).map(message => message.id)


    let item = {
      messageIds: messageId,
      command: 'addLabel',
      "label": label
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const message = await response.json()
    this.setState({messagez: message})
  }
  removeLabel = async(label) => {
    // this.state.messagez.forEach(e => {
    //   let index = e.labels.indexOf(label)
    //   if (e.selected && e.labels.includes(label)) {
    //     e.labels.splice(index, 1)
    //   }
    // })
    // this.setState({messagez: this.state.messagez})
    let messageId = this.state.messagez.filter(message => message.selected).map(message => message.id)
    let item = {
      messageIds: messageId,
      command: 'removeLabel',
      "label": label
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const message = await response.json()
    this.setState({messagez: message})



  }

  toggleCompose = () => {
    if(!this.state.composeVisible){
      this.setState({composeVisible:true})
      return <Compose/>
    }
    else return
  }

  render() {
    return (<div className="container">
      <Toolbar toggleSelectAll={this.toggleSelectAll} selectAllClass={this.state.selectAllClass} toggleReadSelect={this.toggleReadSelect} toggleUnreadSelect={this.toggleUnreadSelect} deleteSelected={this.deleteSelected} getUnRead={this.getUnRead} addLabel={this.addLabel} removeLabel={this.removeLabel} toggleCompose={this.toggleCompose}/>
      <Compose createMessage={this.createMessage}/>
      <MessageList messages={this.state.messagez} toggleRead={this.toggleRead} toggleStar={this.toggleStar} toggleSelect={this.toggleSelect}/>
    </div>);
  }
}

export default App;
