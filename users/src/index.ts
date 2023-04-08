import app from "./app";

const start = async () => {
    app.listen(process.env.PORT, () => {
        console.log('listening');
    });
};

start();