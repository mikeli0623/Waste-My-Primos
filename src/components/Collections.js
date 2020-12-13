import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Collections = () => {
  return (
    // <div style={{ display: "flex", flexDirection: "column" }}>
    //   <div style={{ marginTop: "1%" }}>
    //     <p>My Collection</p>
    //     <div
    //       style={{
    //         width: "1000px",
    //         height: "500px",
    //         backgroundColor: "black",
    //         margin: "auto",
    //         display: "flex",
    //         flexDirection: "row",
    //       }}
    //     >
    //       <div
    //         style={{ display: "flex", flexDirection: "column", margin: "auto" }}
    //       >
    //         <p>Characters</p>
    //         <div
    //           style={{
    //             width: "400px",
    //             height: "400px",
    //             backgroundColor: "darkblue",
    //             margin: "auto",
    //           }}
    //         ></div>
    //       </div>
    //       <div
    //         style={{ display: "flex", flexDirection: "column", margin: "auto" }}
    //       >
    //         <p>Weapons</p>
    //         <div
    //           style={{
    //             width: "400px",
    //             height: "400px",
    //             backgroundColor: "darkblue",
    //             margin: "auto",
    //           }}
    //         ></div>
    //       </div>
    //     </div>
    //   </div>
    //   <div style={{ marginTop: "1%" }}>
    //     <p>Locked Items</p>
    //     <div
    //       style={{
    //         width: "1000px",
    //         height: "500px",
    //         backgroundColor: "black",
    //         margin: "auto",
    //         display: "flex",
    //         flexDirection: "row",
    //       }}
    //     >
    //       <div
    //         style={{ display: "flex", flexDirection: "column", margin: "auto" }}
    //       >
    //         <p>Characters</p>
    //         <div
    //           style={{
    //             width: "400px",
    //             height: "400px",
    //             backgroundColor: "darkblue",
    //             margin: "auto",
    //           }}
    //         ></div>
    //       </div>
    //       <div
    //         style={{ display: "flex", flexDirection: "column", margin: "auto" }}
    //       >
    //         <p>Weapons</p>
    //         <div
    //           style={{
    //             width: "400px",
    //             height: "400px",
    //             backgroundColor: "darkblue",
    //             margin: "auto",
    //           }}
    //         ></div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "87vmin",
        }}
      >
        <h1 style={{ margin: "auto", color: "antiquewhite" }}>
          Under Construction
        </h1>
      </div>
      <Footer />
    </>
  );
};

export default Collections;
