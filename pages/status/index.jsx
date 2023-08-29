import React, { useEffect, useState } from 'react';
import Axios from '../../utils/axios';
import { STATUS_END_POINT } from '../../constants/index';
import { get } from '../../helpers/api_helper';
import HeadSection from '../../components/HeadSection';
import { Button, Card, Col, Layout, Row, Spin, Typography, theme } from 'antd';
import { faPerson, faPersonDress, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CalendarOutlined, DingtalkOutlined, EnvironmentOutlined, ReadOutlined } from '@ant-design/icons';
import { SegmentedControl } from 'antd';
import moment from 'moment';

const Status = () => {
  const { token: { colorBgContainer }, } = theme.useToken();
  const { token } = Axios();
  const { Text, Link } = Typography;
  const [dashboard, setDashboard] = useState([]);
  const [appliedJob, setAppliedJob] = useState([]);
  const [activeJob, setActiveJob] = useState([]);
  const [pendingJob, setPendingJob] = useState([]);
  const [cancelJob, setCancelJob] = useState([]);
  const [confirmJob, setConfirmJob] = useState([]);
  console.log("activeJob", activeJob);
  const { Content } = Layout;
  const [loading, setLoading] = useState(true);
  // const getAllData = async () => {

  //   let isSubscribed = true;

  //   await get(STATUS_END_POINT.get())
  //     .then((res) => {
  //       console.log(res)
  //       if (isSubscribed) {
  //         setAppliedJob(res?.data);

  //         setLoading(false)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Server Error ~!")
  //     });

  //   return () => isSubscribed = false;
  // }


  // ACTIVE, PENDING, CANCELED, CONFIRMED
  const getAllData = async () => {
    try {
      const response = await get(STATUS_END_POINT.get());
      const data = response?.data;

      if (data) {
        setAppliedJob(data);
        const activeJobs = data.filter(job => job.jobStatus === "ACTIVE");
        const pendingJobs = data.filter(job => job.jobStatus === "PENDING");
        const cancelJobs = data.filter(job => job.jobStatus === "CANCELED");
        const confirmJobs = data.filter(job => job.jobStatus === "CONFIRMED");
        setActiveJob(activeJobs);
        setPendingJob(pendingJobs);
        setCancelJob(cancelJobs);
        setConfirmJob(confirmJobs);
        setLoading(false);
      }
    } catch (error) {
      console.log("Server Error:", error);
    }
  }



  useEffect(() => {
    getAllData()
    console.log("----")
  }, [token]);





  return (
    <>
      <Content
        style={{
          margin: '60px 0px',
        }}
      >

        {/* ACTIVE, PENDING, CANCELED, CONFIRMED */}

        <HeadSection title="Status" />
        <div className='container'>
          <Card className="mt-4">
            <Row className="justify-content-center">
              <Col md={6} sm={12} className="mb-3">
                <button type="button" className="btn btn-outline-primary btn-block">ACTIVE</button>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <button type="button" className="btn btn-outline-secondary btn-block">PENDING</button>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <button type="button" className="btn btn-outline-success btn-block">CANCELED</button>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <button type="button" className="btn btn-outline-success btn-block">CONFIRMED</button>
              </Col>
            </Row>
          </Card>


          <Row gutter={[8, 8]} justify="space-between">
            {appliedJob?.map((t, i) => (
              <Col key={i} className="gutter-row" xs={24} sm={24} md={12} lg={8}>
                <Card className='mt-2 custom-card' title={t.title} bordered={false} style={{ height: '250px' }}>


                  <Row>
                    <Col md={10}>
                      <Text type="secondary">Job ID: <Text strong>{t?.jobId}</Text></Text>
                    </Col>

                    <Col md={10}>
                      <Text type="secondary"  >Job ID: <Text style={{ color: t.preferredGender === "PENDING" ? 'green' : 'red' }} strong>{t?.jobStatus}</Text></Text>
                    </Col>

                  </Row>


                  <Row className="mt-2">

                    <Col md={24}>
                      <CalendarOutlined style={{ fontSize: '18px', color: '#08c' }} />
                      <Text type="secondary">Posted Date: <Text strong>{moment(t.postedDate).format('MM/DD/YYYY')}</Text></Text>

                    </Col>
                  </Row>


                  <Row className="mt-2">

                    <Col md={24}>
                      <ReadOutlined style={{ fontSize: '18px', color: '#08c' }} />
                      <Text type="secondary"> Subjects: </Text>
                      <Text strong>
                        {t.subject.map((subject) => subject.subjectId.name).join(', ')}

                      </Text>
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


                  <Row className="mt-2 " justify="space-between">
                    <Col>
                      <FontAwesomeIcon
                        color={t.preferredGender === 'Male' ? 'green' : 'red'}
                        icon={t.preferredGender === 'Male' ? faPerson : faPersonDress}
                        style={{ fontSize: '1rem' }}
                      />
                      <Text>{t.preferredGender === 'Male' ? 'Male' : 'Female'}</Text>
                      <Text strong> {t.preferredGender} <Text type="secondary">tutor preferred</Text></Text>
                    </Col>
                    <Col>
                      <Button type="primary" onClick={() => onDetails(t.jobId)}>Details</Button>
                    </Col>
                  </Row>


                </Card>
              </Col>
            ))}
            {loading && <Spin />}




          </Row>
        </div>
      </Content>
    </>
  )
}

export default Status