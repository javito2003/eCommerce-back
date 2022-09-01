import app from "./app";

const port = app.get('port')

app.listen(port, () => {
    console.log("SERVER API LISTENING ON PORT", port);
})