-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE assistances (
  id             uuid primary key default gen_random_uuid(),
  "raverId"       uuid references ravers(id),
  "gigId"         uuid references gigs(id),
  "hostId"        uuid references hosts(id),

  unique("raverId", "gigId"),

  "createdAt"     timestamptz default now(),
  "updatedAt"     timestamptz default now(),
  "deletedAt"     timestamptz
);


create trigger update_assistances_updated_at
before update on assistances for each row execute procedure update_updated_at_column();


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

DROP TABLE assistances cascade;


