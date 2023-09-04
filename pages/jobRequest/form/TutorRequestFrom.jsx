import { Button, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, Switch, TimePicker, Row, Col } from "antd";
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import ToastMessage from '../../../components/Toast';
import { CATEGORIE_END_POINT, CITY_END_POINT, CLASS_END_POINT, GUARDIAN_END_POINT, JOB_REQUEST_END_POINT, LOCATION_END_POINT, SUBJECT_END_POINT } from '../../../constants/index';
import { QUERY_KEYS } from '../../../constants/queryKeys.js';
import { get, post, put } from '../../../helpers/api_helper';
import { mapArrayToDropdown } from '../../../helpers/common_Helper.js';
import { useGetAllData } from '../../../utils/hooks/useGetAllData.js';


const TutorRequestFrom = (props) => {
  const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
  console.log("setEditData", setEditData);
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const [allGuardianList, setAllGuardianList] = useState([]);
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [allClassesList, setAllClassesList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subject, setSubject] = useState([]);
  const [guardian, setGuardian] = useState([]);
  const [city, setCity] = useState([]);
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [status, setStatus] = useState(true);
  const [visited, setIsVisited] = useState(false);
  const [numOfStudent, setNumOfStudent] = useState(null);
  const phoneNumberPattern = /^(?:01[3-9])\d{8}$/;
  const [guardianCity, setGuardianCity] = useState(null);
  const [newGuardian, setNewGuardian] = useState(false);


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



  /** Fetch Guardian List */
  const {
    data: guardianList,
    isLoading,
    refetch: fetchGuardianList,
  } = useGetAllData(QUERY_KEYS.GET_ALL_GUARDIAN_LIST, GUARDIAN_END_POINT.get(1, -1, '', true));


  /**guarian dropdown */
  useEffect(() => {
    const GUARDIANDROPDOWN = mapArrayToDropdown(
      guardianList?.data?.data,
      'fullName',
      '_id'
    );
    setGuardian(GUARDIANDROPDOWN);
  }, [guardianList]);
  /** Fetch Guardian List End */




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



  // fetch subject list
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

  useEffect(() => {
    // Clear selected classes when category changes
    setClassess([]);
  }, [code]);

  /**fetch class list  End */



  const handleGuardian = async (value) => {
    setIsVisited(true);
    const fetchGuardian = await get(GUARDIAN_END_POINT.info(value));
    const getGuardian = guardianList?.data?.data.find(t => t._id === value);
    console.log(getGuardian)
    const city = getGuardian?.city;
    console.log(city)


    if (city) {
      // Set the guardianCity state with the new data
      await setGuardianCity({
        _id: city._id,
        name: city.name,
      });
      console.log(guardianCity)
    } else {
      // If city is not available, set guardianCity to null or any default value
      setGuardianCity(null); // Change `null` to any default value you prefer
    }
  };


  // handleGuardian


  const [salaryType, setSalaryType] = useState('');
  const [selectSalary, setSelectSalary] = useState(false)
  const handleSalaryType = async (value) => {
    console.log("salaryType", value);
    setSalaryType(value);
    setSelectSalary(true);
  }

  const handleStudetNumber = async (value) => {
    setIsVisited(true);
    setNumOfStudent(value);
  }

  const handleDateChange = (date, dateString) => {
    const formattedDate = moment(dateString).format('MM/DD/YYYY');
    // Output: 07/04/2023
    // You can update the form value or do any other necessary operations here
  };



  const handleNewGuardian = async (value) => {

    setNewGuardian(value)
  };



  // class: setEditData?.class?.map((t) => ({ label: t.classId.name, value: t.classId })),


  /** create from or edit from   */

  if (setEditData != null && visited == false) {
    form.setFieldsValue({
      guardian: setEditData?.guardian?._id,
      category: setEditData?.category?._id,
      noOfStudent: setEditData?.noOfStudent,
      subject: setEditData?.subject?.map((t) => t.subjectId)?.map((t) => t._id),
      // class: setEditData?.class?.map((t) => t.classId)?.map((t) => t?._id),
      // class: setEditData?.class?.map((t) => t.classId._id),
      // class: setEditData?.class?.map((t) => ({ label: t.classId.name, value: t.classId._id })),


      // subject: setEditData?.subject?.map((t) => t.subjectId)?.map((t) => t._id),
      class: setEditData?.class?.map((t) => t.classId)?.map((t) => ({ label: t.name, value: t?._id })),



      // city: setEditData?.city?.map((t) => t.subjectId)?.map((t) => t._id),
      studentGender: setEditData.studentGender,
      city: guardianCity?.name || setEditData.city?._id,
      location: setEditData.location?._id,
      address: setEditData.address,
      teacherGender: setEditData.teacherGender,
      daysPerWeek: setEditData.daysPerWeek,
      // tutoringTime:setEditData?.tutoringTime,
      preferenceInstitute: setEditData.preferenceInstitute,
      salaryType: setEditData.salaryType,
      salary: setEditData.salary,
      requirement: setEditData.requirement,
      phone: setEditData.phone,
      isApproval: setEditData.isApproval,
      tuitionType: setEditData.tuitionType,
      curriculum: setEditData.curriculum,
      hireDate: moment(setEditData.hireDate),
      tutoringTime: moment(setEditData.tutoringTime),
      status: setEditData.status,
      jobStatus: setEditData.jobStatus,
    });
  } else if (setEditData == null && visited == false) {
    form.resetFields();
  }
  const afterModalClose = () => {
    setIsVisited(false)
  }
  /** create from or edit from end  */






  const onFinish = async (values) => {


    const formattedDate = moment(values.hireDate).format('DD/MM/YYYY');
    const formattedTime = moment(values.tutoringTime).format('h:mm A');

    const subjects = values.subject?.map((subjectId) => ({
      subjectId: subjectId,
    }));
    values.subject = subjects;

    const classes = values.class?.map((classId) => ({
      classId: setEditData?._id ? classId.value : classId,
    }));





    values.class = classes;

    try {
      if (setEditData?._id) {
        const update = await put(JOB_REQUEST_END_POINT.update(setEditData?._id), values, formattedDate, formattedTime);
        if (update.status === 'SUCCESS') {
          notify('success', update.message);
          if (isParentRender) {
            isParentRender(true);
          }
          setIsModalOpen(false);
        } else {
          notify('error', update.errorMessage);
          setLoading(false);
        }
      } else {
        const response = await post(JOB_REQUEST_END_POINT.create(), values, formattedDate, formattedTime);
        if (response.status === 'SUCCESS') {
          notify('success', response.message);
          if (isParentRender) {
            isParentRender(true);
          }
          setIsModalOpen(false);
        } else {
          notify('error', response.errorMessage);
          setLoading(false);
        }
      }
      setLoading(false);
    } catch (error) {
      notify('error', error.message);
      setLoading(false);
    }
  };

  return (
    <Modal
      title={setEditData != null ? "Update Job Request" : "Add Job Request"}
      // style={{ top: 5 }}
      centered
      open={isModalOpen}
      footer={null}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      // style={{ marginTop: '5vh' }}
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
    >

      {

        setEditData != null ? "" :


          <Form.Item

            name="newGuardian"
            label="newGuardian"
            valuePropName="checked"

            rules={[
              {
                required: true,
              },
            ]}

            hasFeedback
          >
            <Switch
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
              }} onChange={handleNewGuardian} checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

      }




      <Form
        className="mt-3"
        {...layout}
        {...setEditData}
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
                    <h4 className="card-title border-bottom">
                      {" "}
                      {/* Guardian Information */}
                    </h4>

                    {
                      !newGuardian ? (
                        <Form.Item
                          className="mt-4"
                          name="guardian"
                          label="Guardian"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          hasFeedback
                        >
                          <Select
                            onChange={handleGuardian}
                            placeholder="Please select Guardian"
                            options={guardian}
                          />
                        </Form.Item>
                      ) : (
                        <Form.Item
                          name="fullName"
                          label="FullName"
                        >
                          <Input />
                        </Form.Item>
                      )
                    }


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
                      className="mt-4"
                      rules={[
                        {
                          required: true,
                          message: 'Number of students is required',
                        },

                      ]}
                      hasFeedback
                    >
                      <InputNumber onChange={handleStudetNumber}
                        defaultValue={1} // Set the default value to 1
                        style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                      name="class"
                      label="Class/Course"
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
                        options={classess}

                      />
                    </Form.Item>

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
                        // mode="multiple"
                        onChange={handleCity}
                        placeholder="Please select City"
                        options={city}
                        defaultValue={guardianCity ? guardianCity._id : undefined}
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
                      style={{ marginBottom: '115px' }}
                    >
                      <Input.TextArea
                        rows={3}
                        placeholder="Enter Full Address"
                      />
                    </Form.Item>

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
                      {/* Tutor Information */}
                    </h4>

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



                    <Form.Item name="teacherGender" label="Tutor Gender">
                      <Radio.Group defaultValue="Any">
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                        <Radio value="Any">Any</Radio>
                      </Radio.Group>
                    </Form.Item>


                    <Form.Item
                      label="Days / Week"
                      name="daysPerWeek"
                    >
                      <Select placeholder="Select an option" allowClear>
                        <Option value={1}>1 Day Per Week</Option>
                        <Option value={2}>2 Day Per Week</Option>
                        <Option value={3}>3 Day Per Week</Option>
                        <Option value={4}>4 Day Per Week</Option>
                        <Option value={5}>5 Day Per Week</Option>
                        <Option value={6}>6 Day Per Week</Option>
                        <Option value={7}>7 Day Per Week</Option>

                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Preference Institute"
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
                      <Select placeholder="Select an option"
                        onChange={handleSalaryType}
                        allowClear>
                        <Option value="Fixed">Fixed</Option>
                        <Option value="Range">Range</Option>
                        <Option value="Negotiable">Negotiable</Option>


                      </Select>
                    </Form.Item>


                    {/* <Form.Item
                            label="Salary (BDT)"
                            name="salary"

                          >

                            <Input />
                          </Form.Item> */}



                    {salaryType &&
                      <>

                        {salaryType == 'Range' ? (<Row >
                          <Col span={24} sm={18} md={12}>
                            <Form.Item
                              label="From"
                              name="salary"


                            >

                              <Input placeholder="Salary Range Start" />
                            </Form.Item>
                          </Col>

                          <Col span={24} sm={18} md={12}>
                            <Form.Item
                              label="To"
                              name="salary"

                            >

                              <Input placeholder="Salary Range End" />
                            </Form.Item>
                          </Col>

                        </Row>) : (

                          <Form.Item
                            label="Salary (BDT)"
                            name="salary"

                          >

                            <Input />
                          </Form.Item>
                        )}




                      </>
                    }
                    <Form.Item
                      label="Hire Date"
                      name="hireDate"
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

                    >
                      <TimePicker
                        style={{ width: '300px', height: '40px' }}
                        format="h:mm A"
                      />
                    </Form.Item>

                    <Form.Item
                      label="More Requirement"
                      name="requirement"

                    >
                      <Input.TextArea
                        rows={2}
                        placeholder="Enter Full requirement"
                      />
                    </Form.Item>




                    <Form.Item name="status" label="Status">
                      <Select placeholder="Select an option" allowClear defaultValue={true}>
                        <Option value={true}>Active</Option>
                        <Option value={false}>Inactive</Option>
                      </Select>
                    </Form.Item>



                    {/* {

setEditData != null ? "" : */}

                    {setEditData && (
                      <Form.Item
                        label="Job Status"
                        name="jobStatus"
                      >
                        <Select placeholder="Select an option"
                          //  onChange={handleSalaryType}
                          allowClear>
                          <Option value="ACTIVE">ACTIVE</Option>
                          <Option value="PENDING">PENDING</Option>
                          <Option value="CANCELED">CANCELED</Option>
                          <Option value="CONFIRMED">CONFIRMED</Option>


                        </Select>
                      </Form.Item>
                    )}


                    <Form.Item
                      name="isApproval"
                      label="Approval"
                      valuePropName="checked"
                      initialValue={true}
                    >
                      <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                    </Form.Item>



                    <Form.Item {...tailLayout}>
                      <div className="d-flex justify-content-end">
                        <Button
                          style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                          }} type="primary" htmlType="submit" loading={loading}>
                          Submit
                        </Button>
                      </div>
                    </Form.Item>



                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default TutorRequestFrom;






