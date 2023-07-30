import React, { useCallback, useEffect, useState } from 'react';
import { Button, message, Steps, theme, Layout, Row, Col, Form, Input, Select, Typography, Card, Tag } from 'antd';
import { DeleteOutlined, DingtalkOutlined, EditOutlined, EnvironmentOutlined, EyeOutlined, ReadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faBars, faPuzzlePiece, faPersonDress, faBangladeshiTakaSign, faMobileAlt, faUser, faUniversity, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { CATEGORIE_END_POINT, CITY_END_POINT, CLASS_END_POINT, GUARDIAN_END_POINT, JOB_REQUEST_END_POINT, LOCATION_END_POINT, SUBJECT_END_POINT } from '../../constants/index';
import { QUERY_KEYS } from '../../constants/queryKeys.js';
import { useGetAllData } from '../../utils/hooks/useGetAllData.js';
import { mapArrayToDropdown } from '../../helpers/common_Helper.js';
import { get, post, put } from '../../helpers/api_helper';
import Link from 'next/link';
import Table from "react-bootstrap/Table";
const Tutor_Create_from = () => {
  const { Content } = Layout;
  const [form] = Form.useForm();
  const { Option } = Select;
  const phoneNumberPattern = /^(?:01[3-9])\d{8}$/;
  const { token: { colorBgContainer } } = theme.useToken();
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

  const [city, setCity] = useState([]);
  const [location, setLocation] = useState([]);
  const [visited, setIsVisited] = useState(false);
  const [category, setCategory] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subject, setSubject] = useState([]);
  const [preferredLocation, setPreferredLocation] = useState([]);
  const [objedit, setObjEdit] = useState(false);
  const [editId, setEditId] = useState('');



  // education data
  const [education, setEducation] = useState([]);
  const [ind, setInd] = useState(1)
  const [educationLevel, setEducationLevel] = useState("");
  const [board, setBoard] = useState("");
  const [group, setgroup] = useState("");
  const [result, setResult] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [institute, setInstitute] = useState("");

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






  /** Fetch preferred Location List */

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


  /** Fetch preferred Location List End */


  /**education data store*/
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
    // setEducationFrom(!educationFrom)
  }




  function editobj(index, editId) {

    setObjEdit(true)
    setEditId(editId)
    setEducationLevel(education[index]?.customer_id)


  }




  /**education data store end*/

  const onFinish = async (values) => {

  }




  return (
    <>
      <Content
        style={{
          margin: '60px 16px',
        }}
      >

        <div
          style={{
            padding: 15,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          <Form
            className="mt-3"
            {...layout}
            // {...setEditData}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          // style={{
          //   maxWidth: 800,
          // }}
          >

            <div className="row">
              <div className="col-12 col-md-6">
                <div className="row">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <h4 className="card-title border-bottom ">
                          {" "}
                          Personal Information
                        </h4>
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
                              label="Recent Id Card"
                            >
                              <Input />
                            </Form.Item>

                          </Col>
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
                              <Input />
                            </Form.Item>

                          </Col>
                        </Row>


                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-12 col-md-6">
                <div className="row">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body ">
                        <h4 className="card-title border-bottom ">
                          {" "}
                          Tuition Related Information
                        </h4>
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
                                placeholder="Please Select Preferred Category"
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
                                placeholder="Please Select Preferred class"
                                options={classes}
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row className='mt-2' gutter={[16, 16]}>
                          <Col xs={24} md={12}>
                            <Form.Item
                              name="preferredsubject"
                              label="Subject"
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
                                placeholder="Please Select Preferred subject"
                                options={subject}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>

                            <Form.Item
                              name="preferredcity"
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
                                mode="multiple"
                                placeholder="Please Select Preferred City"
                                options={city}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row className='mt-2' gutter={[16, 16]}>
                          <Col xs={24} md={12}>

                            <Form.Item
                              name="preferredLocation"
                              label="Location"

                            >
                              <Select
                                mode="multiple"
                                placeholder="Select Preferred Location"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="row mt-4">
              <div className="col-12 col-md-6">
                <div className="row">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <h4 className="card-title border-bottom ">
                          {" "}
                          Create Education Information
                        </h4>
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
                            <Button type="primary" style={{ margin: '0 160px' }} onClick={educationData}>
                              Add Education
                            </Button>

                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div className="col-12 col-md-6">
                <div className="row">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <h4 className="card-title border-bottom ">
                          {" "}
                          Education Information
                        </h4>

                        <div className="table-responsive">
                          <div className="p-3">
                            <Table striped bordered hover>
                              <thead className="bg-light border-0">
                                <tr className="text-center">
                                  <th className="fw-bolder">Level</th>
                                  <th className="fw-bolder">Board</th>
                                  <th className="fw-bolder">Group</th>
                                  <th className="fw-bolder">Result</th>
                                  <th className="fw-bolder">Curriculum</th>
                                  <th className="fw-bolder">Institute</th>
                                  <th className="fw-bolder">Action</th>


                                </tr>
                              </thead>
                              <tbody>

                                {!!(education.length) && education?.map((education, index) => (
                                  <>


                                    <tr className="text-center" key={index}>

                                      <td>{education.educationLevel}</td>
                                      <td>{education.board}</td>
                                      <td>{education.group}</td>
                                      <td>{education.result}</td>

                                      <td>{education.curriculum}</td>
                                      <td>{education.institute}</td>
                                      <td>
                                        <Row justify="space-between">
                                          <a style={{ color: 'green', marginRight: '3px' }}>
                                            <EditOutlined style={{ fontSize: '20px' }} />
                                          </a>



                                          <a className="text-danger" style={{ marginRight: '3px' }}>
                                            <DeleteOutlined style={{ fontSize: '20px' }} />
                                          </a>
                                        </Row>
                                      </td>

                                    </tr>



                                  </>

                                ))}
                              </tbody>
                            </Table>


                            <div className="text-end fw-bold mb-3 me-2">
                              <div className="text-end">
                                <Button
                                  variant="success"
                                // style={{ float: "right" }}
                                // onClick={submitForm}
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
            </div>


          </Form>




        </div>
      </Content>
    </>
  )
}

export default Tutor_Create_from