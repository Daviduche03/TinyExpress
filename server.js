import TinyExpress from "./TinyExpress.js";
import { jsonParser, urlencodedParser, debug, router } from "./TinyExpress.js";

import { parse } from "querystring";

const app = TinyExpress();

app.use(jsonParser);
app.use(urlencodedParser);
app.use(debug);


app.get("/", (req, res) => {
    res.status(200).json("Hello World");
});

router.get("/test", (req, res) => {
    const data = req.query;
    console.log(data);
    res.status(200).json("Hello World");
});

app.post("/", (req, res) => {
    const data = req.body;

    console.log(data);
    res.status(200).json("Hello World");
});

// app.get("/test", (req, res) => {
//     const data = req.query;
//     console.log(data);
//     res.status(200).json("Hello World");
// });

app.get("/test/:id", (req, res) => {
    const data = req.params.id;
    console.log(data);
    res.status(200).json("Hello World");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});