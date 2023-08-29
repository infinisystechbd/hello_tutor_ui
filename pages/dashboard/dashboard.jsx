import { CalendarOutlined, DingtalkOutlined, EnvironmentOutlined, ReadOutlined } from '@ant-design/icons';
import { faPerson, faPersonDress, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, DatePicker, Layout, Row, Select, Spin, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import HeadSection from '../../components/HeadSection';
import { DASHBOARD_END_POINT } from '../../constants/index';
import { get } from '../../helpers/api_helper';
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
  // const { data: dashboard } = useGetAllData(QUERY_KEYS.GET_ALL_DASHBOARD, DASHBOARD_END_POINT.dashbord(true,limit,page));


  const { RangePicker } = DatePicker;

  const getAllData = async (limit,page,fromDate,toDate) =>{

    let isSubscribed = true;
    console.log(fromDate, toDate)
    await get(DASHBOARD_END_POINT.dashbord(true,limit,page, fromDate,toDate))
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



  useEffect(() => {
    getAllData(limit,page,fromDate,toDate)
    console.log("----")
  }, [limit,page,fromDate, toDate]);







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
    console.log({date} , {dateString})

  }
  const onChangeToDate = ( date, dateString ) => {
    SetToDate(dateString)

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
            <Col md={6} xs={12}>
            <DatePicker placeholder='From Date' onChange={onChangeFromDate} style={{width: '100%'}} />
            </Col>
            <Col md={6} xs={12}>
            <DatePicker placeholder='To Date' onChange={onChangeToDate} style={{width: '100%'}} />
            </Col>
            <Col md={4} xs={12}>
            <Select style={{ width: '100%' }} />
            </Col>
            <Col md={4} xs={12}>
          <Select style={{ width: '100%' }}/>
            </Col>
          </Row>
        </Card>
        
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
