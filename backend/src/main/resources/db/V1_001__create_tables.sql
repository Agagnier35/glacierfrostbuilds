CREATE TABLE Talents
(
    TalentId       ${id_type}      NOT NULL,
    TalentName     VARCHAR(255)    NOT NULL,
    ClassName      VARCHAR(50)     NOT NULL,
    DisplayTab     SMALLINT        NOT NULL,
    Description    VARCHAR(255)    NOT NULL,
    PRIMARY KEY (TalentId)
);

CREATE TABLE Class
(
    ClassName      VARCHAR(50)     NOT NULL,
    ParentClass    VARCHAR(50),
    PRIMARY KEY (ClassName)
);

CREATE TABLE Build (
    BuildId        ${id_type}      NOT NULL,
    BuildName      VARCHAR(255)    NOT NULL,
    Description    VARCHAR(1024)   NOT NULL,
    Author         VARCHAR(255)    NOT NULL,
    Upvotes        INTEGER         NOT NULL,
    Version        VARCHAR(50)     NOT NULL,
    PRIMARY KEY (BuildId)
);

CREATE TABLE BuildTalents (
    BuildId        INTEGER         NOT NULL,
    TalentId       INTEGER         NOT NULL,
    Points         INTEGER         NOT NULL,
    Comments       VARCHAR(1024),
    PRIMARY KEY (BuildId, TalentId)
);