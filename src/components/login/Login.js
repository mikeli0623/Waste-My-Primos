import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
} from "reactstrap";

const Login = () => {
  document.body.style.background = "rgb(235, 235, 235)";

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

  return (
    <section className="content-section">
      <Container
        className="login-container"
        style={{ backgroundColor: "black" }}
      >
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="username"
                name="email"
                id="exampleEmail"
                placeholder="username"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password"
              />
            </FormGroup>
          </Col>
          <Button color="dark">Submit</Button>
        </Form>
      </Container>
    </section>
  );
};

export default Login;
