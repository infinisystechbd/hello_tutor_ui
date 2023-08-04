import React from 'react';
import { Button, Card, Col, Row, Spin, Typography, Watermark, Layout } from 'antd';
import HeadSection from '../../components/HeadSection';

const Profile = () => {

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