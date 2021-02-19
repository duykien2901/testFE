import React, { Component } from "react";
import "./style/Task.css";
import TaskDetail from "./TaskDetail";
import { useState, useEffect } from "react";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  removeAll = () => {

    this.props.onRemoveAll();
  };
  update = (data) => {
    this.props.update(data);
  };

  search = (e) => {
    let { value, name } = e.target;
    this.props.search(e.target.value);
    this.setState({
      [name]: value,
    });
  };
  render() {
    var { data } = this.props;

    let filter = [];
    let arrSize = data.length;
    //sap xep theo ngay thang
    for (let i = 0; i < arrSize - 1; i++) {
      for (let j = 0; j < arrSize - i - 1; j++) {
        if (data[j].dueDate > data[j + 1].dueDate) {
          //swap
          let temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].title.indexOf(this.state.title.toLowerCase()) >= 0) {
        filter.push(data[i]);
      }
    }

    var Element = filter.map((task, index) => {
      return (
        <TaskDetail
          info={task}
          key={index}
          check={this.props.check}
          update={this.props.update}
          onRemove={this.props.onRemove}
          resetCheck={this.props.resetCheck}
         
        />
      );
    });
    return (
      <div className="col-xl-5 col-lg-5 col-md-12 task">
        <div className="title">Todo List</div>
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                placeholder="Search . . ."
                style = {{margin: "10px 0"}}
                name="title"
                onChange={this.search}
                value={this.state.search}
            />
            <div className="content">
                {Element}
            </div>
        </div>

        {!this.props.reset ? (
          ""
        ) : (
            <div className="done">
                    <div className = "done-btn">
                        <button className="btn btn-success" style = {{margin: "0 2px"}}>Done</button>
                        <button className="btn btn-danger" style = {{margin: "0 2px"}} onClick={this.removeAll}>
                        remove
                        </button>
                    </div>
            </div>
        )}
      </div>
    );
  }
}

export default Task;
