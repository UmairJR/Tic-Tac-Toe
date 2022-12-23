import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
// import bcrypt from "bcrypt";
const app = express();

app.use(cors());
app.use(express.json());
const api_key = "ybjc4u29rz4j";
const api_secret =
  "6r5hf3x2dwxbkdxgg3rujxwt4m3gysb6kz2pvs8z8fk8pnf8ybee7jrtw9wkqqjg";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { yourName, email, username, password } = req.body;
    const userId = uuidv4();
    // const password = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, yourName, email, username, password });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return res.json({ message: "User not found" });

    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].password
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        email: users[0].email,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
