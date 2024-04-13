import { SendOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Descriptions,
  Empty,
  Flex,
  Form,
  Grid,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";

import moment from "moment";
import { Fragment, useMemo, useState } from "react";
import { useGetDonationsQuery } from "../../services/donation";
import { useGetDonorsQuery } from "../../services/donor";
import { usePostEmailReceiptMutation } from "../../services/other";

const Communication = () => {
  const screen = Grid.useBreakpoint();
  const [selectedDonor, setSelectedDonor] = useState(null);

  const { data: donorList, isLoading: donorLoading } = useGetDonorsQuery();
  const { data: donationList, isLoading: donationLoading } =
    useGetDonationsQuery();
  const [sendReceipt, { isLoading: receiptLoading }] =
    usePostEmailReceiptMutation();

  const donorInformation = useMemo(() => {
    if (!selectedDonor || !donorList) return null;
    const matchedDonorData = donorList.filter(
      (donor: any) => donor?.donorId === selectedDonor
    );
    return matchedDonorData[0];
  }, [selectedDonor]);

  const donorIdOption = useMemo(() => {
    if (!donorList) return [];
    return donorList.map((donor: any) => ({
      value: donor?.donorId,
      label: `${donor?.donorId} - ${donor?.full_name}`,
    }));
  }, [donorList]);

  const singleDonationList = useMemo(() => {
    if (!selectedDonor) return [];
    return donationList?.filter((list: any) => list?.donorId === selectedDonor);
  }, [donationList, selectedDonor]);

  const columns = useMemo(
    () => [
      {
        title: "Donation Id",
        dataIndex: "donationId",
        key: "donationId",
      },
      {
        title: "Payment Mode",
        dataIndex: "mode",
        key: "mode",
      },
      {
        title: "Transaction Id",
        key: "transactionId",
        render: (item: any) => item?.transactionId ?? "Null",
      },
      {
        title: "Payment Date",
        dataIndex: "donationDate",
        key: "donationDate",
        render: (value: string) => moment(value).format("LL"),
      },

      {
        title: "Amount",
        key: "amount",
        render: (item: any) => (
          <Tag color="green" bordered>
            <span style={{ fontWeight: "600" }}>$ {item?.amount}.00</span>
          </Tag>
        ),
      },

      {
        title: "Action",
        key: "action",
        render: (_: any, record: any) => {
          return (
            <Space>
              <Tooltip title="Send Receipt">
                <SendOutlined
                  style={{
                    color: "#fc8e3c",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    sendReceipt({
                      full_name: record?.donorDetails?.full_name,
                      amount: `$${record?.amount}.00`,
                      donationDate: moment(record?.donationDate).format("LL"),
                      email: record?.email,
                    });
                  }}
                />{" "}
              </Tooltip>
            </Space>
          );
        },
      },
    ],
    [donationList]
  );

  return (
    <Fragment>
      <Spin spinning={receiptLoading}>
        <Card>
          <Row gutter={[10, 20]} wrap={true}>
            <Col span={screen?.xs ? 24 : 6}>
              <Form.Item
                label="Donor Id"
                name="donorId"
                rules={[{ required: true, message: "Please, select donor id" }]}
              >
                <Select
                  allowClear
                  onChange={(value) => setSelectedDonor(value)}
                  placeholder="Select donor id"
                  style={{ width: "100%" }}
                  options={donorIdOption}
                />
              </Form.Item>{" "}
            </Col>
            <Col span={screen?.xs ? 24 : 24}>
              <Row align={"middle"} justify={"end"}>
                <Col span={screen?.xs ? 24 : 24}>
                  {selectedDonor && donorInformation ? (
                    <Descriptions
                      title="Donor Information"
                      items={[
                        {
                          key: "1",
                          label: "Full Name",
                          children: donorInformation?.full_name ?? "Null",
                        },
                        {
                          key: "2",
                          label: "Email",
                          children: donorInformation?.email ?? "Null",
                        },
                        {
                          key: "3",
                          label: "Donor Since",
                          children: donorInformation?.createdAt
                            ? moment(donorInformation?.createdAt).format("LL")
                            : "Null",
                        },
                        {
                          key: "4",
                          label: "Contact Number",
                          children: donorInformation?.contactNumber ?? "Null",
                        },
                        {
                          key: "5",
                          label: "Address",
                          children: donorInformation?.address ?? "Null",
                        },
                      ]}
                    />
                  ) : (
                    <Empty description="No  Information" />
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Card title={"All Donation"}>
                <Table
                  dataSource={singleDonationList}
                  columns={columns}
                  style={{ overflowX: "scroll" }}
                />
              </Card>
            </Col>
          </Row>
        </Card>
      </Spin>
    </Fragment>
  );
};

export default Communication;
