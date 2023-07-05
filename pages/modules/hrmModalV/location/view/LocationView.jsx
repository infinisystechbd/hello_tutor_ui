import { Card, Descriptions, Modal, Tag } from 'antd';
import moment from 'moment';
import DataTable from 'react-data-table-component';

function LocationView(props) {
  const { isViewModalOpen, setIsViewModalOpen, location } = props;

  return (
    <Modal
      title={'Location Info'}
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
            {location?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {location?.status == true ? (
              <Tag color='green'>Active</Tag>
            ) : (
              <Tag color='volcano'>Inactive</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {moment(location?.createdAt).format('DD-MM-YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {moment(location?.updatedAt).format('DD-MM-YYYY')}
          </Descriptions.Item>

          
        </Descriptions>
      </Card>
    </Modal>
  );
}
export default LocationView;
