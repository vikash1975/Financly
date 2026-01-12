import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

const { Option } = Select;

function AddIncomeModal({
  isIncomeModalVisible,
  handleIncomeCancel,
  onFinish,
}) {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add Income"
      open={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields();
        }}
      >
        {/* Source */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Salary / Freelance / Bonus" />
        </Form.Item>

        {/* Amount */}
        <Form.Item
          label="Amount (₹)"
          name="amount"
          rules={[{ required: true, message: "Enter amount" }]}
        >
          <Input type="number" prefix="₹" />
        </Form.Item>

        {/* Date */}
        <Form.Item
          label="Income Date"
          name="date"
          rules={[{ required: true, message: "Select date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Select category" }]}
        >
          <Select placeholder="Choose category">
            <Option value="salary">Salary</Option>
            <Option value="salary">Freelance</Option>
            <Option value="business">Business</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

         <Button type="primary" htmlType="submit" block>
          Add Income
        </Button>
      </Form>
    </Modal>
  );
}

export default AddIncomeModal;
