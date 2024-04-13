import { Tabs } from "antd";
import React, { Fragment, useState } from "react";
import CsBreadcumb from "../../component/Breadcumb";
import Communication from "./Communication";
import DonationList from "./DonationList";

const Donation = () => {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <Fragment>
      <CsBreadcumb
        data={[
          { title: "Dashboard", route: "/dashboard" },
          { title: activeTab === "1" ? "Donation List" : "Communication" },
        ]}
      />
      <Tabs
        type="card"
        onChange={(key) => setActiveTab(key)}
        items={[
          {
            label: `Donation List`,
            key: "1",
            children: <DonationList />,
          },
          {
            label: `Communication`,
            key: "2",
            children: <Communication />,
          },
        ]}
      />
    </Fragment>
  );
};

export default Donation;
