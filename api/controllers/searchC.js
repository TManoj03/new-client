import { db } from "../connect.js";

export const searchController = (req, res) => {
  console.log(req.params.q)
    const t = `SELECT * from users WHERE name LIKE '${req.params.q}%' `; 
    console.log(t)

    db.query(t, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    };
    