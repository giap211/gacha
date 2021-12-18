import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Container,
  Col,
} from "reactstrap";
import { pageTransition } from "../../classes/Constants";
import { UserContext } from "../UserContext";
import { motion } from "framer-motion";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const getWidth = (width) =>
  //   window.innerWidth > 1280 ? width : windowWidth / (1280 / width);

  // const getHeight = (height, width) =>
  //   window.innerWidth > 1280 ? height : (getWidth(width) * height) / width;

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   handleResize();

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // const resize = {
  //   windowWidth,
  //   height: (window.innerHeight / window.innerWidth) * windowWidth,
  //   getWidth,
  //   getHeight,
  // };

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const onChangeUsername = (e) => {
    setUserInfo({ ...userInfo, username: e.target.value });
  };

  const onChangePassword = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
    setUserInfo({ ...userInfo, username: "", password: "" });
    window.location = "/login";
  };

  return (
    <motion.section
      className="content-section"
      initial="out"
      exit="out"
      animate="in"
      variants={pageTransition}
    >
      <div
        className="background"
        style={{
          background: "rgb(235, 235, 235)",
        }}
      />
      <Container
        className="login-container"
        style={{ backgroundColor: "black" }}
      >
        {/* <h2>Sign In</h2>
        <Form className="form" onSubmit={(e) => onSubmit(e)}>
          <Col>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="username"
                autoComplete="username"
                placeholder="username"
                onChange={(e) => onChangeUsername(e)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                autoComplete="new-password"
                id="password"
                placeholder="password"
                onChange={(e) => onChangePassword(e)}
              />
            </FormGroup>
          </Col>
          <Button color="dark">Submit</Button>
        </Form> */}
        <Form className="idkman" onSubmit={(e) => handleSubmit(e)}>
          <h1>{user}</h1>
          <h2>Sign In</h2>
          <FormGroup row>
            <Col>
              <Label for="username">Username:</Label>
              <Input
                type="username"
                id="username"
                autoComplete="username"
                value={userInfo.username}
                placeholder="username"
                required
                onChange={(e) => onChangeUsername(e)}
                valid
              />
              <FormFeedback valid>Sweet! that name is available</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col>
              <Label for="password">Password:</Label>
              <Input
                type="password"
                autoComplete="new-password"
                value={userInfo.password}
                id="password"
                placeholder="password"
                required
                onChange={(e) => onChangePassword(e)}
                invalid
              />
              <FormFeedback>
                Password has to have more than 3 characters.
              </FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col>
              <Button className="btn">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
        <Button className="btn" onClick={() => setUser(userInfo.username)}>
          Context
        </Button>
      </Container>
      {/* <container style={{ backgroundColor: "black" }}>
        <div>
          <h3>Create New User</h3>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label>Username: </label>
              <input
                type="username"
                autoComplete="username"
                placeholder="username"
                required
                className="form-control m-2"
                onChange={(e) => onChangeUsername(e)}
              />
              <label>Password: </label>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="password"
                className="form-control m-2"
                required
                name="password"
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Create User"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </container> */}
    </motion.section>
  );
};

export default Login;
