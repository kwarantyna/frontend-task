const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "data.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  // validate user data
  if (req.method === "POST") {
    const user = req.body;
    if (existingId(user.id)) {
      res.status(400).send("User ID already exists");
      return;
    }
    if (invalidUserData(user)) {
      res.status(400).send("Invalid user data");
      return;
    }
  }
  next();
});

server.use((req, res, next) => {
  // validate user data
  if (req.method === "PUT") {
    const user = req.body;
    if (invalidUserData(user)) {
      res.status(400).send("Invalid user data");
      return;
    }
  }
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

const invalidUserData = (user) => {
  return (
    invalidId(user.id) ||
    invalidFullName(user.fullName) ||
    invalidRole(user.role)
  );
};

const invalidId = (id) => {
  // verify if id is positive integer
  return !id || id < 1 || !Number.isInteger(id);
};

const existingId = (id) => {
  return !!router.db.get("users").find({ id }).value();
};

const invalidFullName = (fullName) => {
  const names = fullName.split(" ");
  // if only one name, verify first name
  if (names.length === 1) {
    return invalidFirstName(names[0]);
  }
  // if two names, verify first and last name
  if (names.length === 2) {
    return invalidFirstName(names[0]) || invalidLastName(names[1]);
  }

  // if more than two names, return true
  if (names.length > 2) {
    return true;
  }
  // no names means invalid value
  return true;
};

const invalidFirstName = (firstName) => {
  return !firstName || firstName.length > 50;
};

const invalidLastName = (lastName) => {
  if (lastName) {
    return lastName.length > 50;
  }
  return false;
};

const invalidRole = (role) => {
  const validRoles = ["admin", "user", "operator"];
  return !role || !validRoles.includes(role);
};
