import { Card, Descriptions, Modal, Tag, Row, Col, Typography } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

function ClassView(props) {
  const { isViewModalOpen, setIsViewModalOpen, classes } = props;
  const [subjects, setSubjects] = useState([]);
  const { Text, Link } = Typography;
  useEffect(() => {
    setSubjects(classes?.subject)
  }, [classes])
  return (
    <Modal
      title={'Classes Info'}
      style={{ top: 20 }}
      centered
      visible={isViewModalOpen}
      footer={null}
      width={900}
      onOk={() => setIsViewModalOpen(false)}
      onCancel={() => setIsViewModalOpen(false)}
    >
      <Card bordered={false} className="custom-card">

        <Row className='mb-3'>
          <Col className='mb-2' md={10}>   <Text type="secondary">Class Name: <Text strong> {classes?.name}</Text></Text>  </Col>
          <Col >
            <Text type="secondary"> Subjects: </Text>
            <Text strong>
              {subjects?.map((item, index) => (
                <span key={item?.subjectId?._id}>
                  {item?.subjectId?.name}
                  {index < subjects.length - 1 ? '  , ' : '.'}
                </span>
              ))}
            </Text>

          </Col>
        </Row>


        <Row gutter={[16, 16]} justify="space-between">

          <Col span={24} sm={12} md={8}>
            <Descriptions column={1}>
              <Descriptions.Item label="Created By">
                {classes?.createdBy?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Created at">
                {moment(classes?.createdAt).format('DD-MM-YYYY')}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={24} sm={12} md={8}>
            <Descriptions column={1}>
              <Descriptions.Item label="Upadted By ">
                {classes?.updatedBy?.fullName || 'No one update'}
              </Descriptions.Item>
              <Descriptions.Item label="Updated at">
                {moment(classes?.updatedAt).format('DD-MM-YYYY')}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={24} sm={12} md={8}>
            <Descriptions column={1}>
            {/* <Descriptions.Item label="Class Name:">
              {classes?.name}
              </Descriptions.Item> */}
              <Descriptions.Item label="Status">
                {classes?.status ? (
                  <Tag color='green'>Active</Tag>
                ) : (
                  <Tag color='volcano'>Inactive</Tag>
                )}
              </Descriptions.Item>

  
            </Descriptions>
          </Col>
        </Row>


      </Card>

    </Modal>

  );
}
export default ClassView;
