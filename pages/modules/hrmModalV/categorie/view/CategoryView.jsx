import { Card, Descriptions, Modal, Tag } from 'antd';
import moment from 'moment';
import DataTable from 'react-data-table-component';

function CategoryView(props) {
  const { isViewModalOpen, setIsViewModalOpen, category } = props;

  return (
    <Modal
      title={'category Info'}
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
            {category?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {category?.status == true ? (
              <Tag color='green'>Active</Tag>
            ) : (
              <Tag color='volcano'>Inactive</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {moment(category?.createdAt).format('DD-MM-YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {moment(category?.updatedAt).format('DD-MM-YYYY')}
          </Descriptions.Item>

          
        </Descriptions>
      </Card>
    </Modal>
  );
}
export default CategoryView;
