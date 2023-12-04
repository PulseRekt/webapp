# Cloud API Documentation

This repository contains the Swagger documentation for the Cloud API. The API allows users to manage assignments, submissions, and perform health checks.

## Table of Contents

- [Cloud API Documentation](#cloud-api-documentation)
  - [Table of Contents](#table-of-contents)
  - [Assignment](#assignment)
    - [putAssignmentId](#putassignmentid)
    - [createAssignment](#createassignment)
    - [getAllAssignments](#getallassignments)
    - [deleteAssignment](#deleteassignment)
    - [getAssignmentById](#getassignmentbyid)
    - [submitAssignment](#submitassignment)
  - [Health Check](#health-check)
    - [healthcheck](#healthcheck)

## Assignment

### putAssignmentId

Updates an assignment.

- **Endpoint:** `PUT /v1/assignments/{assignmentId}`
- **Request:**
  - **Method:** `PUT`
  - **Authorization:** Basic Auth
  - **Headers:** None
  - **Body:**
    ```json
    {
      "name": "assignment 22",
      "points": "10",
      "num_of_attempts": "80",
      "deadline": "2023-12-31"
    }
    ```
- **Response:** None

### createAssignment

Creates a new assignment.

- **Endpoint:** `POST /v1/assignments/`
- **Request:**
  - **Method:** `POST`
  - **Authorization:** Basic Auth
  - **Headers:** None
  - **Body:**
    ```json
    {
      "name": "assignment 110",
      "points": 7,
      "num_of_attempts": 100,
      "deadline": "2023-12-31"
    }
    ```
- **Response:** None

### getAllAssignments

Retrieves all assignments.

- **Endpoint:** `GET /v1/assignments`
- **Request:**
  - **Method:** `GET`
  - **Authorization:** Basic Auth
  - **Headers:** None
- **Response:** None

### deleteAssignment

Deletes an assignment.

- **Endpoint:** `DELETE /v1/assignments/{assignmentId}`
- **Request:**
  - **Method:** `DELETE`
  - **Authorization:** Basic Auth
  - **Headers:** None
  - **Body:**
    ```json
    {
      "asdf": "asdf"
    }
    ```
- **Response:** None

### getAssignmentById

Retrieves an assignment by ID.

- **Endpoint:** `GET /v1/assignments/{assignmentId}`
- **Request:**
  - **Method:** `GET`
  - **Authorization:** Basic Auth
  - **Headers:** None
- **Response:** None

### submitAssignment

Submits an assignment.

- **Endpoint:** `POST /v1/assignments/{assignmentId}/submission`
- **Request:**
  - **Method:** `POST`
  - **Authorization:** Basic Auth
  - **Headers:** None
  - **Body:**
    ```json
    {
      "submission_url": "https://github.com/tparikh/myrepo/archive/refs/tags/v1.0.0.zip"
    }
    ```
- **Response:** None

## Health Check

### healthcheck

Performs a health check on the system.

- **Endpoint:** `GET /healthz`
- **Request:**
  - **Method:** `GET`
  - **Headers:**
    ```json
    {
      "asdf": "sdf"
    }
    ```
- **Response:** None
