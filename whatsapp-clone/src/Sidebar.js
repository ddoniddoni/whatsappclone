import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import { Avatar, IconButton } from "@material-ui/core";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headeRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <ChatIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
