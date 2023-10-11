const mongoose = require('mongoose');

let vente_carburantScheme = new mongoose.Schema({
    Date : Date,	
    Site : String,
    Region : String,
    Carburant : String,
    Statut : String,
    Origine : String,
    qtt_manuelle_livraison_BL : Number,
    Stock_d_ouverture : Number,
    Stock_theorique_final : Number,
    Stock_reel_final : Number,
    Difference : Number ,
    Volume_de_ventes : Number,	 
    Tests_de_pompe : Number,
    Ecart_vs_vente_pour_1000 : Number,
    Cumul_vente : Number,
    cumul_ecart : Number,
    cumul_ecart_vs_vente : Number
});

module.exports = mongoose.model('vente_carburant', vente_carburantScheme);