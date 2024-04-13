import React from "react";
import notFoundImg from "../assets/pagenotfound.svg";

interface PageNotFoundProps {
  message?: string;
  status?: string;
}

const PageNotFound = (props: PageNotFoundProps): React.ReactElement => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minHeight: "85vh",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={notFoundImg} alt="" />
          <h1>{props.status ? props.status : 404}</h1>
          <p>Page Not Found</p>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
