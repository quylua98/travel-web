import React from "react";
import { ListGroup, ListGroupItem, Media } from "reactstrap";

class LeftSideBar extends React.Component {
  render() {
    const avatar = require("../../assets/avatar-41x41.jpg");
    const arrowBottom = require("../../assets/arrow-bottom.png");
    return (
      <div>
        <ListGroup style={listGroup}>
          <ListGroupItem style={listGroupItem}>
            <h4>Hot Plan</h4>
          </ListGroupItem>
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
    );
  }
}

const listGroup = {
  border: "1px solid #e0e0e0"
};


const listGroupItem = {
  border: "0 none"
};

const planAvatar = {
  maxHeight: 41,
  borderRadius: 9
};

const planName = {
  marginTop: 8,
  marginLeft: 10
};

export default LeftSideBar;
