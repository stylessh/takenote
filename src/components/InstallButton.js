import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "@geist-ui/core";
import { Download } from "@geist-ui/icons";

const InstallPrompt = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", showInstallPromotion);

    return () => {
      window.removeEventListener("beforeinstallprompt", showInstallPromotion);
    };
  }, []);

  const showInstallPromotion = (e) => {
    e.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = e;

    // Update UI notify the user they can add to home screen
    setShow(true);
  };

  const installApp = () => {
    // hide our user interface that shows our A2HS button
    setShow(false);

    // Show the prompt
    window.deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    window.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }

      window.deferredPrompt = null;
    });
  };

  if (!show) return null;

  return (
    <Tooltip
      text={"Install application in your device."}
      placement="bottom"
      style={{ textAlign: "center", width: "auto" }}
    >
      <Button icon={<Download />} auto onClick={installApp} />
    </Tooltip>
  );
};

export default InstallPrompt;
