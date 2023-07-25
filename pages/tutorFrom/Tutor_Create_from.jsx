import { Button, Form, Input, Modal, Select, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useState, useEffect } from 'react';
import ToastMessage from '../../components/Toast';
import { TUTOR_END_POINT, LOCATION_END_POINT, CITY_END_POINT } from '../../constants/index';
import { get, post, put } from '../../helpers/api_helper';
import { QUERY_KEYS } from '../../constants/queryKeys.js';
import { mapArrayToDropdown } from '../../helpers/common_Helper.js';
import { useGetAllData } from '../../utils/hooks/useGetAllData.js';
import Table from "react-bootstrap/Table";
const Tutor_Create_from = () => {
    // const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const { Option } = Select;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState([]);
    const [location, setLocation] = useState([]);
    const [visited, setIsVisited] = useState(false);

    const phoneNumberPattern = /^(?:01[3-9])\d{8}$/;


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
        setIsVisited(true);
        const fetchLocation = await get(LOCATION_END_POINT.getLocationByCityId(value));
        const LOCATIONDROPDOWN = mapArrayToDropdown(
            fetchLocation.data,
            'name',
            '_id'
        );
        setLocation(LOCATIONDROPDOWN)
    }


    /**fetch location list  End */

    /** from design  */
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 6,
            span: 16,
        },
    };
    /** end from design  */


    const onFinish = async (values) => {
        let body = { status: false, isPortalAccess: false };
        console.log(values);
    }

    const [education, setEducation] = useState([]);

    const onEdu = async (values) => {
        setInd(() => ind + 1)
        var vBookingId = [];
        console.log(values);

        setEducation([...education, {
            educationName: educationName,
            board: board,
            passingYear: passingYear,
            result: result
        }])
        console.log(education);
    }
    return (

        <>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body border-bottom">
                                <h4 className="card-title">Your General Information </h4>
                            </div>

                            <div className="card-body">
                                <>

                                    <Form
                                        className='mt-3'
                                        {...layout}

                                        form={form}
                                        name="control-hooks"
                                        // onFinish={onFinish}
                                        style={{
                                            maxWidth: 600,
                                        }}
                                    >

                                        <Row className='mt-2' gutter={[16, 16]}>

                                            <Col xs={24} md={12}>
                                                <Form.Item
                                                    name="fullName"
                                                    label="Name"
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
                                                    name="city"
                                                    label=" City"
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
                                                        options={location}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row className='mt-2' gutter={[16, 16]}>
                                            <Col xs={24} md={12}>
                                                <Form.Item
                                                    name="address"
                                                    label="Address"
                                                    labelAlign="top" // Set labelAlign to 'top' to display label above the textarea box
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Address is required',
                                                        },
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.TextArea rows={2} />
                                                </Form.Item>
                                            </Col>
                                        </Row>








                                        <Form.Item {...tailLayout}>
                                            <Button type="primary" htmlType="submit" loading={loading}>
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>

                                </>
                            </div>
                        </div>
                        <div className="card mt-4">
                            <div className="card-body border-bottom">




                                <h4 className="card-title">Add Educational Information</h4>

                            </div>

                            <div className="card-body">


                                <Form
                                    className='mt-3'
                                    {...layout}

                                    form={form}
                                    name="control-hooks"
                                    onEdu={onEdu}
                                    style={{
                                        maxWidth: 600,
                                    }}
                                >

                                    <Row className='mt-2' gutter={[16, 16]}>

                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="educationName"
                                                label="Name"

                                                hasFeedback
                                            >
                                                <Input />
                                            </Form.Item>

                                        </Col>
                                        <Col xs={24} md={12}>

                                            <Form.Item
                                                name="board"
                                                label="board"

                                                hasFeedback
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row className='mt-2' gutter={[16, 16]}>

                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="passingYear"
                                                label="Year"

                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="result"
                                                label="Result"

                                                hasFeedback
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>










                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>







                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card">
                            <div className="border-bottom title-part-padding">
                                <h4 className="card-title mb-0">All Education Information</h4>
                            </div>

                            <div className="card-body">
                                <div className="table-responsive">
                                    <div className="p-3">
                                        <Table striped bordered hover>
                                            <thead className="bg-light border-0">
                                                <tr className="text-center">
                                                    <th className="fw-bolder">Education Name</th>
                                                    <th className="fw-bolder">Board</th>
                                                    <th className="fw-bolder">Passing Year</th>
                                                    <th className="fw-bolder">Result/CGPA</th>

                                                    <th className="fw-bolder">Action</th>


                                                </tr>
                                            </thead>
                                            <tbody>


                                            </tbody>
                                        </Table>


                                        <div className="text-end fw-bold mb-3 me-2">




                                            <div className="text-end">
                                                <Button
                                                    variant="success"
                                                    style={{ float: "right" }}

                                                >
                                                    Create
                                                </Button>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Tutor_Create_from