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
    'Découverte des différentes étoiles et constélations.',
    '7.5',
    '2022-02-23 07:08:09',
    '8',
    'Salle aux étoiles',
    '00:45:00',
    'https://astrobackyard.com/wp-content/uploads/2021/01/constellations.jpg'
), (
    '2',
    'Yoga sous les étoiles',
    'Yoga extérieur sous les étoiles.',
    '15.50',
    '2022-03-20',
    '15',
    'Cours extérieure du musée',
    '01:00:00',
    'https://www.waukeepubliclibrary.org/sites/default/files/Event%20Images/Adult%20Events/yogaunderthestars.jpg'
), (
    '3',
    'Découvrez de l&#39;ISS',
    'Activité en réalité virtuelle pour visiter l&#39;ISS',
    '10.50',
    '2022-02-25',
    '5',
    'Salle ISS',
    '00:30:00',
    'https://i.ytimg.com/vi/1LpRZwAzfvA/maxresdefault.jpg'
), (
    '4',
    'Expérience symphonique',
    'Expérience symphonique pour les bébés et pour les grands',
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
    'La course spatiale décrit la rivalité entre les États-Unis et l’Union Soviétique, ainsi que ses conséquences.',
    'Salle Expo 2',
    'http://kipthinking.com/wp-content/uploads/2021/03/espace_final.png',
    NULL
),(
    '1',
    'Le premier homme dans l&#39;espace ',
    '2022-02-28',
    '2022-03-13',
    'La station d&#39;exposition de vol spatial humain illustre l&#39;une des plus grandes réalisations de l&#39;âge moderne, ce que les nations ont développé comme technologie de pointe pour le vol spatial humain. ',
    'Salle Expo 2',
    'https://www.stelvision.com/astro/wp-content/uploads/2019/05/youri_gagarine_credit_Roscosmos.jpg',
    NULL
),(
    '2',
    'Explorons les planètes',
    '2022-01-24',
    '2022-02-25',
    'Cette exposition vous emmène dans une tournée du système solaire, du point de vue du vaisseau qui les a exploré en premier : le satellite Voyager.',
    'Salle Expo 1',
    'https://voyager.jpl.nasa.gov/assets/images/posters/voyager_disco_poster.jpg',
    NULL
),(
    '3',
    'Les météorites',
    '2022-03-10',
    '2022-04-15',
    'Cette exposition vous montrera tout sur les météorites, de leur composition jusqu&#39;au cratères qu&#39;elles formeront sur la surface de la Terre.',
    'Salle Expo 1',
    'https://images.newscientist.com/wp-content/uploads/2020/03/03131405/gettyimages-488635649.jpg',
    NULL
), (
    '4',
    'Destination Lune',
    '2022-02-20',
    '2022-03-15',
    'Explorez l&#39;opération Apollon 11 et tout les préparatifs nécéssaires pour le premier atterissage humain sur la Lune.',
    'Sale Expo 2',
    'https://cdn.mos.cms.futurecdn.net/zn5uCEzZ3ebvAK5NFm5ps8.jpg',
    NULL
);