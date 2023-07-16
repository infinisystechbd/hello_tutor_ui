import { Card, Descriptions, Modal, Tag, Button, Col, Row, Typography } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { DingtalkOutlined, EnvironmentOutlined, ReadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faPersonDress } from '@fortawesome/free-solid-svg-icons';
const { Text, Link } = Typography;
function ClassView(props) {
    const { isViewModalOpen, setIsViewModalOpen, jobReq } = props;
    const [subjects, setSubjects] = useState([])
console.log(jobReq);
    useEffect(() => {
        setSubjects(jobReq?.subject)
    }, [jobReq])
    console.log("jobReq", jobReq);
    return (
        <Modal
        title={'Job Info'}
        style={{ top: 20 }}
        centered
        visible={isViewModalOpen}
        footer={null}
        width={800}
        onOk={() => setIsViewModalOpen(false)}
        onCancel={() => setIsViewModalOpen(false)}
      >
        <Card className='mt-2 custom-card' bordered={false}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Text type="secondary">Job ID: </Text>
              <Text strong>{jobReq?.jobId}</Text>
            </Col>
            <Col xs={24} md={8}>
              <Text type="secondary">Guardian Name: </Text>
              <Text strong>{jobReq?.guardian?.fullName}</Text>
            </Col>
            <Col xs={24} md={8}>
              <Text type="secondary">Job Status: </Text>
              <Text strong>{jobReq?.jobStatus}</Text>
            </Col>
          </Row>
          <Row className='mt-2' gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Text type="secondary">Tuition Type: </Text>
              <Text strong>Home</Text>
            </Col>
            <Col xs={24} md={8}>
              <DingtalkOutlined style={{ fontSize: '18px', color: '#08c' }} />
              <Text type='secondary'> Salary: </Text>
              <Text strong>{jobReq?.salary}</Text>
            </Col>
            <Col xs={24} sm={8}>
              <Text type="secondary">Phone Number: </Text>
              <Text strong>{jobReq?.phone}</Text>
            </Col>
          </Row>
          <Row className='mt-2' gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <FontAwesomeIcon
                color={jobReq?.teacherGender === "Male" ? "green" : "red"}
                icon={jobReq?.teacherGender === "Male" ? faPerson : faPersonDress}
                style={{ fontSize: '1rem' }}
              />
              <Text>{" "}</Text>
              <Text strong>
                <Text type='secondary'>Tutor preferred</Text>
              </Text>
            </Col>
            <Col xs={24} md={12}>
              <ReadOutlined style={{ fontSize: '18px', color: '#08c' }} />
              <Text type='secondary'> Subjects: </Text>
              <Text strong>
                {subjects?.map((item, index) => (
                  <span key={item?.subjectId?._id}>
                    {item?.subjectId?.name}
                    {index < subjects.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </Text>
            </Col>
        
          </Row>
          <Row className='mt-2'>
            <Col>
              <EnvironmentOutlined style={{ fontSize: '18px', color: '#08c' }} />
              <Text type='secondary'> Location: </Text>
              <Text strong>{jobReq?.address}</Text>
            </Col>
          </Row>
        </Card>
      </Modal>

    );
}
export default ClassView;
