-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              10.4.32-MariaDB - mariadb.org binary distribution
-- S.O. server:                  Win64
-- HeidiSQL Versione:            12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dump della struttura del database flavourschef
DROP DATABASE IF EXISTS `flavourschef`;
CREATE DATABASE IF NOT EXISTS `flavourschef` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `flavourschef`;

-- Dump della struttura di tabella flavourschef.compostoda
CREATE TABLE IF NOT EXISTS `compostoda` (
  `codPia` int(11) NOT NULL,
  `codIng` int(11) NOT NULL,
  PRIMARY KEY (`codPia`,`codIng`),
  KEY `codPia_codIng` (`codPia`,`codIng`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella flavourschef.contiene
CREATE TABLE IF NOT EXISTS `contiene` (
  `codPia` int(11) NOT NULL,
  `codPre` int(11) NOT NULL,
  PRIMARY KEY (`codPia`,`codPre`),
  KEY `codPia_codPre` (`codPia`,`codPre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella flavourschef.ingrediente
CREATE TABLE IF NOT EXISTS `ingrediente` (
  `codIng` int(11) NOT NULL,
  `nome` tinytext DEFAULT NULL,
  PRIMARY KEY (`codIng`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella flavourschef.piatto
CREATE TABLE IF NOT EXISTS `piatto` (
  `codPia` int(11) NOT NULL AUTO_INCREMENT,
  `nome` tinytext NOT NULL,
  `prezzo` double NOT NULL,
  PRIMARY KEY (`codPia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella flavourschef.prenotazione
CREATE TABLE IF NOT EXISTS `prenotazione` (
  `codPre` int(11) NOT NULL AUTO_INCREMENT,
  `mail` tinytext NOT NULL,
  `tipo` bit(1) NOT NULL,
  `limite_piatti` tinyint(4) NOT NULL,
  `data` date NOT NULL,
  `persone` tinyint(4) NOT NULL,
  `ora` time NOT NULL,
  `numTav` int(11) NOT NULL,
  PRIMARY KEY (`codPre`),
  KEY `numTav` (`numTav`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella flavourschef.tavolo
CREATE TABLE IF NOT EXISTS `tavolo` (
  `numTav` int(11) NOT NULL,
  `capacita` tinyint(4) DEFAULT NULL,
  `occupato` bit(1) DEFAULT NULL,
  PRIMARY KEY (`numTav`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- L’esportazione dei dati non era selezionata.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
