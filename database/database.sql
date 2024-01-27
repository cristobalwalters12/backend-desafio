CREATE DATABASE likeme;

CREATE TABLE posts (
  id            VARCHAR(36)     NOT NULL,
  titulo        VARCHAR(25),
  img           VARCHAR(1000)   NOT NULL,
  descripcion   VARCHAR(255)    NOT NULL,
  likes         INT             DEFAULT 0,
  PRIMARY KEY (id)
);
