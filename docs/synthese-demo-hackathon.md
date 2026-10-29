# Démo du hackathon — note de synthèse des travaux restants

**Date :** 25 octobre 2026
**Périmètre :** démonstration fictive « Entre nous » et vidéo de candidature. Cette note sert au pilotage des prochains travaux ; elle ne constitue ni un nouveau PRD ni une validation de la démo.

## Résultat attendu

Montrer, sur deux appareils distincts connectés au même réseau local, une personne fictive qui ouvre un sujet de deuil et attend, puis une autre qui choisit ce sujet. Toutes deux peuvent écrire et se répondre librement. Elles peuvent aussi passer un véritable appel audio, sans que celui-ci soit obligatoire. L'auteur du sujet peut annuler l'attente ou terminer l'échange depuis le chat ou l'appel ; les deux vues sont alors vidées et l'échange ne peut pas être repris. Si la personne qui a rejoint part, le sujet redevient disponible pour son auteur, sans les anciens messages. Raccrocher met seulement fin à l'audio et ramène les deux personnes au chat. La démo utilise un contenu fictif et ne conserve pas d'historique de conversation. Ces comportements suivent les décisions A-8 à A-13, A-22 à A-23 et A-26 à A-36 de l'[intake](context/product-context/intake/espaces-ecoute-ephemeres.md), reprises dans les [parcours](context/experience-context/user-flows.md) et les [exigences D-R1 à D-R4](prds/entre-nous-initial.md).

Le lot 1 est une vidéo scénarisée de **deux minutes**, centrée sur le chat : elle commence par une écoute en personne, passe à l'échange écrit à distance et rend perceptible « on est tous aidants » ainsi que la fin de l'échange (D-R5, A-41). Elle ne montre pas d'appel audio ; cet appel appartient au lot 2. La [remise](context/hackathon-kickoff.md) est prévue le **25 octobre 2026 avant minuit, heure de Paris**. Le lien du projet et le dépôt GitHub sont facultatifs selon la source de l'événement.

## Point de départ

- **Décidé :** entrée par deux intentions et par sujet, deuil comme thème fictif principal, conversation réciproque, voix facultative, sorties volontaires distinctes, interface chaleureuse et humaine. L'[ADR 0001](adr/0001-web-demo-infrastructure.md) approuve la direction Nuxt + service ASP.NET Core/SignalR séparé + WebRTC, avec Compose sur le PC de l'auteur et un point d'entrée HTTPS fiable pour les téléphones.
- **Artefacts approuvés :** la [révision du PRD initial](prds/entre-nous-initial.md) et les [trois fiches de fonctionnalités](features/README.md) ont été approuvées le 25 octobre 2026. L'ADR était déjà approuvé ; ces décisions ne prouvent pas que la nouvelle application fonctionne.
- **Observé dans le code :** le [prototype exploratoire](../prototype/README.md) illustre un chat et un appel entre deux onglets du même navigateur. Son `BroadcastChannel`, son serveur lié à `127.0.0.1` et son parcours d'entrée ne satisfont pas le parcours retenu sur deux appareils. Le bouton de fin d'appel y clôt la session, alors que la décision A-36 prévoit un retour au chat. Le prototype est une référence de parcours, pas une validation de l'architecture cible.
- **Non vérifié :** aucun service Nuxt/.NET conteneurisé, échange entre deux téléphones, appel audio sur le LAN, inspection du stockage et des logs, ni vidéo chronométrée n'est encore constaté dans le dépôt.

## Travaux restants, dans l'ordre de dépendance

### 1. Arrêter le scénario filmable et les détails d'interaction

Rédiger un échange de deuil **explicitement fictif**, avec plusieurs contributions écrites de chaque personne. Définir un sujet court visible avant la jonction et les textes des états d'attente, de conversation et de fin. Préparer le déroulé chat seul pour la vidéo du lot 1 ; le parcours avec appel, raccrochage puis retour au chat relève du lot 2 (A-41). Le sujet est choisi ; l'histoire précise et les messages ne le sont pas encore.

