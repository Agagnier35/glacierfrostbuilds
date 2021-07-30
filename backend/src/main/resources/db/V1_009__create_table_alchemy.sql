Create Table Alchemy_bubble{
    Bubble_Id         ${id_type}      NOT NULL,
    Bubble_Name       VARCHAR(1024)   NOT NULL,
    Bubble_Effect     VARCHAR(1024)   NOT NULL,
    Bubble_number     INTEGER     NOT NULL,
    Bubble_category   VARCHAR(50)     NOT NULL,
    PRIMARY KEY (Card_Id)
}

CREATE TABLE Build_bubbles(
    Build_Id        INTEGER     NOT NULL
    Bubble_Id       INTEGER     NOT NULL,
    Group_Id        VARCHAR(50)     NOT NULL,
    Bubble_Order      INTEGER     NOT NULL,
    Points      INTEGER     ,
    PRIMARY KEY (Build_Id, Bubble_Id)
);

INSERT INTO Card (Bubble_Name, Bubble_category, Bubble_number, Bubble_Effect) VALUES
("Roid Raging", "Orange", 1, "+{x} Total STR. 'Total' here means that, for example, a +10% STR bonus from something else wouldn't affect this bonus."),
("Warriors Rule", "Orange", 2, "All Orange Passive Bubbles give a {x} higher bonus, but only for your warrior-based classes."),
("Hearty Diggy", "Orange", 3, "+{x}% mining efficiency per power of 10 max HP that your character has. The perfect bonus for miners with infinite HP!"),
("Wyoming Blood", "Orange", 4, "Multi-Ore mining chance is increased by +{x}%, and your max Multi-Ore chance is 300% instead of 100%."),
("Reely Smart", "Orange", 5, "+{x}% Mining and Fishing EXP gain. Y'know what, I'll even DOUBLE that bonus for whichever skill has the lower level!"),
("Big Meaty Claws", "Orange", 6, "Increases base damage by +{x}. This bonus also increases based on how much Max HP you have above 250."),
("Sploosh Sploosh", "Orange", 7, "Multi-Fish fishing chance is increased by +{x}%, and your max Multi-Fish chance is 300% instead of 100%."),
("Stronk Tools", "Orange", 8, "The following tools give more skilling Power than normal: Pickaxes and Fishing Rods."),
("FMJ", "Orange", 9, "+{x}% more defence from Equipment. Also, +1 base Def per Class LV, up to +{x}."),
("Bappity Boppity", "Orange", 10, "+{x}% critical Damage. Badabing, badaboom! Or in Italian, Babadabinga, babadaboomahh!"),
("Brittley Spears", "Orange", 11, "+{x}% Construction EXP Gain. Also gives +{x}% Bug-Fixing speed if your username is LavaFlame2. Actually, better make that +500%..."),
("Call Me Bob", "Orange", 12, "+{x}% more defence from Equipment. Also, +1 base Def per Class LV, up to +{x}."),
("Carpenter", "Orange", 13, "+{x}% Build Speed per Construction Level."),
("Buff Boi Talent", "Orange", 14, "+{x} Talent Points for EACH tab! Yea, it's amazing right? But it's just for warriors, don't tell the other classes!!"),
("Orange Bargain", "Orange", 15, "The material costs of ALL orange bubbles are x% lower");

INSERT INTO Card (Bubble_Name, Bubble_category, Bubble_number, Bubble_Effect) VALUES
("Swift Steppin", "Green", 1, "+{x} Total AGI. Probably the lamest of the five stats... err, I mean four, hehe."),
("Archer or Bust", "Green", 2, "Green Passive Bonuses, which are the smaller sized ones, give {x} more bonuses to your archer-based characters."),
("Hammer Hammer", "Green", 3, "You can now produce +1 more items at once in the anvil, and your production speed is increased by {x}%."),
("Lil Big Damage", "Green", 4, "+{x}% Mastery. Mastery is your stat that boosts minimum damage. Just like in Maplest... err, just like how I thought it up myself!"),
("Anvilnomics", "Green", 5, "Costs for buying Anvil Production Points is reduced by {x}%. This is just like a tax cut, so remember me as a hero!"),
("Quick Slap", "Green", 6, "Increases base damage by +{x}. This bonus also increases based on how much Movement Speed you have above 110%."),
("Sanic Tools", "Green", 7, "The following tools give +{x}% skilling Power than normal: Catching Nets."),
("Bug²", "Green", 8, "Multi-Bug catching chance is increased, and your max Multi-Bug chance is 300% instead of 100%"),
("Shaquracy", "Green", 9, "Your secondary stat (WIS for warrior, STR for archer, AGI for mage) gives +{x}% more Accuracy than normal."),
("Cheap Shot", "Green", 10, "+{x}% critical Chance, as it increases the chance for your attack to hit the monster's privates, and for the monster to be male."),
("Bow Jack", "Green", 11, "+{x}% Total damage. This multiplies with other damage bonuses, but adds with the other '+{x}% Total Damage' bubbles."),
("Call Me Ash", "Green", 12, "+1 Placeable Trap, and +{x}% Trapping Efficiency."),
("Cuz I Catch Em All", "Green", 13, "{x} more likely to catch shiny critters when opening a trap."),
("Fast Boi Talent", "Green", 14, "+{x} Talent Points for EACH tab, but just for Archers! Well, and 'that' class, you know who you are!"),
("Green Bargain", "Green", 15, "The material costs of ALL green bubbles are {x}% lower");

