import Portfolio from "../models/PortfoliosModel.js"
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////

// create
export const CreatePortofolio = async (req, res) => {
    const { name } = req.body;
    const existingportfolio = await Portfolio.findOne({ name });

    if (existingportfolio) {
        return res.send({ status: "failed", message: 'Name already exists' })
    }

    try {
        const NewPortfolio = new Portfolio({
            name: req.body.name,
            min_investment: req.body.min_investment,
            max_investment: req.body.max_investment,
            withdrawal_Period: req.body.withdrawal_Period,
            investors: req.body.investors,
        })

        await NewPortfolio.save();
        res.status(201).send({
            status: 'success',
            message: 'Portfolio created successfully',
        })
    } catch (error) {
        console.error('Error creating portfolio:', error);
        res.status(400).send({
            status: 'failed',
            message: 'Error creating investor',
            error: error.message
        });
    }
}

// get
export const GetPortfolois = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const portfolio = await Portfolio.findById(id);
            if (!portfolio) {
                return res.status(404).send({
                    status: 'failed',
                    message: 'portfolio not found'
                });
            }
        }
        else {
            const portfolio = await Portfolio.find({});
            return res.status(200).send({
                status: 'success',
                data: portfolio
            });
        }
    } catch (error) {
        console.error('Error fetching portfolios:', error);
        return res.status(500).send({
            status: 'failed',
            message: 'Error fetching portfolio',
            error
        });
    }
}

// update
export const UpdatePortfolio = async (req, res) => {
    const { id } = req.params;
    // 
    try {
        const portfolio = await Portfolio.findById(id);
        if (!portfolio) {
            return res.status(404).send({
                status: 'failed',
                message: 'Portfolio not found'
            });
        }
        const updatedportfolio = await Portfolio.findByIdAndUpdate(
            id, {
            $set: {
                name: req.body.name || portfolio?.name,
                min_investment: req.body.min_investment || portfolio?.min_investment,
                max_investment: req.body.max_investment || portfolio?.max_investment,
                withdrawal_Period: req.body.withdrawal_Period || portfolio?.withdrawal_Period,
                investors: req.body.investors || portfolio?.investors,
            }
        }, { new: true }
        );
        res.status(200).send({
            status: 'success',
            message: 'Portfolio updated successfully',
            investor: updatedportfolio,
        });

    } catch (error) {
        console.error('Error fetching investors:', error);
        return res.status(500).send({
            status: 'failed',
            message: 'Error fetching investors',
            error
        });
    }


}

// delete

export const DeletePortfolio = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).send({
                status: 'error',
                message: 'Portfolio ID is required',
            });
        }
        const portfolio = await Portfolio.findByIdAndDelete(id);
        if (!portfolio) {
            return res.status(404).send({
                status: 'error',
                message: 'Portfolio not found',
            });
        }
        return res.status(200).send({
            status: 'success',
            message: 'Portfolio deleted successfully',
        });

    } catch (error) {
        console.error('Error deleting Portfolio:', error);
        return res.status(500).send({
            status: 'error',
            message: 'Error deleting Portfolio',
            error: error.message,
        });
    }
}
