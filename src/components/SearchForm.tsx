import React from "react";
import { Col, Form } from "react-bootstrap";

const SearchForm = ({
  params,
  onParamChange,
}: {
  params: any;
  onParamChange: any;
}) => {
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.description || ""}
            name="description"
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.location || ""}
            name="location"
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Check
            onChange={onParamChange}
            value={params.full_time || false}
            name="full_time"
            type="checkbox"
            label="Only full time"
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
