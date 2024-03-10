-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-03-2024 a las 04:41:41
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wholesaledb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_product`
--

CREATE TABLE `cart_product` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `storefront_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `Status` varchar(250) NOT NULL COMMENT 'Determines the status of the order (Received, shipped, delivered)',
  `comments` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `storefront_id` int(11) NOT NULL,
  `product_key` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL DEFAULT '"No description"',
  `tags` varchar(250) DEFAULT NULL,
  `price_per_dozen` int(11) NOT NULL,
  `price_box` int(11) DEFAULT NULL,
  `total_pieces` int(11) NOT NULL DEFAULT 0,
  `pieces_per_box` int(11) DEFAULT NULL,
  `imageUrl` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `storefront_id`, `product_key`, `name`, `description`, `tags`, `price_per_dozen`, `price_box`, `total_pieces`, `pieces_per_box`, `imageUrl`) VALUES
(1, 1, 'AVGN1234', 'Notebooks', '\"Notebooks multiple colors\"', 'toys', 2, 1, 100, 10, '/assets/products_images/ssh-23029.png'),
(2, 1, 'SSH-23V22', 'Hair things', 'Hair things multiple colors, ask for more info', 'hair', 1, NULL, 200, NULL, '/assets/products_images/ssh-23v22.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `storefront`
--

CREATE TABLE `storefront` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `logo` varchar(250) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `tags` varchar(250) DEFAULT NULL COMMENT 'Tags are separated with a ","',
  `address` varchar(250) DEFAULT NULL,
  `rating` int(11) NOT NULL DEFAULT 0 COMMENT 'Average rating of the store',
  `number_ratings` int(11) NOT NULL DEFAULT 0 COMMENT 'Number of ratings to the store'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `storefront`
--

INSERT INTO `storefront` (`id`, `name`, `seller_id`, `logo`, `description`, `tags`, `address`, `rating`, `number_ratings`) VALUES
(1, 'Store Test 1', 2, NULL, 'Test of a storefront', 'toys', 'Made up address 12345', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `phone_number` varchar(250) DEFAULT NULL,
  `seller` tinyint(1) NOT NULL COMMENT 'Determines if the user is a buyer (0) or a seller (1)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `address`, `phone_number`, `seller`) VALUES
(1, 'Alarico', 'Mercado', 'alarico.mercado@mail.com', '1210130252523', 'Vancouver place 10', '123456789', 0),
(2, 'Ramon', 'Gustavo', 'test@mail.com', 'password', 'Address test', '', 1),
(3, 'Ramon', 'Gustavo', 'test@mail.com', 'password', 'Address test', '', 1),
(4, 'Ana', 'Lucia', 'prueba2@gmail.com', '12345667', 'Here 12345', '12345656', 0),
(8, 'Alarico', 'Mercado', 'alaqr@mail.com', '$2a$10$QVP7p4i4Q3O3WxnRs0YtHOi0xI2Vzxx4.Rk14kmT2HwBPxSmrtkXK', 'ssggeeggse', '123456789', 0),
(10, 'Alarico', 'Mercado', 'alarico@mail.com', '$2a$10$hl5kjuwsTJRiwnwnIi0L8O1Z2uUUCD542UPCSy3w.X3Boov2czAkC', 'Vista Magna 1443, Fraccionamiento La Vista, false, Fraccionamiento La Vista, Fraccionamiento La Vista', '5518294302', 1),
(11, 'Alarico', 'Mercado', 'alarico1@mail.com', '$2a$10$ROV1bLnFBu2DeQ9PO/KHDuSpvFrE/r3Whu.13d6UTZKScuTdHkkjO', 'Vista Magna 1443, Fraccionamiento La Vista, false, Fraccionamiento La Vista, Fraccionamiento La Vista', '5518294302', 1),
(12, 'Alarico', 'Mercado', 'alarico2@mail.com', '$2a$10$r5cO536HsUoY5yLGhN4gseNAV/CZT3Y9aIhYT6wkkh//sAa858Aui', 'Vista Magna 1443, Fraccionamiento La Vista, false, Fraccionamiento La Vista, Fraccionamiento La Vista', '5518294302', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user id cart` (`user_id`);

--
-- Indices de la tabla `cart_product`
--
ALTER TABLE `cart_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart id cart_product` (`cart_id`),
  ADD KEY `product id cart_product` (`product_id`);

--
-- Indices de la tabla `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart id order` (`cart_id`),
  ADD KEY `storefront id order` (`storefront_id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `storefront id` (`storefront_id`);

--
-- Indices de la tabla `storefront`
--
ALTER TABLE `storefront`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Seller id` (`seller_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cart_product`
--
ALTER TABLE `cart_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `storefront`
--
ALTER TABLE `storefront`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `user id cart` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `cart_product`
--
ALTER TABLE `cart_product`
  ADD CONSTRAINT `cart id cart_product` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  ADD CONSTRAINT `product id cart_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Filtros para la tabla `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `cart id order` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  ADD CONSTRAINT `storefront id order` FOREIGN KEY (`storefront_id`) REFERENCES `storefront` (`id`);

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `storefront id` FOREIGN KEY (`storefront_id`) REFERENCES `storefront` (`id`);

--
-- Filtros para la tabla `storefront`
--
ALTER TABLE `storefront`
  ADD CONSTRAINT `Seller id` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
