import React from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
  Col,
  Row,
  CustomInput,
  Alert
} from "reactstrap";
import { DateTimePicker } from "react-widgets";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";
import FileBase64 from "react-file-base64";
import { JWT_HEADER, JWT_PREFIX, JWT_TOKEN } from "../../constants/constants";
import ClipLoader from "react-spinners/ClipLoader";

momentLocalizer(moment);

class AddPlanModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: "",
      imageCover: null,
      content: "",
      status: 3,
      dateStart: new Date(),
      dateFinish: new Date(),
      capicity: "",
      schedules: [],
      activitySchedule: "",
      vehicleSchedule: "",
      startPointSchedule: "",
      endPointSchedule: "",
      dateStartSchedule: new Date(),
      dateFinishSchedule: new Date(),
      modal: false,
      scheduleModal: false,
      notice: ""
    };

    this.toggle = this.toggle.bind(this);
    this.toggleScheduleModal = this.toggleScheduleModal.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChangeDateTimePicker = (name, value) => {
    this.setState({ [name]: value });
  };

  toggleScheduleModal() {
    this.setState({
      scheduleModal: !this.state.scheduleModal
    });
  }

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;

    this.setState({ [nam]: val });
  };

  onStatusChanged = event => {
    this.setState({
      status: event.currentTarget.value
    });
  };

  // onChangeImageHandler = event => {
  //   this.setState({
  //     imageCover: event.target.files[0],
  //     loaded: 0,
  //   })
  // }

  getFiles(file) {
    this.setState({ imageCover: file });
  }

  removeSchedule = activity => {
    const items = this.state.schedules.filter(
      item => item.activity !== activity
    );
    this.setState({ schedules: items });
  };

  addNewSchedule = () => {
    let dateStart = moment(this.state.dateStartSchedule).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    let dateFinish = moment(this.state.dateFinishSchedule).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const schedule = {
      activity: this.state.activitySchedule,
      vehicle: this.state.vehicleSchedule,
      startPoint: this.state.startPointSchedule,
      endPoint: this.state.endPointSchedule,
      dateStart: dateStart,
      dateFinish: dateFinish
    };
    this.setState(previousState => ({
      schedules: [...previousState.schedules, schedule]
    }));
    this.toggleScheduleModal();
  };

  onSubmit = () => {
    this.setState({ loading: true });
    let startDay = moment(this.state.dateStart).format("YYYY-MM-DD HH:mm:ss");
    let endDay = moment(this.state.dateFinish).format("YYYY-MM-DD HH:mm:ss");
    const data = {
      name: this.state.name,
      imageCover: this.state.imageCover.base64,
      startDay: startDay,
      endDay: endDay,
      numPeople: this.state.capicity,
      content: this.state.content,
      status: this.state.status,
      schedules: this.state.schedules
    };
    let token = localStorage.getItem(JWT_TOKEN);
    if (token == null) token = sessionStorage.getItem(JWT_TOKEN);
    let headers = {
      [JWT_HEADER]: `${JWT_PREFIX} ${token}`
    };
    axios
      .put(`/api/plan`, data, { headers })
      .then(res => {
        this.setState({ loading: false });
        this.setState({ notice: "success" });
      })
      .catch(res => {
        this.setState({ loading: false });
        this.setState({ notice: "Fail" });
      });
  };

  render() {
    return (
      <>
        <button
          type="button"
          class="btn btn-light btn-block"
          onClick={this.toggle}
        >
          Add a plan
        </button>
        <Form>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={"modal-lg"}
          >
            <ModalHeader toggle={this.state.toggle} charCode="x">
              Add a plan
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.myChangeHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label for="imageCover">Image cover: </Label>
                <FileBase64
                  onDone={this.getFiles.bind(this)}
                  className="form-control"
                />
              </FormGroup>
              {this.state.imageCover === null ? (
                <></>
              ) : (
                <FormGroup>
                  <img
                    src={this.state.imageCover.base64}
                    alt=""
                    style={inputImg}
                  />
                </FormGroup>
              )}
              <FormGroup>
                <Label for="content">Content</Label>
                <Input
                  type="textarea"
                  name="content"
                  id="content"
                  onChange={this.myChangeHandler}
                />
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="dateStart">Date start</Label>
                    <DateTimePicker
                      id="dateStart"
                      defaultValue={new Date()}
                      onChange={value =>
                        this.onChangeDateTimePicker("dateStart", value)
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="dateFinish">Date finish</Label>
                    <DateTimePicker
                      id="dateFinish"
                      defaultValue={new Date()}
                      onChange={value =>
                        this.onChangeDateTimePicker("dateFinish", value)
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="capicity">Num of People</Label>
                <Input
                  type="text"
                  name="capicity"
                  id="capicity"
                  onChange={this.myChangeHandler}
                />
              </FormGroup>
              <FormGroup row>
                <CustomInput
                  value="3"
                  type="radio"
                  name="status"
                  label="Planning"
                  id="planning-status"
                  onChange={this.onStatusChanged}
                  inline
                />
                <CustomInput
                  value="2"
                  type="radio"
                  name="status"
                  label="Starting"
                  id="starting-status"
                  onChange={this.onStatusChanged}
                  inline
                />
                <CustomInput
                  value="1"
                  type="radio"
                  name="status"
                  label="Finished"
                  id="finished-status"
                  onChange={this.onStatusChanged}
                  inline
                />
                <CustomInput
                  value="0"
                  type="radio"
                  name="status"
                  label="Cancel"
                  id="cancel-status"
                  onChange={this.onStatusChanged}
                  inline
                />
              </FormGroup>
              <FormGroup>
                <Label>Schedule</Label>
                <Button color="link" onClick={this.toggleScheduleModal}>
                  Add new Schedule
                </Button>
                <Modal
                  isOpen={this.state.scheduleModal}
                  toggle={this.toggleScheduleModal}
                >
                  <ModalHeader>Schedule</ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="activity">Activity</Label>
                      <Input
                        type="text"
                        name="activitySchedule"
                        id="activitySchedule"
                        onChange={this.myChangeHandler}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="vehicle">Vehicle</Label>
                      <Input
                        type="text"
                        name="vehicleSchedule"
                        id="vehicleSchedule"
                        onChange={this.myChangeHandler}
                      />
                    </FormGroup>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="startPointSchedule">From</Label>
                          <Input
                            type="text"
                            name="startPointSchedule"
                            id="startPointSchedule"
                            placeholder="Ha Noi"
                            onChange={this.myChangeHandler}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="endPointSchedule">To</Label>
                          <Input
                            type="text"
                            name="endPointSchedule"
                            id="endPointSchedule"
                            placeholder="Ho Chi Minh"
                            onChange={this.myChangeHandler}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="dateStartSchedule">Time</Label>
                          <DateTimePicker
                            defaultValue={new Date()}
                            name="dateStartSchedule"
                            onChange={value =>
                              this.onChangeDateTimePicker(
                                "dateStartSchedule",
                                value
                              )
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label for="dateFinishSchedule">Time</Label>
                          <DateTimePicker
                            defaultValue={new Date()}
                            name="dateFinishSchedule"
                            onChange={value =>
                              this.onChangeDateTimePicker(
                                "dateFinishSchedule",
                                value
                              )
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.addNewSchedule}>
                      Save
                    </Button>{" "}
                    <Button
                      color="secondary"
                      onClick={this.toggleScheduleModal}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </FormGroup>
              {this.state.schedules.map(s => (
                <FormGroup>
                  <span>
                    Schedule: {s.startPoint} to {s.endPoint}
                  </span>
                  <Button
                    color="link"
                    style={{ color: "red" }}
                    onClick={() => this.removeSchedule(s.activity)}
                  >
                    X
                  </Button>
                </FormGroup>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onSubmit}>
                Create
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
            <div className="sweet-loading">
              <ClipLoader
                size={50}
                color={"#123abc"}
                loading={this.state.loading}
              />
            </div>
            <Alert color="success">{this.state.notice}</Alert>
          </Modal>
        </Form>
      </>
    );
  }
}

const inputImg = {
  maxWidth: 450
};

export default AddPlanModal;
