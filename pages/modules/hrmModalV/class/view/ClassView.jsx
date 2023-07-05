import { Card, Descriptions, Modal, Tag } from 'antd';
import moment from 'moment';
import DataTable from 'react-data-table-component';

function ClassView(props) {
  const { isViewModalOpen, setIsViewModalOpen, classes } = props;

  return (
    <Modal
      title={'Classes Info'}
      style={{ top: 20 }}
      centered
      open={isViewModalOpen}
      footer={null}
      width={800}
      onOk={() => setIsViewModalOpen(false)}
      onCancel={() => setIsViewModalOpen(false)}
    >
      <Card bordered={false}>
        <Descriptions >
          <Descriptions.Item label="Subject Name">
            {classes?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {classes?.status == true ? (
              <Tag color='green'>Active</Tag>
            ) : (
              <Tag color='volcano'>Inactive</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {moment(classes?.createdAt).format('DD-MM-YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {moment(classes?.updatedAt).format('DD-MM-YYYY')}
          </Descriptions.Item>

          
        </Descriptions>
      </Card>
    </Modal>
  );
}
export default ClassView;
