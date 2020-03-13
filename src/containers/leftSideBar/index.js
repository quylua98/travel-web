import React from "react";
import axios from "axios";
import { ListGroup, ListGroupItem, Media } from "reactstrap";
import avatar from "../../assets/avatar-41x41.jpg";
import arrowBottom from "../../assets/arrow-bottom.png";
import seeMoreBottom from "../../assets/see-more.png";
import { SIZE_PAGE_ITEM } from "../../constants/constants";

class LeftSideBar extends React.Component {
  componentDidMount() {
    axios.get(`/api/plan/hot-plan?page=0size=${SIZE_PAGE_ITEM}`).then(res => {
      const hotPlans = res.data.plans;
      this.setState({ hotPlans });
      this.setState({ hotPlanCurrentPage: res.data.currentPage + 1 });
      this.setState({ hotPlanTotalPage: res.data.totalPage });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      hotPlans: [],
      hotPlanCurrentPage: 1,
      hotPlanTotalPage: 1
    };
  }

  seeMoreButton() {
    if (this.state.hotPlanCurrentPage < this.state.hotPlanTotalPage) {
      return (
        <ListGroupItem style={listGroupItem}>
          <Media>
            <Media left href="#">
              <Media object src={seeMoreBottom} style={seeMoreButton} />
            </Media>
            <Media body style={seeMoreText}>
              See More
            </Media>
            <Media right onClick={this.seeMoreHotPlan.bind(this)}>
              <Media object src={arrowBottom} style={arrowBottomStyle} />
            </Media>
          </Media>
        </ListGroupItem>
      );
    }
    return null;
  }

  seeMoreHotPlan() {
    let page = this.state.hotPlanCurrentPage;
    page++;
    axios
      .get("/api/plan/hot-plan", {
        params: { page: page, size: SIZE_PAGE_ITEM }
      })
      .then(res => {
        let hotPlans = [...this.state.hotPlans, ...res.data.plans];
        this.setState({ hotPlans });
      });
    this.setState({ hotPlanCurrentPage: page });
  }

  render() {
    // const { hotPlans } = this.state;

    return (
      <div>
        <ListGroup style={listGroup}>
          <ListGroupItem style={listGroupItem}>
            <h4>Hot Plan</h4>
          </ListGroupItem>
          {this.state.hotPlans.map(hotPlan => (
            <ListGroupItem style={listGroupItem}>
              <Media>
                <Media left href="#">
                  <Media object src={avatar} style={planAvatar} />
                </Media>
                <Media body style={planName}>
                  {hotPlan.name}
                </Media>
              </Media>
            </ListGroupItem>
          ))}
          {this.seeMoreButton()}
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

const seeMoreButton = {
  maxHeight: 30
};

const seeMoreText = {
  marginTop: 3,
  marginLeft: 10,
  fontSize: 14
};

const planName = {
  marginLeft: 10,
  marginTop: 10,
  fontSize: 15
};

const arrowBottomStyle = {
  maxHeight: 20,
  borderRadius: 20,
  opacity: 0.7
};

export default LeftSideBar;
