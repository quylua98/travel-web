import React from "react";
import { Row, Col } from "reactstrap";
import LeftSideBar from "../leftSideBar";
import RightSideBar from "../rightSideBar";
import NewsFeed from "../newsfeed";

class Home extends React.Component {
  render() {
    return (
      <>
        <Row>
          <Col md="3">
            <LeftSideBar />
          </Col>
          <Col md="6">
            <NewsFeed />
          </Col>
          <Col md="3">
            <RightSideBar />
          </Col>
        </Row>
      </>
    );
  }
}

export default Home;
