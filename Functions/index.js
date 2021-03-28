const mongoose = require('mongoose');

const getVisitors = async (req, res) => {
    const Schema = mongoose.Schema;
    const visitorsSchema = new Schema(
        {
            counter: {
                type: Number,
                required: true,
            },
        },
        {
            timestamps: true,
        }
    );

    const visitor = mongoose.model('Visitor', visitorsSchema);

    const method = req.method;

    if (method === 'GET') {
        mongoose.connect(VISITORS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const connection = mongoose.connection;

        connection.once('open', () => {
            console.log('MongoDB database connection established successfully!!');
        });

        await visitor.find().then((counter) => {
            const total = counter[counter.length - 1].counter;
            res.send({ totalVisits: total });
        });
        mongoose.connection.close(() => {
            console.log('Connection closed');
        });
    }
};

exports.getVisitors = getVisitors;
