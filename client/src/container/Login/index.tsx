import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  Row,
  Typography,
} from "antd";
import React, { Fragment, useEffect } from "react";
import { Navigate } from "react-router-dom";
import loginImage from "../../assets/loginImage.jpg";
import logo from "../../assets/logoIcon.png";
import { handleLoginCredentials } from "../../features/authSlice";
import { useLoginMutation } from "../../services/auth";
import { useAppDispatch, useAppSelector } from "../../store";

export const validateEmail = (_: any, value: string) => {
  if (!value) {
    return Promise.reject("Email is required");
  }
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value)) {
    return Promise.reject("Please, enter a valid email format");
  }
  return Promise.resolve();
};

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const screen = Grid.useBreakpoint();
  const { accessToken } = useAppSelector((state) => state.auth);

  console.log(screen?.xs);
  const [login, { data, isLoading }] = useLoginMutation();

  useEffect(() => {
    if (data) {
      dispatch(handleLoginCredentials(data));
    }
  }, [data]);

  if (accessToken) return <Navigate to={"/dashboard"} />;

  const handleSubmitForm = async (form: any) => {
    await login(form);
  };
  return (
    <Fragment>
      <Row
        align={"middle"}
        style={{ background: "#eff0f3", overflow: "hidden" }}
      >
        <Col span={screen?.xs ? 24 : 12}>
          <div style={{ height: "100vh", width: "100%", position: "relative" }}>
            <img
              src={loginImage}
              alt=""
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            {screen?.xs === true ? (
              <Row
                justify={"center"}
                align={"middle"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  top: 0,
                }}
              >
                <Col span={14}>
                  <Card hoverable>
                    <Flex vertical>
                      <Typography.Title level={2}>Sign In</Typography.Title>
                      <Typography.Text style={{ color: "grey" }}>
                        Welcome back to{" "}
                        <Typography.Link>Vile Church</Typography.Link>{" "}
                      </Typography.Text>
                    </Flex>
                    <Form
                      form={form}
                      name={`login-form`}
                      layout="vertical"
                      onFinish={handleSubmitForm}
                      style={{ marginTop: "2rem" }}
                    >
                      <Form.Item
                        name="email"
                        rules={[{ validator: validateEmail }]}
                        validateTrigger="onBlur"
                        style={{ marginTop: ".2rem", marginBottom: "2rem" }}
                      >
                        <Input
                          size="large"
                          placeholder="Email"
                          prefix={
                            <UserOutlined style={{ marginRight: ".4rem" }} />
                          }
                        />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[{ required: true }]}
                        validateTrigger="onBlur"
                        style={{ marginBottom: "1.8rem" }}
                      >
                        <Input.Password
                          size="large"
                          placeholder="Password"
                          prefix={
                            <LockOutlined style={{ marginRight: ".4rem" }} />
                          }
                        />
                      </Form.Item>

                      {/* <Flex
                    justify="space-between"
                    style={{ marginBottom: "2rem" }}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <span>
                      <Typography.Link> Forgot Your Password? </Typography.Link>{" "}
                    </span>
                  </Flex> */}

                      <Form.Item style={{ margin: "0 0 0 0" }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ width: "100%" }}
                          size="large"
                          disabled={isLoading}
                        >
                          Sign In
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>
              </Row>
            ) : null}
          </div>
        </Col>
        {screen?.xs === false ? (
          <Col span={12}>
            <Row justify={"center"}>
              <Col span={14}>
                <Card hoverable>
                  <Flex vertical>
                    <Flex justify="center">
                      <img
                        src={logo}
                        style={{
                          width: "10rem",
                        }}
                      />
                    </Flex>
                    <Typography.Title style={{ textAlign: "center" }} level={2}>
                      Sign In
                    </Typography.Title>
                    <Typography.Text
                      style={{ color: "grey", textAlign: "center" }}
                    >
                      Welcome back to{" "}
                      <Typography.Link>Sanctech</Typography.Link>{" "}
                    </Typography.Text>
                  </Flex>
                  <Form
                    form={form}
                    name={`login-form`}
                    layout="vertical"
                    onFinish={handleSubmitForm}
                    style={{ marginTop: "2rem" }}
                  >
                    <Form.Item
                      name="email"
                      rules={[{ validator: validateEmail }]}
                      validateTrigger="onBlur"
                      style={{ marginTop: ".2rem", marginBottom: "2rem" }}
                    >
                      <Input
                        size="large"
                        placeholder="Email"
                        prefix={
                          <UserOutlined style={{ marginRight: ".4rem" }} />
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[{ required: true }]}
                      validateTrigger="onBlur"
                      style={{ marginBottom: "1.8rem" }}
                    >
                      <Input.Password
                        size="large"
                        placeholder="Password"
                        prefix={
                          <LockOutlined style={{ marginRight: ".4rem" }} />
                        }
                      />
                    </Form.Item>

                    {/* <Flex
                    justify="space-between"
                    style={{ marginBottom: "2rem" }}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <span>
                      <Typography.Link> Forgot Your Password? </Typography.Link>{" "}
                    </span>
                  </Flex> */}

                    <Form.Item style={{ margin: "2.5rem 0 0 0" }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                        size="large"
                        disabled={isLoading}
                      >
                        Sign In
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Col>
        ) : null}
      </Row>
    </Fragment>
  );
};

export default Login;
