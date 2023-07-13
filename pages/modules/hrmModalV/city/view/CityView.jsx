import { Card, Descriptions, Modal, Tag } from 'antd';
import moment from 'moment';
import DataTable from 'react-data-table-component';

function CityView(props) {
  const { isViewModalOpen, setIsViewModalOpen, city } = props;
console.log(city);
  return (
    <Modal
      title={'City Info'}
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
          <Descriptions.Item label="City Name">
            {city?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {city?.status == true ? (
              <Tag color='green'>Active</Tag>
            ) : (
              <Tag color='volcano'>Inactive</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {moment(city?.createdAt).format('DD-MM-YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {moment(city?.updatedAt).format('DD-MM-YYYY')}
          </Descriptions.Item>

          
        </Descriptions>
      </Card>
    </Modal>
  );
}
export default CityView;
