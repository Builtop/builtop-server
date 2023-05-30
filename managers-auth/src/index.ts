import mongoose from 'mongoose';
import app from './app';

const start = async () => {
    try {
        const { DB_URI, PORT } = process.env
        if (!DB_URI) {
            throw new Error('invalid DB connection string');
        }

        await mongoose.connect(DB_URI);

        const defaultPort = 4001
        app.listen(process.env.PORT || defaultPort, () => {
            console.log(`Service ( Users Auth) is running on port ${PORT || defaultPort}`);
        });
    } catch (err) {
        console.error(err);
    }
};

start();