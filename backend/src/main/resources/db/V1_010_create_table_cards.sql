CREATE TABLE Card(
    Card_Id         ${id_type}      NOT NULL,
    Card_Name       VARCHAR(1024)   NOT NULL,
    Card_Effect     VARCHAR(1024)   NOT NULL,
    Card_category   VARCHAR(50)     NOT NULL,
    PRIMARY KEY (Card_Id)
);

CREATE TABLE Card_category(
    Card_category   VARCHAR(50)     NOT NULL,
    Set_effect      VARCHAR(1024)   NOT NULL
    PRIMARY KEY (Card_category)
);

CREATE TABLE Build_Cards(
    Build_Id        INTEGER     NOT NULL
    Card_Id         INTEGER     NOT NULL,
    Group_Id        VARCHAR(50)     NOT NULL,
    Card_Order      INTEGER     NOT NULL,
    PRIMARY KEY (Build_Id, Card_Id)
);

INSERT INTO Card_category(Card_category, Set_effect) VALUES ("Blunder Hills", "+(8/16/24/32)XP% if Below lvl 50");
INSERT INTO Card (Card_Name, Card_Effect, Card_category) VALUES
("Green Mushroom", "+(12/24/36/48) Base HP", "Blunder Hills"),
("Red Mushroom", "+(3/6/9/12) Base LUK", "Blunder Hills"),
("Frog", "+(102/20/30/40) Base HP", "Blunder Hills"),
("Bored Bean", "+(7/14/21/28) Base Damage", "Blunder Hills"),
("Slime", "+(2/4/9/8) Base WIS", "Blunder Hills"),
("Baby Boa", "+(1/2/3/4) Move Spd", "Blunder Hills"),
("Carrotman", "+(2/4/6/8) Base AGI", "Blunder Hills"),
("Glublinm", "+(2/4/6/8)% Total HP", "Blunder Hills"),
("Wode Board", "+(2/4/6/8) Base STR", "Blunder Hills"),
("Gigafrog", "+%(5/10/15/20) Card Drop Chance", "Blunder Hills"),
("Poop", "+(10/20/30/40)% Crystal Mob Spawn Chance", "Blunder Hills"),
("Rat", "+(1/2/3/4)% Critical Chance", "Blunder Hills"),
("Walking Stick", "+(5/10/15/20) Base WIS", "Blunder Hills"),
("Nutto", "+(5/10/15/20)% Money from Monsters", "Blunder Hills"),
("Crystal Carrot", "+(5/10/15/20)% Total Drop Rate", "Blunder Hills"),
("Wood Mushroom", "+(5/10/15/20)% Total Accuracy", "Blunder Hills");

INSERT INTO Card_category(Card_category, Set_effect) VALUES ("Yum-Yum Desert", "+(10/20/30/40)% Food Effect");
INSERT INTO Card (Card_Name, Card_Effect, Card_category) VALUES
("Sandy Pot", "+(12/24/36/48)% EXP Conversion from Talent", "Yum-Yum Desert"),
("Mimic", "+(3/6/9/12)% Total Drop Rate", "Yum-Yum Desert"),
("Crabcake", "+(5/10/15/20)% To not consume Food	", "Yum-Yum Desert"),
("Mafioso", "+(5/10/15/20) Base AGI", "Yum-Yum Desert"),
("Sand Castle", "+(4/8/12/16)% Total Accuracy", "Yum-Yum Desert"),
("Pincermin", "+(1/2/3/4) Weapon Power", "Yum-Yum Desert"),
("Mashed Potato", "+(3/6/9/12)% Critical Damage", "Yum-Yum Desert"),
("Tyson", "+(5/10/15/20) Base STR", "Yum-Yum Desert"),
("Moonmoon", "+(8/16/24/32)% Monster EXP While Active", "Yum-Yum Desert"),
("Sand Giant", "+(2/4/6/8)% Minimum Damage", "Yum-Yum Desert"),
("Snelbie", "+(8/16/24/32)% Card Drop Chance", "Yum-Yum Desert"),
("Dig Doug", "+(6/12/18/24) Base LUK", "Yum-Yum Desert"),
("Crystal Crabal", "+(2/4/6/8)% EXP from monsters", "Yum-Yum Desert"),
("Bandit Bob", "+(1/2/3/4)% Money from Monsters", "Yum-Yum Desert");

