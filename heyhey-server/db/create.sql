
CREATE TABLE announcements.users (
	id bigserial NOT NULL,
	username varchar NULL,
	uuid varchar NULL,
	created_at timestamp(6) NOT NULL,
	updated_at timestamp(6) NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

commit;

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

