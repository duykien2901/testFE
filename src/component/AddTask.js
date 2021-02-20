import React from "react";
import "./style/AddTask.css";
import { useEffect, useState } from "react";

function AddTask(props) {
	var date =`${new Date().getFullYear()}` +"-" +`${new Date().getMonth() + 1 < 10 ? "0" : ""}` +`${new Date().getMonth() + 1}` +"-"+`${new Date().getDate() < 10 ? "0" : ""}` +`${new Date().getDate()}`;
	const [state, setState] = useState({
		id: "",
		title: "",
		description: "",
		dueDate: date,
		piority: "",
	});

	const [alert, setAlert] = useState(0);

	var todo = [];
	var reset = { id: "", title: "", description: "", dueDate: date, piority: "" };
	todo = JSON.parse(localStorage.getItem("todo"));
	if (todo == null) todo = [];

	const onClick = () => {
		if (state.title === "") {
			setAlert(1);
			setTimeout(() => {
				setAlert(0);
			}, 1000);
		} else if (state.dueDate < date) {
			setAlert(2);
			setTimeout(() => {
				setAlert(0);
			}, 1000);
		} else {
			setState(reset);
			props.add(state);
		}
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};
	return (
		<div className="col-xl-4 col-lg-4 col-md-12 addTask">
			{alert === 0 ?"": <div className="alert">{(alert === 1 ? "Chưa nhập title":"Nhập lại Due Date")}<i className="fas fa-exclamation-triangle" style = {{marginLeft: "7px"}}></i></div>}
			<div className="title" style = {{marginTop: "10px"}}>New Task</div>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="Add new task..."
					style = {{margin: "10px 0"}}
					name="title"
					value={state.title}
					required
					onChange={onChange}
				/>
				<label htmlFor="des" className="lab" style = {{margin: "10px 0 5px 0"}}>
					Description
          		</label>
				<textarea
					name="description"
					id="des"
					rows="5"
					className="textArea"
					value={state.description}
					onChange={onChange}
				></textarea>

				<div className="date-piority">
					<div className="date">
						<label htmlFor="date" className="dueDate">Due Date</label>
						<input
							type="date"
							className="form-control"
							id="date"
							name="dueDate"
							value={state.dueDate}
							onChange={onChange}
						/>
					</div>
					<div className="piority">
						<label htmlFor="piority" className="dueDate">Piority</label>
						<select
							className="form-control piority-select"
							id="piority"
							name="piority"
							onChange={onChange}
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
					onClick={onClick}
				>
					Add
					
          		</button>
			</div>
		</div>
	);
}

export default AddTask;
