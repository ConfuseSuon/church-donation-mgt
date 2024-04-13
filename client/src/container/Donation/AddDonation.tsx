import { Breadcrumb, Card } from "antd";
import React, { Fragment } from "react";
import CsBreadcumb from "../../component/Breadcumb";
import DonationForm from "./DonationForm";

const AddDonation = () => {
  return (
    <Fragment>
      <CsBreadcumb
        data={[
          { title: "Dashboard", route: "/dashboard" },
          { title: "Donation", route: "/dashboard/donation" },
          { title: "Add" },
        ]}
      />
      <Card title={"New Donation"}>
        <DonationForm />
      </Card>
    </Fragment>
  );
};

export default AddDonation;
