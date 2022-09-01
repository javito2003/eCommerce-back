import app from "./app";

const port = app.get('port')

app.listen(port, () => {
    console.log("SERVER DB LISTENING ON PORT", port);
})