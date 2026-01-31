const mongoose = require('mongoose');

mongoose.connect('SUA_CONNECTION_STRING_DO_MONGODB');

async function updateUserRole() {
    await mongoose.connection.db.collection('users').updateOne(
        { email: "gabrieloliveira30p@gmail.com" },
        { $set: { role: "admin" } }
    );
    console.log('Role atualizado para admin!');
    process.exit();
}

updateUserRole();