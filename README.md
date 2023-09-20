# WTWR (What to Wear?): Back End
The back-end project is focused on creating a server for the WTWR application. It stores the clothing items used to in the main and user display. 
It also stores the user information that is displayed in the home or profile page, avatar and the user name.
# Express RESTful API README

Welcome se_project_express RESTful API server that enables CRUD (Create, Read, Update, Delete) operations through its endpoints. This API is designed to serve as a robust foundation for building and managing resources. Whether you're developing a web or mobile application, this RESTful API can efficiently handle your data.


The server should now be up and running locally on port 3001.

## API Endpoints

This Express RESTful API provides a set of endpoints that adhere to RESTful principles for CRUD operations:

- **Create**: `POST /api/resources`
  - Create a new resource. Send a JSON object in the request body with the data you want to create.

- **Read (All)**: `GET /api/resources`
  - Retrieve all resources. This endpoint returns a JSON array containing all existing resources.

- **Read (One)**: `GET /api/resources/:id`
  - Retrieve a specific resource by its ID. Replace `:id` with the ID of the resource you want to fetch.

- **Update**: `PUT /api/resources/:id`
  - Update a specific resource by its ID. Replace `:id` with the ID of the resource you want to update. Send a JSON object in the request body with the updated data.

- **Delete**: `DELETE /api/resources/:id`
  - Delete a specific resource by its ID. Replace `:id` with the ID of the resource you want to delete.

## Example Usage

You can utilize various HTTP client tools or libraries to interact with these API endpoints. Here are some examples using [curl](https://curl.se/):

### Create a Resource

Send a POST request to create a new resource:

```bash
curl -X POST http://localhost:3001/api/users -H "Content-Type: application/json" -d '{
  "name": "New Resource",
  "avatar": "This is the user avatar image url"
}'
```

### Read All Resources

Retrieve all resources:

```bash
curl localhost:3001/users/
```

### Read a Specific Resource

Retrieve a specific resource by its ID:

```bash
curl localhost:3001/users/:id
```

### Delete a Resource

Delete a specific resource by its ID:

```bash
curl -X DELETE http://localhost:3000/items/:id
```
