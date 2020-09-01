import React, { Component } from "react";
class Body extends Component {
  state = {
    text1: "",
  };
  render() {
    return (
      <div>
        {this.props.lists.map((list) => (
          <div key={list._id}>
            <button
              onClick={() => this.props.handleIncrement(list._id)}
              className="btn btn-primary btn-sm"
            >
              +
            </button>
            <button
              disabled={!list.value}
              onClick={() => this.props.handleDecrement(list._id)}
              className="btn btn-primary btn-sm"
            >
              -
            </button>
            <span
              className={
                list.value === 0
                  ? "badge m-2 badge-warning"
                  : "badge m-2 badge-primary"
              }
            >
              Person {list.value === 0 ? "Zero" : list.value}
            </span>
            {list.editingmode === true ? (
              <input
                className="display-none"
                defaultValue={list.text}
                onChange={(e) => this.setState({ text1: e.target.value })}
              />
            ) : (
              <span>{list.text}</span>
            )}
            {list.editingmode === true ? (
              <button
                className="btn m-2 btn-info btn-sm"
                onClick={() => this.props.onSave(list._id, this.state.text1)}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => this.props.onEdit(list._id)}
                className="btn m-2 btn-info btn-sm"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => this.props.handledelete(list._id)}
              className="btn btn-sm btn-danger m-3"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default Body;
