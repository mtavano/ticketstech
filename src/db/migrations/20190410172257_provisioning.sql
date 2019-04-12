-- +goose Up
-- provisioning: provides a basics extentions to work

-- +goose StatementBegin
create function update_updated_at_column()
returns trigger as $$
begin
  new."updatedAt" = now();
  return new;
end; $$
LANGUAGE PLPGSQL;
-- +goose StatementEnd

CREATE EXTENSION pgcrypto;
CREATE EXTENSION citext;


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP FUNCTION update_updated_at_column();
DROP EXTENSION pgcrypto;
DROP EXTENSION citext;
-- +goose StatementEnd
