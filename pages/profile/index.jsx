import { faBangladeshiTakaSign, faBars, faBook, faCalendarDays, faClock, faLocationDot, faPeopleGroup, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Spin, Typography, Watermark, Layout } from 'antd';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { DASHBOARD_END_POINT } from '../../constants';

import { QUERY_KEYS } from '../../constants/queryKeys';
import { useGetAllData } from '../../utils/hooks/useGetAllData';
import Axios from '../../utils/axios'
import HeadSection from '../../components/HeadSection';
import decodeToken from '../../utils/decodeToken';


const Profile = () => {

  const { http, setToken, token } = Axios();
  const { Text, Link } = Typography;
  const { Content } = Layout;
  const[profile,setProfile]=useState({})

  useEffect(() => {
    // Sample JWT token. Replace this with your actual token.
    const jwtToken = token;

    // Decode the JWT token
    const decodedToken = decodeToken(jwtToken);
    setProfile(decodedToken);
  }, []);
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