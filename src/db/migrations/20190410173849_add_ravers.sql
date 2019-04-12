-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE ravers (
  id             uuid primary key default gen_random_uuid(),
  "fullName"      text not null,
  dni            text not null unique,
  email          text not null unique,

  "createdAt"     timestamptz default now(),
  "updatedAt"     timestamptz default now(),
  "deletedAt"     timestamptz
);

create trigger update_ravers_updated_at
before update on ravers for each row execute procedure update_updated_at_column();


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

DROP TABLE ravers cascade;

