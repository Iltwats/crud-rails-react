import { Table, message, Popconfirm } from "antd";
import React from "react";
import AddPhoneModal from "./AddPhoneModal";

class Phones extends React.Component {
	columns = [
		{
			title: "Brand",
			dataIndex: "brand",
			key: "brand",
		},
		{
			title: "Country",
			dataIndex: "country_origin",
			key: "country",
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "quantity",
		},
		{
			title: "",
			key: "action",
			render: (_text, record) => (
				<Popconfirm
					title="Are you sure delete this Phone?"
					onConfirm={() => this.deletePhone(record.id)}
					okText="Yes"
					cancelText="No"
				>
					<a href="#" type="danger">
						Delete{" "}
					</a>
				</Popconfirm>
			),
		},
	];

	state = {
		beers: [],
	};

	componentDidMount() {
		this.loadPhones();
	}

	loadPhones = () => {
		const url = "api/v1/phones/index";
		fetch(url)
			.then((data) => {
				if (data.ok) {
					return data.json();
				}
				throw new Error("Network error.");
			})
			.then((data) => {
				data.forEach((phone) => {
					const newEl = {
						key: phone.id,
						id: phone.id,
						brand: phone.brand,
						country: phone.country,
						quantity: phone.quantity,
					};

					this.setState((prevState) => ({
						phones: [...prevState.phones, newEl],
					}));
				});
			})
			.catch((err) => message.error("Error: " + err));
	};

	reloadPhones = () => {
		this.setState({ beers: [] });
		this.loadBeers();
	};

	deletePhone = (id) => {
		const url = `api/v1/phones/${id}`;

		fetch(url, {
			method: "delete",
		})
			.then((data) => {
				if (data.ok) {
					this.reloadPhones();
					return data.json();
				}
				throw new Error("Network error.");
			})
			.catch((err) => message.error("Error: " + err));
	};

	render() {
		return (
			<>
				<Table
					className="table-striped-rows"
					dataSource={this.state.phones}
					columns={this.columns}
					pagination={{ pageSize: 5 }}
				/>

				<AddPhoneModal reloadPhones={this.reloadPhones} />
			</>
		);
	}
}

export default Phones;