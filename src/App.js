import React, {Component} from 'react';
import logo from './logo.svg';
import Toolbar from './components/toolbar'
import MessageList from './components/messageList'
import Compose from './components/compose'

let messagez = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  }, {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  }, {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  }, {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  }, {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  }, {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  }, {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  }, {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

class App extends Component {
  state = {
    messagez: messagez,
    selectAllClass : "-minus"
  }

  toggleRead=(e)=>{
    let index = this.state.messagez.indexOf(e)
    let selectedMessage = this.state.messagez.slice(0)
    selectedMessage[index].read = true
    this.setState({
      messagez: selectedMessage
    })
  }
  toggleReadSelect=(thing)=>{
    this.state.messagez.forEach(e=>{
      if(e.selected){
        e.read = thing
      }
    })
    this.setState({
      messagez: messagez
    })
  }
  toggleStar=(e)=>{
    let index = this.state.messagez.indexOf(e)
    let selectedMessage = this.state.messagez.slice(0)
    selectedMessage[index].starred = !selectedMessage[index].starred
    this.setState({
      messagez: selectedMessage
    })
  }
  toggleSelect=(e)=>{
    let index = this.state.messagez.indexOf(e)
    let selectedMessage = this.state.messagez.slice(0)
    selectedMessage[index].selected = !selectedMessage[index].selected

    this.setState({
      messagez: selectedMessage
    })

    if(this.allSelected() === "some"){
      this.state.selectAllClass = "-minus"
    }

    this.setState({
      selectAllClass: this.state.selectAllClass
    })
  }

  toggleSelectAll=()=>{
    let selectedMessages = this.state.messagez.slice(0)

    if(!this.allSelected()){
      this.state.selectAllClass= "-check"
      this.setState({
        selectAllClass: "-check"
      })
      selectedMessages.forEach((e)=>{
        e.selected = true
      })
    }
    else if(this.allSelected()){
      this.state.selectAllClass= ""
      this.setState({
        selectAllClass: ""
      })
      selectedMessages.forEach((e)=>{
        e.selected = false
      })
    }
    else if(this.allSelected() === "some"){
      this.state.selectAllClass= "-minus"
      this.setState({
        selectAllClass: this.state.selectAllClass
      })
    }
    this.setState({
      messagez: selectedMessages
    })
  }

  allSelected=()=>{
    let counter = 0
    this.state.messagez.forEach(e=>{
      if(e.selected){
        counter++
      }
    })
    if(counter === this.state.messagez.length){
      return true
    }
    else if(counter === 0){
      return false
    }
    else {
      return "some"
    }
  }

  deleteSelected=()=>{
    let result = []

    this.state.messagez.forEach(e=>{
      let index = this.state.messagez.indexOf(e)
      if(e.selected){
        this.state.messagez.splice(index,1)
      }
    })
    this.setState({
      messagez: this.state.messagez
    })
  }

  getUnRead=()=>{
    let counter = 0
    this.state.messagez.forEach(e=>{
      if(!e.read){
        counter++
      }
    })
    return counter;
  }

  addLabel=(label)=>{
    this.state.messagez.forEach(e=>{
      if(e.selected && !e.labels.includes(label)){
        e.labels.push(label)
      }
    })
    this.setState({
      messagez:this.state.messagez
    })
  }
  removeLabel=(label)=>{
    this.state.messagez.forEach(e=>{
      let index = e.labels.indexOf(label)
      if(e.selected && e.labels.includes(label)){
        e.labels.splice(index,1)
      }
    })
    this.setState({
      messagez:this.state.messagez
    })
  }


  render() {
    return (<div className="container">
      <Toolbar
        toggleSelectAll={this.toggleSelectAll}
        selectAllClass={this.state.selectAllClass}
        toggleReadSelect={this.toggleReadSelect}
        toggleUnreadSelect={this.toggleUnreadSelect}
        deleteSelected={this.deleteSelected}
        getUnRead={this.getUnRead}
        addLabel={this.addLabel}
        removeLabel={this.removeLabel}

      />
      {/* <Compose/> */}
      <MessageList
        messages={this.state.messagez}
        toggleRead={this.toggleRead}
        toggleStar={this.toggleStar}
        toggleSelect={this.toggleSelect}
      />
    </div>);
  }
}

export default App;
