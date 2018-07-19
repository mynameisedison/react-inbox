import React, {Component} from 'react';

export default class Toolbar extends Component {
  render() {


    return (<div className="row toolbar">
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.getUnRead()}</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={()=>this.props.toggleCompose()}>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={()=>this.props.toggleSelectAll()}>
            <i className={`fa fa${this.props.selectAllClass}-square-o`}></i>
          </button>

          <button className="btn btn-default" onClick={()=>this.props.toggleReadSelect(true)}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={()=>this.props.toggleReadSelect(false)}>
            Mark As Unread
          </button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev" onClick={()=>this.props.addLabel("dev")}>dev</option>
            <option value="personal" onClick={()=>this.props.addLabel("personal")}>personal</option>
            <option value="gschool" onClick={()=>this.props.addLabel("gschool")}>gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev" onClick={()=>this.props.removeLabel("dev")}>dev</option>
            <option value="personal" onClick={()=>this.props.removeLabel("personal")}>personal</option>
            <option value="gschool" onClick={()=>this.props.removeLabel("gschool")}>gschool</option>
          </select>

          <button className="btn btn-default" onClick={()=>this.props.deleteSelected()}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>);
  }
}
