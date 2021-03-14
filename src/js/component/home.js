import React, { useState, useEffect } from "react";

export function Home() {
	const [listaTareas, setListaTareas] = useState([]);
	const [todo, setTodo] = useState("");
	let nuevaTarea = "a";

	useEffect(() => {
		getTareas();
	});

	const addTodo = () => {
		let item = {};
		item.label = todo;
		item.done = false;
		listaTareas.push(item);
		putTareas(listaTareas);
		setListaTareas(listaTareas);
	};

	const handleRemoveItem = label => {
		const newList = listaTareas.filter(item => item.label !== label);
		console.log(newList);
		setListaTareas(newList);
		putTareas(newList);
		console.log(listaTareas);
	};

	function getTareas() {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/jaimecerdas",
			requestOptions
		)
			.then(response => response.json())
			.then(result => setListaTareas(result))
			.catch(error => console.log("error", error));
	}

	async function putTareas(listaTareas) {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(listaTareas);
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/jaimecerdas",
			requestOptions
		)
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
		setTodo("");
	}

	return (
		<div className="text-center mt-5">
			<h1>To Do List!</h1>
			<input
				type="text"
				onChange={e => setTodo(e.target.value)}
				placeholder="Enter your To do"
				value={todo}></input>
			<button
				onClick={() => {
					addTodo();
				}}>
				Add
			</button>
			<ul className="list-group">
				{listaTareas.map((item, index) => {
					return (
						<div key={index} className="container">
							<li key={index} className="list-group-item">
								{" "}
								{item.label}
								<span
									className="text-left"
									onClick={() =>
										handleRemoveItem(item.label)
									}>
									{"             "}x{" "}
								</span>
							</li>
						</div>
					);
				})}
			</ul>
		</div>
	);
}
