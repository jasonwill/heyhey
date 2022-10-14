INSERT INTO announcements.users (username,uuid,created_at,updated_at) VALUES
	 ('foo',NULL,'2022-06-03 14:42:40','2022-06-03 14:42:40'),
	 ('bar',NULL,'2022-10-13 14:43:26','2022-10-13 14:43:26'),
	 ('george',NULL,'2022-10-13 15:18:42','2022-10-13 15:18:42');

commit;

INSERT INTO announcements.announcements (author_id,title,"content",created_at,updated_at) VALUES
	 (NULL,'bar',NULL,'2022-06-03 14:42:40','2022-06-03 14:42:40'),
	 (1,'ringo',NULL,'2022-06-03 14:42:40','2022-06-03 14:42:40'),
	 (1,'abc','def','2022-06-17 19:29:17.478501','2022-06-17 19:29:17.478501'),
	 (1,'hello Willamette','Hello all','2022-06-24 19:02:14.772251','2022-06-24 19:02:14.772251'),
	 (1,'more','to say','2022-07-13 21:45:12.813572','2022-07-13 21:45:12.813572'),
	 (NULL,'This is a great movie!',NULL,'2022-10-07 17:11:28','2022-10-07 17:11:28'),
	 (NULL,'This is a great movie!',NULL,'2022-10-07 17:11:28','2022-10-07 17:11:28'),
	 (NULL,'This is a great movie!',NULL,'2022-10-07 11:29:32','2022-10-07 11:29:32'),
	 (NULL,'This is a great movie!',NULL,'2022-10-07 11:29:42','2022-10-07 11:29:42'),
	 (NULL,'This is a great movie!',NULL,'2022-10-07 11:29:44','2022-10-07 11:29:44');
INSERT INTO public.announcements (author_id,title,"content",created_at,updated_at) VALUES
	 (NULL,'This is a great movie!',NULL,'2022-10-07 11:29:45','2022-10-07 11:29:45'),
	 (NULL,'This is a great movie!',NULL,'2022-10-07 11:29:46','2022-10-07 11:29:46'),
	 (NULL,'This is a great movie!',NULL,'2022-10-07 11:29:46','2022-10-07 11:29:46'),
	 (NULL,'This is a great movie!',NULL,'2022-10-07 11:33:13','2022-10-07 11:33:13'),
	 (NULL,'This is a great movie!',NULL,'2022-10-07 11:33:18','2022-10-07 11:33:18'),
	 (NULL,'This is a great movie!',NULL,'2022-10-07 11:33:22','2022-10-07 11:33:22'),
	 (NULL,'Announcement title',NULL,'2022-10-07 11:55:25','2022-10-07 11:55:25'),
	 (NULL,'Go Bobby',NULL,'2022-10-07 11:58:28','2022-10-07 11:58:28'),
	 (NULL,'Ringo',NULL,'2022-10-07 12:18:16','2022-10-07 12:18:16'),
	 (2,'bar first announcement',NULL,'2022-10-13 14:43:26','2022-10-13 14:43:26');
INSERT INTO public.announcements (author_id,title,"content",created_at,updated_at) VALUES
	 (1,'second attempt',NULL,'2022-10-13 16:35:36','2022-10-13 16:35:36'),
	 (2,'Another bar announcement',NULL,'2022-10-13 16:39:47','2022-10-13 16:39:47');

commit;
