import { Component } from 'react'
import "./style/Task.css"

import TaskItemDetail from './TaskItemDetail';

export default class TaskDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: false,
            checked: false,
        }
    }


    componentDidMount() {
        console.log("Component did mount")
        this.setState({
            ...this.state,
            checked: false
        })

    }

    componentWillUnmount() {
        console.log("Component un mount")
        // this.setState({
        //     ...this.state,
        //     checked: false
        // })

    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextState);
    //     console.log(nextProps);
    //     return true;
    // }

    // componentWillUpdate(nextProps, nextState) {
    //     // console.log(nextProps);

    //     // this.setState({
    //     //     ...this.state,
    //     //     checked: false
    //     // })

    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.resetCheck === true) {
        this.setState({
            checked: false,
        });
        }
    }

    componentDidUpdate() {
        console.log("ss");
    }

    onDetail = () => {
        this.setState({ ...this.state, detail: !this.state.detail });
    }


    update = (data) => {
        this.props.update(data);
    }

    onRemove = () => {

        this.props.onRemove(this.props.info);
    }

    check = (e) => {
        this.setState({
            ...this.state,
            checked: !this.state.checked
        });
        this.props.check(this.props.info, e.target.checked);
    }

    render() {
        let { info } = this.props;
        
        return (
            <div>
                <div className="task-item">
                    <div className="form-check-inline">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" onChange={this.check} checked={this.state.checked} /> {info.title}
                        </label>
                    </div>
                    <div className="button d-flex">
                        <button className="btn btn-info btn-css " onClick={this.onDetail}>
                            Detail
                        <i className="fas fa-info-circle" style={{ marginLeft: "2px" }}></i>
                        </button>
                        <button className="btn btn-danger btn-css" onClick={this.onRemove}>Remove <i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <TaskItemDetail info={this.props.info} detail={this.state.detail} update={this.props.update} />

            </div>
        )
    }
}
