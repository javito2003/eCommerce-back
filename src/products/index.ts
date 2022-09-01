import app from "./app";

const port = app.get('port')

app.listen(port, () => {
    console.log("SERVER API_PRODUCTS LISTENING ON PORT", port);
})