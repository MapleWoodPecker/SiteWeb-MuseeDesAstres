-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Activites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Activites` (
  `idActivites` INT NOT NULL,
  `Titre` VARCHAR(255) NOT NULL,
  `Description` VARCHAR(255) NOT NULL,
  `Prix` DOUBLE NOT NULL,
  `Date` DATE NOT NULL,
  `NbParticipantsMax` INT NOT NULL,
  `Localisation` VARCHAR(255) NOT NULL,
  `Duree` TIME NOT NULL,
  `Image` VARCHAR(512) NOT NULL,
  PRIMARY KEY (`idActivites`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Expositions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Expositions` (
  `idExpositions` INT NOT NULL,
  `Titre` VARCHAR(255) NOT NULL,
  `Date de debut` DATE NOT NULL,
  `Date de fin` DATE NOT NULL,
  `Description` VARCHAR(255) NOT NULL,
  `Locasation` VARCHAR(45) NOT NULL,
  `Image` VARCHAR(512) NOT NULL,
  `Temporaire` TINYINT NULL,
  PRIMARY KEY (`idExpositions`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