INSERT INTO Card (Bubble_Name, Bubble_category, Bubble_number, Bubble_Effect) VALUES
("Stable Jenius", "Purple", 1, "+{x} Total WIS. Honesty the greatest bonus in any Idle Game, believe me. Absolutely incredible, everyone says so!"),
("Mage is Best", "Purple", 2, "Purple Passive Bonuses, which are the smaller sized ones, give {x} more bonuses to your mage-based characters."),
("Hocus Choppus", "Purple", 3, "+{x}% choppin efficiency per power of 10 max MP that your character has. Super diaper! Err, duper."),
("Molto Loggo", "Purple", 4, "Multi-Log chop chance is increased by +{x}%, and your max Multi-Log chance is now 300% instead of 100%."),
("Noodubble", "Purple", 5, "+{x}% Choppin' and Alchemy EXP gain. Y'know what, I'll even... actually, never mind."),
("Name I Guess", "Purple", 6, "Increases base damage by +{x}. This bonus also increases based on how much Max MP you have above 150."),
("Le Brain Tools", "Purple", 7, "The following tools give +{x}% more skilling Power than normal: Hatchets."),
("Cookin Roadkill", "Purple", 8, "Cranium Cooking lasts {x}% longer, gives {x}% more progress per kill, and has a {x}% lower cooldown. Also +{x}% increased Alchemy EXP!"),
("Brewstachio", "Purple", 9, "+{x}% Brew Speed. This a multiplicative bonus, which means its ultra powerful, all the time! Even on Mondays, the worst day!"),
("All for Kill", "Purple", 10, "Attack Talents give +{x}% higher bonuses to Offline Gains than they normally do. So you might as well just AFK forever, bye!"),
("Matty Stafford", "Purple", 11, "+{x}% Total damage. This multiplies with other damage bonuses, but adds with the other '+{x}% Total Damage' bubbles."),
("Call Me Pope", "Purple", 12, "{x} Worship Charge rate per hour. Also, {x} Max Worship Charge! You bouta go super with all that charge... just sayin'"),
("Gospel Leader", "Purple", 13, "+{x}% Max Charge per 10 Worship levels. I guess you could say this upgrade doesn't come Free of Charge!"),
("Smart Boi Talent", "Purple", 14, "Sorry, mages don't get anything because you're lame.... Ok fine, you can have +{x} Talent Points for each tab, but I'm not happy about it."),
("Purple Bargain", "Purple", 15, "The material costs of ALL purple bubbles are {x}% lower");

INSERT INTO Card (Bubble_Name, Bubble_category, Bubble_number, Bubble_Effect) VALUES
("Lotto Skills", "Yellow", 1, "+{x} LUK. Also, this will increase your chances of winning the lottery in real life from 0.0% to 0.000%! I'm not even joking, it's true!!"),
("Droppin Loads", "Yellow", 2, "+{x}% Drop Rate. Thanks to this upgrade, you can get even MORE angry when you keep not getting that rare pet drop from the boss!"),
("Startue EXP", "Yellow", 3, "Leveling up a statue resets it's exp bar down to {x}%, instead of 0%. Staturrific! Yea... the jokes are only gonna go downhill from here lol"),
("Level up Gift", "Yellow", 4, "Whenever you level up anything, {x}% chance to drop a gift! It could be an EXP balloon, a Gem for the gem shop, or something crazy weird!),
("Prowesseary", "Yellow", 5, "The Prowess Bonus for every skill is multiplied by {x}. Prowess is the Efficiency needed to get more qty per drop from resources"),
("Stamp Time", "Yellow", 6, "Increases the Max Lv of the 'Toilet Paper Postage' Talent to {x}. You can unlock this talent by typing 'More like Poopy Pete' near Pete"),
("Underdeveloped Costs", "Yellow", 7, "Reduces the material costs of all Alchemy Bubbles by {x}%. They are just bubbles though, how much could they even cost? 10 dollars?"),
("Da Daily Drip", "Yellow", 8, "Increases the Max Cap for every liquid by +{x}. This bonus also increases based on the combined Alchemy LV of all your characters!"),
("Grind Time", "Yellow", 9, "+{x}% Class EXP. The go-to active bubble for anyone who wants to reach max level faster and finally start playing the game!"),
("LAAARRRYYY", "Yellow", 10, "Every time you upgrade an Alchemy bubble, there's a {x}% chance it'll upgrade 2 times, for no extra cost! Two fer one, getter dun!"),
("Cogs For Hands", "Yellow", 11, "+{x}% Cog Production speed. Cogs are great. I really really like cogs. I guess you could say I think they're pretty Coggers..."),
("Sample It", "Yellow", 12, "+{x}% Sample Size when taking samples for the 3d printer. Finally, your statistical analysis will be accurate!"),
("Big Game Hunter", "Yellow", 13, "Each time a Giant Monster spawns, the chance for another Giant Monster in that same week goes down by {x}% less than normal."),
("Ignore Overdues", "Yellow", 14, "+{x}% Book Checkout speed, thanks to this one little bubble that librarians do NOT want you to know about!"),
("Yellow Bargain", "Yellow", 15, "The material costs of ALL yellow bubbles are {x}% lower");