import moment from "moment";
import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetDonorsQuery } from "../../services/donor";

const DonorChart: React.FC = () => {
  const { data: donorList, isLoading: donorLoading } = useGetDonorsQuery();

  const data = useMemo(() => {
    if (!donorList) return [];
    const currentDate = moment();
    const currentYear = currentDate.year();

    const monthlyDonorCounts: any = {};
    donorList.forEach((donor: any) => {
      const date = moment(donor.createdAt);
      const year = date.year();
      if (year === currentYear) {
        const monthYear = date.format("MMM"); // Get abbreviated month name
        if (!monthlyDonorCounts[monthYear]) {
          monthlyDonorCounts[monthYear] = 0;
        }
        monthlyDonorCounts[monthYear]++;
      }
    });
    const updatedData = [
      { name: "Jan", amount: monthlyDonorCounts["Jan"] || 0 },
      { name: "Feb", amount: monthlyDonorCounts["Feb"] || 0 },
      { name: "Mar", amount: monthlyDonorCounts["Mar"] || 0 },
      { name: "Apr", amount: monthlyDonorCounts["Apr"] || 0 },
      { name: "May", amount: monthlyDonorCounts["May"] || 0 },
      { name: "Jun", amount: monthlyDonorCounts["Jun"] || 0 },
      { name: "Jul", amount: monthlyDonorCounts["Jul"] || 0 },
      { name: "Aug", amount: monthlyDonorCounts["Aug"] || 0 },
      { name: "Sep", amount: monthlyDonorCounts["Sep"] || 0 },
      { name: "Oct", amount: monthlyDonorCounts["Oct"] || 0 },
      { name: "Nov", amount: monthlyDonorCounts["Nov"] || 0 },
      { name: "Dec", amount: monthlyDonorCounts["Dec"] || 0 },
    ];
    return updatedData;
  }, [donorList]);

  return (
    <ResponsiveContainer
      width="100%"
      height={"90%"}
      style={{ marginTop: "2rem" }}
    >
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="amount"
          fill="#fc8e3c"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DonorChart;
