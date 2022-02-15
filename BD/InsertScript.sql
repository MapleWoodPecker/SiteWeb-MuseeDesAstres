-- insert dans table participants

INSERT INTO `participants` (`Nom`, `Prenom`, `AdresseCourriel`, `NumeroTelephone`, `JourRDV`) VALUES 

('SEBILLE', 'Sam', 'sebille.sam@gmail.com', '1111111111', '2022-02-11 21:36:18.000000'),
('HADDAR', 'Yanni', 'haddar.yanni@gmail.com', '111111111', '2022-02-12 16:30'),
('GASTALDO', 'Quentin', 'gastaldo.quentin@gmail.com', '1111111111', '2022-02-14 14:50'),
('KOWALSKI', 'Felipe', 'kowalski.felipe@gmail.com', '1111111111', '2022-02-11 21:36:18.000000'),
('BORDELEAU', 'Guillaume', 'bordeleau.guillaume@gmail.com', '1111111111', '2022-02-23 11:30'),
('ROSELLE', 'Carole', 'roselle.carlone@gmail.com', '1111111111', '2022-02-02 16:37:24'),
('DEBORHA', 'Laure', 'deborha.laure@gmail.com', '1111111111', '2022-02-11 21:36:18.000000');

-- insert das la table activites

INSERT INTO `activites`(
    `Titre`,
    `Description`,
    `Prix`,
    `DateActiv`,
    `NbMaxParticipants`,
    `localisation`
)
VALUES(
    'Visite guidee',
    'Visite guidee du planetarium par nos experts.',
    '15',
    '2022-02-11 22:12:23.000000',
    '10',
    'Hall d\'entre du planetarium'
),(
    'Visite guidee pour enfant',
    'Visite guidee du planetarium de facon ludique par nos animateurs.',
    '7.5',
    '2022-02-11 22:12:23.000000',
    '7',
    'Hall d\'entre du planetarium'
),(
    'Activite decouverte des etoiles.',
    'Activiter pour decouvrir les differentes etoiles et constellations.',
    '20',
    '2022-02-11 22:12:23.000000',
    '15',
    'La salle des etoiles'
);

-- insert dans table expositions

INSERT INTO `expositions`(
    `DateDebut`,
    `DateFin`,
    `Description`,
    `Titre`,
    `LocalisationMusee`
)
VALUES(
    '2022-02-01 8:00',
    '2022-02-20 18:00',
    'Exposition artistique sur le theme des etoiles. ',
    'Au milieu des etoiles',
    'Salle expo A'
),(
    '2022-02-13 8:00',
    '2022-02-20 18:00',
    'Une immersion vertigineuse à travers l’histoire de la conquete spatiale.',
    'Tourbillon d’étoiles',
    'Salle expo B'
);

-- insert dans la table rdvtoile

INSERT INTO `rdvetoiles`(
    `Prix`,
    `NbMaxParicipants`,
    `Description`
)
VALUES(
    '9.95',
    '25',
    'Rendez-vous sous les etoiles'
);

-- insert dans la table tarifs

INSERT INTO `tarifs`(
    `PrixBillet`,
    `TypePlans`,
    `PrixActivites`
)
VALUES('4.95', '8-14 ans', NULL),
    ('0', '7 ans et moins ', NULL),
    (
    '8.85',
    'adulte (14- 59 ans)',
    NULL
),('6.50', 'etudiant', NULL),(
    '6.50',
    'senior (60 ans et plus)',
    NULL
);