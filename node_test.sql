-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2021 at 11:00 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `job_title` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `salary` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `full_name`, `job_title`, `department`, `location`, `age`, `salary`, `created_at`, `updated_at`) VALUES
(1, 'Rohit', 'Developer', 'Technology', 'Mumbai', 33, '76437565', '2021-06-16 10:10:52', '0000-00-00 00:00:00'),
(2, 'Dhoni', 'Developer', 'Cricket', 'Chennai', 45, '', '2021-06-16 10:38:05', '0000-00-00 00:00:00'),
(5, 'Kohli', 'Developer', 'Cricket', 'Bengaluru', 30, '76437565', '2021-06-16 10:41:13', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `mobile_number` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `reset_pasword_token` varchar(255) NOT NULL,
  `reset_token_expiry` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `mobile_number`, `email`, `password`, `token`, `reset_pasword_token`, `reset_token_expiry`, `created_at`, `updated_at`) VALUES
(12, 'Rohit', 'rohit45', 2147483647, 'narisetty.lakshmi@indianpac.com', '$2a$10$O9N/nNSEsPwsDCHPiFnyYOADU950iE8UCNpeKh9QT8JkdK4QwbU6i', 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwibmFtZSI6IlJvaGl0IiwidXNlcm5hbWUiOiJyb2hpdDQ1IiwibW9iaWxlX251bWJlciI6MjE0NzQ4MzY0NywicGFzc3dvcmQiOiIkMmEkMTAkSXVWa280b09MUi9KaGtleVBxNTNodXRZNkdScDVldDNzMWkuZ0NrSTYxSXU1TXlrL0ZYZTIiLCJ0b2tlbi', '', '', '2021-06-15 22:30:14', '2021-06-16 13:30:20'),
(14, 'Dhoni', 'dhoni7', 2147483647, 'narisetty.lakshmi@indianpac.com', '$2a$10$P/X.j9F4t09GTnCWD5I.8.DdbyKIYDny55fLN8Ck8XW.RXg5pKcYW', 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNCwibmFtZSI6IkRob25pIiwidXNlcm5hbWUiOiJkaG9uaTciLCJtb2JpbGVfbnVtYmVyIjoyMTQ3NDgzNjQ3LCJlbWFpbCI6IiIsInBhc3N3b3JkIjoiJDJhJDEwJFAvWC5qOUY0dDA5R1RuQ1dENUkuOC5EZGJ5S0lZRG55NTVmTE44Q2s4WFcuUlhnNXBLY1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hcmlzZXR0eS5sYWtzaG1pQGluZGlhbnBhYy5jb20iLCJpZCI6MTQsImlhdCI6MTYyMzgzMTI3NX0.6W_7oQnJVYS-lg1pjkUuKG7ipwTuI7vYjmYtpkBTV0Y', '1623917675471', '2021-06-16 13:39:33', '2021-06-16 13:44:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
