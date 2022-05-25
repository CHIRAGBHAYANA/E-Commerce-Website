import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";

const About = () => {
  const visitSite = () => {
    window.location = "https://chiragbhayana.github.io/My-Personal-Site/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://media-exp1.licdn.com/dms/image/C5103AQEHi9okhg7-0Q/profile-displayphoto-shrink_800_800/0/1580216326646?e=1658966400&v=beta&t=qSZhHkqgapEz3SUMXTW5UvaI4I07JbzDK2_Ik9pGwBQ"
              alt="Founder"
            />
            <Typography>Chirag Bhayana</Typography>
            <Button onClick={visitSite} color="primary">
              Portfolio wesbite
            </Button>
            <span>
              This is a MERN Stack Ecommerce wesbite made by Chirag Bhayana.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
