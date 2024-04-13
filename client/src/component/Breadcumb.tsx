import { Breadcrumb } from "antd";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

type IBreadCumbData = {
  title: string;
  route?: string;
  // Add other properties as needed
};

// Define the props interface for your component
interface ComponentProps {
  data: IBreadCumbData[];
}
const CsBreadcumb: React.FC<ComponentProps> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Breadcrumb style={{ margin: "1rem  1rem 1.4rem .4rem " }}>
      {data.map((item) => (
        <Fragment key={item?.title}>
          <Breadcrumb.Item onClick={() => navigate(item?.route ?? "")}>
            {item?.title}
          </Breadcrumb.Item>
        </Fragment>
      ))}
    </Breadcrumb>
  );
};

export default CsBreadcumb;
