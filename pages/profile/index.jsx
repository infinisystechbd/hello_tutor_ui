import { faBangladeshiTakaSign, faBars, faBook, faCalendarDays, faClock, faLocationDot, faPeopleGroup, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Spin, Typography, Watermark, Layout } from 'antd';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { DASHBOARD_END_POINT } from '../../constants';

import { QUERY_KEYS } from '../../constants/queryKeys';
import { useGetAllData } from '../../utils/hooks/useGetAllData';
import Axios from '../../utils/axios'
import HeadSection from '../../components/HeadSection';


const Profile = () => {
  const router = useRouter();
  const { Id } = router?.query;
  const { http, setToken, token } = Axios();
  const { Text, Link } = Typography;
  const { Content } = Layout;
  return (
<>
<HeadSection title="Profile" />

    <Row gutter={22}>
    <Col span={6} >
        <Card bordered={false} style={{ height: '500px' }}>
            <Row >
                <Col span={8} >
                    
                </Col>
                <Col span={16} >
                  
                </Col>
            </Row>
        </Card>
    </Col>

    <Col span={18} >
        <Card bordered={false} style={{ height: '500px' }}>
            <Row >
                <Col span={8} >
                    
                </Col>
                <Col span={16} >
                  
                </Col>
            </Row>
        </Card>
    </Col>
    </Row>
</>
  )
}

export default Profile