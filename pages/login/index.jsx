
  import { Form, Input, Button, Checkbox } from 'antd';
  import { useCallback, useEffect, useState } from "react";
  import { SECURITY_END_POINT } from '../../constants';
  import { post } from '../../helpers/api_helper';
  import Axios from '../../utils/axios';
  import ToastMessage from '../../components/Toast';
  import Link from "next/link";

  const Login = () => {
    const notify = useCallback((type, message) => {
      ToastMessage({ type, message });
    }, []);
    const { http, setToken, token } = Axios();
    const onFinish = async (values) => {
      console.log('Success:', values);

      try {
        const login = await post(SECURITY_END_POINT.login(), values);
        setToken(login.accessToken);
        notify("success", "successfully Login!");

      } catch (error) {
        let message;
        const errorStatus = error?.response?.status;
        if (errorStatus) {
          switch (error.response.status) {
            case 404:
              message = 'Sorry! the page you are looking for could not be found';
              break;
            case 500:
              message = 'Sorry! something went wrong, please contact our support team';
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
          message = 'Netword Error!';
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



            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                LOGIN
              </Button>
            </Form.Item>

            <p className="small fw-bold mt-2 pt-1 mb-0">
                          Dont have an account?{" "}
                          <Link href="/register" >

                            <span className="text-primary">Register</span>
                          </Link>
                        </p>
          </Form>
        </div>
      </div>
    );
  };

  export default Login;
