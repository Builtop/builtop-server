import app from './app';

const start = async () => {
    try {
        app.listen(process.env.PORT || 3002, () => {
            console.log(`Service ( Users Auth) is running on port ${process.env.PORT || 3002}`);
        });
    } catch (err) {
        console.error(err);
    }
};

start();