-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE gigs (
  id             uuid primary key default gen_random_uuid(),
  place          text not null,
  "eventDate"      text not null,
  description    text not null,
  "fbLink"         text not null,

  unique(place, "eventDate", "fbLink"),

  "createdAt"     timestamptz default now(),
  "updatedAt"     timestamptz default now(),
  "deletedAt"     timestamptz
);

create trigger update_gigs_updated_at
before update on gigs for each row execute procedure update_updated_at_column();


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

DROP TABLE gigs cascade;


