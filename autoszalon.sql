-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2019. Júl 01. 14:43
-- Kiszolgáló verziója: 10.1.19-MariaDB
-- PHP verzió: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `autoszalon`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `buyers`
--

CREATE TABLE `buyers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` varchar(9) NOT NULL,
  `address` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `buyers`
--

INSERT INTO `buyers` (`id`, `name`, `phone`, `address`) VALUES
(1, 'Charlie Harper', '205656321', 'Malibu str. 42.'),
(2, 'Jack Harper', '209669654', 'Washington sqr. 20.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cars`
--

CREATE TABLE `cars` (
  `id` int(10) UNSIGNED NOT NULL,
  `band` varchar(20) NOT NULL,
  `color` varchar(10) NOT NULL,
  `employeeID` int(10) UNSIGNED NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `cars`
--

INSERT INTO `cars` (`id`, `band`, `color`, `employeeID`, `price`) VALUES
(1, 'Mercedes', 'kek', 1, 100000),
(2, 'BMW', 'piros', 1, 120000),
(3, 'bmw', 'kek', 2, 1234),
(22, 'BMW', 'sarga', 1, 75000),
(23, 'trabant', 'fekete', 2, 6000),
(24, 'suzuki', 'lila', 1, 11000);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `employees`
--

CREATE TABLE `employees` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` varchar(9) NOT NULL,
  `address` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `employees`
--

INSERT INTO `employees` (`id`, `name`, `phone`, `address`) VALUES
(1, 'John Nash', '301234321', 'Malibu str. 2.'),
(2, 'Caroline Rock', '202345654', 'Washington sqr. 5.'),
(3, 'Jamie Adams', '206789765', 'york str.1.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `pw` varchar(20) NOT NULL,
  `fullname` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `pw`, `fullname`) VALUES
(1, 'user', 'user', 'Kovács User');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `buyers`
--
ALTER TABLE `buyers`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employeeID` (`employeeID`);

--
-- A tábla indexei `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT a táblához `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
