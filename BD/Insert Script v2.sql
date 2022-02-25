-- Ajout data dans activites

INSERT INTO `activites`(
    `idActivites`,
    `Titre`,
    `Description`,
    `Prix`,
    `Date`,
    `NbParticipantsMax`,
    `Localisation`,
    `Duree`,
    `Image`
)
VALUES(
    '0',
    'Visite guidée',
    'Visite guidée du musée',
    '9.95',
    '2022-02-23 12:11:10',
    '10',
    'Musée',
    '01:15:00',
    'https://www.vmcdn.ca/f/files/via/import/2019/02/06205100_planetarium-view.jpg'
),(
    '1',
    'Les étoiles et les constélations ',
    'Découverte des différentes étoles et constélations.',
    '7.5',
    '2022-02-23 07:08:09',
    '8',
    'Salle aux étoiles',
    '00:45:00',
    'https://astrobackyard.com/wp-content/uploads/2021/01/constellations.jpg'
);


-- Ajout data dans Expo

INSERT INTO `expositions`(
    `idExpositions`,
    `Titre`,
    `DateDebut`,
    `DateFin`,
    `Description`,
    `Locasation`,
    `Image`,
    `Temporaire`
)
VALUES(
    '0',
    'La course spatiale',
    '2022-02-21',
    '2022-03-06',
    'La course spatiale décris la rivalité entre les États-Unis et l’Union Soviétique et ses conséquences.',
    'Salle Expo 1',
    'http://kipthinking.com/wp-content/uploads/2021/03/espace_final.png',
    NULL
),(
    '1',
    'Le premier homme en espace ',
    '2022-02-28',
    '2022-03-13',
    'La station d\'exposition de vol spatial humain illustre l\'une des grandes réalisations de l\'âge moderne en tant que nations ont développé la technologie pour le vol spatial humain. ',
    'Salle Expo 2',
    'https://www.stelvision.com/astro/wp-content/uploads/2019/05/youri_gagarine_credit_Roscosmos.jpg',
    NULL
),(
    '2',
    'Explorons les planètes ',
    '2022-01-24',
    '2022-02-07',
    'Cette exposition vous emmène dans une tournée du système solaire du point de vu du vaisseau qui les a exploré, le satellite Voyager.',
    'Salle Expo 1',
    'https://voyager.jpl.nasa.gov/assets/images/posters/voyager_disco_poster.jpg',
    NULL
);