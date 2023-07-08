import { Button, Form, Input, Modal, Select, Layout, Breadcrumb, theme } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useState, useEffect } from 'react';
import ToastMessage from '../../../../components/Toast';
import { GUARDIAN_END_POINT, LOCATION_END_POINT, CITY_END_POINT,JOB_REQUEST_END_POINT,JOB_ASSIGN_END_POINT } from '../../../../constants/index';
import { get, post, put } from '../../../../helpers/api_helper';
import { QUERY_KEYS } from '../../../../constants/queryKeys.js';
import { mapArrayToDropdown } from '../../../../helpers/common_Helper.js';
import { useGetAllData } from '../../../../utils/hooks/useGetAllData.js';
import HeadSection from '../../../../components/HeadSection';
function JobAssign(props) {
    const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const { token: { colorBgContainer }, } = theme.useToken();
    const { Option } = Select;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [jobRequest, setJobRequest] = useState([]);
    const [tutor, setTutor] = useState([]);
    console.log("tutor",tutor);
    const phoneNumberPattern = /^(?:01[3-9])\d{8}$/;
    const { confirm } = Modal;
    const { Content } = Layout;


    /** Fetch Job Id Request */
    const {
        data: jobRequestList,
        isLoading,
        refetch: fetchJobRequestList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_JOB_REQUEST_LIST,
        JOB_REQUEST_END_POINT.get(1, -1, '')
    );

    /**Job Request dropdown */
    useEffect(() => {
        const JOBREQUESTDROPDOWN = mapArrayToDropdown(
            jobRequestList?.data,
            'jobId',
            '_id'
        );
        setJobRequest(JOBREQUESTDROPDOWN);
    }, [jobRequestList]);

    /** end Job Id dropdown */

    /**TUTOR dropdown */
    useEffect(() => {
        const TUTORDROPDOWN = mapArrayToDropdown(
            jobRequestList?.data[0]?.requestedTutor[0],
        );
        setTutor(TUTORDROPDOWN);
    }, [jobRequestList]);



    /**fetch TUTOR list  End */


    /** from design  */
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 6,
            span: 16,
        },
    };
    /** end from design  */


    /** create from or edit from submits  */
    const onFinish = async (values) => {
        setLoading(true);
       
            const response = await post(JOB_ASSIGN_END_POINT.create(), values,);
            if (response.status === 'SUCCESS') {
                notify('success', response.message);
                if (isParentRender) {
                    isParentRender(true);
                }
            } else {
                notify('error', response.errorMessage);
                setLoading(false);
            }

        setLoading(false);
    };
    /** create from or edit from submits end  */


    const onFinishFailed = (errorInfo) => {
        notify('error', errorInfo);
    };


    return (




        <>
            <HeadSection title="All Class-Details" />
            <Content
                style={{
                    margin: '0 20px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>class</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 15,
                        minHeight: 360,
                        background: colorBgContainer,
                    }}
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className=" ">
                                    <div className="d-flex border-bottom title-part-padding align-items-center">
                                        <div>
                                            <h4 class="card-title mb-0">Job Assign</h4>
                                        </div>

                                    </div>
                                    <Form
                                        className='mt-3'
                                        {...layout}
                                        {...setEditData}
                                        form={form}
                                        name="control-hooks"
                                        onFinish={onFinish}
                                        style={{
                                            maxWidth: 600,
                                        }}
                                    >


                                        <Form.Item
                                            name="jobId"
                                            label="Select Job"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select Job Id!',

                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Select
                                                // mode="multiple"
                                                placeholder="Please select Job"
                                                options={jobRequest}
                                            />
                                        </Form.Item>


                                        <Form.Item
                                            name="tutorId"
                                            label="Tutor"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select Tutor!',

                                                },
                                            ]}
                                            hasFeedback

                                        >
                                            <Select
                                                // mode="multiple"
                                                placeholder="Please select Tutor"
                                                options={tutor}
                                            />
                                        </Form.Item>


                                        <Form.Item
                                            name="comment"
                                            label="Comment"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input />
                                        </Form.Item>


                                        <Form.Item {...tailLayout}>
                                            <Button type="primary" htmlType="submit" loading={loading}>
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>





            </Content>
        </>

    );
}
export default JobAssign;