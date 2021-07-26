CREATE TABLE Build_Votes (
    Vote_Id         ${id_type}      NOT NULL,
    Build_Id        INTEGER         NOT NULL,
    User_name       VARCHAR(255)    NOT NULL,
    Vote_Type       INTEGER         NOT NULL,
    PRIMARY KEY (Vote_Id)
);

ALTER TABLE Build ADD timestamp_creation timestamp;
update Build set timestamp_creation=current_timestamp where timestamp_creation is null;
ALTER TABLE Build Alter column timestamp_creation set not null;