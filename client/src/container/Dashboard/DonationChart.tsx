import moment from "moment";
import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IProps {
  donationList: any;
}

const DonationChart: React.FC<IProps> = ({ donationList }) => {
  const data = useMemo(() => {
    if (!donationList) return [];

    const currentDate = moment();
    const currentYear = currentDate.year();

    const monthlyDonations: any = {};
    donationList.forEach((donation: any) => {
      const date = moment(donation.donationDate);
      const year = date.year();
      if (year === currentYear) {
        const monthYear = date.format("MMM"); // Get abbreviated month name
        if (!monthlyDonations[monthYear]) {
          monthlyDonations[monthYear] = 0;
        }
        monthlyDonations[monthYear] += parseFloat(donation.amount);
      }
    });
    const updatedData = [
      { name: "Jan", amount: monthlyDonations["Jan"] || 0 },
      { name: "Feb", amount: monthlyDonations["Feb"] || 0 },
      { name: "Mar", amount: monthlyDonations["Mar"] || 0 },
      { name: "Apr", amount: monthlyDonations["Apr"] || 0 },
      { name: "May", amount: monthlyDonations["May"] || 0 },
      { name: "Jun", amount: monthlyDonations["Jun"] || 0 },
      { name: "Jul", amount: monthlyDonations["Jul"] || 0 },
      { name: "Aug", amount: monthlyDonations["Aug"] || 0 },
      { name: "Sep", amount: monthlyDonations["Sep"] || 0 },
      { name: "Oct", amount: monthlyDonations["Oct"] || 0 },
      { name: "Nov", amount: monthlyDonations["Nov"] || 0 },
      { name: "Dec", amount: monthlyDonations["Dec"] || 0 },
    ];
    return updatedData;
  }, [donationList]);

  return (
    <ResponsiveContainer
      width="100%"
      height={"90%"}
      style={{ marginTop: "2rem" }}
    >
      <AreaChart
        width={500}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          fill="#fc8e3c"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DonationChart;
