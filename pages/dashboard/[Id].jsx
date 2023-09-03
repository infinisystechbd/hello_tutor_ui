import { faBangladeshiTakaSign, faBars, faBook, faCalendarDays, faClock, faLocationDot, faPeopleGroup, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Layout, Row, Spin, Typography, Watermark, theme } from 'antd';
import { useRouter } from 'next/router';
import React, { Fragment, useCallback, useState } from 'react';
import { DASHBOARD_END_POINT } from '../../constants';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { useGetAllData } from '../../utils/hooks/useGetAllData';
import Axios from '../../utils/axios';
import { post } from '../../helpers/api_helper';
import ToastMessage from '../../components/Toast';

const JobDetails = () => {
  const router = useRouter();
  const { Id } = router?.query;
  const { http, setToken, token } = Axios();
  const { Text, Link } = Typography;
  const { Content } = Layout;
  const { data, isError, isLoading } = useGetAllData(QUERY_KEYS.GET_JOB_DETAILS, DASHBOARD_END_POINT.jobDetails(Id));
  console.log(data?.data);
  const { token: { colorBgContainer }, } = theme.useToken();
  const [loading, setLoading] = useState(false);
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  
  const handleApply = async () => {
    console.log(Id);
    setLoading(true);
    try {
      const response = await post(DASHBOARD_END_POINT.jobApply(Id));
      if (response.status === 'SUCCESS') {
        notify('success', response.message);
      } else {
        notify('error', response.errorMessage);
        setLoading(false);
      }
       setLoading(false);
    } catch (error) {
      notify('error', error.message);
      setLoading(false);
    }
  }
  return (

    <Fragment>

      <Content className="custom-content">
        <div className="responsive-fixed-container">

          <div>
            <div className='container mt-2'>
              <Watermark content="Hello Tutor">
                {isLoading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                    <Spin tip='Loading' size='large' />
                  </div>
                ) : (
                  <Card title={data?.data?.title} bordered={false} type="inner" style={{ width: '100%' }}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12} md={6}>
                        <Text type="secondary">Job ID: <Text type='secondary' strong>{data?.data?.jobId}</Text></Text>
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <Text type='secondary'>Posted Date: <Text strong>{data?.data?.postedDate}</Text> </Text>
                      </Col>
                    </Row>

                    <Row gutter={[16, 16]} className='mt-4'>
                      <Col xs={24} sm={12} md={8}>
                        <FontAwesomeIcon icon={faBars} color='blue' />
                        <Text type='secondary' strong>Tuition Type: <Text strong>Home</Text> </Text>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <FontAwesomeIcon icon={faVenusMars} color='blue' />
                        <Text type='secondary' strong>Student Gender: <Text strong>{data?.data?.studentGender}</Text></Text>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <FontAwesomeIcon icon={faVenusMars} color='blue' />
                        <Text type='secondary' strong>Preferred Tutor: <Text strong>{data?.data?.preferredGender}</Text></Text>
                      </Col>
                    </Row>

                    <Row gutter={[16, 16]} className='mt-4'>
                      <Col xs={24} sm={12} md={8}>
                        <FontAwesomeIcon icon={faClock} color='blue' />
                        <Text type='secondary' strong>Tutoring Time: <Text strong>{new Date(data?.data?.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text></Text>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <FontAwesomeIcon icon={faCalendarDays} color='blue' />
                        <Text type='secondary' strong>Tutoring Days: <Text strong>{data?.data?.daysPerWeek}</Text></Text>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <FontAwesomeIcon icon={faPeopleGroup} color='blue' />
                        <Text type='secondary' strong>Number of Students: <Text strong>{data?.data?.noOfStudent}</Text></Text>
                      </Col>
                    </Row>

                    <Row gutter={[16, 16]} className='mt-4'>
                      <Col xs={24} sm={12} md={8}>
                        <FontAwesomeIcon icon={faBangladeshiTakaSign} color='green' />
                        <Text type='secondary' strong>Salary: <Text strong >{data?.data?.salary}</Text></Text>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <FontAwesomeIcon icon={faBook} color='blue' />
                        <Text type='secondary' strong>Subjects: <Text strong >{data?.data?.subjects}</Text></Text>
                      </Col>
                    </Row>

                    <Row gutter={[16, 16]} className='mt-4'>
                      <Col span={24}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <Text type='secondary' strong>Location</Text>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Text>{data?.data?.address}</Text>
                      </Col>
                    </Row>



                    <Row className='mt-4'>
                      <Col md={24}>
                        <Text type='secondary'><Text type='secondary' strong>Other Requirment</Text> - {data.data.requirement ?? "No requirment"}</Text>
                      </Col>
                    </Row>

                    <Row gutter={[16, 16]} className='mt-4'>
                      <Col span={8}>
                        {/* <Button block>Location</Button> */}
                      </Col>
                      <Col span={8}>
                        {/* <Button block>Direction</Button> */}
                      </Col>
                      <Col span={8}>
                        {token !== null ? (

                          // <Button block type='primary' onClick={handleApply}>Apply</Button>
                          <button type="button" class="btn btn-outline-primary " onClick={handleApply}  style={{ width: '100%' }}>Apply</button>
                        
                        ) : (
                          <>
                            <Link href="/login">
                              {/* <Button block type='primary'>Apply</Button> */}
                              <button type="button" class="btn btn-outline-primary " style={{ width: '100%' }}>Apply</button>
                              
                            </Link>

                          </>
                        )}
                      </Col>
                    </Row>
                  </Card>
                )}
              </Watermark>
            </div>
          </div>
        </div>





      </Content>
    </Fragment>
  );
}

export default JobDetails;
