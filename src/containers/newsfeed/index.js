import React from "react";
import axios from "axios";
import AddPlanModal from "../../components/modal/AddPlanModal";
import { SIZE_PAGE_ITEM } from "../../constants/constants";
import { withRouter } from "react-router-dom";
import { Button, ListGroupItem, ListGroup, Media } from "reactstrap";
import { connect } from "react-redux";
import avatar from "../../assets/avatar-41x41.jpg";

class NewsFeed extends React.Component {
  componentDidMount() {
    document.addEventListener("scroll", this.trackScrolling);
    axios.get(`/api/plan/latest?page=0size=${SIZE_PAGE_ITEM}`).then(res => {
      const plans = res.data.plans;
      this.setState({ plans });
      this.setState({ planCurrentPage: res.data.currentPage + 1 });
      this.setState({ planTotalPage: res.data.totalPage });
    });
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById("wrapper-card");
    if (this.isBottom(wrappedElement)) {
      let page = this.state.planCurrentPage;
      page++;
      axios
        .get("/api/plan/latest", {
          params: { page: page, size: SIZE_PAGE_ITEM }
        })
        .then(res => {
          let plans = [...this.state.plans, ...res.data.plans];
          this.setState({ plans });
        });
      this.setState({ planCurrentPage: page });
      // document.removeEventListener("scroll", this.trackScrolling);
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      planCurrentPage: 1,
      planTotalPage: 1
    };
  }

  onClickFollow() {}

  render() {
    const { signedIn } = this.props.auth;
    const avatarHome = require("../../assets/avatar-home.jpg");
    const insertImage = require("../../assets/insert-image.png");
    return (
      <>
        {signedIn ? (
          <div className="card gedf-card">
            <div className="card-body">
              <div className="row justify-content-between align-items-center">
                <div className="col-md-1">
                  <img
                    className="rounded-circle"
                    width="45"
                    src={avatarHome}
                    alt=""
                  />
                </div>
                <div className="col-md-10 justify-content-between align-items-center">
                  <AddPlanModal />
                </div>
                <div className="col-md-1">
                  <input
                    type="image"
                    src={insertImage}
                    style={insertImageStyle}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div id="wrapper-card">
          {this.state.plans.map(plan => (
            <div className="card gedf-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="mr-2">
                      <img
                        className="rounded-circle"
                        width="45"
                        src={avatarHome}
                        alt=""
                      />
                    </div>
                    <div className="ml-2">
                      <div className="h5 m-0">
                        {plan.user === null ? <></> : plan.user.fullName}
                      </div>
                      <div className="h7 text-muted">5 mins</div>
                    </div>
                  </div>
                  <div>
                    <div className="dropdown">
                      <Button
                        outline
                        color="secondary"
                        style={{ fontSize: 12 }}
                      >
                        Follow
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <a class="card-link" href="#top">
                  <h5 class="card-title">{plan.name}</h5>
                </a>
                <p className="card-text">{plan.content}</p>
                <div className="card">
                  <img src={plan.imageCover} alt="" className="img-fluid" />
                </div>
              </div>
              <div className="card-footer">
                <ListGroup>
                  <ListGroupItem style={listGroupItem}>
                    <Media>
                      <Media left href="#">
                        <Media object src={avatar} style={userAvatar} />
                      </Media>
                      <Media body style={comment}>
                        <span style={{ fontSize: 18, fontWeight: 600 }}>
                          Ronaldo
                        </span>
                        <p style={{ marginLeft: 10 }}>asdasd</p>
                      </Media>
                    </Media>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

const insertImageStyle = {
  maxHeight: 30
};

const listGroupItem = {
  border: "0 none"
};

const userAvatar = {
  maxHeight: 30,
  borderRadius: 20
};

const comment = {
  marginLeft: 10,
  marginTop: 2,
  display: "inline-flex"
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(NewsFeed));
