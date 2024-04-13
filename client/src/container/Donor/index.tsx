import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Col,
  Input,
  Row,
  Space,
  Spin,
  Table,
} from "antd";

import moment from "moment";
import { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CsBreadcumb from "../../component/Breadcumb";
import CsDeleteConfirmation from "../../component/DeleteModal";
import {
  useDeleteDonorMutation,
  useGetDonorsQuery,
} from "../../services/donor";

const Donor = () => {
  const navigate = useNavigate();
  const [visibleDeleteConfirmation, setVisibility] = useState<Boolean>(false);
  const [selectedPopup, setSelectedPopup] = useState<string>("");
  const [searchedValue, setSearchedValue] = useState("");

  const { data, isLoading } = useGetDonorsQuery();
  const [deleteDonor] = useDeleteDonorMutation();

  const autoCompleteOptions = useMemo(() => {
    if (data?.length === 0 || data === undefined) return [];

    const searchFieldValue = data?.map((item: any) => ({
      value: item?.full_name,
    }));

    const sortedData = searchFieldValue.sort((a: any, b: any) => {
      const nameA = a?.value?.toLowerCase() || ""; // Handle cases where full_name is undefined
      const nameB = b?.value?.toLowerCase() || ""; // Handle cases where full_name is undefined
      return nameA.localeCompare(nameB); // Use localeCompare for string comparison
    });
    return sortedData;
  }, [data]);

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
        title: "Donor Id",
        dataIndex: "donorId",
        key: "donorId",
      },
      {
        title: "Full Name",
        dataIndex: "full_name",
        key: "full_name",
      },

      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },

      {
        title: "Contact",
        dataIndex: "contactNumber",
        key: "contactNumber",
      },

      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Joined",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (value: string) => moment(value).format("LL"),
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
                  navigate("/dashboard/donor/edit", {
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
      await deleteDonor(selectedPopup);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <CsBreadcumb
        data={[{ title: "Dashboard", route: "/dashboard" }, { title: "Donor" }]}
      />
      <Row gutter={[0, 30]}>
        <Col span={24}>
          <Row justify={"space-between"} gutter={[0, 10]}>
            <Col>
              <Button
                type="primary"
                size="middle"
                onClick={() => navigate("add")}
              >
                ADD DONOR
              </Button>
            </Col>
            <Col>
              <AutoComplete
                style={{
                  width: 200,
                }}
                options={autoCompleteOptions}
                filterOption={(inputValue, option: any) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              >
                <Input.Search
                  placeholder="Enter fullname"
                  onSearch={(value) => setSearchedValue(value)}
                  enterButton
                />
              </AutoComplete>
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
        confirmMessage="Are you sure you want to delete the selected donor?"
      />
    </Fragment>
  );
};

export default Donor;
