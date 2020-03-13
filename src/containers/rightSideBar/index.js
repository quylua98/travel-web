import React from "react";
import axios from "axios";
import { Media, ListGroupItem, ListGroup } from "reactstrap";
import avatar from "../../assets/avatar-41x41.jpg";
import arrowBottom from "../../assets/arrow-bottom.png";
import seeMoreBottom from "../../assets/see-more.png";

class RightSideBar extends React.Component {
  componentDidMount() {
    axios.get("/api/member/new-comer?page=0").then(res => {
      const users = res.data.users;
      this.setState({ users });
      this.setState({ userCurrentPage: res.data.currentPage + 1 });
      this.setState({ userTotalPage: res.data.totalPage });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userCurrentPage: 1,
      userTotalPage: 1
    };
  }

  seeMoreButton() {
    if (this.state.userCurrentPage < this.state.userTotalPage) {
      return (
        <ListGroupItem style={listGroupItem}>
          <Media>
            <Media left href="#">
              <Media object src={seeMoreBottom} style={seeMoreButtonStyle} />
            </Media>
            <Media body style={seeMoreText}>
              See More
            </Media>
            <Media right onClick={this.seeMoreUser.bind(this)}>
              <Media object src={arrowBottom} style={arrowBottomStyle} />
            </Media>
          </Media>
        </ListGroupItem>
      );
    }
    return null;
  }

  seeMoreUser() {
    let page = this.state.userCurrentPage;
    page++;
    axios.get("/api/member/new-comer", { params: { page: page } }).then(res => {
      let users = [...this.state.users, ...res.data.users];
      this.setState({ users });
    });
    this.setState({ userCurrentPage: page });
  }

  render() {
    return (
      <div className="card gedf-card">
        <div className="card-body">
          <h5 className="card-title">Newscomers</h5>
          <ListGroup>
            {this.state.users.map(user => (
              <ListGroupItem style={listGroupItem}>
                <Media>
                  <Media left href="#">
                    <Media object src={avatar} style={userAvatar} />
                  </Media>
                  <Media body style={userName}>
                    {user.fullName}
                  </Media>
                </Media>
              </ListGroupItem>
            ))}
            {this.seeMoreButton()}
          </ListGroup>
        </div>
      </div>
    );
  }
}

const listGroupItem = {
  border: "0 none"
};

const userAvatar = {
  maxHeight: 30,
  borderRadius: 20
};

const seeMoreButtonStyle = {
  maxHeight: 25
};

const userName = {
  marginLeft: 10,
  marginTop: 2
};

const seeMoreText = {
  marginLeft: 10,
  marginTop: 3,
  fontSize: 14
};
const arrowBottomStyle = {
  maxHeight: 15,
  borderRadius: 20,
  opacity: 0.7
};

export default RightSideBar;
