import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";
  import Select from "react-select";
  
  const SortFilterSidebar = ({
    setSortOrder,
    setDescending,
    descending,
  }) => {
    return (
      <Container>
        <Row>
          <Col class="col-md-4 col-sm-6 d-flex flex-fill flex-column">
            <Card className="p-2">
              <CardBody className="pb-0">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="fw-700 d-flex align-items-center">
                    <img src="/sort.svg" alt="" className="mr-2" />
                    Sort by
                  </div>
                  <FormGroup
                    tag="fieldset"
                    className="d-flex flex-column justify-content-center mb-2"
                  >
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="ascending"
                          checked={!descending}
                          onChange={() => setDescending(false)}
                        />
                        <div className="ml-3">Asc ↑</div>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="descending"
                          checked={descending}
                          onChange={() => setDescending(true)}
                        />
                        <div className="ml-3">Des ↓</div>
                      </Label>
                    </FormGroup>
                  </FormGroup>
                </div>
                <hr />
                <FormGroup tag="fieldset">
                  <FormGroup check className="my-2">
                    <Label check>
                      <Input
                        type="radio"
                        name="sortby"
                        onChange={() => setSortOrder("name")}
                      />
                      <div className="ml-2">Name</div>
                    </Label>
                  </FormGroup>
                  <FormGroup check className="my-2">
                    <Label check>
                      <Input
                        type="radio"
                        name="sortby"
                        onChange={() => setSortOrder("jobTitle")}
                      />
                      <div className="ml-2">Job Title</div>
                    </Label>
                  </FormGroup>
                  <FormGroup check className="my-2">
                    <Label check>
                      <Input
                        type="radio"
                        name="sortby"
                        onChange={() => setSortOrder("doj")}
                      />
                      <div className="ml-2">Date of Joining</div>
                    </Label>
                  </FormGroup>
                  <FormGroup check className="my-2">
                    <Label check>
                      <Input
                        type="radio"
                        name="sortby"
                        onChange={() => setSortOrder("rating")}
                      />
                      <div className="ml-2">Rating</div>
                    </Label>
                  </FormGroup>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default SortFilterSidebar;
  