// Exemplo de Schema (Mongoose)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  image: { type: String },
  stock: { type: Number, default: 0 },
});
