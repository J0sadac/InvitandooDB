const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://JosaCast044:J0ss4d4c.044@invitandoodb.orv4n66.mongodb.net/InvitandooDB';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function() {
    console.log('Estamos conectados a InvitandooDB.');
});

module.exports = mongoose;