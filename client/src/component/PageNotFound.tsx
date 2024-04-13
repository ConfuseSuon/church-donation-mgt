import { Col, Flex, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../assets/pagenotfound.svg";

interface PageNotFoundProps {
  message?: string;
  status?: string;
}

const PageNotFound = (props: PageNotFoundProps): React.ReactElement => {
  const navigate = useNavigate();
  return (
    <Row justify={"center"} align={"middle"}>
      <Col span={24} style={{ marginTop: "7rem" }}>
        <Flex vertical justify="center" align="center" gap={20}>
          <img
            src={notFoundImg}
            alt=""
            style={{
              objectFit: "contain",
              height: "50vh",
              width: "100%",
            }}
          />
          <p>Page Not Found</p>
          <p>
            Navigate back to{" "}
            <Typography.Link
              style={{ marginLeft: ".2rem" }}
              onClick={() => navigate("/")}
            >
              Home
            </Typography.Link>{" "}
          </p>
        </Flex>
      </Col>
    </Row>
  );
};

export default PageNotFound;
