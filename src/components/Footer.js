import { Link } from "@geist-ui/core";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        TakeNote © 2021, All rights reserved. Powered by{" "}
        <Link block href="https://openai.com" target="_blank" rel="noreferrer">
          OpenAI
        </Link>.
      </p>

      <p>
        Created with {"<3"} by{" "}
        <Link block href="https://stylessh.dev" target="_blank" rel="noreferrer">
          stylessh
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
