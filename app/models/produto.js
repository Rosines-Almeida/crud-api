 

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 
var ProdutoSchema = new Schema({
    nome: String,
    senha: Number,
    cpf: Number,
    transferencia:{
        conta: Number,
        valor: Number,
        data: Number,
        
    }
});

module.exports = mongoose.model('Produto', ProdutoSchema);