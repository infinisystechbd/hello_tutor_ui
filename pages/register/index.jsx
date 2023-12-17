import { Form, Input, Button, Radio } from 'antd';
import { useCallback, useEffect, useState } from "react";
import { post } from '../../helpers/api_helper';
import Axios from '../../utils/axios';
import ToastMessage from '../../components/Toast';
import Link from "next/link";

const Register = () => {
    const [isGuardian, setIsGuardian] = useState(true);
    console.log("isGuardian", isGuardian);
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const { setToken } = Axios();

    const onFinish = async (values) => {
        console.log('Success:', values);

        try {
            const login = await post(SECURITY_END_POINT.login(), values);
            setToken(login.accessToken);
            notify("success", "Successfully logged in!");
        } catch (error) {
            let message;
            const errorStatus = error?.response?.status;
            if (errorStatus) {
                switch (error.response.status) {
                    case 404:
                        message = 'Sorry! The page you are looking for could not be found';
                        break;
                    case 500:
                        message = 'Sorry! Something went wrong, please contact our support team';
                        break;
                    case 401:
                        message = 'Invalid credentials';
                        break;
                    default:
                        message = error[1];
                        break;
                }
            }

            if (!errorStatus && error.code === 'ERR_NETWORK') {
                message = 'Network Error!';
            }
            notify("error", message);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-page" >
            <div className="login-box">
                <div className="illustration-wrapper">
                    <img
                        src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
                        alt=""
                    />
                </div>
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <p className="form-title">Welcome back</p>
                    <p>Login to the Dashboard</p>

                    {/* <Form.Item
                        name="type"
                        rules={[{ required: true, message: 'Please select your type!' }]}
                    >
                        <Radio.Group defaultValue={true} onChange={(e) => setIsGuardian(e.target.value)}>
                            <Radio value={true}>Tutor</Radio>
                            <Radio value={false}>Guardian</Radio>
                        </Radio.Group>

                    </Form.Item> */}

                    <Form.Item
                        name="type"
                        rules={[{ required: true, message: 'Please select your type!' }]}
                    >
                        <Radio.Group defaultValue={true} onChange={(e) => setIsGuardian(e.target.value)}>
                            <Radio.Button value={true}>Tutor</Radio.Button>
                            <Radio.Button value={false}>Guardian</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    {
                        isGuardian  &&
                        <>


                    <Form.Item
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input placeholder="Enter your name" />
                    </Form.Item>


                    <Form.Item
                        name="gender"
                        rules={[{ required: true, message: 'Please select your gender!' }]}
                    >
                        <Radio.Group>
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                        </Radio.Group>
                    </Form.Item>

</>

                    }



                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input placeholder="Phone Number" />
                </Form.Item>



                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        REGISTER
                    </Button>
                </Form.Item>

                <p className="small fw-bold mt-2 pt-1 mb-0">
                    Have an account?{" "}
                    <Link href="/login" >
                        <span className="text-primary">Login</span>
                    </Link>
                </p>
            </Form>
        </div>
        </div >
    );
};

export default Register;
