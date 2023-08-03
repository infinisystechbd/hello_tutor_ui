import React, { useCallback, useEffect, useState } from 'react';
import { Card, Col, Row, Layout, theme } from 'antd';
import { KeyOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

const Setting = () => {
    const { Content } = Layout;
    const { token: { colorBgContainer } } = theme.useToken();

    const iconStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0', // Add your desired background color here
        height: '80px', // Set the height and width to make it a square container
        width: '80px',
        borderRadius: '50%',  // Add a 50% radius for rounded corners
    };
    const iconSize = {
        fontSize: '24px', // Add your desired icon size here
    };
    const textStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };


    const [nameVis, setNameVis] = useState(true);
    const [numberVis, setNumberVis] = useState(false);
    const [passwordVis, setPasswordVis] = useState(false);

    const isNameVis = () => {
        setNameVis(true);
        setNumberVis(false);
        setPasswordVis(false)
    }

    const isNumberVis = () => {
        setNameVis(false);
        setNumberVis(true);
        setPasswordVis(false)
    }

    const isPasswordVis = () => {
        setNameVis(false);
        setNumberVis(false);
        setPasswordVis(true)
    }


    return (
        <>
            <Row gutter={22}>
                <Col span={6} onClick={isNameVis}>
                    <Card bordered={false} style={{ height: '120px' }}>
                        <Row >
                            <Col span={8} style={iconStyle}>
                                <UserOutlined style={iconSize} />
                            </Col>
                            <Col span={16} style={textStyle}>
                                Name
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6} onClick={isNumberVis}>
                <Card bordered={false} style={{ height: '120px' }}>
                    <Row >
                            <Col span={8} style={iconStyle}>
                                <PhoneOutlined style={iconSize} />
                                
                            </Col>
                            <Col span={16} style={textStyle}>
                                Number
                            </Col>  
                        </Row>
                    </Card>
                </Col>

                <Col span={6} onClick={isPasswordVis}>
                <Card bordered={false} style={{ height: '120px' }}>
                    <Row >
                            <Col span={8} style={iconStyle}>
                                <LockOutlined style={iconSize} />
                                
                            </Col>
                            <Col span={16} style={textStyle}>
                                Password
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            {nameVis &&
                <Content
                    style={{
                        margin: '60px 0px',
                    }}
                >

                    <Row gutter={22}>
                        <Col span={18}>
                            <Card title="Name" bordered={false}>
                                Name
                            </Card>
                        </Col>

                    </Row>

                </Content>}

            {numberVis &&
                <Content
                    style={{
                        margin: '60px 0px',
                    }}
                >

                    <Row gutter={22}>
                        <Col span={18}>
                            <Card title="Number" bordered={false}>
                                Number
                            </Card>
                        </Col>

                    </Row>

                </Content>}
            {passwordVis &&
                <Content
                    style={{
                        margin: '60px 0px',
                    }}
                >

                    <Row gutter={22}>
                        <Col span={18}>
                            <Card title="Password" bordered={false}>
                                Password
                            </Card>
                        </Col>

                    </Row>

                </Content>}
        </>
    )
}

export default Setting
