-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  sam. 16 jan. 2021 à 16:30
-- Version du serveur :  5.7.26
-- Version de PHP :  7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `Polystages`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `idcat` tinyint(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`idcat`, `name`) VALUES
(1, 'IDENTIFICATION'),
(2, 'ÉVALUATION DES COMPÉTENCES'),
(3, 'APPRÉCIATION GLOBALE SUR LE STAGE'),
(4, 'APRÈS LE STAGE'),
(5, 'SOUTENANCE DE STAGE');

-- --------------------------------------------------------

--
-- Structure de la table `competences`
--

CREATE TABLE `competences` (
  `idcompetence` tinyint(4) NOT NULL,
  `sigle` char(6) NOT NULL,
  `libelle` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `competences`
--

INSERT INTO `competences` (`idcompetence`, `sigle`, `libelle`) VALUES
(1, 'C2', 'Capacité à choisir, mettre en oeuvre ses connaissances (outils et méthodes). Utiliser ses savoirs et ses capacités d’analyse.'),
(2, 'C3', 'Capacité à identifier et analyser les besoins et contraintes, formaliser le cadre de l\'étude.'),
(3, 'C4.1', 'Capacité à proposer, concevoir et formaliser et faire evoluer une solution.'),
(4, 'C4.2', 'Capacité à mettre en oeuvre et évaluer une solution.'),
(5, 'C4.3', 'Capacité à rédiger un document technique.'),
(6, 'C5', 'Capacité à concevoir, mener et analyser des expérimentations à des fins de recherche ou de devéloppement.'),
(7, 'C6', 'Capacité à trouver l\'information pertinente et à l\'exploiter. Recherche d’information (externe ou interne de l’entreprise).'),
(8, 'C7', 'Capacité à prendre en compte les enjeux économiques de l’entreprise, respect de la qualité, exigences commerciales, intelligence économique'),
(9, 'C8', 'Capacité à prendre en compte les enjeux de santé et de sécurité au travail ainsi que de l\'éthique.'),
(10, 'C9/C10', 'Capacité à prendre en compte les enjeux liés à la RSE (responsabilité sociétale des entreprises): responsabilité environnementale et sociale.'),
(11, 'C11.1', 'Capacité à mettre oeuvre une démarche de gestion de projet.'),
(12, 'C11.2', 'Capacité à communiquer/interagir avec différents interlocuteurs dans sa mission.'),
(13, 'C11.3', 'Capacité à respecter les règles de la vie professionnelle, dans une organisation (Tenue adaptée, Ponctualité, Assiduité, Comportement et Politesse).'),
(14, 'C11.4', 'Capacité à animer, faire évoluer une équipe et faire preuve de leadership.'),
(15, 'C12', 'Capacite à innover, à avoir une ouverture d\'esprit et à s\'engager.'),
(16, 'C13', 'Capacité à travailler en contexte international.'),
(17, 'C14', 'Capacité à se connaître, s\'autoévaluer (Analyse SWOT) et définir son projet professionel.');

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

CREATE TABLE `eleves` (
  `ideleve` mediumint(9) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `numetudiant` varchar(9) NOT NULL,
  `mdp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`ideleve`, `nom`, `prenom`, `email`, `numetudiant`, `mdp`) VALUES
(1, 'DURIEZ', 'Opaline', 'opaline.duriez@etu.univ-amu.fr', 'd17023188', '117ee880f6862bc08a9808fc820576929a3559032aeb52eea7c1a06590c80444be1413339a45889675f466d7021d420977fff8a4a138e21b84b65346321921ce'),
(2, 'NGUYEN', 'Laurent', 'laurent.nguyen.1@etu.univ-amu.fr', 'n17022980', '3148b497df8e3d3088c37e1bfbf5bec4bf5549f1b5dd19b4185a96ae03314594bc77f6d6d035c52a88e62024b8f1ae66a11f9f66c6774a30736546ddbd4809f6'),
(3, 'BECHARI', 'Bilal', 'bilal.bechari@etu.univ-amu.fr', 'b17017044', 'e042dc397eb6016adec29f34fc9c19b60effaf5c879e83df8bfce096c2d8e2d1bdbb9ad349fded8a071165f8d9d105946b39a71dadf3e103acd299f2dcfe003f'),
(4, 'GUMOS', 'Isabelle', 'isabelle.gumos@etu.univ-amu.fr', 'g16038097', 'abf4d25d909414b12509a7cf0b100845d82d82a7891e480e5ceed115cc25be09e3d52b177c927e8e9b016dcbc59ba14f09abf5bafd2bad994378f450667c2bd8');

-- --------------------------------------------------------

--
-- Structure de la table `enseignants`
--

CREATE TABLE `enseignants` (
  `idens` mediumint(9) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `emailens` varchar(100) NOT NULL,
  `mdpens` text NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `enseignants`
--

INSERT INTO `enseignants` (`idens`, `nom`, `prenom`, `emailens`, `mdpens`, `admin`) VALUES
(1, 'AYACHE', 'Stéphane', 'stephane.ayache@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(2, 'BAC', 'Alexandra', 'alexandra.bac@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(3, 'BONNECAZE', 'Alexis', 'alexis.bonnecaze@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(4, 'BANTON', 'Peter', 'peter.banton@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(5, 'BAUDRU', 'Nicolas', 'nicolas.baudru@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 1),
(6, 'DANIEL', 'Marc', 'marc.daniel@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(7, 'DURAND', 'Nicolas', 'nguyen.laurent97@gmail.com', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 1),
(8, 'GONZALES', 'Chistophe', 'christophe.gonzales@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(9, 'MAVROMATIS', 'Sébastien', 'sebastien.mavromatis@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(10, 'MUGWANEZA', 'Léon', 'leon.mugwaneza@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(11, 'PAPINI', 'Odile', 'odile.papini@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(12, 'PROSPERI', 'Serge', 'serge.prosperi@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(13, 'QUAFAFOU', 'Mohamed', 'mohamed.quafafou@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(14, 'SAMUEL', 'Alain', 'alain.samuel@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(15, 'TISSERANT', 'Sylvain', 'sylvain.tisserant@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0),
(16, 'VALIENTE', 'Julien', 'julien.valiente@univ-amu.fr', '8c711fb5cf5840540730103cde4db688e5300d9ef4474d6d47b45cf2373d80f233ec029bceaa30426c4ce7c5df0fc440aa8af971b71e1c5d72c7aaeadcdb9d88', 0);

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

CREATE TABLE `entreprise` (
  `identreprise` mediumint(9) NOT NULL,
  `sigle` varchar(50) NOT NULL,
  `nomcomplet` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`identreprise`, `sigle`, `nomcomplet`) VALUES
(1, 'ALT', 'ALTEN'),
(2, 'ATO', 'ATOS'),
(3, 'CGI', 'CGI'),
(4, 'SCA', 'SCALIAN'),
(5, 'SII', 'SII'),
(6, 'SMI', 'SMILE'),
(7, 'SOG', 'SOGETI'),
(8, 'SOP', 'SOPRA STERIA'),
(9, 'AMA', 'AMARIS'),
(10, 'ST ', 'ST MICROELECTRONICS'),
(11, 'CAP', 'CAPGEMINI'),
(12, 'GEM', 'GEMALTO'),
(13, 'THA', 'THALES'),
(14, 'AIR', 'AIRBUS'),
(15, 'DAS', 'DASSAULT'),
(16, 'BUL', 'BULL'),
(17, 'DIG', 'DIGINEXT'),
(18, 'MON', 'MONEXT'),
(19, 'RTM', 'RTM'),
(20, 'IBM', 'IBM'),
(21, 'SOM', 'SOMEI'),
(22, 'EXC', 'EXCILYS'),
(23, 'DEE', 'DEEZER'),
(24, 'WYP', 'WYPLAY'),
(25, 'E2V', 'E2VR'),
(26, 'EEW', 'EEWORX'),
(27, 'EXK', 'EXKEE'),
(28, 'CAN', 'GROUPE CANAL+'),
(29, 'INS', 'INSERM'),
(30, 'NES', 'NESIS'),
(31, 'OLE', 'OLEA MEDICAL'),
(32, 'ONT', 'ONTRACKS'),
(33, 'QWA', 'QWANT'),
(35, 'UNI', 'UNISTELLAR'),
(36, 'SYN', 'SYNTELL'),
(37, 'HAL', 'HALIODX'),
(38, 'SOF', 'SOFTWAY MEDICAL'),
(39, 'CNR', 'CNRS'),
(40, 'KEE', 'KEEEX'),
(42, 'ERD', 'ERDF'),
(43, 'BNP', 'BNP PARIBAS'),
(44, 'BUS', 'BUSINESS&DECISION'),
(45, 'ALS', 'ALSTOM'),
(46, 'ORA', 'ORANGE'),
(47, 'FDJ', 'FRANCAISE DES JEUX'),
(53, 'ZEN', 'ZENIKA'),
(75, 'MAI', 'MAIF'),
(78, 'POL', 'POLYTECH');

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

CREATE TABLE `inscription` (
  `ideleve` mediumint(9) NOT NULL,
  `annee` year(4) NOT NULL,
  `niveau` enum('3','4','5') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `inscription`
--

INSERT INTO `inscription` (`ideleve`, `annee`, `niveau`) VALUES
(1, 2020, '5'),
(2, 2020, '5'),
(3, 2020, '5'),
(4, 2020, '5');

-- --------------------------------------------------------

--
-- Structure de la table `niveauxcompetences`
--

CREATE TABLE `niveauxcompetences` (
  `idniveauxcompetences` tinyint(4) NOT NULL,
  `libelle` text NOT NULL,
  `idcompetence` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `niveauxcompetences`
--

INSERT INTO `niveauxcompetences` (`idniveauxcompetences`, `libelle`, `idcompetence`) VALUES
(1, 'Niveau débutant : Même avec de l\'aide, l\'apprenant n\'est pas encore capable de mettre en oeuvre des outils et méthodes.', 1),
(2, 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant met en oeuvre des outils et méthodes, sans s\'interroger sur leur pertinence.', 1),
(3, 'Niveau de maitrise : L\'apprenant propose des outils et méthodes adaptés. En autonomie : il les met en oeuvre.', 1),
(4, 'Niveau d\'expertise : L\'apprenant choisit, adapte et met en oeuvre des méthodes et outils en justifiant ses choix.', 1),
(5, 'Niveau débutant : L\'apprenant n\'est pas encore capable d\'identifier les besoins et les contraintes.', 2),
(6, 'Niveau intermédiaire : L\'apprenant identifie les besoins et les contraintes, mais avec des oublis majeurs.', 2),
(7, 'Niveau de maitrise : L\'apprenant analyse les besoins et les contraintes sans oubli majeur.', 2),
(8, 'Niveau d\'expertise : L\'apprenant formalise sans oubli majeur les besoins et contraintes dans un cahier des charges.', 2),
(9, 'Niveau débutant : L\'apprenant n\'est pas encore capable de concevoir une solution.', 3),
(10, 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant conçoit une solution, sans formalisation.', 3),
(11, 'Niveau de maitrise : Avec de l\'aide, l\'apprenant conçoit et formalise une solution.', 3),
(12, 'Niveau d\'expertise : En autonomie, l\'apprenant conçoit et formalise une solution.', 3),
(13, 'Niveau débutant : L\'apprenant n\'est pas encore capable de mettre en oeuvre une solution', 4),
(14, 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant met en oeuvre et évalue une solution.', 4),
(15, 'Niveau de maitrise : En autonomie, l\'apprenant met en oeuvre une solution. Avec de l\'aide: il l\'évalue.', 4),
(16, 'Niveau d\'expertise : En autonomie, l\'apprenant met en oeuvre une solution et l\'évalue.', 4),
(17, 'Niveau débutant : Les documents ou présentations de l\'apprenant contiennent encore de nombreuses erreurs dans le contenu et/ou dans la forme et en conséquence ils ne sont pas exploitables.', 5),
(18, 'Niveau intermédiaire : L’apprenant produit des documents et présentations exploitables en interne avec encore quelques erreurs dans le contenu et/ou dans la forme.', 5),
(19, 'Niveau de maitrise : En autonomie, l\'apprenant produit des documents et présentation exploitables en interne.', 5),
(20, 'Niveau d\'expertise : En autonomie, l\'apprenant produit des documents et présentations exploitables et diffusables.', 5),
(21, 'Niveau débutant : L\'apprenant n\'est pas encore capable de mener des mesures et des expérimentations.', 6),
(22, 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant mène et analyse des mesures et des expérimentations.', 6),
(23, 'Niveau de maitrise : Avec de l\'aide, l\'apprenant conçoit des mesures et des expérimentations. Il les mène et les analyse en autonomie.', 6),
(24, 'Niveau d\'expertise : En autonomie, l\'apprenant conçoit et mène des mesures et des expérimentations.', 6),
(25, 'Niveau débutant : L\'apprenant ne sait pas encore chercher des informations pertinantes.', 7),
(26, 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant trouve des informations pertinentes et les exploite.', 7),
(27, 'Niveau de maitrise : En autonomie, l\'apprenant trouve des informations pertinentes. Avec de l\'aide, il les exploite.', 7),
(28, 'Niveau d\'expertise : En autonomie, l\'apprenant trouve des informations pertinentes et les exploite.', 7),
(29, 'Niveau débutant : L\'apprenant n\'a pas encore  conscience de ces enjeux.', 8),
(30, 'Niveau intermédiaire : L\'apprenant a conscience de ces enjeux mais ne les prend pas en compte.', 8),
(31, 'Niveau de maitrise : L\'apprenant prend en compte ces enjeux dans sa mission.', 8),
(32, 'Niveau d\'expertise : L\'apprenant prend en compte ces enjeux au-delà de sa mission.', 8),
(33, 'Niveau débutant : L\'apprenant n\'a pas encore conscience de ces enjeux.', 9),
(34, 'Niveau intermédiaire : L\'apprenant a conscience de ces enjeux mais ne les prend pas en compte.', 9),
(35, 'Niveau de maitrise : L\'apprenant prend en compte ces enjeux dans sa mission.', 9),
(36, 'Niveau d\'expertise : L\'apprenant prend en compte ces enjeux au-delà de sa mission.', 9),
(37, 'Niveau débutant : L\'apprenant n\'a pas encore  conscience de ces enjeux.', 10),
(38, 'Niveau intermédiaire : L\'apprenant a conscience de ces enjeux mais ne les prend pas en compte.', 10),
(39, 'Niveau de maitrise : L\'apprenant prend en compte ces enjeux dans sa mission.', 10),
(40, 'Niveau d\'expertise : L\'apprenant prend en compte ces enjeux au-delà de sa mission.', 10),
(41, 'Niveau débutant : L\'apprenant n\'est pas encore capable de mettre en oeuvre une démarche de gestion de projet.', 11),
(42, 'Niveau intermédiaire : L\'apprenant met partiellement en oeuvre une démarche de gestion de projet.', 11),
(43, 'Niveau de maitrise : Avec de l\'aide, l\'apprenant met en oeuvre une démarche de gestion de projet.', 11),
(44, 'Niveau d\'expertise : En autonomie, l\'apprenant met en oeuvre une démarche de gestion de projet.', 11),
(45, 'Niveau débutant : L\'apprenant n\'est pas encore capable de communiquer et interagir avec différents interlocuteurs de son service.', 12),
(46, 'Niveau intermédiaire : L\'apprenant communique/interagit de manière adaptée dans son service uniquement.', 12),
(47, 'Niveau de maitrise : L\'apprenant communique/ interagit de manière adaptée dans son entreprise uniquement.', 12),
(48, 'Niveau d\'expertise : L\'apprenant communique/ interagit de manière adaptée dans son entreprise et à l\'extérieur de l\'entreprise.', 12),
(49, 'Niveau débutant : L\'apprenant ne respecte pas encore les règles et les codes (horaires, présentation…).', 13),
(50, 'Niveau intermédiaire : L\'apprenant se contente de respecter a minima des règles et codes (horaires, présentation…).', 13),
(51, 'Niveau de maitrise : L\'apprenant  s\'implique dans la dynamique de son service.', 13),
(52, 'Niveau d\'expertise : L\'apprenant participe par son action à la diffusion de la culture d\'entreprise.', 13),
(53, 'Niveau débutant : L\'apprenant n\'est pas encore capable de participer à l\'animation d\'une équipe.', 14),
(54, 'Niveau intermédiaire : Par son action l\'apprenant est capable de contribuer de façon constructive à l\'animation d\'une équipe.', 14),
(55, 'Niveau de maitrise : L\'apprenant est capable d\'animer une équipe.', 14),
(56, 'Niveau d\'expertise : L\'apprenant est capable d\'animer une équipe, de la dynamiser et de la faire progresser.', 14),
(57, 'Niveau débutant : L\'apprenant n\'est pas encore capable de concevoir une solution innovante.', 15),
(58, 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant conçoit une solution innovante, sans formalisation.', 15),
(59, 'Niveau de maitrise : En autonomie, l\'apprenant conçoit une solution innovante sans formalisation.', 15),
(60, 'Niveau d\'expertise : En autonomie, l\'apprenant conçoit et formalise une solution innovante.', 15),
(61, 'Niveau débutant : L\'apprenant n\'adapte pas son comportement aux différentes cultures et réglementations rencontrées', 16),
(62, 'Niveau intermédiaire : L\'apprenant commence à adapter son comportement aux différentes cultures et réglementations rencontrées.', 16),
(63, 'Niveau de maitrise : L\'apprenant adapte son comportement aux différentes cultures et réglementations rencontrées.', 16),
(64, 'Niveau d\'expertise : L\'apprenant est capable de travailler en contexte international en intégrant des éléments de management interculturel.', 16),
(65, 'Niveau débutant : L\'apprenant n\'analyse pas ses forces et faiblesses pour construire son projet professionel.', 17),
(66, 'Niveau intermédiaire : L\'apprenant commence à identifier ses compétences  (\'soft skills\') sans les lier à un projet professionel.', 17),
(67, 'Niveau de maitrise : L\'apprenant a un projet professionnel consolidé par une analyse type SWOT mais pas de plan d\'action pour le réaliser.', 17),
(68, 'Niveau d\'expertise : L\'apprenant a un projet professionnel consolidé par une analyse type SWOT et un plan d\'action pour le réaliser.', 17),
(69, 'Sans objet', 1),
(70, 'Sans objet', 2),
(71, 'Sans objet', 3),
(72, 'Sans objet', 4),
(73, 'Sans objet', 5),
(74, 'Sans objet', 6),
(75, 'Sans objet', 7),
(76, 'Sans objet', 8),
(77, 'Sans objet', 9),
(78, 'Sans objet', 10),
(79, 'Sans objet', 11),
(80, 'Sans objet', 12),
(81, 'Sans objet', 13),
(82, 'Sans objet', 14),
(83, 'Sans objet', 15),
(84, 'Sans objet', 16),
(85, 'Sans objet', 17);

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `idquest` smallint(6) NOT NULL,
  `question` text NOT NULL,
  `cat` tinyint(4) NOT NULL,
  `souscat` tinyint(4) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `is4a` tinyint(1) NOT NULL,
  `is5a` tinyint(1) NOT NULL,
  `choix` varchar(50) DEFAULT NULL,
  `niveau` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`idquest`, `question`, `cat`, `souscat`, `type`, `is4a`, `is5a`, `choix`, `niveau`) VALUES
(2, 'Nom du stagiaire', 1, NULL, 'text', 1, 1, NULL, 4),
(3, 'Prénom du stagiaire', 1, NULL, 'text', 1, 1, NULL, 4),
(4, 'Nom de l\'entreprise', 1, NULL, 'text', 1, 1, NULL, 4),
(5, 'Ville/Pays', 1, NULL, 'text', 1, 1, NULL, 4),
(6, 'Nom du tuteur de stage', 1, NULL, 'text', 1, 1, NULL, 4),
(7, 'Fonction du tuteur', 1, NULL, 'text', 1, 1, NULL, 4),
(8, 'Courriel du tuteur', 1, NULL, 'text', 1, 1, NULL, 4),
(9, 'Téléphone du tuteur', 1, NULL, 'text', 1, 1, NULL, 4),
(10, 'Capacité d\'analyse / compréhension des problèmes', 2, 1, 'enum', 1, 1, 'notation', 4),
(11, 'Mise en oeuvre de ses connaissances', 2, 1, 'enum', 1, 1, 'notation', 4),
(12, 'Aptitudes à acquérir de nouvelles connaissances', 2, 1, 'enum', 1, 1, 'notation', 4),
(13, 'Méthodologie / organisation du travail, gestion de projet', 2, 2, 'enum', 1, 1, 'notation', 4),
(14, 'Synhtèse et communication des résultats, maîtrise des outils de communication', 2, 2, 'enum', 1, 1, 'notation', 4),
(15, 'Réalisation des objectifs - Qualité du travail réalisé', 2, 3, 'enum', 1, 1, 'notation', 4),
(16, 'Autonomie -initiative / créativité / ouverture d\'esprit', 2, 3, 'enum', 1, 1, 'notation', 4),
(17, 'Capacité à s\'intégrer dans une équipe', 2, 4, 'enum', 1, 1, 'notation', 4),
(18, 'Communication sur ses activités et capacité à rendre compte', 2, 4, 'enum', 1, 1, 'notation', 4),
(19, 'Prise en compte des enjeux métiers et économiques', 2, 4, 'enum', 1, 1, 'notation', 4),
(20, 'Appropriation des valeurs, codes et de la culture de l\'équipe et de l\'organisation', 2, 5, 'enum', 1, 1, 'notation', 4),
(21, 'Attitude / assiduité / ponctualité', 2, 5, 'enum', 1, 1, 'notation', 4),
(22, 'Sur le stagiaire', 3, NULL, 'text', 1, 1, NULL, 4),
(23, 'Sur le déroulé du stage', 3, NULL, 'text', 1, 1, NULL, 4),
(24, 'Classement du stagiaire parmi les stagiaires du même niveau accueillis par votre entreprise', 3, NULL, 'enum', 1, 1, 'classement', 4),
(25, 'Quels conseils donneriez-vous à ce futur ingénieur?', 3, NULL, 'text', 1, 1, NULL, 4),
(26, 'Sur la formation d\'ingénieur de Polytech Marseille', 3, NULL, 'text', 1, 1, NULL, 4),
(27, 'Sur l\'accueil d\'un stagiaire pour l\'année prochaine?', 3, NULL, 'enum', 1, 1, 'ouinon', 4),
(28, 'Sur l\'accueil d\'un élève en contrat de professionnalisation pour l\'année prochaine?', 3, NULL, 'enum', 1, 1, 'ouinon', 4),
(29, 'L\'entreprise a-t-elle fait une proposition d\'emploi au stagiaire?', 4, NULL, 'enum', 1, 1, 'ouinon', 4),
(30, 'Si une proposition a été faite, quel est le type de contrat?', 4, NULL, 'enum', 1, 1, 'contrat', 4),
(31, 'L\'entreprise ne recrute pas sur le profil du stagiaire', 4, NULL, 'enum', 1, 1, 'ouinon', 4),
(32, 'La stagiaire aurait pu être recruté si l\'entreprise avait eu un poste à pourvoir', 4, NULL, 'enum', 1, 1, 'ouinon', 4),
(33, 'Le stagiaire n\'a pas été retenu pour un recrutement', 4, NULL, 'enum', 1, 1, 'ouinon', 4),
(34, 'Autres:', 4, NULL, 'text', 1, 1, NULL, 4),
(35, 'Le rapport de stage est-il confidentiel? ', 5, NULL, 'enum', 1, 1, 'ouinon', 4),
(36, 'Souhaitez-vous participer à la soutenance?', 5, NULL, 'enum', 1, 1, 'ouinon', 4),
(37, 'Si oui, seriez-vous disponible pour participer au repas le jeudi 12 septembre à midi?', 5, NULL, 'enum', 0, 1, 'ouinon', 5),
(38, 'Si oui, indiquez le nombre de personnes qui participeront ', 5, NULL, 'text', 0, 1, NULL, 5),
(39, 'Avez-vous des impératifs horaires éventuels?', 5, NULL, 'text', 1, 1, NULL, 4),
(40, 'Sujet du stage en quelques mots', 1, NULL, 'text', 1, 1, NULL, 4);

-- --------------------------------------------------------

--
-- Structure de la table `retardeleve`
--

CREATE TABLE `retardeleve` (
  `ideleve` mediumint(9) NOT NULL,
  `mailenvoye` tinyint(1) NOT NULL,
  `rapport` tinyint(1) NOT NULL,
  `presentation` tinyint(1) NOT NULL,
  `autoeval` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `retardeleve`
--

INSERT INTO `retardeleve` (`ideleve`, `mailenvoye`, `rapport`, `presentation`, `autoeval`) VALUES
(2, 1, 1, 1, 0),
(3, 0, 1, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `retardtuteur`
--

CREATE TABLE `retardtuteur` (
  `idtuteur` mediumint(9) NOT NULL,
  `mailenvoye` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `retardtuteur`
--

INSERT INTO `retardtuteur` (`idtuteur`, `mailenvoye`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `souscategorie`
--

CREATE TABLE `souscategorie` (
  `idsouscat` tinyint(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `souscategorie`
--

INSERT INTO `souscategorie` (`idsouscat`, `name`) VALUES
(1, 'Maîtrise des domaines scientifiques et techniques'),
(2, 'Maîtrise des méthodes et des outils de l\'ingénieur'),
(3, 'Conduite de l\'action et prise de décision'),
(4, 'Intégration dans une organisation et capacité d\'animation'),
(5, 'Respect des valeurs sociétales, sociales et environnementales');

-- --------------------------------------------------------

--
-- Structure de la table `stage`
--

CREATE TABLE `stage` (
  `idstage` mediumint(9) NOT NULL,
  `ideleve` mediumint(9) DEFAULT NULL,
  `niveau` enum('3','4','5') DEFAULT NULL,
  `annee` year(4) DEFAULT NULL,
  `idtuteur` mediumint(9) DEFAULT NULL,
  `idens` mediumint(9) DEFAULT NULL,
  `datedebut` date DEFAULT NULL,
  `datefin` date DEFAULT NULL,
  `identreprise` mediumint(9) DEFAULT NULL,
  `titrestage` varchar(255) DEFAULT NULL,
  `description` text COMMENT 'quelques phrases expliquant le contenu du stage',
  `adressestage` text COMMENT 'adresse ou le stage a lieu',
  `adremailstage` varchar(255) DEFAULT NULL COMMENT 'adresse mail du stagiaire durant le stage (email entreprise)',
  `cheminrapport` varchar(150) DEFAULT NULL COMMENT 'chemin vers le fichier du rapport de stage',
  `daterapport` timestamp NULL DEFAULT NULL COMMENT 'date upload du rapport',
  `cheminpres` varchar(150) DEFAULT NULL COMMENT 'chemin vers le fichier de la présentation en vue de la soutenance',
  `datepres` timestamp NULL DEFAULT NULL COMMENT 'date d''upload de la présentation',
  `chemineval` varchar(150) DEFAULT NULL COMMENT 'chemin vers le fichier correspondant à l''évaluation remplie par le tuteur d''entreprise',
  `dateeval` timestamp NULL DEFAULT NULL COMMENT 'date de l''évaluation',
  `evallancee` datetime DEFAULT NULL,
  `confidentiel` tinyint(1) DEFAULT '0',
  `datelimiterendu` date DEFAULT NULL,
  `datelimiteeval` date DEFAULT NULL,
  `datesoutenance` date DEFAULT NULL COMMENT 'Date de la soutenance',
  `datecomp` timestamp NULL DEFAULT NULL,
  `chemincomp` varchar(150) DEFAULT NULL,
  `Ville` varchar(255) DEFAULT NULL,
  `Pays` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `stage`
--

INSERT INTO `stage` (`idstage`, `ideleve`, `niveau`, `annee`, `idtuteur`, `idens`, `datedebut`, `datefin`, `identreprise`, `titrestage`, `description`, `adressestage`, `adremailstage`, `cheminrapport`, `daterapport`, `cheminpres`, `datepres`, `chemineval`, `dateeval`, `evallancee`, `confidentiel`, `datelimiterendu`, `datelimiteeval`, `datesoutenance`, `datecomp`, `chemincomp`, `Ville`, `Pays`) VALUES
(1, 1, '4', 2022, 1, 4, '2019-09-20', '2019-11-16', 2, 'Chef de projet junior', 'Stage dev web ', 'Castellane 13006', NULL, './public/2020/5A/2020_5A_BECHARI_Bilal_rapport.pdf', '2019-04-06 22:00:00', './public/2020/5A/2020_5A_BECHARI_Bilal_presentation.pdf', NULL, NULL, NULL, NULL, 0, '2018-01-01', '2018-01-01', '2018-01-01', NULL, NULL, 'Marseille', 'France'),
(84, 3, '5', 2020, 2, 2, '2019-12-14', '2019-12-14', 23, 'Sharepoint admin', 'automatisation', NULL, NULL, './public/2020/5A/2020_5A_BECHARI_Bilal_rapport.pdf', '2020-12-19 23:00:00', './public/2020/5A/2020_5A_BECHARI_Bilal_presentation.pdf', '2020-01-15 23:00:00', './public/2020/5A/2020_5A_BECHARI_Bilal_evaluation.pdf', '2020-01-16 07:53:12', '2020-01-15 18:20:48', 0, '2020-01-30', '2020-01-31', '2020-02-25', '2020-01-15 17:44:20', './public/2020/5A/2020_5A_BECHARI_Bilal_competences.pdf', '', ''),
(93, 2, '5', 2020, 4, 5, '2020-01-16', '2020-01-31', 14, 'API Designer', 'Developpement d\'application et API REST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-12-21 15:18:59', 0, NULL, NULL, NULL, NULL, NULL, '', ''),
(96, 2, '5', 2020, 2, 5, '2020-01-16', '2020-01-31', 14, 'API Designer', 'Developpement d\'application et API REST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-12-21 15:18:59', 0, NULL, NULL, NULL, NULL, NULL, '', ''),
(185, 3, '5', 2016, 3, 2, '2019-03-06', '2019-03-06', 1, 'Développement logiciel pour campings dans l\'équipe R&D de Sequoiasoft', 'Stage développement de logiciel interne', 'Vieux port', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, '', ''),
(190, 3, '5', 2015, 3, 2, '2019-03-06', NULL, 1, 'Développement logiciel pour campings dans l\'équipe R&D de Sequoiasoft', 'Stage développement de logiciel interne', 'Vieux port', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, '', ''),
(193, 1, '4', 2022, 1, 4, '2019-09-28', '2019-11-24', 2, 'Chef de projet junior', 'Stage dev web ', 'Castellane 13006', NULL, './public/2020/5A/2020_5A_BECHARI_Bilal_rapport.pdf', '2019-04-06 22:00:00', './public/2020/5A/2020_5A_BECHARI_Bilal_presentation.pdf', NULL, NULL, NULL, NULL, 0, '2018-01-01', '2018-01-01', '2018-01-01', NULL, NULL, '', ''),
(194, 3, '5', 2020, 2, 2, '2019-12-14', '2019-12-14', 23, 'Sharepoint admin', 'automatisation', NULL, NULL, './public/2020/5A/2020_5A_BECHARI_Bilal_rapport.pdf', '2020-01-15 23:00:00', './public/2020/5A/2020_5A_BECHARI_Bilal_presentation.pdf', '2020-01-15 23:00:00', './public/2020/5A/2020_5A_BECHARI_Bilal_evaluation.pdf', '2020-01-16 07:53:12', '2020-01-15 18:20:48', 0, '2020-01-30', '2020-01-31', '2020-02-25', '2020-01-15 17:44:20', './public/2020/5A/2020_5A_BECHARI_Bilal_competences.pdf', '', ''),
(197, 3, '5', 2014, 3, 2, '2019-05-15', '2019-08-16', 1, 'Développement logiciel pour campings dans l\'équipe R&D de Sequoiasoft', 'Stage développement de logiciel interne', 'Vieux port', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'Lattes', 'France');

-- --------------------------------------------------------

--
-- Structure de la table `tuteurs`
--

CREATE TABLE `tuteurs` (
  `idtuteur` mediumint(9) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `emailtuteur` varchar(255) NOT NULL,
  `identreprise` mediumint(9) NOT NULL,
  `mdp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `tuteurs`
--

INSERT INTO `tuteurs` (`idtuteur`, `nom`, `prenom`, `emailtuteur`, `identreprise`, `mdp`) VALUES
(1, 'BERGONZI', 'Ludovic', 'bilal.bechari@etu.univ-amu.fr', 23, '0aa41b6c2f75abc64c93636bd5094cb3c22e852acd277dc20982720f3a5f252464f2c1a0ae3f9c11d07c325a60932a6bfdf9211b30c8c583c0fcffd2dfde6121'),
(2, 'REVAUX', 'Nathalie', 'bilal.bechari+84@etu.univ-amu.fr', 14, '46fc474dc2f425822acbd75c936a518564d538eeebc47bc1af3f036bb5b7a3add6772d14609a40ef913e52de4ed4bb716c1cc772961a1ecf87fb105cbfb81534'),
(3, 'KASTANEK', 'Stan', 'test@etu.univ-amu.fr', 2, 'd1c6da166724bc0c900e5205c85c94fa8066e514e1f9b61486fed0268ef39ff0a1e94ea8536173070bbe8412f995d305a2443af85717df73fe5ad54044f779c6'),
(4, 'tuteurnom', 'tuteurprenom', 'isabelle.gumos@etu.univ-amu.fr', 78, 'f4afb2a611e280b7993c440e8af39e956218f62cc989a85bf1745d800dd73d5df99ee0c6f296ee408699602170e7a79c1de883bf1e63d73e88a0445af1dbcf5e'),
(41, 'KASTANEK', 'Stan', 'testtesteste@etu.univ-amu.fr', 14, 'f0894872b096b8750467d173f27af006c55e56b09c8227afbf8ca9765e24bc353f6758f03b11b339d6a98570c60f57f3f96f68b80ce97853954b7db885bd0028');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`idcat`);

--
-- Index pour la table `competences`
--
ALTER TABLE `competences`
  ADD PRIMARY KEY (`idcompetence`);

--
-- Index pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD PRIMARY KEY (`ideleve`),
  ADD UNIQUE KEY `ideleve` (`ideleve`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `numetudiant` (`numetudiant`);

--
-- Index pour la table `enseignants`
--
ALTER TABLE `enseignants`
  ADD PRIMARY KEY (`idens`),
  ADD UNIQUE KEY `email` (`emailens`),
  ADD UNIQUE KEY `idens` (`idens`);

--
-- Index pour la table `entreprise`
--
ALTER TABLE `entreprise`
  ADD PRIMARY KEY (`identreprise`);

--
-- Index pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD PRIMARY KEY (`ideleve`),
  ADD KEY `ideleve` (`ideleve`);

--
-- Index pour la table `niveauxcompetences`
--
ALTER TABLE `niveauxcompetences`
  ADD PRIMARY KEY (`idniveauxcompetences`),
  ADD KEY `idcompetence` (`idcompetence`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`idquest`),
  ADD KEY `cat` (`cat`),
  ADD KEY `souscat` (`souscat`);

--
-- Index pour la table `retardeleve`
--
ALTER TABLE `retardeleve`
  ADD PRIMARY KEY (`ideleve`);

--
-- Index pour la table `retardtuteur`
--
ALTER TABLE `retardtuteur`
  ADD PRIMARY KEY (`idtuteur`);

--
-- Index pour la table `souscategorie`
--
ALTER TABLE `souscategorie`
  ADD PRIMARY KEY (`idsouscat`);

--
-- Index pour la table `stage`
--
ALTER TABLE `stage`
  ADD PRIMARY KEY (`idstage`),
  ADD UNIQUE KEY `idstage` (`idstage`),
  ADD UNIQUE KEY `adremailstage` (`adremailstage`),
  ADD KEY `fk_stage_1_idx` (`ideleve`),
  ADD KEY `fk_stage_2_idx` (`idtuteur`),
  ADD KEY `fk_stage_4_idx` (`idens`),
  ADD KEY `identreprise` (`identreprise`);

--
-- Index pour la table `tuteurs`
--
ALTER TABLE `tuteurs`
  ADD PRIMARY KEY (`idtuteur`),
  ADD UNIQUE KEY `email` (`emailtuteur`),
  ADD UNIQUE KEY `idtuteur` (`idtuteur`),
  ADD KEY `identreprise` (`identreprise`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `idcat` tinyint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `competences`
--
ALTER TABLE `competences`
  MODIFY `idcompetence` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `eleves`
--
ALTER TABLE `eleves`
  MODIFY `ideleve` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `enseignants`
--
ALTER TABLE `enseignants`
  MODIFY `idens` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `entreprise`
--
ALTER TABLE `entreprise`
  MODIFY `identreprise` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT pour la table `niveauxcompetences`
--
ALTER TABLE `niveauxcompetences`
  MODIFY `idniveauxcompetences` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `idquest` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `souscategorie`
--
ALTER TABLE `souscategorie`
  MODIFY `idsouscat` tinyint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `stage`
--
ALTER TABLE `stage`
  MODIFY `idstage` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=198;

--
-- AUTO_INCREMENT pour la table `tuteurs`
--
ALTER TABLE `tuteurs`
  MODIFY `idtuteur` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD CONSTRAINT `inscription_ibfk_1` FOREIGN KEY (`ideleve`) REFERENCES `eleves` (`ideleve`);

--
-- Contraintes pour la table `niveauxcompetences`
--
ALTER TABLE `niveauxcompetences`
  ADD CONSTRAINT `niveauxcompetences_ibfk_1` FOREIGN KEY (`idcompetence`) REFERENCES `competences` (`idcompetence`);

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`cat`) REFERENCES `categorie` (`idcat`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`souscat`) REFERENCES `souscategorie` (`idsouscat`);

--
-- Contraintes pour la table `retardeleve`
--
ALTER TABLE `retardeleve`
  ADD CONSTRAINT `retardeleve_ibfk_1` FOREIGN KEY (`ideleve`) REFERENCES `eleves` (`ideleve`);

--
-- Contraintes pour la table `retardtuteur`
--
ALTER TABLE `retardtuteur`
  ADD CONSTRAINT `retardtuteur_ibfk_1` FOREIGN KEY (`idtuteur`) REFERENCES `tuteurs` (`idtuteur`);

--
-- Contraintes pour la table `stage`
--
ALTER TABLE `stage`
  ADD CONSTRAINT `fk_stage_1` FOREIGN KEY (`ideleve`) REFERENCES `eleves` (`ideleve`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_stage_2` FOREIGN KEY (`idtuteur`) REFERENCES `tuteurs` (`idtuteur`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_stage_4` FOREIGN KEY (`idens`) REFERENCES `enseignants` (`idens`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `stage_ibfk_1` FOREIGN KEY (`identreprise`) REFERENCES `entreprise` (`identreprise`);