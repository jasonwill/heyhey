INSERT INTO users.users (username,fullname,email_address,avatar_url) VALUES
	 ('foo',NULL,'2022-06-03 14:42:40','2022-06-03 14:42:40'),
	 ('bar',NULL,'2022-10-13 14:43:26','2022-10-13 14:43:26'),
	 ('george',NULL,'2022-10-13 15:18:42','2022-10-13 15:18:42');

commit;

     id bigserial NOT NULL,
	username varchar NULL,
	fullname varchar NULL,
	email_address varchar NULL,
	avatar_url varchar NULL,