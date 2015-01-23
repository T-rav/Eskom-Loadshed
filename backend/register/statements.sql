create database eskomloadshed;

-- create the gcm user table 
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  regid varchar(255),
  name varchar(50) NOT NULL,
  email varchar(255) NOT NULL,
  isActive tinyint(1) NOT NULL,
  createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;