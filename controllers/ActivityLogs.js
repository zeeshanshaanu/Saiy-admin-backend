import UserModel from '../models/Auth-userModel.js';
import InvestorModel from '../models/InvestorsModel.js';
import AssociateModel from '../models/AssociatesModel.js';
// 
export const getAllEntities = async (req, res) => {
    try {
        const { level } = req.query;
        const queries = [];

        if (!level || level === 'admin' || level === 'user') {
            queries.push(UserModel.find({ level: level }).lean());
        }
        if (!level || level === 'investor') {
            queries.push(InvestorModel.find().lean()); // Fetch investors
        }
        if (!level || level === 'main associate' || level === 'sub associate') {
            queries.push(AssociateModel.find({ level: level }).lean());
        }
        const [admins = [], investors = [], associates = []] = await Promise.all(queries);

        const results = [
            ...admins?.map(admin => ({ ...admin, type: admin?.level })),
            ...investors?.map(investor => ({ ...investor, type: 'investor' })),
            ...associates?.map(associate => ({ ...associate, type: associate?.level })),
        ];

        res.status(200).json({
            status: 'success',
            data: results,
        });
    } catch (error) {
        console.error('Error fetching entities:', error);
        res.status(500).json({
            status: 'failed',
            message: 'Error fetching entities',
            error: error.message
        });
    }
};