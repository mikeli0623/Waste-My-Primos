import React from "react";

const Footer = () => {
  return (
    <section id="footer">
      <div id="footer-text" style={{ textShadow: "1px 0 5px black" }}>
        Created by Mike Li. Please give me a job thanks. Icons made by
        <a
          href="https://www.flaticon.com/authors/kiranshastry"
          title="Kiranshastry"
          style={{
            textDecoration: "none",
            color: "rgb(55, 61, 78)",
            textShadow: "none",
          }}
        >
          {" "}
          Kiranshastry{" "}
        </a>
        and
        <a
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
          style={{
            textDecoration: "none",
            color: "rgb(55, 61, 78)",
            textShadow: "none",
          }}
        >
          {" "}
          Pixel perfect{" "}
        </a>
        from
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
          style={{
            textDecoration: "none",
            color: "rgb(55, 61, 78)",
            textShadow: "none",
          }}
        >
          {" "}
          www.flaticon.com.
        </a>
      </div>
    </section>
  );
};

export default Footer;
