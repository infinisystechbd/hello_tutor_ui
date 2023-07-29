import React, { useState } from 'react';
import { Button, message, Steps, theme, Layout, Row, Col, Form, Input, Select } from 'antd';



const App = () => {
    const { token } = theme.useToken();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const { Content } = Layout;
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    const phoneNumberPattern = /^(?:01[3-9])\d{8}$/;

    const [educationFrom, setEducationFrom] = useState(false);

    const [education, setEducation] = useState([]);

    const onFinish = async (values) => {
        console.log(values);
    }


    // education data
    const [ind, setInd] = useState(1)
    const [educationLevel, setEducationLevel] = useState("");
    const [board, setBoard] = useState("");
    const [group, setgroup] = useState("");
    const [result, setResult] = useState("");
    const [curriculum, setCurriculum] = useState("");
    const [institute, setInstitute] = useState("");


    const onChange = (value) => {
        setCurrent(value);
    };

    const educationData = (e) => {
        setInd(() => ind + 1);
        setEducation([...education,
        {
            id: ind,
            educationLevel: educationLevel,
            board: board,
            group: group,
            result: result,
            curriculum: curriculum,
            institute: institute

        }
        ])
    }

    console.log(education);


    const steps = [
        {
            title: 'Personal',
            content: (

                <>
                    <Form
                        // className='mt-3'

                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                    // style={{
                    //   maxWidth: 600,
                    // }}
                    >
                        <Row className='mt-2' gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="fullName"
                                    label="Full Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Full name is required',
                                        },
                                        {
                                            pattern: /^[A-Z][A-Za-z\s]*$/,
                                            message: 'Full name should start with an uppercase letter and can only contain letters and spaces',
                                        },
                                        {
                                            max: 50,
                                            message: 'Full name should not exceed 50 characters',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="phone"
                                    label="Phone"
                                    rules={[
                                        {
                                            required: true,
                                            pattern: phoneNumberPattern,
                                            message: 'Please enter a valid Bangladeshi phone number!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row className='mt-2' gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="email"
                                    label="Email"

                                >
                                    <Input />
                                </Form.Item>

                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="nidNumber"
                                    label="Nid Number"

                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row className='mt-2' gutter={[16, 16]}>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="idCardNumber"
                                    label="Id Card Number"
                                >
                                    <Input />
                                </Form.Item>

                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="city"
                                    label="Select City"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Please select City!',

                                //     },
                                // ]}
                                // hasFeedback
                                >
                                    <Select

                                        placeholder="Please select City"

                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row className='mt-2' gutter={[16, 16]}>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="location"
                                    label="Location"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Please select Location!',

                                //     },
                                // ]}
                                // hasFeedback

                                >
                                    <Select

                                        placeholder="Please select Location"

                                    />
                                </Form.Item>
                            </Col>


                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="address"
                                    label="Address"
                                // rules={[
                                //     {
                                //         required: true,
                                //     },
                                // ]}
                                // hasFeedback
                                >
                                    <Input />
                                </Form.Item>

                            </Col>
                        </Row>


                        <Row className='mt-2' gutter={[16, 16]}>
                            <Col xs={24} md={12}>

                            </Col>
                            <Col xs={24} md={12}>
                                <Button type="primary" htmlType="submit" >
                                    Submit
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </>
            ),
        },
        {
            title: 'Education',
            content: (

                <>
                    {
                        educationFrom ?


                            (
                                <>
                                    <Row className='mt-2' gutter={[16, 16]}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="educationLevel"
                                                label="Level"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Write education Level LIKE SSC/HSC',
                                                    },
                                                ]}
                                                hasFeedback
                                            >
                                                <Input

                                                    placeholder='Please Write education Level LIKE SSC/HSC'
                                                    onChange={(e) => { setEducationLevel(e.target.value) }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="board"
                                                label="Board"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Like Dhaka/Jessore',
                                                    },
                                                ]}
                                                hasFeedback
                                            >
                                                <Input
                                                    // mode="multiple"
                                                    placeholder='Like Dhaka/Jessore'
                                                    onChange={(e) => { setBoard(e.target.value) }}

                                                />
                                            </Form.Item>
                                        </Col>


                                    </Row>

                                    <Row className='mt-2' gutter={[16, 16]}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="group"
                                                label="Group"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Write education Level LIKE SSC/HSC',
                                                    },
                                                ]}
                                                hasFeedback
                                            >
                                                <Input

                                                    placeholder='Concentration / Major / Group '
                                                    onChange={(e) => { setgroup(e.target.value) }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="result"
                                                label="Result"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Write education Level LIKE SSC/HSC',
                                                    },
                                                ]}
                                                hasFeedback
                                            >
                                                <Input

                                                    placeholder='Please Write education Level LIKE SSC/HSC'
                                                    onChange={(e) => { setResult(e.target.value) }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                    <Row className='mt-2' gutter={[16, 16]}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="curriculum"
                                                label="Curriculum"

                                            >
                                                <Input

                                                    placeholder='Curriculum '
                                                    onChange={(e) => { setCurriculum(e.target.value) }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                          
                                                <Form.Item
                                                    name="institute"
                                                    label="institute"

                                                >
                                                    <Input

                                                        placeholder='institute '
                                                        onChange={(e) => { setInstitute(e.target.value) }}
                                                    />
                                                </Form.Item>
                                           
                                        </Col>
                                    </Row>



                                    <Row className='mt-2' gutter={[16, 16]} justify="end">
                                        <Col xs={24} md={12}>
                                            <Button style={{ margin: '0 8px' }} onClick={educationData}>
                                                Add Education
                                            </Button>
                                            <Button style={{ margin: '0 8px' }} onClick={() => setEducationFrom(!educationFrom)}>
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </>


                            ) :
                            (<Button style={{ margin: '0 8px' }} onClick={() => setEducationFrom(!educationFrom)}>
                                Add More
                            </Button>)

                    }


                </>

            ),
        },
        {
            title: 'Tution',
            content: (

                <>
                    <Row className='mt-2' gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="city"
                                label="City"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select City!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Select

                                    placeholder="Please select City"

                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="location"
                                label="Location"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select Location!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Select
                                    // mode="multiple"
                                    placeholder="Please select Location"

                                />
                            </Form.Item>
                        </Col>
                    </Row>

                </>

            ),
        },
    ];

    return (
        <>
            <Content style={{ margin: '10px 16px' }}>
                <div style={{ padding: 15, minHeight: 100, background: colorBgContainer }}>
                    <div >
                        <div className="row">
                            <div className="col-12">
                                <Steps current={current} onChange={onChange} items={steps} />
                            </div>
                        </div>
                    </div>
                </div>
            </Content>

            <Content style={{ margin: '20px 16px' }}>
                <div style={{ padding: 15, minHeight: 360, background: colorBgContainer }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                            <div style={contentStyle}>{steps[current].content}</div>
                                <div style={{ marginTop: 24 }}>
                                    {current < steps.length - 1 && (
                                        <Button type="primary" onClick={() => setCurrent(current + 1)}>
                                            Next
                                        </Button>
                                    )}
                                    {current === steps.length - 1 && (
                                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                            Done
                                        </Button>
                                    )}
                                    {current > 0 && (
                                        <Button style={{ margin: '0 8px' }} onClick={() => setCurrent(current - 1)}>
                                            Previous
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
};

export default App;
