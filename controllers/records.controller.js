const Records = require('../models/records');

module.exports.getRecords = async function(req, res) {
    try {
        let pipeline = [
            {
                "$project": {
                    key: 1,
                    createdAt: 1,
                    totalCount: {
                        $sum: "$counts"
                    }
                }
            } 
        ];

        let q = {
            "$match": {}
        }

        if (req.body.minCount || req.body.maxCount) {
            q.$match.totalCount = {};
            
            if (req.body.minCount) {
                q.$match.totalCount.$gte = req.body.minCount;
            }

            if (req.body.maxCount) {
                q.$match.totalCount.$lte = req.body.maxCount;
            }
        }

        if (req.body.startDate || req.body.endDate) {
            q.$match.createdAt = {};
    
            if (req.body.startDate) {
                q.$match.createdAt.$gte = new Date(req.body.startDate);
            }

            if (req.body.endDate) {
                q.$match.createdAt.$lte = new Date(req.body.endDate);
            }
        }

        pipeline.push(q);

        const records = await Records.aggregate(pipeline);

        return res.send({
            code: 0,
            msg: "Successful",
            records: records
        });
    } catch(e) {
        console.log(e);
        return res.status(500).send({code: 1001, msg: 'Something went wrong. Please check the application logs for details'});
    }
}