SET search_path TO events

CREATE TABLE events.events (
	id bigserial NOT NULL,
	title varchar NULL,
	description varchar NULL,
	starts_at timestamp(6) NOT NULL,
	ends_at timestamp(6) NOT NULL,
	CONSTRAINT events_pkey PRIMARY KEY (id)
);