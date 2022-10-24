import { Component } from "react";


export default class ConfirmModal extends Component {
  render = () => {
    let text = this.props.children;
    return (
      <div className={"modal fade" + (this.props.show ? " show" : "") } style={this.props.show ? {display: "block"} : {}} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmation Modal</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                      onClick={ this.props.onClose }/>
            </div>
            <div className="modal-body">
              { text }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                      onClick={ this.props.onClose }>Close
              </button>
              <button type="button" className="btn btn-primary" onClick={ this.props.onConfirm }>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    )
  }


}