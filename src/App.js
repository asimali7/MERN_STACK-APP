import React, { Component } from "react";
import axios from "axios";
import Body from "./Body";

class App extends Component {
  state = {
    date: new Date().toLocaleDateString(),
    curtime: new Date(),
    list: [],
    lists: [],
    text: "",
    value: 0,
    editingmode: false,
  };
  componentDidMount = () => {
    axios.get("http://localhost:8080/add/").then((res) => {
      this.setState({ lists: res.data });
    });
  };

  timedate() {
    setInterval(() => {
      this.setState({ curtime: new Date() });
    }, 1000);
  }
  handleinput = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  addlist = (e) => {
    const lists = {
      text: this.state.text,
      value: this.state.value,
      editingmode: this.state.editingmode,
    };
    axios
      .post("http://localhost:8080/add/", lists)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
    this.setState({ text: "" });
  };
  handleIncrement = (counter) => {
    const list = [...this.state.lists];
    const index = list.findIndex((t) => t._id === counter);

    axios
      .patch(`http://localhost:8080/add/counter/${counter}`, {
        value: list[index].value++,
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
    this.setState({ lists: list });

    console.log({ list });
  };
  handleDecrement = (counter) => {
    const list = [...this.state.lists];
    const index = list.findIndex((t) => t._id === counter);

    axios
      .patch(`http://localhost:8080/add/counter/${counter}`, {
        value: list[index].value--,
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
    this.setState({ lists: list });
    console.log({ list });
  };
  handlereset = () => {
    const lists = [...this.state.lists];
    lists.map((c) => (c.value = 0));
    // const list = this.state.lists.map((c) => {
    //   c.value = 0;
    //   return c;
    // });
    axios
      .patch(`http://localhost:8080/add/reset/`, {
        value: (lists.value = 0),
      })
      .then((res) => console.log(res.data));
    this.setState({ lists });
    console.log({ lists });
  };

  deletelist = (key) => {
    axios
      .delete("http://localhost:8080/add/" + key)
      .then((res) => console.log(res.data));
    const list = this.state.lists.filter((list) => list._id !== key);
    this.setState({ lists: list });
  };
  editvalue = (counter) => {
    const list = [...this.state.lists];
    list.forEach((lists) => {
      if (lists._id === counter) {
        lists.editingmode = true;
      }
    });
    axios
      .patch(`http://localhost:8080/add/edit/${counter}`, {
        editingmode: (list.editingmode = true),
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });

    const data = [...list];
    this.setState({ lists: data });
    console.log({ counter });
  };
  onsavetext = (counter, text) => {
    const list = [...this.state.lists];
    list.forEach((lists) => {
      if (lists._id === counter) {
        lists.editingmode = false;
        lists.text = text;
      }
    });
    axios
      .patch(`http://localhost:8080/add/save/${counter}`, {
        editingmode: (list.editingmode = false),
        text: (list.text = text),
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
    const data = [...list];
    this.setState({ lists: data });
    console.log({ data });
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <label>Enter Task</label>

          <input
            type="text"
            placeholder="Enter task"
            value={this.state.text}
            onChange={this.handleinput}
          />
          <button onClick={this.addlist} className={"btn btn-primary btn-sm"}>
            Add Task
          </button>
          <button onClick={this.handlereset} className="btn btn-sm btn-danger">
            Reset number of person
          </button>
          <span
            className="badge badge-danger"
            style={{ fontSize: 14, paddingTop: 10 }}
          >
            {this.state.date} {this.state.curtime.toLocaleTimeString()}
            {this.timedate()}
          </span>
        </nav>
        <Body
          lists={this.state.lists}
          handleIncrement={this.handleIncrement}
          handleDecrement={this.handleDecrement}
          handledelete={this.deletelist}
          onEdit={this.editvalue}
          onSave={this.onsavetext}
        />
      </div>
    );
  }
}

export default App;
