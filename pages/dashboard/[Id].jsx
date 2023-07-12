import { faBangladeshiTakaSign, faBars, faBook, faCalendarDays, faClock, faLocationDot, faPeopleGroup, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Spin, Typography, Watermark } from 'antd';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { DASHBOARD_END_POINT } from '../../constants';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { useGetAllData } from '../../utils/hooks/useGetAllData';

const JobDetails = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { Id } = router?.query;

  const { Text, Link } = Typography;
 
 const {data , isError , isLoading } = useGetAllData(QUERY_KEYS.GET_JOB_DETAILS, DASHBOARD_END_POINT.jobDetails(Id));
  console.log(data)
 //const {title, jobId} = data?.data;
 if(isLoading){
 
 }
  return (
    <Fragment>

    <div className='container mt-2'>
      <Watermark content="Hello Tutor">
    {
      isLoading ? ( <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin>) : (
      <Card title={data?.data?.title} bordered={false}  type="inner" style={{ width: '100%' }}>
      <Row>
      <Col md={6}>
        <Text type="secondary">Job ID: <Text type='secondary' strong>{data?.data?.jobId}</Text></Text>
      </Col>
      <Col md={1}>
      <Text strong type='secondary'>|</Text>
      </Col>
      <Col md={6}>
      <Text type='secondary'>Posted Date: </Text>
      <Text type='secondary' strong>{data?.data?.postedDate}</Text>
      </Col>
      </Row>
      <Row className='mt-4'>
        <Col md={7}>
        <FontAwesomeIcon icon={faBars} color='blue' />
        <Text type='secondary' strong> Tuition Type</Text>
        </Col>
        <Col md={7}>
        <FontAwesomeIcon icon={faVenusMars} color='blue' />
        <Text type='secondary' strong> Student Gender</Text>
        </Col>

        <Col md={7}>
        <FontAwesomeIcon icon={faVenusMars} color='blue' />
        <Text type='secondary' strong> Preferred Tutor</Text>
        </Col>
        
      </Row>
      <Row >
        <Col md={7}>
        <Text  >Home</Text>
        </Col>
        <Col md={7}>
        <Text >{data?.data?.studentGender}</Text>
        </Col>

        <Col md={7}>
        <Text >{data?.data?.preferredGender}</Text>
        </Col>
        
      </Row>

      <Row className='mt-4'>
        <Col md={7}>
        <FontAwesomeIcon icon={faClock} color='blue' />
        <Text type='secondary' strong> Tutoring Time</Text>
        </Col>
        <Col md={7}>
        <FontAwesomeIcon icon={faCalendarDays} color='blue' />
        <Text type='secondary' strong> Tutoring Days</Text>
        </Col>

        <Col md={7}>
        <FontAwesomeIcon icon={faPeopleGroup} color='blue' />
        <Text type='secondary' strong> Number of Students</Text>
        </Col>
        
      </Row>

      <Row>
        <Col md={7}>
        <Text  > {data?.data?.time}</Text>
        </Col>
        <Col md={7}>
        <Text  > {data?.data?.daysPerWeek}</Text>
        </Col>

        <Col md={7}>
        <Text  > {data?.data?.noOfStudent}</Text>
        </Col>
        
      </Row>

      <Row className='mt-4'>
        <Col md={7}>
        <FontAwesomeIcon icon={faBangladeshiTakaSign} color='green' />
        <Text type='secondary' strong> Salary</Text>
        </Col>
        <Col md={7}>
        <FontAwesomeIcon icon={faBook} color='blue' />
        <Text type='secondary' strong> Subjects</Text>
        </Col>

        
      </Row>
      <Row >
        <Col md={7}>
        <Text  >{data?.data?.salary}</Text>
        </Col>
        <Col md={7}>
        <Text >{data?.data?.subjects}</Text>
        </Col>

        
      </Row>
      <Row className='mt-4' >
        <Col md={7}>
        <FontAwesomeIcon icon={faLocationDot} />
        <Text type='secondary' strong> Location</Text>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Text> </Text>
        <Text>{data?.data?.address}</Text>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col md={24}>
        <Text type='secondary'><Text type='secondary' strong>Other Requirment</Text> - {data.data.requirement ?? "No requirment"}</Text>
        </Col>
      </Row>

      <Row className='mt-4' >
        <Row justify="space-between">
          <Col span={4}>
        <Button>Location</Button>
        </Col>
        <Col span={4}>
        <Button>Direction</Button>
        </Col>
        <Col span={4}>
        <Button type='primary'>Apply</Button>
        </Col>
        </Row>
      </Row>
    </Card>
    )
    }
      
    
  </Watermark>

    </div>
    </Fragment>
  )
}

export default JobDetails