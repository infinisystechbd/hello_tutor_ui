import React, { useCallback, useEffect, useState } from 'react';
import { Card, Col, Row, Layout, theme, Form, Input, Button } from 'antd';
import { KeyOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import HeadSection from '../../components/HeadSection';
import Axios from '../../utils/axios';
import decodeToken from '../../utils/decodeToken';
import { USER_END_POINT } from '../../constants/index';
import { post, put } from '../../helpers/api_helper';
import ToastMessage from '../../components/Toast';
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

    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const [form] = Form.useForm();
    const { http, setToken, token } = Axios();
    const [profile, setProfile] = useState({})
    



    const [nameVis, setNameVis] = useState(true);
    const [numberVis, setNumberVis] = useState(false);
    const [passwordVis, setPasswordVis] = useState(false);
    const phone = profile?.phone?.slice(3);

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
    





        useEffect(() => {
            // Sample JWT token. Replace this with your actual token.
            const jwtToken = token;

            // Decode the JWT token
            const decodedToken = decodeToken(jwtToken);
            setProfile(decodedToken);
        }, []);


        const handleFormSubmit =  (values) => {
            if (nameVis) {
              setProfile((prevProfile) => ({ ...prevProfile, fullName: values.fullName }));
            } else if (numberVis) {
              setProfile((prevProfile) => ({ ...prevProfile, phone: values.number }));
            }

            FormSubmit();
             

          };


          const FormSubmit = async () => {
        //     const update = await put(USER_END_POINT.update(profile?.userId), profile);
        //     if (update.status == 'SUCCESS') {
        //         notify('success', update.message);
        //     }
        // else {
        //     notify('error', update.errorMessage);
        //     // setLoading(false);
        // }
        console.log("FormSubmit",profile);
          }




    // State to handle form submission status
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
// Function to handle form submission
    const handlePasswordUpdate = async (values) => {
        setIsFormSubmitting(true);

        let body = { ...values, phone: profile.phone, role: profile.role }
        const response = await post(USER_END_POINT.changePassword(), body);
        if (response.status === 'SUCCESS') {
            notify('success', response.message);
        
        } else {
            notify('error', response.errorMessage);
            // setLoading(false);
        }

        // Perform your API call or password update logic here using the values object
        // For example, you can use the "fetch" function to send the data to your backend API.
        // Replace 'your_api_endpoint' with the actual endpoint to handle the password update.
        // fetch('your_api_endpoint', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(values),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setIsFormSubmitting(false);
        //         // Handle the response from the server here (success or error)
        //     })
        //     .catch((error) => {
        //         setIsFormSubmitting(false);
        //         // Handle any errors that occurred during the API call
        //     });
    };




    return (
        <>
            <HeadSection title="Settings" />
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



            <Form onFinish={handleFormSubmit}>
      {nameVis && (
        <Card title="Name" bordered={false} style={{ margin: '60px 0px' }}>
          <Row gutter={22}>
            <Col span={18}>
              <Form.Item name="fullName" label="Name" initialValue={profile.fullName}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Update Name
          </Button>
        </Card>
      )}

      {numberVis && (
        <Card title="Number" bordered={false} style={{ margin: '60px 0px' }}>
          <Row gutter={22}>
            <Col span={18}>
              <Form.Item name="number" label="Number" initialValue={profile.phone}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Update Number
          </Button>
        </Card>
      )}
    </Form>



            {passwordVis &&
                <Content
                    style={{
                        margin: '60px 0px',
                    }}
                >

                    <Row gutter={22}>
                        <Col span={18}>
                            <Card title="Password" bordered={false}>
                                <Form
                                    onFinish={(values) => handlePasswordUpdate(values)}
                                    initialValues={{
                                        oldPassword: "",
                                        newPassword: "",
                                        confirmPassword: ""
                                    }}
                                >
                                    <Form.Item
                                        name="oldPassword"
                                        label="Current Password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your current password!',
                                            },
                                        ]}
                                    >
                                        <Input type="password" />
                                    </Form.Item>
                                    <Form.Item
                                        name="newPassword"
                                        label="New Password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your new password!',
                                            },
                                        ]}
                                    >
                                        <Input type="password" />
                                    </Form.Item>
                                    <Form.Item
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        dependencies={['newPassword']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm your new password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('newPassword') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('The passwords do not match!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input type="password" />
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Update
                                    </Button>
                                </Form>
                            </Card>
                        </Col>

                    </Row>

                </Content>}
        </>
    )
}

export default Setting
