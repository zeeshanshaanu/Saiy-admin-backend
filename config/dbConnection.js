import mongoose from 'mongoose';

const DBconnection = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "saiy-admin"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        console.log('DataBase connected successfully.!')
    } catch (error) {
        console.log(error)
        console.log(error.response)
    }
}
export default DBconnection