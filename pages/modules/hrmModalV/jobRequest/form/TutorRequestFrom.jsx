import React from 'react';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { useCallback, useState } from 'react';

const TutorRequestFrom = (props) => {
    const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 6,
        span: 16,
      },
    };


    const style = {
      background: '#0092ff',
      padding: '8px 0',
    };


  return (
    <Modal
    title={setEditData != null ? 'Update City' : 'Add City'}
    style={{ top: 5 }}
    centered
    open={isModalOpen}
    footer={null}
    onOk={() => setIsModalOpen(false)}
    onCancel={() => setIsModalOpen(false)}
    // style={{ marginTop: '5vh' }}
    width={1200}
    responsive={{
      // Define different widths for different screen sizes
      xs: 300,
      sm: 500,
      md: 800,
      lg: 1000,
      xl: 1200,
      xxl: 1400,
    }}
  >
    <Form
      className='mt-3'
      {...layout}
      {...setEditData}
      form={form}
      name="control-hooks"
      // onFinish={onFinish}
      style={{
        maxWidth: 1200,
      }}
    >

<Row>
      <Col style={style} span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
   

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  </Modal>
  )
}

export default TutorRequestFrom