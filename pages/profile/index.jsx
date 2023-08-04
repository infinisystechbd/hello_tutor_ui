import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Spin, Typography, Watermark, Layout } from 'antd';
import HeadSection from '../../components/HeadSection';
import Axios from '../../utils/axios';
import decodeToken from '../../utils/decodeToken';

const Profile = () => {
 const { http, token } = Axios();
   const [profile, setProfile] = useState({});
    const { Text, Link } = Typography;
    const { Content } = Layout;
        useEffect(() => {
        // Sample JWT token. Replace this with your actual token.
        const jwtToken = token;

        // Decode the JWT token
        const decodedToken = decodeToken(jwtToken);
        setProfile(decodedToken);
    }, [token]);

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