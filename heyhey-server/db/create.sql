CREATE TABLE announcements.announcers (
	id bigserial NOT NULL,
	username varchar NULL,
	uuid varchar NULL,
	created_at timestamp(6) NOT NULL,
	updated_at timestamp(6) NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);



CREATE TABLE announcements.announcements (
	id bigserial NOT NULL,
	author_id int8 NULL,
	title varchar NULL,
	"content" text NULL,
	created_at timestamp(6) NOT NULL,
	updated_at timestamp(6) NOT NULL,
	CONSTRAINT announcements_pkey PRIMARY KEY (id)
);

CREATE INDEX index_announcements_on_author_id ON announcements.announcements USING btree (author_id);
-- announcements.announcements foreign keys

ALTER TABLE announcements.announcements ADD CONSTRAINT announcements_fk FOREIGN KEY (author_id) REFERENCES announcements.announcers(id);

CREATE TABLE announcements.comments (
	id bigserial NOT NULL,
	announcement_id int8 NULL,
	"content" text NULL,
	created_at timestamp(6) NOT NULL,
	updated_at timestamp(6) NOT NULL,
	CONSTRAINT comments_pkey PRIMARY KEY (id)
);


CREATE INDEX index_comments_on_announcement_id ON announcements.comments USING btree (announcement_id);

-- announcements.comments foreign keys

ALTER TABLE announcements.comments ADD CONSTRAINT comments_fk FOREIGN KEY (announcement_id) REFERENCES announcements.announcements(id);

