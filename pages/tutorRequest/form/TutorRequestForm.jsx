import { Button, Layout, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, TimePicker,theme } from "antd";
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { CATEGORIE_END_POINT, CITY_END_POINT, CLASS_END_POINT, GUARDIAN_END_POINT, JOB_REQUEST_END_POINT, LOCATION_END_POINT, SUBJECT_END_POINT } from '../../../constants/index';
import moment from 'moment';
import { QUERY_KEYS } from '../../../constants/queryKeys.js';
import { get, post, put } from '../../../helpers/api_helper';
import { mapArrayToDropdown } from '../../../helpers/common_Helper.js';
import { useGetAllData } from '../../../utils/hooks/useGetAllData.js';
import ToastMessage from '../../../components/Toast';
import Axios from "../../../utils/axios";
import decodeToken from "../../../utils/decodeToken";

const TutorRequest = () => {
  const router = useRouter()
  const { http} = Axios();
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const [form] = Form.useForm();
  const [visited, setIsVisited] = useState(false);
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const [numOfStudent, setNumOfStudent] = useState(null);
  const [category, setCategory] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subject, setSubject] = useState([]);
  const [city, setCity] = useState([]);
  const [location, setLocation] = useState([]);
  const [tokenValue, setTokenValue] = useState({});
  const [profile, setProfile] = useState({});
  console.log(profile);
  // const userId = tokenValue?.userId;
  const { token } = Axios();
  const  { colorBgContainer }  = theme.useToken();
  const phoneNumberPattern = /^(?:01[3-9])\d{8}$/;
  const handleStudetNumber = async (value) => {
    setNumOfStudent(value);
  }





  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (token) {
          const decodedToken = decodeToken(token);
          if (decodedToken) {
            setProfile(decodedToken);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error fetching and decoding token:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);







  // const fetchProfile = async () => {
  //   try {
  //     if (token) {
  //       const decodedToken = decodeToken(token);
  //       if (decodedToken) {
  //         setProfile(decodedToken);
  //       } else {
  //         console.error('Error decoding token:', decodedToken);
  //         setLoading(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching and decoding token:', error);
  //     setLoading(false);
  //   }
  // };


  
  

  // useEffect(()=>{
  //   fetchProfile()
  // },[])










  const { Content } = Layout;
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

  const style = {
    background: "#0092ff",
    padding: "8px 0",
  };


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


  /**fetch subject list*/

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

  /**fetch subject list end */



  /** Fetch city */
  const {
    data: cityList,
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



    /**fetch class   End */

    const [classess, setClassess] = useState([]);
    const [code, setCode] = useState("");
    console.log(code);
    const handleCategory = async (value) => {
  
  
      setIsVisited(true);
      const fetchCategory = await get(CATEGORIE_END_POINT.info(value));
      console.log("fetchCategory", fetchCategory);
      setCode(fetchCategory?.data?.code)
      const classInfo = fetchCategory?.data?.class.map((item) => ({
        _id: item?.classId?._id,
        name: item?.classId?.name,
      }));
  
  
      const CATEGORYDROPDOWN = mapArrayToDropdown(
        classInfo,
        'name',
        '_id'
      );
  
  
      setClassess(CATEGORYDROPDOWN);
  
    }
  
    /**fetch class list  End */




  const handleDateChange = (date, dateString) => {
    const formattedDate = moment(dateString).format('MM/DD/YYYY');
    console.log(formattedDate);  // Output: 07/04/2023
    // You can update the form value or do any other necessary operations here
  };

  const onFinish = async (values) => {
    const formattedDate = moment(values.hireDate).format('DD/MM/YYYY');
    const formattedTime = moment(values.tutoringTime).format('h:mm A');
    const subjects = values.subject?.map((subjectId) => ({
      subjectId: subjectId,
    }));
    values.subject = subjects;
    const classes = values.class?.map((classId) => ({
      classId: classId,
    }));
    values.class = classes;
    let body = { ...values,guardian:profile.userId, status:false,isApproval: false };
    const response = await post(JOB_REQUEST_END_POINT.create(), body);
    if (response.status === 'SUCCESS') {
      notify('success', response.message);
      router.push('/dashboard/dashboard');

    } else {
      notify('error', response.errorMessage);
      setLoading(false);
    }

  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (Object.keys(profile).length === 0) {
    return <div>Error loading profile data.</div>;
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
            onFinish={onFinish}
            form={form}
            name="control-hooks"

          >
            <div className="row">
              <div className="col-12 col-md-7">
                <div className="row">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <h4 className="card-title border-bottom">
                          {" "}
                          Guardian Information (try to fix)
                        </h4>



                        <Form.Item
                          name="tuitionType"
                          label="Type version"
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
                            // mode="multiple"
                            onChange={handleCategory}
                            placeholder="Please select Category"
                            options={category}
                          />
                        </Form.Item>


                        {code === 'MT' && (
                          <Form.Item
                            name="curriculum"
                            label="Curriculum"
                          >
                            <Select placeholder="Select an option" allowClear>
                              <Option value="Ed-Excel">Ed-Excel</Option>
                              <Option value="Cambridge">Cambridge</Option>
                              <Option value="IB">IB</Option>
                            </Select>
                          </Form.Item>
                        )}


                        <Form.Item
                          name="noOfStudent"
                          label="Number of Students"
                          rules={[
                            {
                              required: true,
                              message: 'Number of students is required',
                            },
                          ]}
                          hasFeedback
                        >
                          <InputNumber onChange={handleStudetNumber} style={{ width: '100%' }} />
                        </Form.Item>


                        <Form.Item
                          name="class"
                          label="Select class"
                          rules={[
                            {
                              required: true,
                              message: 'Please select  class!',
                              type: 'array',

                            },
                            {

                              type: 'array',
                              min: 1,
                              message: 'Please select  class!',

                            },
                            {

                              type: 'array',
                              max: numOfStudent,
                              message: 'You can not select more then your student',
                            },
                          ]}
                          hasFeedback
                        >
                          <Select
                            mode="multiple"
                            placeholder="Please select class"
                            options={classes}
                          />
                        </Form.Item>

                        <Form.Item
                          name="subject"
                          label="Select Subject"
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


                        <Form.Item
                          label="Address"
                          name="address"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter the full permanent address',
                            },
                          ]}
                        >
                          <Input.TextArea
                            rows={3}
                            placeholder="Enter Full Address"
                          />
                        </Form.Item>


                        <Form.Item
                          name="studentGender"
                          label="Student Gender"

                        >
                          <Radio.Group>
                            <Radio value="Male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                            {numOfStudent > 1 && <Radio value="Both">Both</Radio>}
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item
                          name="teacherGender"
                          label="Tutor Gender"

                        >
                          <Radio.Group>
                            <Radio value="Male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                            <Radio value="Any">Any</Radio>
                          </Radio.Group>
                        </Form.Item>




                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-5">
                <div className="row">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <h4 className="card-title border-bottom">
                          {" "}
                          Tutor Information
                        </h4>



                        <Form.Item
                          label="Days / Week"
                          name="daysPerWeek"

                        >
                          <InputNumber
                            placeholder="Enter days per week"
                            min={1}
                            max={7}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>

                        <Form.Item
                          label="Preference Institute Name"
                          name="preferenceInstitute"

                        >
                          <Input
                            placeholder="Enter preference institute name"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Salary Type"
                          name="salaryType"
                        >
                          <Select placeholder="Select an option" allowClear>
                            <Option value="Fixed">Fixed</Option>
                            <Option value="Range">Range</Option>
                            <Option value="Negotiable">Negotiable</Option>


                          </Select>
                        </Form.Item>



                        <Form.Item
                          label="Salary (BDT)"
                          name="salary"
                        >

                          <Input />
                        </Form.Item>

                        <Form.Item
                          label="Hire Date"
                          name="hireDate"
                          className="responsive-datepicker"
                        >
                          <DatePicker
                            style={{ width: '300px', height: '40px' }}
                            format="DD/MM/YYYY"
                            onChange={handleDateChange}
                          />
                        </Form.Item>

                        <Form.Item
                          label="Tutoring Time"
                          name="tutoringTime"
                          className="responsive-datepicker"
                        >
                          <TimePicker
                            style={{ width: '300px', height: '40px' }}
                            format="h:mm A"
                          />
                        </Form.Item>

                        <Form.Item
                          label="More Requirement"
                          name="requirement"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: 'Requirement is required',
                        //   },
                        // ]}
                        >
                          <Input.TextArea
                            rows={2}
                            placeholder="Enter Full requirement"
                          />
                        </Form.Item>
                        <Form.Item
                          name="phone"
                          label="Phone"
                        // rules={[
                        //   {
                        //     required: true,
                        //     pattern: phoneNumberPattern,
                        //     message: 'Please enter a valid Bangladeshi phone number!',
                        //   },
                        // ]}
                        // hasFeedback
                        >
                          <Input />
                        </Form.Item>

                       




                        <Form.Item {...tailLayout}>
                          <div className="container mb-5">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="d-flex justify-content-md-end">
                                  <Button type="primary" htmlType="submit" loading={loading}>
                                    Submit
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                        </Form.Item>

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

export default TutorRequest