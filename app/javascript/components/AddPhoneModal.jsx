import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";

const { Option } = Select;

class AddPhoneModal extends React.Component {
	formRef = React.createRef();
	state = {
		visible: false,
	};

	onFinish = (values) => {
		const url = "api/v1/phones/";
		fetch(url, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((data) => {
				if (data.ok) {
					this.handleCancel();

					return data.json();
				}
				throw new Error("Network error.");
			})
			.then(() => {
				this.props.reloadBeers();
			})
			.catch((err) => console.error("Error: " + err));
	};

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleCancel = () => {
		this.setState({
			visible: false,
		});
	};

	render() {
		return (
			<>
				<Button type="primary" onClick={this.showModal}>
					Create New +
				</Button>

				<Modal
					title="Add New Phone ..."
					visible={this.state.visible}
					onCancel={this.handleCancel}
					footer={null}
				>
					<Form ref={this.formRef} layout="vertical" onFinish={this.onFinish}>
						<Form.Item
							name="brand"
							label="Brand"
							rules={[
								{ required: true, message: "Please input your phones's brand!" },
							]}
						>
							<Input placeholder="Input your phones's brand" />
						</Form.Item>

						<Form.Item
							name="country_origin"
							label="Country"
							rules={[
								{
									required: true,
									message: "Please input your phones country origin!",
								},
							]}
						>
							<Select
								showSearch
								placeholder="Select your origin country"
								optionFilterProp="children"
								style={{ width: "100%" }}
							>
								<Option value="Finland">China</Option>
								<Option value="Germany">India</Option>
								<Option value="Netherlands">Korea</Option>
								<Option value="UK">UK</Option>
								<Option value="USA">USA</Option>
								<Option value="Other">Other</Option>
							</Select>
						</Form.Item>

						<Form.Item
							name="quantity"
							label="Quantity"
							rules={[
								{ required: true, message: "Please input the quantity!" },
							]}
						>
							<Input type="number" placeholder="How many you desire?" />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Modal>
			</>
		);
	}
}

export default AddPhoneModal;