package com.ahngroup.qrcode.enums;

import lombok.Getter;

@Getter
public enum CodeResponse {
    RES200("Traitement effectué avec succès "),

    //Erreurs fonctionnelles
    RES400("Requete partiellement traitée "),
    RES401("L'utilisateur connecté n'est pas encore activé"),
    RES402("Un champ null à été détecté et empêche le traitement de la requête"),
    RES403("L'utilsateur connecté n'est pas autorisé à modifier les informations qui ne lui appartienne pas "),
    RES405("Requete intraitable car objet envoyé non valide "),
    RESA405("L'article demandé est introuvable dans le système");

    private final String label;


    CodeResponse(String label) {
        this.label = label;
    }

}