INSERT INTO Card_category(Card_category, Set_effect) VALUES ("Frostbite Tundra", "+(5/10/15)% DEF and ACC");
INSERT INTO Card (Card_Name, Card_Effect, Card_category) VALUES
("Sheepie", "+(3/6/9/12)% Defence from Equipment", "Frostbite Tundra"),
("Frost Flake", "+(7/14/21/28) Base STR", "Frostbite Tundra"),
("Sir Stache", "+(8/16/24/32)% Card Drop Chance", "Frostbite Tundra"),
("Bloque", "+(7/14/21/28) Base AGI", "Frostbite Tundra"),
("Mamooth", "+(3.5/7/10.5/14)% Total HP", "Frostbite Tundra"),
("Snowman", "+(3/6/9/12)% Total Damage", "Frostbite Tundra"),
("Penguin", "+(7/14/21/28) Base WIS", "Frostbite Tundra"),
("Thermister", "+(4/8/12/16)% Critical Damage", "Frostbite Tundra"),
("Quenchie", "+(7/14/21/28) Base LUK", "Frostbite Tundra"),
("Cryosnake", "+(5/10/15/20)% MP regen rate", "Frostbite Tundra"),
("Bop Box", "+(3/6/9/12)% Total Drop Rate", "Frostbite Tundra"),
("Neyeptune", "+(5/10/15/20)% Total Accuracy", "Frostbite Tundra"),
("Xylobone", "+(1/2/3/4)% Critical Chance", "Frostbite Tundra"),
("Bloodbone", "+(3/6/9/12)+% Total Damage", "Frostbite Tundra"),
("Crystal Cattle", "+(3/6/9/12)% EXP from monsters", "Frostbite Tundra");

INSERT INTO Card_category(Card_category, Set_effect) VALUES ("Easy Resources", "+(8/16/24/32)% Skill Efficiency");
INSERT INTO Card (Card_Name, Card_Effect, Card_category) VALUES
("Copper Ore", "+(4/8/12/16) Base accuracy", "Easy Resources"),
("Iron Ore", "+(5/10/15/20)% Total Mining Efficiency", "Easy Resources"),
("Gold Ore", "+(5/10/15/20)% Mining EXP", "Easy Resources"),
("Fire Forge", "+(4/8/12/16)% Smithing EXP", "Easy Resources"),
("Oak Logs", "+(3/6/9/12) Base Defence", "Easy Resources"),
("Bleach Logs", "+(5/10/15/20)% Total Choppin Efficiency", "Easy Resources"),
("Jungle Logs", "+(5/10/15/20)% Choppin EXP", "Easy Resources"),
("Forest Fibres", "+(8/16/24/32)% EXP Conversion from Talent", "Easy Resources"),
("Goldfish", "+(3/6/9/12)% Total MP", "Easy Resources"),
("Hermit Can", "+(5/10/15/20)% Total Fishing Efficiency", "Easy Resources"),
("Jellyfish", "+(5/10/15/20)% Fishing EXP", "Easy Resources"),
("Fly", "+(4/8/12/16)% Monster EXP While Active", "Easy Resources"),
("Butterfly", "+(5/10/15/20)% Total Catching Efficiency", "Easy Resources");

INSERT INTO Card_category(Card_category, Set_effect) VALUES ("Medium Resources", "+(5/10/15/20)% Skill EXP Gain");
INSERT INTO Card (Card_Name, Card_Effect, Card_category) VALUES
("Platinum Ore", "+(2/4/6/8)% Mining Away Gains", "Medium Resources"),
("Dementia Ore", "+(4/8/12/16)% Mining Speed", "Medium Resources"),
("Void Ore", "+(6/12/18/24)% Card Drop Chance", "Medium Resources"),
("Cinder Forge", "+(7/14/21/28)% Smithing EXP", "Medium Resources"),
("Tropilogs", "+(2/4/6/8)% Choppin Away Gains", "Medium Resources"),
("Potty Rolls", "+(4/8/12/16)% Choppin Speed", "Medium Resources"),
("Veiny Logs", "+(3/6/9/12)% Total Accuracy", "Medium Resources"),
("Bloach", "+(2/4/6/8)% Fishing Away Gains", "Medium Resources"),
("Sentient Cereal", "+(5/10/15/20)% Catching EXP", "Medium Resources"),
("Fruitfly", "+(2/4/6/8)% Catching Away Gains", "Medium Resources"),
("Forest Soul", "+(3/6/9/12)% Defence from Equipment", "Medium Resources"),
("Dune Soul", "+(4/8/12/16) Starting Pts in Worship", "Medium Resources"),
("Froge", "+(3/6/9/12)% Shiny Critter Chance", "Medium Resources"),
("Crabbo", "+(5/10/15/20)% Trapping Efficiency", "Medium Resources"),
("Scorpie", "+(5/10/15/20)% Trapping EXP", "Medium Resources");

