import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

app.get("/", (req, res) => {
  res.send("CRM API running");
});

app.post("/contacts", async (req, res) => {
  const { first_name, last_name } = req.body;

  const { data, error } = await supabase
    .from("contacts")
    .insert([{ first_name, last_name }]);

  if (error) return res.status(500).json(error);

  console.log({
    type: "lead.created",
    data
  });

  res.json(data);
});

app.listen(3001, () => {
  console.log("Server running on 3001");
});
