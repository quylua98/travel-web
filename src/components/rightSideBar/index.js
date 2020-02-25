import React from "react";
import { Media, ListGroupItem, ListGroup } from "reactstrap";

class RightSideBar extends React.Component {
  render() {
    const avatar = require("../../assets/avatar-41x41.jpg");
    const arrowBottom = require("../../assets/arrow-bottom.png");
    return (
      <>
        <div className="card gedf-card">
          <div className="card-body">
            <h5 className="card-title">Newscomers</h5>
            <ListGroup>
              <ListGroupItem style={listGroupItem}>
                <Media>
                  <Media left href="#">
                    <Media object src={avatar} style={planAvatar} />
                  </Media>
                  <Media body style={planName}>
                    Ngắm Mã Pí Lèng
                  </Media>
                </Media>
              </ListGroupItem>
              <ListGroupItem style={listGroupItem}>
                <Media>
                  <Media left href="#">
                    <Media object src={avatar} style={planAvatar} />
                  </Media>
                  <Media body style={planName}>
                    See More
                  </Media>
                  <Media right href="#">
                    <Media object src={arrowBottom} style={planAvatar} />
                  </Media>
                </Media>
              </ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </>
    );
  }
}

const listGroupItem = {
  border: "0 none"
};

const planAvatar = {
  maxHeight: 30,
  borderRadius: 20
};

const planName = {
  marginTop: 8,
  marginLeft: 10
};

export default RightSideBar;
