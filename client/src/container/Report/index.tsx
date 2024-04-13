import {
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Grid,
  Row,
  Select,
} from "antd";
import ExcelJs from "exceljs";
import moment from "moment";
import React, { Fragment, useMemo, useState } from "react";
import CsBreadcumb from "../../component/Breadcumb";
import { useGetDonationsQuery } from "../../services/donation";
import { rawDate } from "../../utils/help";

const { RangePicker } = DatePicker;

const Report = () => {
  const screen = Grid.useBreakpoint();
  const [selectedDate, setSelectedDate] = useState<{
    startDate: null | string;
    endDate: null | string;
  }>({
    startDate: null,
    endDate: null,
  });

  const { data: donationList, isLoading: donationLoading } =
    useGetDonationsQuery();

  const excelSheetData = useMemo(() => {
    if (!selectedDate?.endDate || !selectedDate?.startDate || !donationList)
      return [];
    const { startDate, endDate } = selectedDate;
    return donationList?.filter((item: any) => {
      const donationDate = rawDate(item?.donationDate);
      return (
        donationDate >= rawDate(startDate) && donationDate <= rawDate(endDate)
      );
    });
  }, [selectedDate, donationList]);

  const exportExcelFile = () => {
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("Donation Report");
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      {
        header: "Donation Date",
        key: "donationDate",
        width: 20,
      },
      {
        header: "Donor Id",
        key: "donorId",
        width: 10,
      },
      {
        header: "Full Name",
        key: "full_name",
        width: 10,
      },
      {
        header: "Email",
        key: "email",
        width: 10,
      },
      {
        header: "Address",
        key: "address",
        width: 10,
      },
      {
        header: "Amount",
        key: "amount",
        width: 10,
      },
    ];

    // Format column headers
    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).alignment = { horizontal: "center" };

    let totalAmount = 0;
    excelSheetData?.map((item: any, index: number) => {
      const amount = item?.amount;
      totalAmount += +amount; // Calculate total amount
      sheet.addRow({
        donationDate: moment(item?.createAt).format("LL"),
        donorId: item?.donorId,
        full_name: item?.donorDetails?.full_name,
        email: item?.donorDetails?.email,
        address: item?.donorDetails?.address,
        amount: item?.amount,
      });
    });

    const lastRowNumber = excelSheetData.length + 3;
    sheet.getCell(`C${lastRowNumber}`).value = "Total Donation";
    sheet.getCell(`D${lastRowNumber}`).value = totalAmount;

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${selectedDate?.startDate} to ${selectedDate?.endDate} donation report.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const handleDateChange = (value: any) => {
    const [startDate, endDate] = value;
    setSelectedDate({
      startDate: startDate?.format("YYYY-MM-DD"),
      endDate: endDate?.format("YYYY-MM-DD"),
    });
  };
  return (
    <Fragment>
      <CsBreadcumb
        data={[
          { title: "Dashboard", route: "/dashboard" },
          { title: "Report" },
        ]}
      />
      <Card title="Generate Report">
        <Row>
          <Col span={screen?.xs ? 24 : 24}>
            <Flex justify="flex-start" gap={screen?.xs ? 10 : 50} wrap="wrap">
              {/* <Form.Item
                label="Type of report"
                name="reportType"
                rules={[
                  { required: true, message: "Please, select report type" },
                ]}
              >
                <Select
                  allowClear
                  placeholder="Select report type"
                  style={{ width: "15rem" }}
                  options={[
                    { label: "Yearly", value: "yearly" },
                    { label: "Monthly", value: "monthly" },
                    { label: "Weekly", value: "weekly" },
                  ]}
                />
              </Form.Item>{" "} */}
              <Form.Item
                label="Select Date"
                name="dateRange"
                rules={[{ required: true, message: "Please, select donor id" }]}
              >
                <RangePicker onChange={handleDateChange} />
              </Form.Item>{" "}
              <Button
                type="primary"
                onClick={exportExcelFile}
                disabled={
                  !selectedDate?.endDate || !selectedDate?.startDate
                    ? true
                    : false
                }
              >
                Generate Report
              </Button>
            </Flex>
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

export default Report;
