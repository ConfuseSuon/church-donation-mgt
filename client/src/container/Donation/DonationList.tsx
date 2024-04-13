import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Col, Row, Space, Spin, Table, Tag } from "antd";

import { PDFViewer } from "@react-pdf/renderer";
import moment from "moment";
import { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CsBreadcumb from "../../component/Breadcumb";
import CsDeleteConfirmation from "../../component/DeleteModal";
import {
  useDeleteDonationMutation,
  useGetDonationsQuery,
} from "../../services/donation";
import Receipt from "./Reciept";

const receiptData = {
  orderId: "123456",
  date: "April 10, 2024",
  customerName: "John Doe",
  customerEmail: "john@example.com",
  products: [
    { name: "Product 1", price: 10 },
    { name: "Product 2", price: 20 },
    { name: "Product 3", price: 15 },
  ],
  total: 45,
};

const DonationList = () => {
  const navigate = useNavigate();
  const [visibleDeleteConfirmation, setVisibility] = useState<Boolean>(false);
  const [selectedPopup, setSelectedPopup] = useState<string>("");
  const [searchedValue, setSearchedValue] = useState("");

  const { data, isLoading } = useGetDonationsQuery();
  const [deleteDonation] = useDeleteDonationMutation();

  const tableData = useMemo(() => {
    if (searchedValue)
      return data?.filter(
        (item: any) =>
          item?.full_name?.toLowerCase() === searchedValue.toLowerCase()
      );
    return data;
  }, [data, searchedValue]);

  const columns = useMemo(
    () => [
      {
        title: "Donation Id",
        dataIndex: "donationId",
        key: "donationId",
      },
      {
        title: "Donor Id",
        dataIndex: "donorId",
        key: "donorId",
      },

      {
        title: "Payment Mode",
        dataIndex: "mode",
        key: "mode",
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
              <EditOutlined
                style={{ color: "#ff8e3c" }}
                onClick={() => {
                  navigate("/dashboard/donation/edit", {
                    state: { initialValues: record },
                  });
                }}
              />
              <DeleteOutlined
                style={{ color: "#ff8e3c" }}
                onClick={() => handleVisibleDeleteConfirmation(record)}
              />
            </Space>
          );
        },
      },
    ],
    [data]
  );

  const handleVisibleDeleteConfirmation = (item: any) => {
    setSelectedPopup(item?._id);
    setVisibility(true);
  };

  const handleCancelDeleteConfirmation = () => {
    setSelectedPopup("");
    setVisibility(false);
  };

  const handleSubmitDeleteConfirmation = async () => {
    setVisibility(false);
    try {
      await deleteDonation(selectedPopup);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <Row gutter={[0, 30]}>
        <Col span={24}>
          <Row justify={"space-between"} gutter={[0, 10]}>
            <Col>
              <Button
                type="primary"
                size="middle"
                onClick={() => navigate("add")}
              >
                ADD DONATION
              </Button>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Spin spinning={false}>
            <Table
              dataSource={tableData}
              columns={columns}
              bordered
              style={{ overflowX: "scroll" }}
            />
          </Spin>
        </Col>
      </Row>
      <CsDeleteConfirmation
        visible={visibleDeleteConfirmation}
        handleDelete={handleSubmitDeleteConfirmation}
        handleCancel={handleCancelDeleteConfirmation}
        confirmMessage="Are you sure you want to delete the selected donation?"
      />
    </Fragment>
  );
};

export default DonationList;
