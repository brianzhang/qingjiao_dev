/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50512
Source Host           : localhost:3306
Source Database       : ibps

Target Server Type    : MYSQL
Target Server Version : 50512
File Encoding         : 65001

Date: 2017-07-06 16:00:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `test`
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `ID_` varchar(64) NOT NULL DEFAULT '',
  `ACCOUNT_` varchar(64) DEFAULT NULL,
  `NAME_` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of test
-- ----------------------------
