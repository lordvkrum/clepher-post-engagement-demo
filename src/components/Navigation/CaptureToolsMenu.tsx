import React from "react";
import { useNavigate } from "react-router-dom";
import {
  faFileLines,
  faLink,
  faMagnet,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import NavMenu, { NavMenuEnum } from "components/UIElements/NavMenu";

const CaptureToolsMenu = (
  props: React.ComponentProps<typeof NavMenu>
): JSX.Element => {
  const navigate = useNavigate();

  return (
    <NavMenu
      variant={NavMenuEnum.SideMenu}
      icon={faMagnet}
      href="/capture-tools"
      onClick={() => {
        setTimeout(() => navigate("/capture-tools/links-library"));
      }}
      options={[
        { text: "Links Library", icon: faLink, href: "/links-library" },
        {
          text: "Post Engagement",
          icon: faFileLines,
          href: "/post-engagement",
        },
        {
          text: "Send To Messenger",
          icon: faFacebookMessenger,
          href: "/send-to-messenger",
        },
      ]}
      {...props}
    />
  );
};

export default CaptureToolsMenu;
