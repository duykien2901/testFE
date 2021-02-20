import React, { Component } from "react";
import "./style/Task.css";
export default class TaskItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        alert: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.info) {
        this.setState({
            id: nextProps.info.id,
            title: nextProps.info.title,
            dueDate: nextProps.info.dueDate,
            description: nextProps.info.description,
            piority: nextProps.info.piority,
            detail: nextProps.info.detail,
        });
        }
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value });
    };

    update = () => {
        let {
            alert,
            id,
            title,
            dueDate,
            description,
            piority,
            detail,
        } = this.state;
        
       
        var date =`${new Date().getFullYear()}` +"-" +`${new Date().getMonth() + 1 < 10 ? "0" : ""}` +`${new Date().getMonth() + 1}` +"-"+`${new Date().getDate() < 10 ? "0" : ""}` +`${new Date().getDate()}`;
        let data = {
            id,
            title,
            dueDate,
            description,
            piority,
        };
        if (title === "") {
        this.setState({ ...this.state, alert: 1 });
        setTimeout(() => {
            this.setState({ ...this.state, alert: 0 });
        }, 1000);
        } else if (dueDate < date) {
        this.setState({ ...this.state, alert: 2 });
        setTimeout(() => {
            this.setState({ ...this.state, alert: 0 });
        }, 1000);
        } else {
        this.setState({ ...this.state, alert: 3 });
        setTimeout(() => {
            this.setState({ ...this.state, alert: 0 });
        }, 1000);
        this.props.update(data);
        }
    };

    render() {
        let {
        alert,
        id,
        title,
        dueDate,
        description,
        piority,
        detail,
        } = this.state;
        return !this.props.detail ? (
        ""
        ) : (
        <div className="taskItem">
            {alert === 0 ? (
            ""
            ) : (
            <div
                className="alert2"
                style={
                alert === 3 ? { backgroundColor: "#a0e187", color: "white" } : {}
                }
            >
                {alert === 1
                ? "Chưa nhập title"
                : alert === 2
                ? "Nhập lại Due Date"
                : "Update thành công"}
                { alert === 3 ?  "" : <i
                className="fas fa-exclamation-triangle"
                style={{ marginLeft: "7px" }}
                ></i> }
            </div>
            )}
            <div className="form-group">
            <input
                type="text"
                className="form-control"
                placeholder="Add new task..."
                name="title"
                style={{ margin: "10px 0" }}
                value={title}
                onChange={this.onChange}
            />
            <label htmlFor="des" className="lab">
                Description
            </label>
            <textarea
                name="description"
                id="des"
                rows="5"
                className="textArea"
                value={description}
                onChange={this.onChange}
            ></textarea>

            <div className="date-piority">
                <div className="date">
                <label htmlFor="date">Due Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="dueDate"
                    value={dueDate}
                    onChange={this.onChange}
                />
                </div>
                <div className="piority">
                <label htmlFor="piority">Piority</label>
                <select
                    className="form-control piority-select"
                    id="piority"
                    name="piority"
                    value={piority}
                    onChange={this.onChange}
                >
                    <option defaultValue value="Normal">
                    Normal
                    </option>
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                </select>
                </div>
            </div>
            <button
                className="btn btn-success"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={this.update}
            >
                Update
            </button>
            </div>
        </div>
        );
    }
}
