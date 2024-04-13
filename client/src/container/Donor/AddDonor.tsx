import { Breadcrumb, Card } from "antd";
import React, { Fragment } from "react";
import CsBreadcumb from "../../component/Breadcumb";
import DonorForm from "./DonorForm";

const AddDonor = () => {
  return (
    <Fragment>
      <CsBreadcumb
        data={[
          { title: "Dashboard", route: "/dashboard" },
          { title: "Donor", route: "/dashboard/donor" },
          { title: "Add" },
        ]}
      />
      <Card title={"Add Donor"}>
        <DonorForm />
      </Card>
    </Fragment>
  );
};

export default AddDonor;
