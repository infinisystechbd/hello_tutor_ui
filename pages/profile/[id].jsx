import { faBangladeshiTakaSign, faBars, faBook, faCalendarDays, faClock, faLocationDot, faPeopleGroup, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Spin, Typography, Watermark, Layout } from 'antd';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { DASHBOARD_END_POINT } from '../../constants';

import { QUERY_KEYS } from '../../constants/queryKeys';
import { useGetAllData } from '../../utils/hooks/useGetAllData';
import Axios from '../../utils/axios'


const Profile = () => {
  const router = useRouter();
  const { Id } = router?.query;
  const { http, setToken, token } = Axios();
  const { Text, Link } = Typography;
  const { Content } = Layout;
  return (

    <Content
      style={{
        margin: '40px 16px',
      }}
    >
      <Card bordered={false} type="inner" style={{ width: '100%' }}>

        <Row gutter={[16, 16]} className='mt-4 mb-4'>
          <Col xs={24} sm={12} md={6}>
            <Row gutter={[16, 16]}>
              <Text type="secondary">Need Help? : </Text>
            </Row>
            <Row gutter={[16, 16]}>
              <Text type='secondary' strong>  Having trouble submitting tutor request?</Text>
            </Row>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Button block type='primary' style={{ width: '60%', height: '50px' }}>Apply</Button>
          </Col>


          <Col xs={24} sm={12} md={6}>
            <Row gutter={[16, 16]}>
              <Text type="secondary">You can also call us at </Text>
            </Row>
            <Row gutter={[16, 16]}>
              <Text type='secondary' strong>  99999999999999</Text>
            </Row>
          </Col>
        </Row>
      </Card>
    </Content>
  )
}

export default Profile