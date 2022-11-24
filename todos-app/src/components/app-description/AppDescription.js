import React from "react";
import { Container, Row, Col } from "react-bootstrap";
class AppDescription extends React.Component {
  render() {
    return(
      <>
      <br/>
      <Container>
        <h3>Todos App</h3>
        <p><strong>Todos app is a fullstack React js - Node js(lb4) - MySql database based project in which we perform CRUD operations of todos.</strong></p>
        <p>Todos app is a daily task/work managemet system app in which we can add a tasks, update it or delete it. It is simply used to take notes of some tasks you need to remember and to be perform in upcoming time. </p>
        <h5>Technologies and Frameworks</h5>
          <ul>
            <li>React js</li>
            <li>Node js framework (lb4)</li>
            <li>MySql</li>
            <li>React bootstrap</li>
          </ul>
        <h5>Key Learings From this Project</h5>
        <Row>
          <Col sm={6}>
            <ul>
              <b>Frontend (React js) : </b>
              <li>React js Project setup and file structure</li>
              <li>React Routing</li>
              <li>Hooks : useState and useEffect hooks</li>
              <li>Form Validations</li>
              <li>Api Integrtation : Fetch and Axios</li>
              <li>Http Methods : GET, POST, PATCH and DELETE </li>
              <li>React bootstrap libreary and components </li>
            </ul>
          </Col>
          <Col sm={6}>
            <ul>
              <b>Backend (lb4 - Node js) : </b>
              <li>Rest Api developemnt </li>
              <li>Lb4 Document reference : <a href="https://loopback.io/doc/en/lb4/Tutorials.html">https://loopback.io/doc/en/lb4/Tutorials.html</a></li>
            </ul>
          </Col>
        </Row>
                
      </Container>
      </>
    );
  }
}
export default AppDescription;