import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Spin, Typography, Watermark, Layout } from 'antd';
import HeadSection from '../../components/HeadSection';
import Axios from '../../utils/axios';
import decodeToken from '../../utils/decodeToken';
import { Menu } from 'antd';
const Profile = () => {

    const { Text, Link } = Typography;
    const { Content } = Layout;
    const { http, setToken, token } = Axios();
    const [profile, setProfile] = useState({});
    console.log(profile);


    useEffect(() => {
        const jwtToken = token;
        const decodedToken = decodeToken(jwtToken);
        setProfile(decodedToken);
    }, [token]);

    return (
        <>
            <HeadSection title="Profile" />

            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={24} md={12} lg={6} >
                    <Card bordered={false} style={{ height: '500px' }}>
                        <Row>
                            <Col span={24} >
                                <div data-spy="affix" data-offset-top={290}>
                                    <Menu  mode="vertical" style={{ width: '350px' }}>
                                        <Menu.Item style={{ height: '150px', background: '#adadade6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                            <Link to="/customer/profile">
                                                <div className="rounded-circle" style={{ width: '70px', height: '70px', marginBottom: '10px' }}>
                                                    <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=80" alt="Profile Avatar" className="profile-avatar" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }} />
                                                </div>
                                                <span style={{ fontWeight: 'bold', color: 'white' }}>{profile?.fullName}</span>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="dashboard">
                                            {/* <Link to="/customer/dashboard">Dashboard</Link> */}
                                            <span>Name: <span style={{ fontWeight: 'bold' }}>{profile?.fullName}</span></span>
                                        </Menu.Item>
                                        <Menu.Item key="purchase-history">
                                            {/* <Link to="/customer/purchase-history">Purchase History</Link> */}
                                            <span>Code ID: <span style={{ fontWeight: 'bold' }}>{profile?.iat}</span></span>
                                        </Menu.Item>
                                        <Menu.Item key="earning-points">
                                            {/* <Link to="/customer/earning-points">Earning Points</Link> */}
                                            <span>Phone: <span style={{ fontWeight: 'bold' }}>{profile?.phone}</span></span>
                                        </Menu.Item>
                          
                                    </Menu>
                                </div>

                            </Col>
                            {/* <Col span={8} >     
                                
                            </Col> */}
                        </Row>
                    </Card>
                </Col>

                <Col xs={24} sm={24} md={12} lg={18}>
                    <Card bordered={false} style={{ height: '700px' }}>
                        <Row>
                            <Col span={8} >
                                {/* Content for left section */}
                            </Col>
                            <Col span={16} >
                                {/* Content for right section */}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Profile;
