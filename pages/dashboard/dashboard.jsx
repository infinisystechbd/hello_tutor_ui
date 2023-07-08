import { DingtalkOutlined, EnvironmentOutlined, ReadOutlined } from '@ant-design/icons';
import { faPerson, faPersonDress } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Typography } from 'antd';
import React, { Fragment } from 'react';
import { DASHBOARD_END_POINT } from '../../constants';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { useGetAllData } from '../../utils/hooks/useGetAllData';
const { Text, Link } = Typography;
const dashboard = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data: dashboard } = useGetAllData(QUERY_KEYS.GET_ALL_DASHBOARD, DASHBOARD_END_POINT.dashbord(true));
  console.log("dashboard",dashboard);
  
  const onDetails = (value) => {
    console.log(value);
  }
  return (
    <Fragment>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between" style={{marginLeft: "4px"}}  >
        {
            dashboard?.data?.map((t , i)=> (
                <Col key={i} className="gutter-row" span={11}>
                <Card className='mt-2 custom-card' title={t.title}  bordered={false}>
                  <Row >
                      <Col md={6} >
                      <Text type="secondary">Job ID : <Text strong>{t.jobId}</Text></Text>
                      </Col>
                      <Col md={1}><Text type="secondary" strong>|</Text></Col>
                      <Col md={7}>
                          <Text type="secondary">Posted Date: <Text strong>{t.postedDate}</Text></Text>
                      </Col>
                  </Row>
                  <Row className='mt-2'>
                  <Col md={6}>
                      <Text type="secondary">Tuition Type : <Text strong>Home</Text></Text>
                  </Col>
                    <Col md={7}>
                    <DingtalkOutlined style={{ fontSize: '18px', color: '#08c' }} />
                      <Text type='secondary'> Salary: </Text>
                      <Text strong>{t.salary}</Text>
                    </Col>
                    <Col md={7}>
                    <ReadOutlined  style={{ fontSize: '18px', color: '#08c' }}/>
                    <Text type='secondary'> Subjects: </Text>
                    <Text strong>{t.subjects}</Text>
                    </Col>

                  </Row>
                  <Row className='mt-2'>
                    <Col>
                    <EnvironmentOutlined style={{ fontSize: '18px', color: '#08c' }} />
                    <Text type='secondary'> Location: </Text>
                    <Text strong>{t.address}</Text>
                    </Col>
                  </Row>
                  <Row className='mt-2' justify="space-between">
                    <Col >
                    <FontAwesomeIcon color={t.preferredGender == "Male" ? "green" : "red"} icon={ t.preferredGender == "Male" ? faPerson: faPersonDress} style={{ fontSize: '1rem' }}/>
                  <Text>{" "}</Text>
                  <Text strong> {t.preferredGender} <Text type='secondary'>tutor preferred</Text></Text>
                    
                    </Col>
                    <Col>
                    <Button type="primary" onClick={(t)=> onDetails(t)}>Details</Button>
                    </Col>
                  
                  
                  </Row>
                </Card>
                </Col>
            ))
        }
    

        

         
      </Row>
    </Fragment>
  );
};

export default dashboard;
