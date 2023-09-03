import { CalendarOutlined, DingtalkOutlined, EnvironmentOutlined, ReadOutlined } from '@ant-design/icons';
import { faPerson, faPersonDress, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, DatePicker, Drawer, Layout, Row, Select, Space, Spin, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import HeadSection from '../../components/HeadSection';
import { CATEGORIE_END_POINT, CITY_END_POINT, CLASS_END_POINT, DASHBOARD_END_POINT, LOCATION_END_POINT, SUBJECT_END_POINT } from '../../constants/index';
import { get } from '../../helpers/api_helper';
import { mapArrayToDropdown } from '../../helpers/common_Helper';
import Axios from '../../utils/axios';
const Dashboard = () => {
  const { Text, Link } = Typography;
  const { Content } = Layout;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [loading, setLoading] = useState(true);
  const[dashboard,setDashboard] = useState([]);
  console.log(dashboard);
  const [fromDate , SetFromDate] = useState();
  const [toDate , SetToDate] = useState();
  const [category, setCategory] = useState([]);
  const [selectedCateGory, setSelectedCategory] = useState('');
  const [cityDropDown, setCityDropDown] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [locationDropDown, setLocationDropDown] = useState([]);
  const [selectedLocation, setselectedLocation] = useState('');
  const [classDropDown, setClassDropDown] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [subjectDropDown, setSubjectDropDown] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [tutionType,setTutionType] = useState('');
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  // const { data: dashboard } = useGetAllData(QUERY_KEYS.GET_ALL_DASHBOARD, DASHBOARD_END_POINT.dashbord(true,limit,page));


  const { RangePicker } = DatePicker;

  const getAllData = async (limit,page) => {

    let isSubscribed = true;
    await get(DASHBOARD_END_POINT.dashbord(true,limit,page, fromDate,toDate,tutionType,selectedCity,selectedLocation,selectedCateGory,selectedClass,selectedSubject))
      .then((res) => {
        console.log(res)
        if (isSubscribed) {
          setDashboard(res?.data);
          //setDashboard((prev)=>[...prev,...res?.data]);
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log("Server Error ~!")
      });

    return () => isSubscribed = false;
  }

  const fetchCategory = async () => {
    const fetchdata = await get(CATEGORIE_END_POINT.get(1,-1,'',true));
    const arrayToDrop = mapArrayToDropdown(fetchdata?.data,'name','_id')
    setCategory(arrayToDrop);
  }
 useEffect(()=> {
  fetchCategory();
 },[])
  useEffect(() => {
    getAllData(limit,page)
  }, [limit,page,selectedCateGory]);







  const { http, setToken, token } = Axios();



  const handelInfiniteScroll = async () =>{

    try {
      if (window.innerHeight + document.documentElement.scrollTop  + 1 >= document.documentElement.scrollHeight)  {
        setLoading(false)
        setLimit((prev)=>prev+10)
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    window.addEventListener("scroll",handelInfiniteScroll);
    return () => window.removeEventListener("scroll",handelInfiniteScroll);
  },[])
  

  const router = useRouter();

  const onDetails = async (value) => {

    await router.push(`/dashboard/${value}`)
  }
  const onChangeFromDate = ( date, dateString ) => {
    SetFromDate(dateString)

  }
  const onChangeToDate = ( date, dateString ) => {
    SetToDate(dateString)

  }
  const onChangeCity = async (id) => {
      setSelectedCity(id);
      const fetchLocation = await get(LOCATION_END_POINT.getLocationByCityId(id));
      const locationArrayToDropDown = mapArrayToDropdown(fetchLocation?.data,'name','_id');
      setLocationDropDown(locationArrayToDropDown);
  }
  const onChangeLocation = (id) => {
    setselectedLocation(id);
  }
  const onChangeCategory = (value) => {
    setSelectedCategory(value)
  }


const fetchCity = async () => {
  const dataFetch = await get(CITY_END_POINT.get(1, -1,'',''));
  const cityArrayToDropDown = mapArrayToDropdown(dataFetch?.data,'name','_id')
  setCityDropDown(cityArrayToDropDown);
}
const fetchClass = async () => {
  const classFetch = await get(CLASS_END_POINT.get(1,-1,'',''));
  const classArrayToDropDown = mapArrayToDropdown(classFetch?.data, 'name', '_id');
  setClassDropDown(classArrayToDropDown);
}
const onChangeClass = (value) => {
  setSelectedClass(value);
}
const fetchSubject = async () => {
  const subjectFetch = await get(SUBJECT_END_POINT.dropdown(1,-1,'',''));
  const subjectArrayToDropDown = mapArrayToDropdown(subjectFetch?.data, 'name','_id');
  setSubjectDropDown(subjectArrayToDropDown);
}
const onChangeSubject = (value) => {
  setSelectedSubject(value);
}
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
    fetchCity();
    fetchClass();
    fetchSubject();
  }
  const onApply = () => {
    setOpen(false);
    getAllData(limit,page)
  }
  return (
    <>
      <Content
        style={{
          margin: '60px 0px',
        }}
      >

      <HeadSection title="Dashboard" />
      <div className='container'>
      <Card style={{marginTop: '70px'}}>
        <Row justify="space-evenly">
        <Col md={6} xs={6}>
          
        <Button onClick={onOpen}>Filter</Button>
        </Col>
          {category?.map(t => (
            <>
            <Col md={6} xs={6}>
            <Button key={t.categoryId} onClick={() => onChangeCategory(t._id)}>{t.name}</Button>
            </Col>
            </>
          ))}
          <Col md={6} xs={6}>
          
          <Button onClick={() => setSelectedCategory("")}>Reset Filter</Button>
          </Col>
        </Row>
          
      </Card>
      <Drawer
        title='Filter'
        placement="top"
        size={'default'}
        onClose={onClose}
        open={open}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onApply}>
              Apply
            </Button>
          </Space>
        }
      >
        <Row justify="space-evenly">
            <Col md={6} xs={12}>
            <DatePicker placeholder='From Date' onChange={onChangeFromDate} style={{width: '100%'}} />
            </Col>
            <Col md={6} xs={12}>
            <DatePicker placeholder='To Date' onChange={onChangeToDate} style={{width: '100%'}} />
            </Col>
            <Col md={4} xs={12}>
          <Select placeholder='City' options={cityDropDown} onChange={onChangeCity} style={{ width: '100%' }}/>
            </Col>
            <Col md={4} xs={12}>
          <Select placeholder='Location' options={locationDropDown} onChange={onChangeLocation} style={{ width: '100%' }}/>
            </Col>
        </Row>
        <Row justify="space-evenly" className='mt-2'>
        <Col md={6} xs={12}>
          <Select placeholder='Student Gender' style={{ width: '100%' }}/>
        </Col>
        <Col md={6} xs={12}>
          <Select placeholder='Tutor Gender' style={{ width: '100%' }}/>
        </Col>
        <Col md={6} xs={12}>
          <Select placeholder='Class' options={classDropDown} onChange={onChangeClass} style={{ width: '100%' }}/>
        </Col>
        <Col md={6} xs={12}>
          <Select placeholder='Subject' options={subjectDropDown} onChange={onChangeSubject} style={{ width: '100%' }}/>
        </Col>
        </Row>
      </Drawer>
        
        <Row gutter={[8, 16]} justify="space-between">
          
          {dashboard?.map((t, i) => (
            <Col key={i} className="gutter-row" xs={24} sm={24} md={12} lg={8}>
              <Card className='mt-2 custom-card' title={t.title} bordered={false} style={{ height: '325px' }}>


                <Row>
                  <Col md={10}>
                    <Text type="secondary">Job ID: <Text strong>{t?.jobId}</Text></Text>
                  </Col>

                </Row>


                <Row className="mt-2">

                  <Col md={24}>
                    <CalendarOutlined style={{ fontSize: '18px', color: '#08c' }} />
                    <Text type="secondary">Posted Date: <Text strong>{t.postedDate}</Text></Text>
                  </Col>
                </Row>


                <Row className="mt-2">

                  <Col md={24}>
                    <ReadOutlined style={{ fontSize: '18px', color: '#08c' }} />
                    <Text type="secondary"> Subjects: </Text>
                    <Text strong>{t.subjects}</Text>
                  </Col>
                </Row>


                <Row className="mt-2">
                  <Col>
                    <EnvironmentOutlined style={{ fontSize: '18px', color: '#08c' }} />
                    <Text type="secondary"> Location: </Text>
                    <Text strong>{t.address}</Text>
                  </Col>
                </Row>

                <Row className="mt-2" >
                  {/* PuzzleOutlined */}
                  <Col md={12}>
                    <FontAwesomeIcon icon={faPuzzlePiece} style={{ fontSize: '18px', color: '#08c' }} />
                    <Text type="secondary">Tuition Type:</Text>
                    <Text strong>Home</Text>
                  </Col>
                  <Col md={12}>
                    <DingtalkOutlined style={{ fontSize: '18px', color: '#08c' }} />
                    <Text type="secondary"> Salary: </Text>
                    <Text strong>{t.salary}</Text>
                  </Col>
                </Row>


                <Row className="mt-2 mb-6" justify="space-between">
                  <Col>
                    <FontAwesomeIcon
                      color={t.preferredGender === 'Male' ? 'green' : 'red'}
                      icon={t.preferredGender === 'Male' ? faPerson : faPersonDress}
                      style={{ fontSize: '1rem' }}
                    />
                    <Text>{" "}</Text>
                    <Text strong> {t.preferredGender} <Text type="secondary">tutor preferred</Text></Text>
                  </Col>
                  <Col>
                    <Button type="primary" onClick={() => onDetails(t.jobId)}>Details</Button>
                  </Col>
                </Row>

                {/* <div style={{ marginBottom: '16px' }}></div> */}
              </Card>
            </Col>
          ))}
          {loading && <Spin/>}
        </Row>
      </div>
      </Content>
    </>
  );
};

export default Dashboard;
