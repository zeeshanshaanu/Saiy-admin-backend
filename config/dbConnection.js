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
    }
}
<<<<<<< HEAD
export default DBconnection
=======
export default DBconnection
>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa
