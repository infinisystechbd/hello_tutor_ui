import { Card, Col, Row, Typography } from 'antd';
import React, { Fragment } from 'react';
const { Text, Link } = Typography;
const dashboard = () => {
  return (
    <Fragment>
      <Row gutter={24}  >
        <Col span={12}>
          <Card className='mt-2' title="Need Bangla Medium Tutor For HSC- 1st Year Student-4 Days/Week" style={{marginLeft: "10px"}} bordered={false}>
            <Row className=''>
                <Col md={6}>
                <Text type="secondary">Job ID : 108571</Text>
                </Col>
                <Col md={1}></Col>
                <Col md={1}>
                    <Text type="secondary">|</Text>
                </Col>
                <Col md={7}>
                    <Text type="secondary">Posted Date: 12 july 2023</Text>
                </Col>
            </Row>
          </Card>
          </Col>

          <Col span={12}>
          <Card className='mt-2' title="Need Bangla Medium Tutor For HSC- 1st Year Student-4 Days/Week" style={{marginLeft: "10px"}} bordered={false}>
            <Row className=''>
                <Col md={6}>
                <Text type="secondary">Job ID : 108571</Text>
                </Col>
                <Col md={1}></Col>
                <Col md={1}>
                    <Text type="secondary">|</Text>
                </Col>
                <Col md={7}>
                    <Text type="secondary">Posted Date: 12 july 2023</Text>
                </Col>
            </Row>
          </Card>
          </Col>


          <Col span={12}>
          <Card className='mt-2' title="Need Bangla Medium Tutor For HSC- 1st Year Student-4 Days/Week" style={{marginLeft: "10px"}} bordered={false}>
            <Row className=''>
                <Col md={6}>
                <Text type="secondary">Job ID : 108571</Text>
                </Col>
                <Col md={1}></Col>
                <Col md={1}>
                    <Text type="secondary">|</Text>
                </Col>
                <Col md={7}>
                    <Text type="secondary">Posted Date: 12 july 2023</Text>
                </Col>
            </Row>
          </Card>
          </Col>

         
      </Row>
    </Fragment>
  );
};

export default dashboard;
