
import './App.css';
import AddTask from './component/AddTask';
import "./component/style/AddTask.css"
import {Component, useState} from 'react'
import Task from './component/Task';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			removeIndex: [],
			reset: false,
			resetCheck: false,
			alert: 0
		}
	}

	
	componentWillMount() {
		
		let tasks = JSON.parse(localStorage.getItem('todo'));
		if(tasks === null) tasks = [];
		this.setState({
			...this.state,
			tasks: tasks
		});
	}

	s4() {
		return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
	}

	generateId() {
		return this.s4() + this.s4() + '-' + this.s4() + "*" + this.s4() + this.s4() + "-" + this.s4();
	}

	add = (data) => {
		let {tasks} = this.state;
		
		if(data.id === "") {
			data.id = this.generateId();
		}
		tasks.push(data);
		this.setState({
			tasks
		})
		localStorage.setItem('todo', JSON.stringify(tasks));
	}

	// tim index
	findIndex = (task) => {
		let {tasks} = this.state;
		for(let i = 0; i < tasks.length; i++) {
			if(task.id === tasks[i].id) {
				return i;
			}
		}
	}

	update = (data) => {
	
		let {tasks} = this.state;
		let index = this.findIndex(data);
		tasks.splice(index, 1, data);
		this.setState({
			...this.state,
			tasks
		})
		localStorage.setItem('todo', JSON.stringify(tasks));
		
	}

	onRemove = (data) => {
		let {tasks} = this.state;
		let index = this.findIndex(data);
		
		tasks.splice(index, 1);

		localStorage.setItem('todo', JSON.stringify(tasks));
		this.setState((state) =>{  return {
			...state,
			tasks
		}});

		
		
	}

	check = (data, checked) => {
		let {removeIndex} = this.state;
		
		let index = this.findIndex(data);
        if(checked && removeIndex.indexOf(index) < 0) {
            removeIndex.push(index);
        }
        if(!checked && removeIndex.indexOf(index) >= 0) {
            removeIndex.splice(removeIndex.indexOf(index), 1);
        }
        
        this.setState({...this.state, removeIndex});
      
        if(removeIndex.length == 0) {
            this.setState({...this.state, reset: false});
        } else {
            this.setState({...this.state, reset: true});
        }
	}

	onRemoveAll = () => {
		let {tasks, removeIndex} = this.state;
		let t = [];
		for(let i = 0; i < tasks.length; i++) {
			if(removeIndex.indexOf(i) < 0) {
				t.push(tasks[i]);
			}
		}
		this.setState({
			...this.state,
			tasks: t,
			reset: false,
			resetCheck: false,
			removeIndex: []
		})
		localStorage.setItem('todo', JSON.stringify(t));
	
		
		
	}

	search = (data) => {
		let {tasks} = this.state;
		
		let filter = [];
		for(let i = 0; i < tasks.length; i++) {
			if(tasks[i].title.indexOf(data.toLowerCase()) >= 0) {
				filter.push(tasks[i]);
			}
		}
		console.log(filter);
		
	}
	render(){
		let {tasks} = this.state;
	
		return (
			<div className = "container">
				<div className="row">
			
					<div className="col-xl-1 col-lg-1 col-md-1"></div>
					<AddTask add = {this.add}/>
					<div className="col-xl-1 col-lg-1 col-md-1"></div>
					<Task 
						data = {tasks}
						update = {this.update}
						onRemove = {this.onRemove}
						check = {this.check}
						reset = {this.state.reset}
						onRemoveAll = {this.onRemoveAll}
						resetCheck = {this.state.resetCheck}
						search = {this.search}
						// resetAll = {this.resetAll}
					/>
					<div className="col-xl-1 col-lg-1 col-md-1"></div>
				</div>
			</div>
		);
	}
}

export default App;
