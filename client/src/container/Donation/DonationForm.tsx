import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Grid,
  Input,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetDonationsQuery,
  usePostDonationMutation,
  useUpdateDonationMutation,
} from "../../services/donation";
import { useGetDonorsQuery } from "../../services/donor";

dayjs.extend(customParseFormat);

const DonationForm: React.FC<any> = ({ initialValues }) => {
  const navigate = useNavigate();
  const screen = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const [selectedDonor, setSelectedDonor] = useState(
    initialValues ? initialValues?.donorId : null
  );
  const [selectedMode, setSelectedMode] = useState(
    initialValues?.mode === "Card Payment" ? "Card Payment" : ""
  );

  const todayYear = new Date().getFullYear();

  const { data: donorList, isLoading: donorLoading } = useGetDonorsQuery();
  const { data: donationList, isLoading: donationLoading } =
    useGetDonationsQuery();

  const donorIdOption = useMemo(() => {
    if (!donorList) return [];
    return donorList.map((donor: any) => ({
      value: donor?.donorId,
      label: `${donor?.donorId} - ${donor?.full_name}`,
    }));
  }, [donorList]);

  const donorInformation = useMemo(() => {
    if (!selectedDonor || !donorList) return null;
    const matchedDonorData = donorList.filter(
      (donor: any) => donor?.donorId === selectedDonor
    );
    return matchedDonorData[0];
  }, [selectedDonor]);

  const donationMadeByThisYear = useMemo(() => {
    if (!selectedDonor || !donationList) return null;
    const donationData = donationList?.filter(
      (donation: any) =>
        donation?.donorId === selectedDonor &&
        new Date(donation?.donationDate).getFullYear() === todayYear
    );

    return donationData?.reduce(
      (totalDonation: any, donation: any) => +totalDonation + +donation?.amount,
      0
    );
  }, [donorInformation]);

  const [postDonation, { isLoading: postLoading, isSuccess: postSuccess }] =
    usePostDonationMutation();
  const [
    updateDonation,
    { isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateDonationMutation();

  const onFinish = async (formData: any) => {
    formData.donationDate = formData.donationDate.format("YYYY-MM-DD");
    if (!!initialValues) {
      try {
        updateDonation({ formData, id: initialValues?._id })
          .unwrap()
          .then(() => navigate(-1));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        postDonation(formData)
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
      <Divider orientationMargin={0} orientation="left">
        {" "}
        <Tag color="#fc8e3c" style={{ fontSize: ".7rem" }}>
          Donor Details
        </Tag>{" "}
      </Divider>

      <Row gutter={[20, 20]} wrap={true}>
        <Col span={screen?.xs ? 24 : 6}>
          <Form.Item
            label="Donor Id"
            name="donorId"
            rules={[{ required: true, message: "Please, select donor id" }]}
            initialValue={initialValues ? initialValues?.donorId : null}
          >
            <Select
              allowClear
              onChange={(value) => setSelectedDonor(value)}
              placeholder="Select donor id"
              options={donorIdOption}
              disabled={initialValues}
            />
          </Form.Item>{" "}
        </Col>
        {donorInformation ? (
          <Col span={24}>
            <Card title={<Typography.Text>Donor Information</Typography.Text>}>
              <Row>
                <Col span={12}>
                  <Flex vertical gap={".5rem"} wrap="wrap">
                    <Flex wrap="wrap" align="center">
                      <Typography.Text style={{ fontWeight: "500" }}>
                        Donor Id: {donorInformation?.donorId}
                      </Typography.Text>
                    </Flex>
                    <Flex wrap="wrap" align="center">
                      <Typography.Text style={{ fontWeight: "500" }}>
                        Name: {donorInformation?.full_name}
                      </Typography.Text>
                    </Flex>
                    <Flex wrap="wrap" align="center">
                      <Typography.Text style={{ fontWeight: "500" }}>
                        Email: {donorInformation?.email}
                      </Typography.Text>
                    </Flex>
                    <Flex wrap="wrap" align="center">
                      <Typography.Text style={{ fontWeight: "500" }}>
                        Contact Number:{" "}
                        {donorInformation?.contactNumber ?? null}
                      </Typography.Text>
                    </Flex>
                    <Flex wrap="wrap" align="center">
                      <Typography.Text style={{ fontWeight: "500" }}>
                        Address: {donorInformation?.address ?? null}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Col>
                <Col span={12}>
                  <div
                    style={{
                      padding: "2rem",
                      border: "1px solid black",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography.Title
                      level={5}
                      style={{ marginBottom: "1rem" }}
                    >
                      Donation Information
                    </Typography.Title>
                    <Input
                      addonAfter="USD"
                      size="large"
                      value={`${donationMadeByThisYear ?? 0}.00`}
                      style={{ marginBottom: ".5rem" }}
                      disabled
                    />
                    <Typography.Paragraph style={{ fontSize: ".75rem" }}>
                      Total donation made in this current year
                    </Typography.Paragraph>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ) : null}

        <Divider
          orientationMargin={0}
          style={{ marginLeft: ".4rem" }}
          orientation="left"
        >
          {" "}
          <Tag color="#fc8e3c" style={{ fontSize: ".7rem" }}>
            Donation Details
          </Tag>{" "}
        </Divider>

        <Col span={screen?.xs ? 24 : 6}>
          <Form.Item
            label="Donation Amount"
            name="amount"
            rules={[
              { required: true, message: "Please, enter donation amount" },
              {
                pattern: /^[0-9]{1,6}$/,
                message: "Amount must be up to 6 figures",
              },
            ]}
            initialValue={initialValues?.amount ?? ""}
          >
            <Input placeholder="Enter donation amount" />
          </Form.Item>{" "}
        </Col>
        <Col span={screen?.xs ? 24 : 6}>
          <Form.Item
            label="Donation Date"
            name="donationDate"
            rules={[
              { required: true, message: "Please, select donation date" },
            ]}
            initialValue={
              initialValues?.donationDate
                ? dayjs(initialValues?.donationDate, "YYYY-MM-DD")
                : ""
            }
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="date"
              format={"YYYY-MM-DD"}
            />
          </Form.Item>
        </Col>
        <Col span={screen?.xs ? 24 : 6}>
          <Form.Item
            label="Donation Mode"
            name="mode"
            rules={[
              { required: true, message: "Please, select donation mode" },
            ]}
            initialValue={initialValues?.mode ?? null}
          >
            <Select
              allowClear
              placeholder="Select payment mode"
              onChange={(value: string) => setSelectedMode(value)}
              options={[
                { value: "Cash", label: "Cash" },
                { value: "Card Payment", label: "Card Payment" },
              ]}
            />
          </Form.Item>
        </Col>
        {selectedMode === "Card Payment" ? (
          <Col span={screen?.xs ? 24 : 6}>
            <Form.Item
              label="Transaction Id"
              name="transactionId"
              rules={[
                { required: true, message: "Please, enter transaction id" },
              ]}
              initialValue={initialValues?.transactionId ?? ""}
            >
              <Input placeholder="Enter transaction id" />
            </Form.Item>
          </Col>
        ) : null}

        <Col span={screen?.xs ? 24 : 6}>
          <Form.Item
            label="Donation Note"
            name="note"
            initialValue={initialValues?.note ?? ""}
          >
            <Input placeholder="Enter transaction id" />
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

export default DonationForm;
