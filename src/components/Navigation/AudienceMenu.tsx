import React from "react";
import { useNavigate } from "react-router-dom";
import { faTags, faUsers } from "@fortawesome/free-solid-svg-icons";
import NavMenu, { NavMenuEnum } from "components/UIElements/NavMenu";

const AudienceMenu = (
  props: React.ComponentProps<typeof NavMenu>
): JSX.Element => {
  const navigate = useNavigate();

  return (
    <NavMenu
      variant={NavMenuEnum.SideMenu}
      icon={faUsers}
      href="/audience"
      text=""
      onClick={() => {
        setTimeout(() => navigate("/audience/subscribers"));
      }}
      options={[
        { text: "Subscribers", icon: faUsers, href: "/subscribers" },
        { text: "Tags", icon: faTags, href: "/tags" },
      ]}
      {...props}
    />
  );
};

export default AudienceMenu;
