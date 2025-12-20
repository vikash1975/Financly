import React from 'react'
import { Button,Modal, Form, Input, DatePicker,Select } from 'antd'

function AddExpenseModal({
isExpenseModalVisible,handleExpenseCancel,onFinish,
}) {
    const [form]=Form.useForm();
    return(
        <Modal style={{fontSize:600}}
               title="Add Expense"
               open={isExpenseModalVisible}
               onCancel={handleExpenseCancel}
               footer={null}>
      
      <Form
           form={form}
           layout='vertical'
           onFinish={(values)=>{
            onFinish(values,"expense")
            form.resetFields();
           }}
           >

            <Form.Item
                     style={{fontWeight:600}}
                     label="Name"
                     name="name"
                     rules={[
                        {
                            required:true,
                            message:"Please input the name of the transaction",

                        }
                     ]}
                     >
                        <Input type="text" className='custom-input' />
                     </Form.Item>


                <Form.Item style={{fontWeight:600}}
                           label="Amount"
                           name="amount"
                           rules={[
                            {
                                required:true,message:"Please input the expense amount",
                            }
                           ]}
                           >
                          <Input type="number" className='custom-input' />
                </Form.Item>
                
                 <Form.Item style={{fontWeight:600}}
                           label="Date"
                           name="date"
                           rules={[
                            {
                                required:true,message:"Please select the expense date!",
                            }
                           ]}
                           >
                            <DatePicker className='custom-input' format="YYYY-MM-DD" />
                           </Form.Item>



                   <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Select category" }]}
        >
          <Select placeholder="Choose category">
          
  <Select.Option value="food">Food</Select.Option>
  <Select.Option value="rent">Rent</Select.Option>
  <Select.Option value="travel">Travel</Select.Option>
  <Select.Option value="shopping">Shopping</Select.Option>
  <Select.Option value="education">Education</Select.Option>
  <Select.Option value="other">Other</Select.Option>

          </Select>
        </Form.Item>

        {/* Button */}
        <Button type="primary" htmlType="submit" block>
          Add Expense
        </Button>



           </Form>


               </Modal>
    )
}

export default AddExpenseModal