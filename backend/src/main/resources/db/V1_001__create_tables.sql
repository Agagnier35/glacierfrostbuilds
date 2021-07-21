CREATE TABLE Talents
(
    Talent_Id      ${id_type}      NOT NULL,
    Talent_Name    VARCHAR(255)    NOT NULL,
    Class_Name     VARCHAR(50)     NOT NULL,
    Display_Tab    SMALLINT        NOT NULL,
    Description    VARCHAR(255)    NOT NULL,
    PRIMARY KEY (Talent_Id)
);

CREATE TABLE Player_Class
(
    Class_Name      VARCHAR(50)     NOT NULL,
    Parent_Class    VARCHAR(50),
    PRIMARY KEY (Class_Name)
);

CREATE TABLE Build (
    Build_Id       ${id_type}      NOT NULL,
    Build_Name     VARCHAR(255)    NOT NULL,
    Class_Name     VARCHAR(50)    NOT NULL,
    Description    VARCHAR(1024)   NOT NULL,
    Author         VARCHAR(255)    NOT NULL,
    Upvotes        INTEGER         NOT NULL,
    Game_Version   VARCHAR(50)     NOT NULL,
    Min_Level      INTEGER,
    Max_Level      INTEGER,
    PRIMARY KEY (Build_Id)
);

CREATE TABLE Build_Talents (
    Build_Id       INTEGER         NOT NULL,
    Talent_Id      INTEGER         NOT NULL,
    Points         INTEGER         NOT NULL,
    Comments       VARCHAR(1024),
    PRIMARY KEY (Build_Id, Talent_Id)
);

CREATE TABLE Build_Tags (
    Build_Id       INTEGER         NOT NULL,
    Tag_Id         INTEGER         NOT NULL,
    PRIMARY KEY (Build_Id, Tag_Id)
);

CREATE TABLE Tags (
    Tag_Id         ${id_type}      NOT NULL,
    Tag_Name       VARCHAR(50)     NOT NULL,
    Category       VARCHAR(50)     NOT NULL,
    PRIMARY KEY (Tag_Id)
);