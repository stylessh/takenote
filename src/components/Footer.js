import { Link } from "@geist-ui/core";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>TakeNote © 2021, All rights reserved.</p>

      <p>
        Created with {"<3"} by
        <Link
          block
          style={{ marginLeft: ".2em" }}
          href="https://stylessh.me"
          target="_blank"
          rel="noreferrer"
        >
          stylessh
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
