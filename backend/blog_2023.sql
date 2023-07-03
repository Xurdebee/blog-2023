-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-07-2023 a las 18:26:06
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blog_2023`
--
CREATE DATABASE IF NOT EXISTS `blog_2023` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `blog_2023`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `post_id` bigint(20) NOT NULL,
  `header` varchar(40) NOT NULL,
  `body` text NOT NULL,
  `image` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`post_id`, `header`, `body`, `image`, `date`, `update_date`) VALUES
(48, 'Agricola', 'Euro game donde tendrás que hacer crecer tu granja y tu familia sin descuidar la comida.', '1688400923267.jpg', '2023-07-03 16:15:23', '2023-07-03 16:15:23'),
(49, 'Avalon', 'Juego de roles ocultos donde tendrás que confiar en tus compañeros sin saber si te traicionarán.', '1688401019470.jpg', '2023-07-03 16:16:59', '2023-07-03 16:16:59'),
(50, 'Blood Rage', 'Juego de mayorías donde lucharás contra otros jugadores por el control de territorios.', '1688401088545.jpg', '2023-07-03 16:18:08', '2023-07-03 16:18:08'),
(51, 'Carcassonne', 'Juego de colocación de losetas donde tratarás de hacer los castillos y caminos más grandes para llevarte más puntos que los rivales.', '1688401137239.jpg', '2023-07-03 16:18:57', '2023-07-03 16:18:57'),
(52, 'La furia de drácula', 'Juego temático donde 4 jugadores tratarán de atrapar y matar a un quinto jugador que lleva a Drácula mientras este trata de ganar matando a los jugadores o creando nuevos vampiros.', '1688401224336.jpg', '2023-07-03 16:20:24', '2023-07-03 16:20:24'),
(53, 'Five Tribes', 'Juego donde tratarás de competir con tus compañeros para hacerte con más puntos gracias al poder de los genios y las mercancías conseguidas en el bazar.', '1688401325690.jpg', '2023-07-03 16:22:05', '2023-07-03 16:22:05'),
(54, 'Flamecraft', 'En este sencillo eurogame tendrás que ayudar con tu dragón en los diferentes puestos de un mercado para ganar más reputación que tus competidores.', '1688401412654.jpg', '2023-07-03 16:23:32', '2023-07-03 16:23:32'),
(55, 'Star Wars: Rebellion', 'En este juego de mesa tendrás se enfrentan el Imperio contra la Rebelión. Los rebeldes tendrán su base escondida y tratarán de conseguir el apoyo por la galaxia mientras que el imperio tendrá que encontrar y acabar con la base rebelde.', '1688401523324.jpg', '2023-07-03 16:25:23', '2023-07-03 16:25:23');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `post_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
