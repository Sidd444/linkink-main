import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connection successfull');
        })

        connection.on('error', (err:any) => {
            console.log('MongoDB connection error. ' + err);
            process.exit();
        })

    } 
    
    catch (error) {
        console.log('Something went wrong');
        console.log(error);
    }
}