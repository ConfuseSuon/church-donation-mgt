import { Card } from "antd";
import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import CsBreadcumb from "../../component/Breadcumb";
import DonationForm from "./DonationForm";

const EditDonation = () => {
  const location = useLocation();

  const { initialValues } = location.state;

  return (
    <Fragment>
      <CsBreadcumb
        data={[
          { title: "Dashboard", route: "/dashboard" },
          { title: "Donation", route: "/dashboard/donation" },
          { title: "Edit" },
        ]}
      />
      <Card title={"Edit Donation"}>
        <DonationForm initialValues={initialValues} />
      </Card>
    </Fragment>
  );
};

export default EditDonation;
