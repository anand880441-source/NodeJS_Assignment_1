const express = require("express");
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const users = [
  {
    att: '80',
    uid: 108243,
    total_sub: 14,
    bonus: '20',
    name: 'Spino'
  },
  {
    att: '81',
    uid: 108244,
    total_sub: 16,
    bonus: '18',
    name: 'Moltec'
  }
];

app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.get("/user", (req, res) => {
  console.log("user", users);
  res.status(200).json(users);
});

app.get("/user/:uid", (req, res) => {
  const userId = parseInt(req.params.uid);
  const user = users.find((u) => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.post("/user", (req, res) => {
  const newuser = {
    att: req.body.att,
    uid: req.body.uid,
    total_sub: req.body.total_sub,
    bonus: req.body.bonus,
    name: req.body.name
  };

  users.push(newuser);

  res.status(201).json({
    message: "Product created",
    product: newuser,
  });
});


app.put("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex((u) => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    att: req.body.att,
    uid: userId,
    total_sub: req.body.total_sub,
    bonus: req.body.bonus,
    name: req.body.name
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index],
  });
});


app.delete("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});