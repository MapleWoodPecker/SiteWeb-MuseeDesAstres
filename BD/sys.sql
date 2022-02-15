-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 11, 2022 at 08:33 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sys`
--

-- --------------------------------------------------------

--
-- Table structure for table `activites`
--

DROP TABLE IF EXISTS `activites`;
CREATE TABLE IF NOT EXISTS `activites` (
  `Titre` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Prix` decimal(10,0) DEFAULT NULL,
  `DateActiv` datetime DEFAULT NULL,
  `NbMaxParticipants` decimal(10,0) DEFAULT NULL,
  `localisation` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `boutique`
--

DROP TABLE IF EXISTS `boutique`;
CREATE TABLE IF NOT EXISTS `boutique` (
  `Items` varchar(255) DEFAULT NULL,
  `Prix` decimal(10,0) DEFAULT NULL,
  `DescriptionItem` varchar(255) DEFAULT NULL,
  `StockMagasin` decimal(10,0) DEFAULT NULL,
  `ModeLivraison` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `expositions`
--

DROP TABLE IF EXISTS `expositions`;
CREATE TABLE IF NOT EXISTS `expositions` (
  `DateDebut` datetime DEFAULT NULL,
  `DateFin` datetime DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Titre` varchar(255) DEFAULT NULL,
  `LocalisationMusee` varchar(255) DEFAULT NULL,
  `Image` varchar(512) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
CREATE TABLE IF NOT EXISTS `participants` (
  `Nom` varchar(255) DEFAULT NULL,
  `Prenom` varchar(255) DEFAULT NULL,
  `AdresseCourriel` varchar(255) DEFAULT NULL,
  `NumeroTelephone` decimal(10,0) DEFAULT NULL,
  `JourRDV` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `rdvetoiles`
--

DROP TABLE IF EXISTS `rdvetoiles`;
CREATE TABLE IF NOT EXISTS `rdvetoiles` (
  `Prix` decimal(10,0) DEFAULT NULL,
  `NbMaxParicipants` decimal(10,0) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tarifs`
--

DROP TABLE IF EXISTS `tarifs`;
CREATE TABLE IF NOT EXISTS `tarifs` (
  `PrixBillet` decimal(10,0) DEFAULT NULL,
  `TypePlans` varchar(255) DEFAULT NULL,
  `PrixActivites` decimal(10,0) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
