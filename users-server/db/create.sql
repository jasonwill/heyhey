SET search_path TO users

CREATE TABLE users.users (
	id bigserial NOT NULL,
	username varchar NULL,
	fullname varchar NULL,
	email_address varchar NULL,
	avatar_url varchar NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);