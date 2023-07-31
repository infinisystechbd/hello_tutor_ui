import React, { useCallback, useEffect, useState } from 'react';
import { Button, message, Steps, theme, Layout, Row, Col, Form, Input, Select, Typography, Card, Tag, Modal } from 'antd';
import { DingtalkOutlined, EnvironmentOutlined, ReadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faBars, faPuzzlePiece, faPersonDress, faBangladeshiTakaSign, faMobileAlt, faUser, faUniversity, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { CATEGORIE_END_POINT, CITY_END_POINT, CLASS_END_POINT, GUARDIAN_END_POINT, JOB_REQUEST_END_POINT, LOCATION_END_POINT, SUBJECT_END_POINT, TUTOR_END_POINT } from '../../constants/index';
import { QUERY_KEYS } from '../../constants/queryKeys.js';
import { useGetAllData } from '../../utils/hooks/useGetAllData.js';
import { mapArrayToDropdown } from '../../helpers/common_Helper.js';
import { get, post, put } from '../../helpers/api_helper';
import ToastMessage from '../../components/Toast';
const App = (props) => {
    const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
    const { token } = theme.useToken();

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const [form] = Form.useForm();
    const { Option } = Select;
    const [current, setCurrent] = useState(0);
    const { Content } = Layout;
    const [isCardHovered, setCardHovered] = useState(false);
    const [city, setCity] = useState([]);
    const [cityId, setCityId] = useState("");
    const [category, setCategory] = useState([]);
    const [location, setLocation] = useState([]);
    const [preferredLocation, setPreferredLocation] = useState([]);
    const [subject, setSubject] = useState([]);
    const [classes, setClasses] = useState([]);
    const { Text, Link } = Typography;
    const phoneNumberPattern = /^(?:01[3-9])\d{8}$/;
    const [educationFrom, setEducationFrom] = useState(false);
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visited, setIsVisited] = useState(false);

    // education data
    const [ind, setInd] = useState(1)
    const [educationLevel, setEducationLevel] = useState("");
    const [board, setBoard] = useState("");
    const [group, setgroup] = useState("");
    const [result, setResult] = useState("");
    const [curriculum, setCurriculum] = useState("");
    const [institute, setInstitute] = useState("");

    const colorBgContainerr = '#dcf9ff99';
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };



    const cardStyle = {
        border: 'none',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: isCardHovered ? '0 4px 12px rgba(64, 166, 217, 0.5)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
    };

    const handleCardHover = () => {
        setCardHovered(true);
    };

    const handleCardLeave = () => {
        setCardHovered(false);
    };

    const onFinish = async (values) => {
        console.log(values);
    }





    /** Fetch city */
    const {
        data: cityList,
        isLoading,
        refetch: fetchCityList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_CITY_LIST,
        CITY_END_POINT.get(1, -1, '', true)
    );

    /**city dropdown */
    useEffect(() => {
        const CITYDROPDOWN = mapArrayToDropdown(
            cityList?.data,
            'name',
            '_id'
        );
        setCity(CITYDROPDOWN);
    }, [cityList]);

    /** end city dropdown */




    /**fetch location list */

    const handleCity = async (value) => {
        console.log(value);
        setIsVisited(true);
        setCityId(value)
        const fetchLocation = await get(LOCATION_END_POINT.getLocationByCityId(value));
        const LOCATIONDROPDOWN = mapArrayToDropdown(
            fetchLocation.data,
            'name',
            '_id'
        );
        setLocation(LOCATIONDROPDOWN)
    }


    /**fetch location list  End */




    /** Fetch category List */

    const {
        data: categoryList,
        refetch: fetchTotalCategory,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_CATEGORY_LIST,
        CATEGORIE_END_POINT.get(1, -1, '', true)
    );

    /**category dropdown */
    useEffect(() => {
        const CATEGORYDROPDOWN = mapArrayToDropdown(
            categoryList?.data,
            'name',
            '_id'
        );
        setCategory(CATEGORYDROPDOWN);
    }, [categoryList]);



    /** Fetch CategoryList List End */




    /** Fetch  subject list*/
    const {
        data: subjectList,
        refetch: fetchSubjectList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_SUBJECT_LIST,
        SUBJECT_END_POINT.get(1, -1, '', true)
    );
    //subject dropdown
    useEffect(() => {
        const SUBJECTDROPDOWN = mapArrayToDropdown(
            subjectList?.data,
            'name',
            '_id'
        );
        setSubject(SUBJECTDROPDOWN);
    }, [subjectList]);

    /** Fetch  subject end*/




    /**fetch class list */
    const {
        data: classList,
        // isLoading,
        refetch: fetchClassList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_ClASS_LIST,
        CLASS_END_POINT.get(1, -1, '', true)
    );
    //class dropdown
    useEffect(() => {
        const CLASSDROPDOWN = mapArrayToDropdown(
            classList?.data,
            'name',
            '_id'
        );
        setClasses(CLASSDROPDOWN);
    }, [classList]);

    /**fetch class list end */




    /** Fetch category List */

    const {
        data: preferredLocationList,
        refetch: fetchpreferredLocation,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_LOCATION_LIST,
        LOCATION_END_POINT.get(1, -1, '', true)
    );

    /**category dropdown */
    useEffect(() => {
        const LOCATIONDROPDOWN = mapArrayToDropdown(
            preferredLocationList?.data,
            'name',
            '_id'
        );
        setPreferredLocation(LOCATIONDROPDOWN);
    }, [preferredLocationList]);



    /** Fetch CategoryList List End */




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
        setEducationFrom(!educationFrom)
    }

    const onTution = async (values) => {
        console.log("onTution", values);
    }



    const [tutor, setTutor] = useState({
        fullName: '',
        phone: '',
        email: '',
        // nidNumber: '',
        // idCardNumber: '',
        isPortalAccess:true,
        status:true,
        // city:cityId,
        location: ''

    });


    // const handleChange = (e) => {
    //     if (e.target) {
    //       const { name, value } = e.target;
    //       setTutor((prev) => ({
    //         ...prev,
    //         [name]: value,
    //       }));
    //     } else {
    //       const { name, value } = e;
    //       setTutor((prev) => ({
    //         ...prev,
    //         [name]: value,
    //       }));
    //     }
    //   };
    const handleChange = (e) => {
        setTutor((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleChangeLocation = (value) => {
        setTutor((prev) => ({
            ...prev,
            location: value,
        }));
    };

    const handleStatusChange = (value) => {
        // Update the 'status' in the 'tutor' state when the value changes in the Select component
        setTutor((prevTutor) => ({
          ...prevTutor,
          status: value
        }));
      };

    // const handleSelectChange = (name, value) => {
    //     setTutor((prev) => ({
    //       ...prev,
    //       [name]: value,
    //     }));
    //   };

    //   console.log("tutor",tutor,cityId);

    console.log(tutor);

    const submitFrom = async () => {

        let body = { ...tutor, city: cityId,education }
        console.log("clickd", body);
        const response = await post(TUTOR_END_POINT.create(), body,);
        if (response.status === 'SUCCESS') {
            notify('success', response.message);
            if (isParentRender) {
                isParentRender(true);
            }
        } else {
            notify('error', response.errorMessage);
            setLoading(false);
        }
        setIsModalOpen(!isModalOpen);
        setLoading(false);
    }


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
                                    <Input name="fullName" onChange={handleChange} />
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
                                    <Input name="phone" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row className='mt-2' gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="email"
                                    label="Email"

                                >
                                    <Input name="email" onChange={handleChange} />
                                </Form.Item>

                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="nidNumber"
                                    label="Nid Number"

                                >
                                    <Input name="nidNumber"
                                    // onChange={handleChange} 
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row className='mt-2' gutter={[16, 16]}>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="idCardNumber"
                                    label="Id Card Number"
                                >
                                    <Input name="idCardNumber"
                                    // onChange={handleChange} 
                                    />
                                </Form.Item>

                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="city"
                                    label="Select City"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select City!',

                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Select
                                        onChange={handleCity}
                                        placeholder="Please select City"
                                        options={city}
                                    />
                                </Form.Item>

                            </Col>
                        </Row>

                        <Row className='mt-2' gutter={[16, 16]}>

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
                                        name="location"
                                        onChange={handleChangeLocation}
                                        // mode="multiple"
                                        placeholder="Please select Location"
                                        options={location}
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
                                    <Input name="address" onChange={handleChange} />
                                </Form.Item>

                            </Col>
                        </Row>


                        <Row className='mt-2' gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="isPortalAccess"
                                    label="Portal Access"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    initialValue={false}
                                >
                                    <Select name="isPortalAccess" placeholder="Select a option" onChange={handleStatusChange} allowClear  value={tutor.isPortalAccess}>
                                        <Option value={true}>Active</Option>
                                        <Option value={false}>Inactive</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                            <Form.Item
        name="status"
        label="Status"
        rules={[
          {
            required: true
          }
        ]}
        hasFeedback
        initialValue={true}
      >
        <Select
          name="status"
          placeholder="Select a option"
          onChange={handleStatusChange}
          allowClear
          value={tutor.status} // Set the value of the Select component from the 'status' in the 'tutor' state
        >
          <Option value={true}>Active</Option>
          <Option value={false}>Inactive</Option>
        </Select>
      </Form.Item>
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
                            (

                                <>


                                    <Content style={{ margin: '10px 16px' }}>


                                        {education.map((data) => (
                                            <>
                                                <div >
                                                    <div className="row">
                                                        <div className="row" >
                                                            <div className="col-12">
                                                                <Card
                                                                    className='mt-2 custom-card'
                                                                    bordered={false}
                                                                    style={{
                                                                        ...cardStyle, padding: 15,
                                                                        minHeight: 100,
                                                                        background: colorBgContainer
                                                                    }}
                                                                    onMouseEnter={handleCardHover}
                                                                    onMouseLeave={handleCardLeave}
                                                                >
                                                                    <Row className='mt-2' gutter={[16, 16]}>
                                                                        <Col xs={24} md={8}>
                                                                            <FontAwesomeIcon icon={faPuzzlePiece} color='#40a6d9' />
                                                                            <Text type="secondary">Exam / Degree Title </Text>
                                                                            <Text strong>{data?.educationLevel}</Text>
                                                                        </Col>
                                                                        <Col xs={24} sm={8}>
                                                                            <FontAwesomeIcon icon={faBars} color='#40a6d9' />
                                                                            <Text type="secondary">Concentration / Major / Group </Text>
                                                                            <Text strong>{data?.group}</Text>
                                                                        </Col>
                                                                        <Col xs={24} md={8}>
                                                                            <FontAwesomeIcon icon={faUniversity} color='#40a6d9' />
                                                                            <Text type='secondary'>Institute :</Text>
                                                                            <Text strong>{data?.institute}</Text>
                                                                        </Col>
                                                                    </Row>
                                                                </Card>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>

                                        ))}


                                        {education.length >= 1 ? (
                                            <Button onClick={() => setEducationFrom(!educationFrom)}>
                                                Add More
                                            </Button>
                                        ) : (
                                            <Button onClick={() => setEducationFrom(!educationFrom)}>
                                                Add Education
                                            </Button>
                                        )}
                                    </Content>




                                </>
                            )

                    }


                </>

            ),
        },
        {
            title: 'Tution',
            content: (

                <>

                    <Form
                        // className='mt-3'

                        form={form}
                        name="control-hooks"
                        onFinish={onTution}
                    // style={{
                    //   maxWidth: 600,
                    // }}
                    >
                        <Row className='mt-2' gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item

                                    name="category"
                                    label="Category"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}

                                    hasFeedback
                                >
                                    <Select
                                        mode="multiple"
                                        //   onChange={handleCategory}
                                        placeholder="Please select Category"
                                        options={category}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="class"
                                    label="Class/Course"

                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Please select class"
                                        options={classes}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row className='mt-2' gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="subject"
                                    label="Required Subject"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select subject!',
                                            type: 'array',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Please select subject"
                                        options={subject}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>

                                <Form.Item
                                    name="city"
                                    label="Select City"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select City!',

                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Please select City"
                                        options={city}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row className='mt-2' gutter={[16, 16]}>
                            <Col xs={24} md={12}>

                                <Form.Item
                                    name="preferredLocation"
                                    label="preferredLocation"

                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Please select City"
                                        options={preferredLocation}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="tuitionType"
                                    label="Tuition Type"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    hasFeedback
                                    initialValue={true}
                                >
                                    <Select placeholder="Select a option" allowClear>
                                        <Option value={"Home Tutoring"}> Home Tutoring </Option>
                                        <Option value={"Online Tutoring"}>Online Tutoring</Option>
                                        <Option value={"Group Tutoring"}>Group Tutoring</Option>
                                        <Option value={"Package Tutoring"}>Package Tutoring</Option>
                                    </Select>
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
    ];

    return (
        <>


            <Modal
                title={setEditData != null ? 'Update Tutor' : 'Add Tutor'}
                style={{ top: 20, background: colorBgContainer }}
                centered
                open={isModalOpen}
                footer={null}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                width={1200}
                responsive={{
                    // Define different widths for different screen sizes
                    xs: 300,
                    sm: 500,
                    md: 800,
                    lg: 1000,
                    xl: 1200,
                    xxl: 1400,
                }}
            //   style={{ background: colorBgContainer }}
            >
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

                                            <>
                                                <Button type="primary" onClick={() => { setCurrent(current + 1); }}>
                                                    Next
                                                </Button>
                                                <Button style={{ margin: '0 8px' }} type="primary" onClick={() => { setCurrent(current + 1); submitFrom() }}>
                                                    Submit
                                                </Button>

                                            </>


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
            </Modal>
        </>
    );
};

export default App;