Trancher les détails qui bloquent l'interface et le protocole : saisie ou exemple prérempli du sujet, état de liste vide, invitation et acceptation de l'appel, refus du micro, appel sans réponse, perte imprévue de connexion et retour via un ancien lien. Les règles de sortie **volontaire** sont déjà décidées ; une coupure réseau ne doit pas être assimilée sans décision à un départ volontaire. Consigner ces choix dans le périmètre de livraison et dans les [parcours](context/experience-context/user-flows.md). Garder des libellés qui signalent la fiction et n'impliquent pas une promesse thérapeutique ou d'effacement technique universel.

### 2. Produire le parcours utilisable sur deux clients

Créer l'application web et le backend distincts prévus par l'ADR. Livrer d'abord la chaîne **ouvrir un sujet → le voir sur l'autre client → rejoindre → échanger dans les deux sens → quitter ou terminer**. Le backend doit être la source de vérité pour le sujet, l'occupation de la session et ses transitions ; il doit vérifier les droits d'action côté serveur, empêcher une troisième arrivée et révoquer l'accès d'un ancien participant. Les messages de l'échange précédent ne doivent pas apparaître lors d'une nouvelle jonction.

Ajouter ensuite l'appel audio réel : invitation, acceptation, permission micro, signalisation, son dans les deux sens, raccrochage qui conserve le chat, et arrêt des pistes micro lors d'une fin d'échange. Le chat seul doit rester un parcours complet. Le [contexte technique](context/technical-context/technical-context.md) détaille les contraintes encore à résoudre pour les capacités temporaires, la reconnexion et le point d'entrée sécurisé.

### 3. Rendre la démo répétable sur le matériel prévu

Configurer Compose et l'accès depuis deux navigateurs indépendants sur le PC, puis depuis deux téléphones sur le même LAN. Vérifier que les téléphones ouvrent une origine HTTPS qu'ils considèrent fiable et que le navigateur autorise le micro. Une URL HTTP sur l'adresse LAN du PC ne suffit pas à établir cette capacité. Choisir les appareils et navigateurs réellement utilisés pour filmer, puis vérifier la lisibilité de l'interface sur leurs écrans.

Exécuter au minimum ces contrôles sur les deux clients :

| Parcours | Observation attendue |
| --- | --- |
| Ouvrir, voir et rejoindre | Le même sujet apparaît sur le second appareil ; un seul participant peut le rejoindre. |
| Chat réciproque | Chaque personne envoie, reçoit et répond plusieurs fois. |
| Sortir ou terminer | Annulation pendant l'attente ; fin depuis le chat et depuis l'appel ; deux vues vidées et ancien échange inaccessible. |
| Départ de la personne qui a rejoint | L'auteur retrouve son sujet en attente ; une nouvelle personne ne voit aucun ancien message. |
| Audio facultatif | Appel audible dans les deux sens ; raccrochage ramène au même chat ; une autre exécution se termine sans appel. |
| Données de la démo | Aucun historique de conversation enregistré ; inspecter aussi les logs susceptibles de contenir les messages. |

Ces contrôles sont **à exécuter** : ils ne sont pas des résultats déjà obtenus. Un essai sur deux clients PC ne remplace pas le passage sur les téléphones.

### 4. Préparer et livrer la vidéo

Écrire un storyboard chronométré qui relie l'écoute en personne à la rencontre à distance autour du même sujet fictif. Filmer un parcours stable et compréhensible, avec un plan où la réciprocité des messages se voit et une fin explicite. Vérifier la durée de deux minutes et la lisibilité des captures sur téléphone. Préparer le fichier final et la candidature avant l'échéance ; ne pas conditionner la vidéo à des raffinements visuels secondaires.

## Priorité pratique

Pour le **lot 1**, le chemin critique est **scénario écrit minimal → storyboard → scènes de chat et de clôture compréhensibles → vidéo chronométrée**. La vidéo peut illustrer l'interface avant que le lot 2 fonctionne, en le signalant clairement. Pour le **lot 2**, vérifier ensuite le chat sur deux clients, les sorties correctes, puis HTTPS et l'audio sur deux téléphones. Si un problème apparaît, documenter précisément le contrôle échoué et l'état réel de la démo ; ne pas présenter le prototype à deux onglets comme une preuve du fonctionnement à deux appareils.

Cette note ne couvre pas un service ouvert à de vraies personnes : mise en relation publique, comptes, modération, archives administrateur, gestion opérationnelle des urgences et mesure d'un effet sur la santé restent hors de la démonstration confirmée.
