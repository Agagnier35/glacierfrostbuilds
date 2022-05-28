INSERT INTO Card (Card_Name, Card_Effect, Card_category) VALUES
('Starfire Ore', '+(8/16/24/32)% Mining EXP', 'Hard Resources'),
('Squishy Soul', '+(5/10/15/20)% Charge Rate', 'Hard Resources'),
('Alien Hive', '+(8/16/24/32)% Total Choppin Efficiency', 'Hard Resources'),
('Cubed Logs', '+(7/14/21/28)% Choppin Speed', 'Hard Resources'),
('Skelefish', '+(8/16/24/32)% Total Fishing Efficiency', 'Hard Resources'),
('Sand Shark', '+(4/8/12/16)% Fishing Speed', 'Hard Resources'),
('Manta Ray', '+(10/20/30/40)% Fishing EXP', 'Hard Resources'),
('Kraken', '+(3/6/9/12)% Fishing Away Gains', 'Hard Resources'),
('Worker Bee', '+(8/16/24/32)% Total Catching Efficiency', 'Hard Resources'),
('Fairy', '+(4/8/12/16)% Catching Speed', 'Hard Resources'),
('Dung Beat', '+(7/14/21/28)% Trapping Efficiency', 'Hard Resources'),
('Honker', '+(8/16/24/32)% Trapping EXP', 'Hard Resources'),
('Blobfish', '+(8/16/24/32)% Shiny Critter Chance	', 'Hard Resources');

UPDATE Card_category SET Category_order=11 WHERE Card_category='Easy Resources';
UPDATE Card_category SET Category_order=12 WHERE Card_category='Medium Resources';
UPDATE Card_category SET Category_order=13 WHERE Card_category='Hard Resources';
UPDATE Card_category SET Category_order=22 WHERE Card_category='Bosses and Nightmares';
INSERT INTO Card_category(Card_category, Set_effect, Category_order) VALUES ('Hyperion Nebula', '+(6/12/18/24)% Crit Chance', 3);
INSERT INTO Card (Card_Name, Card_Effect, Card_category) VALUES
('Purp Mushroom', '+(8/16/24/32)% Money from Monsters', 'Hyperion Nebula'),
('TV', '+(5/10/15/20)% Breeding EXP (Passive)', 'Hyperion Nebula'),
('Donut', '+(4/8/12/16)% Defence from Equipment	', 'Hyperion Nebula'),
('Demon Genie', '+(15/30/45/60)% Crystal Mob Spawn Chance', 'Hyperion Nebula'),
('Soda Can', '+(5/10/15/20) Star Talent Pts (Passive)', 'Hyperion Nebula'),
('Flying Worm', '+(12/24/36/48) Base WIS', 'Hyperion Nebula'),
('Gelatinous Cuboid', '+(4/8/12/16)% Lab EXP gain', 'Hyperion Nebula'),
('Choccie', '+(2.5/5/7.5/10) Weapon Power', 'Hyperion Nebula'),
('Bigole Worm', '+(12/24/36/48) Base AGI', 'Hyperion Nebula'),
('Clammie', '+(1.5/3/4.5/6)% Multikill per tier', 'Hyperion Nebula'),
('Octodar', '+(12/24/36/48) Base STR', 'Hyperion Nebula'),
('Flombeige', '+(1.5/3/4.5/6)% Critical Chance (Passive)', 'Hyperion Nebula'),
('Stilted Seeker', '+(0.5/1/1.5/2)% All Stat', 'Hyperion Nebula'),
('Crystal Custard', '+(2/4/6/8)px Line Width (Passive)', 'Hyperion Nebula');

INSERT INTO Card (Card_Name, Card_Effect, Card_category) VALUES
('Radiant Amarok', '+(3/6/9/12)+ Weapon Power', 'Bosses and Nightmares'),
('Gilded Efaunt', '+(15/30/45/60) Star Talent Pts (Passive)	', 'Bosses and Nightmares'),
('Dilapidated Slush', '+(12/24/36/48)% Money from Monsters	', 'Bosses and Nightmares'),
('Blighted Chizoar', '+(1.5/3/4.5/6) All Stat', 'Bosses and Nightmares'),
('Mutated Mush', '+(6/12/18/24)% Cooking EXP gain', 'Bosses and Nightmares'),
('Troll', '+(6/12/18/24)% Kitchen Speed (Passive)', 'Bosses and Nightmares'),
('Chaotic Troll', '+(10/20/30/40)% All Skill Efficiency', 'Bosses and Nightmares');

