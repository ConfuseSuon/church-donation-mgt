import {
  LineChartOutlined,
  RiseOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Divider, Grid, Row, Statistic, Typography } from "antd";
import moment from "moment";
import React, { Fragment, useMemo } from "react";
import CsBreadcumb from "../../component/Breadcumb";
import { useGetDonationsQuery } from "../../services/donation";
import { useGetDonorsQuery } from "../../services/donor";
import { rawDate } from "../../utils/help";
import DonationChart from "./DonationChart";
import DonorChart from "./DonorChart";

const Dashboard = () => {
  const screen = Grid.useBreakpoint();
  const todayDate = new Date().toISOString().slice(0, 10);
  const { data: donorList, isLoading: donorLoading } = useGetDonorsQuery();
  const { data: donationList, isLoading: donationLoading } =
    useGetDonationsQuery();

  const cardData = useMemo(() => {
    if (!donorList || !donationList) return null;
    const totalDonation = donationList?.reduce(
      (total: any, donation: any) => total + +donation?.amount,
      0
    );

    const totalDonationToday = donationList?.reduce(
      (total: any, donation: any) => {
        if (donation?.donationDate === todayDate) {
          return total + +donation?.amount;
        } else {
          return total;
        }
      },
      0
    );

    const totalDonor = donorList?.length;
    const totalTodayDonor = donorList?.filter(
      (item: any) => todayDate === item?.createdAt?.slice(0, 10)
    ).length;

    return {
      totalDonation,
      totalDonationToday,
      totalDonor,
      totalTodayDonor,
    };
  }, [donationList, donationList]);

  return (
    <Fragment>
      <CsBreadcumb
        data={[
          {
            title: "Dashboard",
          },
        ]}
      />
      <Card>
        <Divider orientationMargin={0} orientation="left">
          Statisctic
        </Divider>
        <Row gutter={[50, 10]} wrap>
          <Col span={screen?.xs ? 24 : 7}>
            <div
              style={{
                padding: "1rem",
                boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                borderRadius: "10px",
              }}
            >
              <Statistic
                value={`$${cardData?.totalDonationToday ?? 0}.00`}
                title={<span>Today Donation </span>}
                prefix={
                  <LineChartOutlined
                    style={{
                      marginRight: ".7rem",
                      color: "#fc8e3c",
                    }}
                  />
                }
              />
            </div>
          </Col>
          <Col span={screen?.xs ? 24 : 5}>
            <div
              style={{
                padding: "1rem",
                boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                borderRadius: "10px",
              }}
            >
              <Statistic
                value={cardData?.totalTodayDonor ?? 0}
                title={<span>Today Donor </span>}
                prefix={
                  <UserOutlined
                    style={{
                      marginRight: ".7rem",
                      color: "#fc8e3c",
                    }}
                  />
                }
              />
            </div>
          </Col>{" "}
          <Col span={screen?.xs ? 24 : 7}>
            <div
              style={{
                padding: "1rem",
                boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                borderRadius: "10px",
              }}
            >
              <Statistic
                value={`$${cardData?.totalDonation ?? 0}.00`}
                title={<span>Total Donation </span>}
                prefix={
                  <RiseOutlined
                    style={{
                      marginRight: ".7rem",
                      color: "#fc8e3c",
                    }}
                  />
                }
              />
            </div>
          </Col>{" "}
          <Col span={screen?.xs ? 24 : 5}>
            <div
              style={{
                padding: "1rem",
                boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                borderRadius: "10px",
              }}
            >
              <Statistic
                value={cardData?.totalDonor ?? 0}
                title={<span>All Donor</span>}
                prefix={
                  <TeamOutlined
                    style={{
                      marginRight: ".7rem",
                      color: "#fc8e3c",
                    }}
                  />
                }
              />
            </div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={screen?.xs ? 24 : 12} style={{ marginTop: "3rem" }}>
            <Card
              hoverable
              title={
                <span>
                  Monthly Donation{" "}
                  <span style={{ fontWeight: "normal" }}>(Current Year)</span>
                </span>
              }
            >
              <Row>
                <Col span={24}>
                  <DonationChart />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={screen?.xs ? 24 : 12} style={{ marginTop: "3rem" }}>
            <Card
              hoverable
              title={
                <span>
                  Monthly Donor{" "}
                  <span style={{ fontWeight: "normal" }}>(Current Year)</span>
                </span>
              }
            >
              <Row>
                <Col span={24}>
                  <DonorChart />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

export default Dashboard;
