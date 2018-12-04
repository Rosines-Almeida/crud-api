 
var express     = require('express'); //chamando o pacote express
var app         = express(); //definção da nossa aplicação através do express
var bodyParser  = require('body-parser');  //chamando o pacote body-parser
var Produto = require('./app/models/produto');
var mongoose = require('mongoose');
var path = require('path');

mongoose.Promise = global.Promise;
 
 mongoose.connect('mongodb://localhost:27017/crud-api',
{ 
    useMongoClient: true
});
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
 
var port = process.env.PORT || 3000; 
 
var router  = express.Router(); 
app.get('/', function(req, res) {
  
    res.sendFile(path.join(__dirname + '/index.html'));
  });
 
 
router.use(function(req, res, next) {
    console.log('Algo está acontecendo aqui........');
    next();  
});
 
/* Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000/api) */
router.get('/', function(req, res) {
    res.json({ message: 'YEAH! Seja Bem-Vindo a nossa API' });
});
 
 
router.route('/produtos')
  
.post(function(req, res){
    var produto = new Produto();
     produto.nome = req.body.nome;
    produto.senha = req.body.senha;
    produto.cpf = req.body.cpf;
    produto.transferencia.conta = req.body.conta
    produto.transferencia.valor = req.body.valor
    produto.transferencia.data = req.body.data
    produto.save(function(error){
        if(error)
        res.send('erro ao tentar salvar o produto ..' + error);
        res.json({ message: 'Produto cadastrado com sucesso'})
    })
})
 
.get(function(req, res){
  Produto.find(function(error, produtos){
      if (error)
      res.send("erro ao tentar selecionar todoso os produtos"+ error);

      res.json(produtos)
  })
})
 

router.route('/produtos/:produto_id')
 .get(function (req, res) {
 
    Produto.findById(req.params.produto_id, function(error, produto) {
        if(error)
            res.send('Id do cliente não encontrado....: ' + error);

        res.json(produto);
    });
})
 
 .put(function(req, res) {

 
    Produto.findById(req.params.produto_id, function(error, produto) {
        if (error) 
            res.send("Id do cliente não encontrado....: " + error);
 
            produto.nome = req.body.nome;n
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;
 
            produto.save(function(error) {
                if(error)
                    res.send('Erro ao atualizar o cliente....: ' + error);

                res.json({ message: 'Cliente atualizado com sucesso!' });
            });
        });
    })

    .delete(function(req, res) {
            
        Produto.remove({
            _id: req.params.produto_id
            }, function(error) {
                if (error) 
                    res.send("Id do cliente não encontrado....: " + error);

                res.json({ message: 'Cliente Excluído com Sucesso!' });
            });
        });
 

app.use('/api', router);
router.route('/produtos/:nome')

   
 .get(function (req, res) {
    
    Produto.findById(req.params.nome, function(error, produto) {
        if(error)
            res.send('Id do Produto não encontrado....: ' + error);

        res.json(produto);
    });
})
 
 .put(function(req, res) {

 
    Produto.findById(req.params.nome, function(error, produto) {
        if (error) 
            res.send("Id do cliente não encontrado....: " + error);

 
            produto.nome = req.body.nome;
            produto.senha = req.body.senha;
            produto.cpf = req.body.cpf;
 
            produto.save(function(error) {
                if(error)
                    res.send('Erro ao atualizar o cliente....: ' + error);

                res.json({ message: 'cliente atualizado com sucesso!' });
            });
        });
    })

    .delete(function(req, res) {
            
        Produto.remove({
            nome: req.params.nome
            }, function(error) {
                if (error) 
                    res.send("Id do cliente não encontrado....: " + error);

                res.json({ message: 'cliente Excluído com Sucesso!' });
            });
        });
 
//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);

 