INSERT INTO Card_category(Card_category, Set_effect) VALUES ("Hard Resources", "+(4/8/12/16) Skill AFK Gain Rate");
INSERT INTO Card (Card_Name, Card_Effect, Card_category) VALUES
("Lustre Ore", "+(4/8/12/16) Base LUK", "Hard Resources"),
("Rooted Soul", "+(6/12/18/24) Starting Pts in Worship", "Hard Resources"),
("Frigid Soul", "+(7/14/21/28)% Max Charge", "Hard Resources"),
("Squiddy Soule", "+(5/10/15/20)% Charge Rate", "Hard Resources"),
("Mousey", "+(2.5/5/7.5/10)% Shiny Critter Chance", "Hard Resources"),
("Owlio", "+(1.25/2.5/3.75/5)% EXP from monsters", "Hard Resources"),
("Pingy", "+(6/12/18/24)% Shiny Critter Chance", "Hard Resources"),
("Bunny", "+(1/2/3/4)% Skill AFK gain rate", "Hard Resources"),
("Tundra Logs", "+(2.5/5/7.5/10)% Choppin Away Gains", "Hard Resources"),
("Wispy Lumber", "+(6/12/18/24)% Choppin Speed", "Hard Resources"),
("Mosquisnow", "+(7/14/21/28)% Total Catching Efficiency", "Hard Resources"),
("Flycicle", "+(2.5/5/7.5/10)% Catching Away Gains", "Hard Resources");

INSERT INTO Card_category(Card_category, Set_effect) VALUES ("Bosses and Nightmares", "+(6/12/18/24)% Dmg, Drop, and EXP");
INSERT INTO Card (Card_Name, Card_Effect, Card_category) VALUES
("Baba Yaga", "+(10/20/30/40)% Money from Monsters", "Bosses and Nightmares"),
("Dr Defecaus", "+(5/10/15/20)% Total Damage", "Bosses and Nightmares"),
("Boop", "+(1/2/3/4)% Fighting AFK gain rate", "Bosses and Nightmares"),
("Amarok", "+(2.5/5/7.5/10)% Skill AFK gain rate", "Bosses and Nightmares"),
("Chaotic Amarok", "+(2.5/5/7.5/10)% Fighting AFK gain rate", "Bosses and Nightmares"),
("Biggie Hours", "+(3/6/9/12)% Double AFK claim chance", "Bosses and Nightmares"),
("King Doot", "+(6/12/18/24)% Total Drop Rate", "Bosses and Nightmares"),
("Efaunt", "+(5/10/15/20)% EXP from monsters", "Bosses and Nightmares"),
("Chaotic Efaunt", "+(3.75/7.5/11.25/15)% Skill EXP", "Bosses and Nightmares"),
("Chizoar", "+(8/16/24/32)% Cog Build Spd (Passive)", "Bosses and Nightmares"),
("Chaotic Chizoar", "+(5/10/15/20)% Shrine Effects", "Bosses and Nightmares");

INSERT INTO Card_category(Card_category, Set_effect) VALUES ("Events", "+(5/10/15/20)% Drop Rate");
INSERT INTO Card (Card_Name, Card_Effect, Card_category) VALUES
("Ghost", "+(3/6/9/12)% Monster EXP While Active", "Events"),
("Giftmas Blobulyte", "(3/6/9/12)+% Total Drop Rate", "Events"),
("Meaning of Giftmas", "+(3/6/9/12)% Money from Monsters", "Events"),
("Valentslime", "+(3/6/9/12)% Defence from Equipment", "Events"),
("Loveulyte", "+(5/10/15/20)% Total HP", "Events"),
("Chocco Box", "+(4/8/12/16)% Boost Food Effect", "Events"),
("Floofie", "+(3/6/9/12)% MP regen rate", "Events"),
("Shell Snake", "+(3/6/9/12) Base LUK", "Events"),
("Egggulyte", "+(1/2/3/4)% Card Drop Chance", "Events"),
("Egg Capsule", "+(1/2/3/4)% Critical Damage", "Events"),
("Plasti Doug", "+(2/4/6/8) Base Defence", "Events"),
("Mr Blueberry", "+(3/6/9/12)% Total Drop Rate", "Events"),
("Coastiolyte", "+(1/2/3/4)% Fishing Away Gains", "Events"),
("Summer Spirit", "+(4/8/12/16)% Catching EXP", "Events");