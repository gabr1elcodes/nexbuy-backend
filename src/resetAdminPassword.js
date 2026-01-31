// src/resetAdminPassword.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // caminho correto dentro de src

// Substitua pela sua URI do MongoDB
const MONGO_URI = "sua_mongodb_uri_aqui";

const resetAdminPassword = async () => {
  try {
    // 1️⃣ Conecta ao MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Conectado ao MongoDB");

    // 2️⃣ Cria o hash da nova senha
    const newPassword = "NovaSenha@123"; // escolha uma senha segura
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3️⃣ Atualiza a senha do admin
    const adminEmail = "gabrieloliveira30p@gmail.com";
    const result = await User.findOneAndUpdate(
      { email: adminEmail },
      { password: hashedPassword },
      { new: true }
    );

    if (!result) {
      console.log("Admin não encontrado");
    } else {
      console.log("Senha do admin atualizada com sucesso");
    }

    // 4️⃣ Fecha a conexão com o MongoDB
    await mongoose.connection.close();
    console.log("Conexão com MongoDB encerrada");
  } catch (err) {
    console.error("Erro ao resetar senha:", err);
  }
};

resetAdminPassword();
