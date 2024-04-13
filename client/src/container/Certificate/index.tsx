import {
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Empty,
  Flex,
  Form,
  Grid,
  Input,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { toPng } from "html-to-image";
import moment from "moment";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import certificate from "../../assets/certificate.png";
import CsBreadcumb from "../../component/Breadcumb";
import { useGetDonationsQuery } from "../../services/donation";
import { useGetDonorsQuery } from "../../services/donor";
import { usePostEmailCertificateMutation } from "../../services/other";
import { rawDate } from "../../utils/help";

const { RangePicker } = DatePicker;

const Certificate = () => {
  const screen = Grid.useBreakpoint();
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [selectedDate, setSelectedDate] = useState<{
    startDate: null | string;
    endDate: null | string;
  }>({
    startDate: null,
    endDate: null,
  });
  const [display, setDisplay] = useState(false);

  const { data: donorList, isLoading: donorLoading } = useGetDonorsQuery();
  const { data: donationList, isLoading: donationLoading } =
    useGetDonationsQuery();
  const [emailCertificate, { isLoading: sending }] =
    usePostEmailCertificateMutation();

  useEffect(() => {
    if (
      !selectedDonor ||
      !selectedDonor ||
      !donationList ||
      !donationList ||
      !selectedDate?.startDate ||
      !selectedDate?.endDate
    )
      return setDisplay(false);
  }, [selectedDonor, selectedDonor, donationList, donationList, selectedDate]);

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

  const totalDonationByDonor = useMemo(() => {
    const { startDate, endDate } = selectedDate;
    if (
      !donorInformation ||
      !selectedDonor ||
      !selectedDate ||
      !donationList ||
      !startDate ||
      !endDate
    )
      return null;

    // Filter donations by donorId and date range
    const filteredDonations = donationList.filter(
      (donation: any) =>
        donation.donorId === selectedDonor &&
        rawDate(donation?.donationDate) >= rawDate(startDate) &&
        rawDate(donation?.donationDate) <= rawDate(endDate)
    );

    const totalDonation = filteredDonations?.reduce(
      (total: any, donation: any) => total + parseFloat(donation.amount),
      0
    );

    return totalDonation;
  }, [donorInformation, selectedDonor, selectedDate]);

  //   print certificate
  const ref = useRef<HTMLDivElement>(null);
  const handleDateChange = (value: any) => {
    const [startDate, endDate] = value;
    setSelectedDate({
      startDate: startDate?.format("YYYY-MM-DD"),
      endDate: endDate?.format("YYYY-MM-DD"),
    });
  };
  const sendCertificate = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        emailCertificate({ imageData: dataUrl });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <Fragment>
      <Spin spinning={sending}>
        <CsBreadcumb
          data={[
            { title: "Dashboard", route: "/dashboard" },
            { title: "Certificate" },
          ]}
        />
        <Card title="Generate Certificate">
          <Row>
            <Col span={24}>
              <Flex
                justify={screen?.xs ? "flex-start" : "space-around"}
                wrap={"wrap"}
              >
                <Form.Item
                  label="Donor Id"
                  name="donorId"
                  rules={[
                    { required: true, message: "Please, select donor id" },
                  ]}
                >
                  <Select
                    allowClear
                    onChange={(value) => setSelectedDonor(value)}
                    placeholder="Select donor id"
                    style={{ width: "100%" }}
                    options={donorIdOption}
                  />
                </Form.Item>{" "}
                <Form.Item
                  label="Select Date"
                  name="dateRange"
                  rules={[
                    { required: true, message: "Please, select donor id" },
                  ]}
                >
                  <RangePicker onChange={handleDateChange} />
                </Form.Item>{" "}
              </Flex>
            </Col>
            <Col span={24}>
              <Row align={"middle"}>
                <Col span={24}>
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
            {display ? (
              <Row style={{ overflowX: "scroll" }}>
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "1000px",
                  }}
                >
                  <div
                    style={{
                      margin: ".1rem",
                      position: "relative",
                    }}
                    ref={ref}
                  >
                    <img
                      src={certificate}
                      alt=""
                      style={{
                        position: "relative",
                        objectFit: "contain",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "302px",
                        left: "2px",
                        display: "flex",
                        justifyContent: "center",
                        width: "1050px",
                        fontSize: "45px",
                        fontWeight: "600",
                        color: "#353F55",
                        letterSpacing: "1px",
                        fontFamily: "Berkshire Swash, serif",
                        textAlign: "center",
                        textTransform: "capitalize",
                      }}
                    >
                      {donorInformation?.full_name ?? ""}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "224px",
                        left: "220px",
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        fontSize: "22px",
                        fontWeight: "600",
                        color: "#353F55",
                        letterSpacing: "1px",
                        fontFamily: "serif",
                        textAlign: "center",
                        textTransform: "capitalize",
                      }}
                    >
                      ${totalDonationByDonor}.00
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "166px",
                        left: "17px",
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#353F55",
                        fontFamily: "Berkshire Swash, serif",
                        textAlign: "center",
                      }}
                    >
                      {`${moment(selectedDate?.startDate).format(
                        "LL"
                      )} to ${moment(selectedDate?.endDate).format("LL")} `}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "134px",
                        left: "80px",
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#353F55",
                        fontFamily: "serif",
                        textAlign: "center",
                      }}
                    >
                      {moment().format("YYYY-MM-DD")}
                    </div>
                  </div>
                </Col>
              </Row>
            ) : null}

            <Col span={24} style={{ marginTop: "4rem" }}>
              <Flex justify="center" gap={40} wrap="wrap">
                <Button
                  type="dashed"
                  onClick={() => {
                    if (
                      donationList &&
                      donorInformation &&
                      selectedDate &&
                      donorList
                    ) {
                      setDisplay(true);
                    }
                  }}
                >
                  Generate Certificate
                </Button>
                <Button
                  type="primary"
                  disabled={!display}
                  onClick={sendCertificate}
                >
                  Email Certificate
                </Button>
              </Flex>
            </Col>
          </Row>
        </Card>
      </Spin>
    </Fragment>
  );
};

export default Certificate;
