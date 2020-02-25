import React from "react";

class Home extends React.Component {
  render() {
    const avatarHome = require("../../assets/avatar-home.jpg");
    const insertImage = require("../../assets/insert-image.png");
    return (
      <>
        <div className="card gedf-card">
          <div className="card-header">
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
                <button type="button" class="btn btn-light btn-block">
                  Add a plan
                </button>
              </div>
              <div className="col-md-1" >
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
        <div className="card gedf-card">
          <div className="card-header">
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
                  <div className="h5 m-0">@LeeCross</div>
                  <div className="h7 text-muted">Miracles Lee Cross</div>
                </div>
              </div>
              <div>
                <div className="dropdown">
                  <button
                    className="btn btn-link dropdown-toggle"
                    type="button"
                    id="gedf-drop1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-ellipsis-h"></i>
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="gedf-drop1"
                  >
                    <div className="h6 dropdown-header">Configuration</div>
                    <a className="dropdown-item" href="#">
                      Save
                    </a>
                    <a className="dropdown-item" href="#">
                      Hide
                    </a>
                    <a className="dropdown-item" href="#">
                      Report
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="text-muted h7 mb-2">
              {" "}
              <i className="fa fa-clock-o"></i>10 min ago
            </div>
            <a className="card-link" href="#">
              <h5 className="card-title">
                Lorem ipsum dolor sit amet, consectetur adip.
              </h5>
            </a>

            <p className="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              recusandae nulla rem eos ipsa praesentium esse magnam nemo dolor
              sequi fuga quia quaerat cum, obcaecati hic, molestias minima iste
              voluptates.
            </p>
          </div>
          <div className="card-footer">
            <a href="#" className="card-link">
              <i className="fa fa-gittip"></i> Like
            </a>
            <a href="#" className="card-link">
              <i className="fa fa-comment"></i> Comment
            </a>
            <a href="#" className="card-link">
              <i className="fa fa-mail-forward"></i> Share
            </a>
          </div>
        </div>
      </>
    );
  }
}

const insertImageStyle = {
  maxHeight: 30
};

export default Home;
