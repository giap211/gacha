import React from "react";

const Footer = () => {
  return (
    <section id="footer">
      <div
        id="footer-text"
        style={{ textShadow: "1px 0 5px black", fontSize: "0.85em" }}
      >
        Created by Mike Li. All credit given to miHoYo for Genshin Impact and
        all it's assets. Credit to cherrypiewithpoison, Ailephi (u/Ailephi) and
        lukatoni5 on DeviantArt for some images. Icons made by
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
      <a
        href="https://github.com/hbhhi/Waste-My-Primos"
        style={{ position: "absolute", bottom: "10px", right: "10px" }}
      >
        {/* <img src="../assets/img/misc/github-icon.webp" alt="github-icon" /> */}
      </a>
    </section>
  );
};

export default Footer;
