-- Ajout data dans activites

INSERT INTO `activites`(
    `idActivites`,
    `Titre`,
    `Description`,
    `Prix`,
    `DateDebut`,
    `NbParticipantsMax`,
    `Localisation`,
    `Duree`,
    `Image`
)
VALUES(
    '0',
    'Visite guidée',
    'Visite guidée et organisée de l\'entièreté du musée.',
    '9.95',
    '2022-02-23 12:11:10',
    '10',
    'Musée',
    '01:15:00',
    'https://i.imgur.com/oNBXLe5.jpg'
),(
    '1',
    'Les étoiles et les constellations',
    'Découverte des astres qui nous entourent et les forment qu\'ils produisent.',
    '7.5',
    '2022-02-23 07:08:09',
    '8',
    'Salle aux étoiles',
    '00:45:00',
    'https://i.imgur.com/2HrpB0g.jpg'
), (
    '2',
    'Yoga sous les étoiles',
    'Yoga en extérieur, de nuit, sous les étoiles.',
    '15.50',
    '2022-03-20',
    '15',
    'Jardin extérieur du musée',
    '01:00:00',
    'https://i.imgur.com/H4EzR19.jpg'
), (
    '3',
    'Découverte de la station spatiale',
    'Activité en réalité virtuelle pour visiter l\'ISS',
    '10.50',
    '2022-02-25',
    '5',
    'Salle VR',
    '00:30:00',
    'https://i.ytimg.com/vi/1LpRZwAzfvA/maxresdefault.jpg'
), (
    '4',
    'Expérience symphonique',
    'Expérience symphonique pour les bébés et pour les grands.',
    '9.75',
    '2022-04-06',
    '10',
    'Théatre du musée',
    '00:35:00',
    'https://journalmetro.com/wp-content/uploads/2022/02/Bebe-symphonique-e1644954958636.jpg?fit=1200%2C675'

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
    'La course spatiale décrit la rivalité entre les États-Unis et l’Union Soviétique, ainsi que ses conséquences sur la conquête spatiale.',
    'Salle Expo 2',
    'http://kipthinking.com/wp-content/uploads/2021/03/espace_final.png',
    NULL
),(
    '1',
    'Le premier homme dans l\'espace ',
    '2022-02-28',
    '2022-03-13',
    'La station d\'exposition de vol spatial humain illustre l\'une des plus grandes réalisations de l\'âge moderne, ce que les nations ont développé comme technologie de pointe pour le vol spatial humain.',
    'Salle Expo 2',
    'https://www.stelvision.com/astro/wp-content/uploads/2019/05/youri_gagarine_credit_Roscosmos.jpg',
    NULL
),(
    '2',
    'Explorons les planètes',
    '2022-01-24',
    '2022-02-25',
    'Cette exposition vous emmène dans une tournée du système solaire, du point de vue du vaisseau qui les à exploré en premier : le satellite Voyager.',
    'Salle Expo 1',
    'https://voyager.jpl.nasa.gov/assets/images/posters/voyager_disco_poster.jpg',
    NULL
),(
    '3',
    'Les météorites',
    '2022-03-10',
    '2022-04-15',
    'Cette exposition vous montrera tout sur les météorites, de leur composition jusqu\'au cratères qu\'elles formeront en frappant la surface de la Terre.',
    'Salle Expo 1',
    'https://images.newscientist.com/wp-content/uploads/2020/03/03131405/gettyimages-488635649.jpg',
    NULL
), (
    '4',
    'Destination Lune',
    '2022-02-20',
    '2022-03-15',
    'Explorez l\'opération Apollon 11 et tout les préparatifs nécéssaires pour le premier atterissage humain sur la Lune.',
    'Sale Expo 2',
    'https://cdn.mos.cms.futurecdn.net/zn5uCEzZ3ebvAK5NFm5ps8.jpg',
    NULL
);
