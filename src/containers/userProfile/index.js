import React from "react";
import axios from "axios";
import {
  Col,
  Row,
  Media,
  ListGroup,
  ListGroupItem,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.jpg";
import cover from "../../assets/user-cover.png";
import imgPlan from "../../assets/cover-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek, faCircle } from "@fortawesome/free-solid-svg-icons";
import { JWT_HEADER, JWT_PREFIX, JWT_TOKEN } from "../../constants/constants";
import jwt from "jwt-decode";

class UserProfile extends React.Component {
  componentDidMount() {
    let token = localStorage.getItem(JWT_TOKEN);
    if (token == null) token = sessionStorage.getItem(JWT_TOKEN);
    let headers = {
      [JWT_HEADER]: `${JWT_PREFIX} ${token}`
    };
    var id = JSON.parse(jwt(token).sub).id;

    this.fetchUserProfile(headers);
    this.fetchMyPlanProfile(headers, id);
    this.fetchJoiningPlan(headers, id);
    this.fetchFollowingPlan(headers, id);
  }

  fetchUserProfile = headers => {
    axios.get(`/api/member/profile`, { headers }).then(res => {
      this.setState({ userProfile: res.data });
    });
  };

  fetchMyPlanProfile = (headers, id) => {
    axios.get(`/api/member/${id}/myplan`, { headers }).then(res => {
      this.setState({ myPlan: res.data });
    });
  };

  fetchJoiningPlan = (headers, id) => {
    axios.get(`/api/member/${id}/join`, { headers }).then(res => {
      this.setState({ joinningPlan: res.data });
    });
  };

  fetchFollowingPlan = (headers, id) => {
    axios.get(`/api/member/${id}/follow`, { headers }).then(res => {
      this.setState({ followingPlan: res.data });
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      userProfile: {},
      myPlan: [],
      followingPlan: [],
      joinningPlan: []
    };
  }

  renderJoinningPlan = () => {
    if (this.state.joinningPlan && this.state.joinningPlan.length > 0)
      return (
        <div style={timeLineContainer}>
          <h4>Joining Plans</h4>
          <Row>
            {this.state.joinningPlan.map(plan => (
              <Col md={3}>
                <Card>
                  <CardImg top width="100%" src={imgPlan} alt="" />
                  <CardBody>
                    <CardTitle style={timeLinePlanTitle}>{plan.name}</CardTitle>
                    <CardSubtitle style={timeLinePlanMember}>
                      1.2K Members 5+ post
                    </CardSubtitle>
                    <CardText style={timeLinePlanFriends}>
                      <Media
                        object
                        src={avatar}
                        style={timeLinePlanImgFriend}
                      />
                      <Media
                        object
                        src={avatar}
                        style={timeLinePlanImgFriend}
                      />
                      2 friends are member
                    </CardText>
                    <button className="btn btn-outline-secondary btn-block">
                      DisJoin
                    </button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <hr />
        </div>
      );
    else
      return (
        <div style={timeLineContainer}>
          <h4>Joining Plans</h4>
          <Row className="justify-content-center">
            <h6 className="text-secondary">You have not joined any plans.</h6>
          </Row>
        </div>
      );
  };

  renderFollowingPlan = () => {
    if (this.state.followingPlan && this.state.followingPlan.length > 0) {
      return (
        <>
          {this.state.followingPlan.map(plan => (
            <div style={timeLineContainer}>
              <h4>Following Plans</h4>
              <Row>
                <Col md={6}>
                  <Row>
                    <Media>
                      <Media left>
                        <Media
                          object
                          src={avatar}
                          style={{ maxWidth: 82, borderRadius: 15 }}
                        />
                      </Media>
                      <Media
                        body
                        style={{
                          marginLeft: 15,
                          marginTop: 10,
                          fontSize: 13
                        }}
                      >
                        <Media heading style={{ fontSize: 16 }}>
                          Coast to Coast Cycll
                        </Media>
                        <h6 style={timeLinePlanMember}>16K Members 5 posts</h6>
                        <Media
                          object
                          src={avatar}
                          style={timeLinePlanImgFriend}
                        />
                        <Media
                          object
                          src={avatar}
                          style={timeLinePlanImgFriend}
                        />
                        2 friends are member
                      </Media>
                    </Media>
                    <div>
                      <button
                        class="btn btn-outline-dark"
                        style={{ margin: "25px 0px 0px 30px" }}
                      >
                        Join
                      </button>
                    </div>
                  </Row>
                </Col>
              </Row>
            </div>
          ))}
        </>
      );
    } else {
      return (
        <div style={timeLineContainer}>
          <h4>Following Plans</h4>
          <Row className="justify-content-center">
            <h6 className="text-secondary">You have not followed any plans.</h6>
          </Row>
        </div>
      );
    }
  };

  renderMyPlan = () => {
    if (this.state.myPlan && this.state.myPlan.length > 0) {
      return (
        <>
          {this.state.myPlan.map(plan => (
            <ListGroupItem style={{ border: "0 none" }}>
              <Media>
                <Media left>
                  <Media object src={plan.imgCover} style={myPlanImage} />
                </Media>
                <Media body style={myPlanBody}>
                  <Media heading style={myPlanHead}>
                    {plan.name}
                  </Media>
                  <FontAwesomeIcon icon={faCircle} size="0.5x" /> 12 new posts
                </Media>
              </Media>
            </ListGroupItem>
          ))}
        </>
      );
    } else {
      return (
        <ListGroupItem style={{ border: "0 none" }}>
          <h6 className="text-secondary">Have not created any plans</h6>
        </ListGroupItem>
      );
    }
  };

  render() {
    return (
      <div style={container}>
        <Col md={3} style={leftSideBar}>
          <div className="d-flex justify-content-around">
            <h4>{this.state.userProfile.fullName}</h4>
            <Link to="#">Edit</Link>
          </div>
          <div className="d-flex justify-content-center">
            <Media src={avatar} alt="avatar" style={avatarStyle}></Media>
          </div>
          <div className="d-flex justify-content-start">
            <span style={dateSpan}>
              <FontAwesomeIcon icon={faCalendarWeek} />{" "}
              {this.state.userProfile.dOfB}
            </span>
          </div>
          <hr />
          <div>
            <h5 style={{ fontSize: 19, marginLeft: 10, color: "#525252" }}>
              My Plans
            </h5>
            <ListGroup>{this.renderMyPlan()}</ListGroup>
          </div>
        </Col>
        <Col md={9}>
          <Row className="justify-content-center">
            <Col md={9}>
              <Media
                src={cover}
                alt=""
                style={coverImage}
                className="img-fuild"
              />
              {this.renderJoinningPlan()}
              {this.renderFollowingPlan()}
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

export default UserProfile;

const container = {
  display: "flex",
  flexWrap: "wrap"
};

const avatarStyle = {
  maxWidth: 130,
  borderRadius: 65
};

const leftSideBar = {
  backgroundColor: "#fff",
  boxShadow: "1px 0px 2px #b3adad",
  borderRadius: 5
};

const dateSpan = {
  marginLeft: 15
};

const myPlanImage = {
  maxHeight: 48,
  borderRadius: 6
};

const myPlanBody = {
  marginLeft: 14,
  color: "#0B71F6",
  marginTop: 7,
  fontSize: 14
};

const myPlanHead = {
  fontSize: 16,
  color: "#000"
};

const coverImage = {
  maxWidth: 800
};

const timeLineContainer = {
  marginTop: 10
};

const timeLinePlanTitle = {
  fontSize: 16
};

const timeLinePlanMember = {
  fontSize: 13,
  color: "#9e9e9e"
};

const timeLinePlanFriends = {
  marginTop: 10,
  fontSize: 13,
  color: "#4a4a4a"
};

const timeLinePlanImgFriend = {
  maxWidth: 16,
  borderRadius: 10
};
