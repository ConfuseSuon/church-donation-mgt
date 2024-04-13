import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  InputNumber,
  Radio,
  Row,
} from "antd";

import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  usePostDonorMutation,
  useUpdateDonorMutation,
} from "../../services/donor";
import { validateEmail } from "../Login";

const DonorForm: React.FC<any> = ({ initialValues }) => {
  const navigate = useNavigate();
  const screen = Grid.useBreakpoint();
  const [form] = Form.useForm();

  const [postDonor, { isLoading: postLoading, isSuccess: postSuccess }] =
    usePostDonorMutation();
  const [updateDonor, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useUpdateDonorMutation();

  const onFinish = async (formData: any) => {
    if (!!initialValues) {
      try {
        updateDonor({ formData, id: initialValues?._id })
          .unwrap()
          .then(() => navigate(-1));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        postDonor(formData)
          .unwrap()
          .then(() => navigate(-1));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Form
      name="add-edit-donor"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Row gutter={[20, 20]} wrap={true}>
        <Col span={screen?.xs ? 24 : 6}>
          <Form.Item
            label="Full Name"
            name="full_name"
            rules={[{ required: true, message: "Please, enter full name" }]}
            initialValue={initialValues?.full_name ?? ""}
          >
            <Input placeholder="Enter a full name" />
          </Form.Item>{" "}
        </Col>
        <Col span={screen?.xs ? 24 : 6}>
          <Form.Item
            name="email"
            rules={[{ validator: validateEmail }]}
            label="Email"
            initialValue={initialValues?.email ?? ""}
            validateTrigger="onBlur"
          >
            <Input placeholder="Enter email" />
          </Form.Item>
        </Col>
        <Col span={screen?.xs ? 24 : 6}>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please, enter address" }]}
            initialValue={initialValues?.address ?? ""}
          >
            <Input placeholder="Enter address" />
          </Form.Item>
        </Col>
        <Col span={screen?.xs ? 24 : 6}>
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[{ required: true, message: "Please, enter contact" }]}
            initialValue={initialValues?.contactNumber ?? ""}
          >
            <Input placeholder="Enter contact number" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item style={{ margin: "2rem 0 0 0" }}>
            <Flex align="center" justify="flex-end" gap={8}>
              <Button type="default" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={postLoading || updateLoading}
              >
                {!!initialValues ? "Update" : "Add"}
              </Button>
            </Flex>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default DonorForm;
