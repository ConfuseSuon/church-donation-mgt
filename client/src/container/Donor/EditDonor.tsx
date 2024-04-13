import { Card } from "antd";
import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import CsBreadcumb from "../../component/Breadcumb";
import DonorForm from "./DonorForm";

const EditDonor = () => {
  const location = useLocation();

  const { initialValues } = location.state;

  return (
    <Fragment>
      <CsBreadcumb
        data={[
          { title: "Dashboard", route: "/dashboard" },
          { title: "Donor", route: "/dashboard/donor" },
          { title: "Edit" },
        ]}
      />
      <Card title={"Edit Donor"}>
        <DonorForm initialValues={initialValues} />
      </Card>
    </Fragment>
  );
};

export default EditDonor;
