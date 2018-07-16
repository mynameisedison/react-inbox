import React, {Component} from 'react';

class Message extends Component {
  render() {

    const readClass = this.props.read ? "read" : "unread"
    const starClass = this.props.starred ? "fa-star" : "fa-star-o"
    const labels = this.props.labels
    let selectedClass = this.props.selected ? "selected" : ""
    let checkedClass = this.props.selected ? "checked" : ""


    return (<div className={`row message ${readClass} ${selectedClass}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2"  onClick={()=>{this.props.toggleSelect(this.props.message)}}>
            <input type="checkbox" checked={`${checkedClass}`}/>
          </div>
          <div className="col-xs-2" onClick={()=>{this.props.toggleStar(this.props.message)}}>
            <i className={`star fa ${starClass}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labels.map(e => <span className="label label-warning">{e}</span>)}
        <span onClick={()=>{this.props.toggleRead(this.props.message)}}>
          {this.props.subject}
        </span>
      </div>
    </div>)
  }
}
export default Message;
