import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Flex,
  Grid,
  Layout,
  Menu,
  MenuProps,
  Row,
  Typography,
  theme,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import {
  Navigate,
  NavigateFunction,
  Outlet,
  useNavigate,
} from "react-router-dom";
import logo from "../assets/iPhone 8 - 1 (2).png";
import { handleLogout } from "../features/authSlice";
import { useValidityCheckQuery } from "../services/auth";
import { useAppDispatch, useAppSelector } from "../store";
import { sidebarMenuItem } from "../utils/menuPath";

const AppLayout = () => {
  const dispatch = useAppDispatch();
  const screen = Grid.useBreakpoint();
  const { Content, Header, Footer } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  const { loggedInUser }: any = useAppSelector((state) => state?.auth);

  const navigate: NavigateFunction = useNavigate();
  const { pathname } = window.location;
  const currentPathName = [pathname];
  const [activeMenu, setActiveMenu] = useState(currentPathName);

  const validatedMenuItems: any = sidebarMenuItem.filter(
    (menu) => menu.guard === "admin"
  );

  useValidityCheckQuery();

  useEffect(() => {
    screen?.xs ? setCollapsed(true) : null;
  }, [screen]);

  const items: MenuProps["items"] = [
    {
      label: (
        <Typography.Text onClick={() => dispatch(handleLogout())}>
          Sign out{" "}
        </Typography.Text>
      ),
      key: "0",
    },
  ];

  if (pathname === "/") return <Navigate to={"/dashboard"} />;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh",
          position: "sticky",
          background: "#eff0f3",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: "100",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <Flex
          style={{
            height: "4rem",
            padding: "0 1rem",
            marginBottom: "1rem",
            marginLeft: ".6rem",
            marginTop: "1rem",
            boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.2)",
          }}
          justify={collapsed ? "center" : "space-between"}
          align="center"
        >
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ fontSize: "20px" }} />
              ) : (
                <MenuFoldOutlined style={{ fontSize: "20px" }} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
          {!collapsed ? <img src={logo} style={{ height: "2.4rem" }} /> : null}
        </Flex>

        <div
          style={{
            boxShadow:
              "rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
            margin: ".5rem 0",
            padding: "0 1.6rem 1rem 1.6rem",
          }}
        >
          <Flex>
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <a onClick={(e) => e.preventDefault()}>
                <Flex
                  align="center"
                  justify={collapsed ? "center" : "flex-start"}
                  wrap="wrap"
                  gap={10}
                >
                  <Avatar
                    style={{ backgroundColor: colorPrimary }}
                    icon={<UserOutlined />}
                  />
                  {!collapsed ? (
                    <Flex>
                      {loggedInUser?.full_name ?? "Admin"}
                      <DownOutlined />
                    </Flex>
                  ) : null}
                </Flex>
              </a>
            </Dropdown>
          </Flex>
        </div>

        <Menu
          style={{ background: "#eff0f3" }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={validatedMenuItems}
          selectedKeys={activeMenu}
          onSelect={({ selectedKeys, key }) => {
            setActiveMenu(selectedKeys);
            navigate(key);
          }}
        />
      </Sider>
      <Layout style={{ background: "white" }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.2)",
            zIndex: "100",
            height: "5rem",
            position: "sticky",
            top: 0,
          }}
        />

        <Content
          style={{
            margin: "0 0",
            padding: "0rem 1.3rem ",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>

        <Footer
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: "10",
            background: "white",
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
          }}
        >
          <Flex align="center" justify="center" style={{ height: "1rem" }}>
            <Typography.Text
              style={{ fontSize: screen?.xs ? ".6rem" : ".7rem" }}
            >
              Church Donation Management ©{new Date().getFullYear()} Created by
              QUAD SQUAD!
            </Typography.Text>
          </Flex>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
