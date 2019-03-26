import { formSizes, formAlignments, formAbilities, formSavingThrowProficiencies, formSkills, formDamageTypes, formLanguageProficiencies, formStatistics } from './form-statistics'

export const characterForm = {
  levels: [
    [ 1  , 2 , 0      ],
    [ 2  , 2 , 300    ],
    [ 3  , 2 , 900    ],
    [ 4  , 2 , 2700   ],
    [ 5  , 3 , 6500   ],
    [ 6  , 3 , 14000  ],
    [ 7  , 3 , 23000  ],
    [ 8  , 3 , 34000  ],
    [ 9  , 4 , 48000  ],
    [ 10 , 4 , 64000  ],
    [ 11 , 4 , 85000  ],
    [ 12 , 4 , 100000 ],
    [ 13 , 5 , 120000 ],
    [ 14 , 5 , 140000 ],
    [ 15 , 5 , 165000 ],
    [ 16 , 5 , 195000 ],
    [ 17 , 6 , 225000 ],
    [ 18 , 6 , 265000 ],
    [ 19 , 6 , 305000 ],
    [ 20 , 6 , 355000 ],
  ],
  classes: [
    [ `Barbarians`,
      [
        [ `barbarian-pre`              , `(Barbarian) Pre-Primal Path`                 , null           , null           ],
        [ `barbarian-berserker`        , `(Barbarian) Path of the Berserker (PHB)`     , null           , null           ],
        [ `barbarian-totemWarrior`     , `(Barbarian) Path of the Totem Warrior (PHB)` , null           , null           ],
      ],
    ],
    [ `Bards`,
      [
        [ `bard-pre`                   , `(Bard) Pre-Bard College`                     , `charisma`     , `charisma`     ],
        [ `bard-lore`                  , `(Bard) College of Lore (PHB)`                , `charisma`     , `charisma`     ],
        [ `bard-valor`                 , `(Bard) College of Valor (PHB)`               , `charisma`     , `charisma`     ],
      ],
    ],
    [ `Clerics`,
      [
        [ `cleric-pre`                 , `(Cleric) Pre-Divine Domain`                  , `wisdom`       , `wisdom`       ],
        [ `cleric-knowledge`           , `(Cleric) Knowledge Domain (PHB)`             , `wisdom`       , `wisdom`       ],
        [ `cleric-life`                , `(Cleric) Life Domain (PHB)`                  , `wisdom`       , `wisdom`       ],
        [ `cleric-light`               , `(Cleric) Light Domain (PHB)`                 , `wisdom`       , `wisdom`       ],
        [ `cleric-nature`              , `(Cleric) Nature Domain (PHB)`                , `wisdom`       , `wisdom`       ],
        [ `cleric-tempest`             , `(Cleric) Tempest Domain (PHB)`               , `wisdom`       , `wisdom`       ],
        [ `cleric-trickery`            , `(Cleric) Trickery Domain (PHB)`              , `wisdom`       , `wisdom`       ],
        [ `cleric-war`                 , `(Cleric) War Domain (PHB)`                   , `wisdom`       , `wisdom`       ],
      ],
    ],
    [ `Druids`,
      [
        [ `druid-pre`                  , `(Druid) Pre-Druid Circle`                    , `wisdom`       , `wisdom`       ],
        [ `druid-land`                 , `(Druid) Circle of the Land (PHB)`            , `wisdom`       , `wisdom`       ],
        [ `druid-moon`                 , `(Druid) Circle of the Moon (PHB)`            , `wisdom`       , `wisdom`       ],
      ],
    ],
    [ `Fighters`,
      [
        [ `fighter-pre`                , `(Fighter) Pre-Martial Archetype`             , null           , null           ],
        [ `fighter-champion`           , `(Fighter) Champion Archetype (PHB)`          , null           , null           ],
        [ `fighter-battleMaster`       , `(Fighter) Battle Master Archetype (PHB)`     , null           , null           ],
        [ `fighter-eldritchKnight`     , `(Fighter) Eldritch Knight Archetype (PHB)`   , null           , null           ],
      ],
    ],
    [ `Monks`,
      [
        [ `monk-pre`                   , `(Monk) Pre-Monastic Tradition`               , `wisdom`       , null           ],
        [ `monk-openHand`              , `(Monk) Way of the Open Hand (PHB)`           , `wisdom`       , null           ],
        [ `monk-shadow`                , `(Monk) Way of the Shadow (PHB)`              , `wisdom`       , null           ],
        [ `monk-fourElements`          , `(Monk) Way of the Four Elements (PHB)`       , `wisdom`       , null           ],
      ],
    ],
    [ `Paladins`,
      [
        [ `paladin-pre`                , `(Paladin) Pre-Sacred Oath`                   , `charisma`     , `charisma`     ],
        [ `paladin-devotion`           , `(Paladin) Oath of Devotion (PHB)`            , `charisma`     , `charisma`     ],
        [ `paladin-ancients`           , `(Paladin) Oath of Ancients (PHB)`            , `charisma`     , `charisma`     ],
        [ `paladin-vengence`           , `(Paladin) Oath of Vengence (PHB)`            , `charisma`     , `charisma`     ],
      ],
    ],
    [ `Rangers`,
      [
        [ `ranger-pre`                 , `(Ranger) Pre-Ranger Archetype`               , `wisdom`       , `wisdom`       ],
        [ `ranger-hunter`              , `(Ranger) Hunter (PHB)`                       , `wisdom`       , `wisdom`       ],
        [ `ranger-beastMaster`         , `(Ranger) Beast Master (PHB)`                 , `wisdom`       , `wisdom`       ],
      ],
    ],
    [ `Rogues`,
      [
        [ `rogue-pre`                  , `(Rogue) Pre-Roguish Archetype`               , null           , null           ],
        [ `rogue-thief`                , `(Rogue) Thief (PHB)`                         , null           , null           ],
        [ `rogue-assassin`             , `(Rogue) Assassin (PHB)`                      , null           , null           ],
        [ `rogue-arcaneTrickster`      , `(Rogue) Arcane Trickster (PHB)`              , null           , null           ],
      ],
    ],
    [ `Sorcerers`,
      [
        [ `sorcerer-pre`               , `(Sorcerer) Pre-Sorcerous Origin`             , `charisma`     , `charisma`     ],
        [ `sorcerer-draconicBloodline` , `(Sorcerer) Draconic Bloodline (PHB)`         , `charisma`     , `charisma`     ],
        [ `sorcerer-wildMagic`         , `(Sorcerer) Wild Magic (PHB)`                 , `charisma`     , `charisma`     ],
      ],
    ],
    [ `Warlocks`,
      [
        [ `warlock-pre`                , `(Warlock) Pre-Otherworldly Patron`           , `charisma`     , `charisma`     ],
        [ `warlock-archfey`            , `(Warlock) The Archfey (PHB)`                 , `charisma`     , `charisma`     ],
        [ `warlock-fiend`              , `(Warlock) The Fiend (PHB)`                   , `charisma`     , `charisma`     ],
        [ `warlock-greatOldOne`        , `(Warlock) The Great Old One (PHB)`           , `charisma`     , `charisma`     ],
      ],
    ],
    [ `Wizards`,
      [
        [ `wizard-pre`                 , `(Wizard) Pre-Arcane Tradition`               , `intelligence` , `intelligence` ],
        [ `wizard-abjuration`          , `(Wizard) School of Abjuration (PHB)`         , `intelligence` , `intelligence` ],
        [ `wizard-conjuration`         , `(Wizard) School of Conjuration (PHB)`        , `intelligence` , `intelligence` ],
        [ `wizard-divination`          , `(Wizard) School of Divination (PHB)`         , `intelligence` , `intelligence` ],
        [ `wizard-enchantment`         , `(Wizard) School of Enchantment (PHB)`        , `intelligence` , `intelligence` ],
        [ `wizard-evocation`           , `(Wizard) School of Evocation (PHB)`          , `intelligence` , `intelligence` ],
        [ `wizard-illusion`            , `(Wizard) School of Illusion (PHB)`           , `intelligence` , `intelligence` ],
        [ `wizard-necromancy`          , `(Wizard) School of Necromancy (PHB)`         , `intelligence` , `intelligence` ],
        [ `wizard-transmutation`       , `(Wizard) School of Transmutation (PHB)`      , `intelligence` , `intelligence` ],
      ],
    ],
  ],
  /*
  classes: [
    [ `barbarian-pre`              , `Barbarian - Pre-Primal Path`                 , null           , null           ],
    [ `barbarian-berserker`        , `Barbarian - Path of the Berserker (PHB)`     , null           , null           ],
    [ `barbarian-totemWarrior`     , `Barbarian - Path of the Totem Warrior (PHB)` , null           , null           ],
    [ `bard-pre`                   , `Bard - Pre-Bard College`                     , `charisma`     , `charisma`     ],
    [ `bard-lore`                  , `Bard - College of Lore (PHB)`                , `charisma`     , `charisma`     ],
    [ `bard-valor`                 , `Bard - College of Valor (PHB)`               , `charisma`     , `charisma`     ],
    [ `cleric-pre`                 , `Cleric - Pre-Divine Domain`                  , `wisdom`       , `wisdom`       ],
    [ `cleric-knowledge`           , `Cleric - Knowledge Domain (PHB)`             , `wisdom`       , `wisdom`       ],
    [ `cleric-life`                , `Cleric - Life Domain (PHB)`                  , `wisdom`       , `wisdom`       ],
    [ `cleric-light`               , `Cleric - Light Domain (PHB)`                 , `wisdom`       , `wisdom`       ],
    [ `cleric-nature`              , `Cleric - Nature Domain (PHB)`                , `wisdom`       , `wisdom`       ],
    [ `cleric-tempest`             , `Cleric - Tempest Domain (PHB)`               , `wisdom`       , `wisdom`       ],
    [ `cleric-trickery`            , `Cleric - Trickery Domain (PHB)`              , `wisdom`       , `wisdom`       ],
    [ `cleric-war`                 , `Cleric - War Domain (PHB)`                   , `wisdom`       , `wisdom`       ],
    [ `druid-pre`                  , `Druid - Pre-Druid Circle`                    , `wisdom`       , `wisdom`       ],
    [ `druid-land`                 , `Druid - Circle of the Land (PHB)`            , `wisdom`       , `wisdom`       ],
    [ `druid-moon`                 , `Druid - Circle of the Moon (PHB)`            , `wisdom`       , `wisdom`       ],
    [ `fighter-pre`                , `Fighter - Pre-Martial Archetype`             , null           , null           ],
    [ `fighter-champion`           , `Fighter - Champion Archetype (PHB)`          , null           , null           ],
    [ `fighter-battleMaster`       , `Fighter - Battle Master Archetype (PHB)`     , null           , null           ],
    [ `fighter-eldritchKnight`     , `Fighter - Eldritch Knight Archetype (PHB)`   , null           , null           ],
    [ `monk-pre`                   , `Monk - Pre-Monastic Tradition`               , `wisdom`       , null           ],
    [ `monk-openHand`              , `Monk - Way of the Open Hand (PHB)`           , `wisdom`       , null           ],
    [ `monk-shadow`                , `Monk - Way of the Shadow (PHB)`              , `wisdom`       , null           ],
    [ `monk-fourElements`          , `Monk - Way of the Four Elements (PHB)`       , `wisdom`       , null           ],
    [ `paladin-pre`                , `Paladin - Pre-Sacred Oath`                   , `charisma`     , `charisma`     ],
    [ `paladin-devotion`           , `Paladin - Oath of Devotion (PHB)`            , `charisma`     , `charisma`     ],
    [ `paladin-ancients`           , `Paladin - Oath of Ancients (PHB)`            , `charisma`     , `charisma`     ],
    [ `paladin-vengence`           , `Paladin - Oath of Vengence (PHB)`            , `charisma`     , `charisma`     ],
    [ `ranger-pre`                 , `Ranger - Pre-Ranger Archetype`               , `wisdom`       , `wisdom`       ],
    [ `ranger-hunter`              , `Ranger - Hunter (PHB)`                       , `wisdom`       , `wisdom`       ],
    [ `ranger-beastMaster`         , `Ranger - Beast Master (PHB)`                 , `wisdom`       , `wisdom`       ],
    [ `rogue-pre`                  , `Rogue - Pre-Roguish Archetype`               , null           , null           ],
    [ `rogue-thief`                , `Rogue - Thief (PHB)`                         , null           , null           ],
    [ `rogue-assassin`             , `Rogue - Assassin (PHB)`                      , null           , null           ],
    [ `rogue-arcaneTrickster`      , `Rogue - Arcane Trickster (PHB)`              , null           , null           ],
    [ `sorcerer-pre`               , `Sorcerer - Pre-Sorcerous Origin`             , `charisma`     , `charisma`     ],
    [ `sorcerer-draconicBloodline` , `Sorcerer - Draconic Bloodline (PHB)`         , `charisma`     , `charisma`     ],
    [ `sorcerer-wildMagic`         , `Sorcerer - Wild Magic (PHB)`                 , `charisma`     , `charisma`     ],
    [ `warlock-pre`                , `Warlock - Pre-Otherworldly Patron`           , `charisma`     , `charisma`     ],
    [ `warlock-archfey`            , `Warlock - The Archfey (PHB)`                 , `charisma`     , `charisma`     ],
    [ `warlock-fiend`              , `Warlock - The Fiend (PHB)`                   , `charisma`     , `charisma`     ],
    [ `warlock-greatOldOne`        , `Warlock - The Great Old One (PHB)`           , `charisma`     , `charisma`     ],
    [ `wizard-pre`                 , `Wizard - Pre-Arcane Tradition`               , `intelligence` , `intelligence` ],
    [ `wizard-abjuration`          , `Wizard - School of Abjuration (PHB)`         , `intelligence` , `intelligence` ],
    [ `wizard-conjuration`         , `Wizard - School of Conjuration (PHB)`        , `intelligence` , `intelligence` ],
    [ `wizard-divination`          , `Wizard - School of Divination (PHB)`         , `intelligence` , `intelligence` ],
    [ `wizard-enchantment`         , `Wizard - School of Enchantment (PHB)`        , `intelligence` , `intelligence` ],
    [ `wizard-evocation`           , `Wizard - School of Evocation (PHB)`          , `intelligence` , `intelligence` ],
    [ `wizard-illusion`            , `Wizard - School of Illusion (PHB)`           , `intelligence` , `intelligence` ],
    [ `wizard-necromancy`          , `Wizard - School of Necromancy (PHB)`         , `intelligence` , `intelligence` ],
    [ `wizard-transmutation`       , `Wizard - School of Transmutation (PHB)`      , `intelligence` , `intelligence` ],
  ],
  */
  races: [
    [ `Dwarves`,
      [
        `Hill Dwarf`,
        `Mountain Dwarf`,
        `Duergar`,
      ],
    ],
    [ `Elves`,
      [
        `High Elf`,
        `Wood Elf`,
        `Drow`,
      ],
    ],
    [ `Halflings`,
      [
        `Lightfoot Halfling`,
        `Stout Halfling`,
      ],
    ],
    [ `Humans`,
      [
        `Calishite Human`,
        `Chondathan Human`,
        `Damaran Human`,
        `Illuskan Human`,
        `Mulan Human`,
        `Rashemi Human`,
        `Shou Human`,
        `Tethyrian Human`,
        `Turami Human`,
      ],
    ],
    [ `Dragonborns`,
      [
        `Black Dragonborn`,
        `Blue Dragonborn`,
        `Brass Dragonborn`,
        `Bronze Dragonborn`,
        `Copper Dragonborn`,
        `Gold Dragonborn`,
        `Green Dragonborn`,
        `Red Dragonborn`,
        `Silver Dragonborn`,
        `White Dragonborn`,
      ],
    ],
    [ `Gnomes`,
      [
        `Forest Gnome`,
        `Rock Gnome`,
      ],
    ],
    [ `Half-Elves`,
      [
        `Half-Elf`,
      ],
    ],
    [ `Half-Orcs`,
      [
        `Half-Orc`,
      ],
    ],
    [ `Tieflings`,
      [
        `Tiefling`,
      ],
    ],
  ],
  sizes:                    [ ...(formSizes.filter((value) => [`Small`, `Medium`].includes(value))) ],
  alignments:               [ ...formAlignments ],
  abilities:                [ ...formAbilities ],
  savingThrowProficiencies: [ ...formSavingThrowProficiencies ],
  skills:                   [ ...formSkills ],
  damageTypes:              [ ...formDamageTypes ],
  weaponProficiencies: [
    [ `Simple Melee Weapons`,
      [
        [ `club`          , `Club`           ],
        [ `dagger`        , `Dagger`         ],
        [ `greatclub`     , `Greatclub`      ],
        [ `handaxe`       , `Handaxe`        ],
        [ `javelin`       , `Javelin`        ],
        [ `lightHammer`   , `Light Hammer`   ],
        [ `mace`          , `Mace`           ],
        [ `quarterstaff`  , `Quarterstaff`   ],
        [ `sickle`        , `Sickle`         ],
        [ `spear`         , `Spear`          ],
      ],
    ],
    [ `Simple Ranged Weapons`,
      [
        [ `lightCrossbow` , `Light Crossbow` ],
        [ `dart`          , `Dart`           ],
        [ `shortbow`      , `Shortbow`       ],
        [ `sling`         , `Sling`          ],
      ],
    ],
    [ `Martial Melee Weapons`,
      [
        [ `battleaxe`     , `Battleaxe`      ],
        [ `flail`         , `Flail`          ],
        [ `glaive`        , `Glaive`         ],
        [ `greataxe`      , `Greataxe`       ],
        [ `greatsword`    , `Greatsword`     ],
        [ `halberd`       , `Halberd`        ],
        [ `lance`         , `Lance`          ],
        [ `longsword`     , `Longsword`      ],
        [ `maul`          , `Maul`           ],
        [ `morningstar`   , `Morningstar`    ],
        [ `pike`          , `Pike`           ],
        [ `rapier`        , `Rapier`         ],
        [ `scimitar`      , `Scimitar`       ],
        [ `shortsword`    , `Shortsword`     ],
        [ `trident`       , `Trident`        ],
        [ `warPick`       , `War Pick`       ],
        [ `warhammer`     , `Warhammer`      ],
        [ `whip`          , `Whip`           ],
      ],
    ],
    [ `Martial Ranged Weapons`,
      [
        [ `blowgun`       , `Blowgun`        ],
        [ `handCrossbow`  , `Hand Crossbow`  ],
        [ `heavyCrossbow` , `Heavy Crossbow` ],
        [ `longbow`       , `Longbow`        ],
        [ `net`           , `Net`            ],
      ],
    ],
  ],
  armorProficiencies: [
    [ `Light Armor`,
      [
        [ `padded`         , `Padded`          ],
        [ `leather`        , `Leather`         ],
        [ `studdedLeather` , `Studded leather` ],
      ],
    ],
    [ `Medium Armor`,
      [
        [ `hide`           , `Hide`            ],
        [ `chainShirt`     , `Chain shirt`     ],
        [ `scaleMail`      , `Scale mail`      ],
        [ `breastplate`    , `Breastplate`     ],
        [ `halfPlate`      , `Half plate`      ],
      ],
    ],
    [ `Heavy Armor`,
      [
        [ `ringMail`       , `Ring mail`       ],
        [ `chainMail`      , `Chain mail`      ],
        [ `splint`         , `Splint`          ],
        [ `plate`          , `Plate`           ],
      ],
    ],
    [ `Shield`,
      [
        [ `shield`         , `Shield`          ],
      ],
    ],
  ],
  toolProficiencies: [
    [ `Artisan's Tools`,
      [
        [ `alchemistSupplies`    , `Alchemist's Supplies`    ],
        [ `brewerSupplies`       , `Brewer's Supplies`       ],
        [ `calligrapherSupplies` , `Calligrapher's Supplies` ],
        [ `carpenterTools`       , `Carpenter's Tools`       ],
        [ `cartographerTools`    , `Cartographer's Tools`    ],
        [ `cobblerTools`         , `Cobbler's Tools`         ],
        [ `cookUtensils`         , `Cook's Utensils`         ],
        [ `glassblowerTools`     , `Glassblower's Tools`     ],
        [ `jewelerTools`         , `Jeweler's Tools`         ],
        [ `leatherworkerTools`   , `Leatherworker's Tools`   ],
        [ `masonTools`           , `Mason's Tools`           ],
        [ `painterSupplies`      , `Painter's Supplies`      ],
        [ `potterTools`          , `Potter's Tools`          ],
        [ `smithTools`           , `Smith's Tools`           ],
        [ `tinkerTools`          , `Tinker's Tools`          ],
        [ `weaverTools`          , `Weaver's Tools`          ],
        [ `woodcarverTools`      , `Woodcarver's Tools`      ],
      ],
    ],
    [ `Gaming Set`,
      [
        [ `diceSet`              , `Dice Set`                ],
        [ `dragonchessSet`       , `Dragonchess Set`         ],
        [ `playingCardSet`       , `Playing Card Set`        ],
        [ `threeDragonAnteSet`   , `Three-Dragon Ante Set`   ],
      ],
    ],
    [ `Musical instrument`,
      [
        [ `bagpipes`             , `Bagpipes`                ],
        [ `drum`                 , `Drum`                    ],
        [ `dulcimer`             , `Dulcimer`                ],
        [ `flute`                , `Flute`                   ],
        [ `lute`                 , `Lute`                    ],
        [ `lyre`                 , `Lyre`                    ],
        [ `horn`                 , `Horn`                    ],
        [ `panFlute`             , `Pan Flute`               ],
        [ `shawm`                , `Shawm`                   ],
        [ `viol`                 , `Viol`                    ],
      ],
    ],
    [ `Disguise Kit`,
      [
        [ `disguiseKit`          , `Disguise Kit`            ],
      ],
    ],
    [ `Forgery Kit`,
      [
        [ `forgeryKit`           , `Forgery Kit`             ],
      ],
    ],
    [ `Herbalism Kit`,
      [
        [ `herbalismKit`         , `Herbalism Kit`           ],
      ],
    ],
    [ `Navigator's Tools`,
      [
        [ `navigatorTools`       , `Navigator's Tools`       ],
      ],
    ],
    [ `Poisoner's Kit`,
      [
        [ `poisonerKit`          , `Poisoner's Kit`          ],
      ],
    ],
    [ `Thieves' Tools`,
      [
        [ `thievesTools`         , `Thieves' Tools`          ],
      ],
    ],
    [ `Vehicles (Land or Water)`,
      [
        [ `camel`                , `(Land) Camel`            ],
        [ `donkeyMule`           , `(Land) Donkey / Mule`    ],
        [ `elephant`             , `(Land) Elephant`         ],
        [ `draftHorse`           , `(Land) Draft Horse`      ],
        [ `ridingHorse`          , `(Land) Riding Horse`     ],
        [ `mastiff`              , `(Land) Mastiff`          ],
        [ `pony`                 , `(Land) Pony`             ],
        [ `warhorse`             , `(Land) Warhorse`         ],
        [ `carriage`             , `(Land) Carriage`         ],
        [ `cart`                 , `(Land) Cart`             ],
        [ `chariot`              , `(Land) Chariot`          ],
        [ `sled`                 , `(Land) Sled`             ],
        [ `wagon`                , `(Land) Wagon`            ],
        [ `galley`               , `(Water) Galley`          ],
        [ `keelboat`             , `(Water) Keelboat`        ],
        [ `longship`             , `(Water) Longship`        ],
        [ `rowboat`              , `(Water) Rowboat`         ],
        [ `sailingShip`          , `(Water) Sailing Ship`    ],
        [ `warship`              , `(Water) Warship`         ],
      ],
    ],
  ],
  languageProficiencies: [ ...formLanguageProficiencies ],
  itemSamples: [
      `::title-start::\n`
    + `Sample Item\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `Item Description\n`
    + `::description-end::\n`
    + `\n`,

      `::title-start::\n`
    + `<itemTypes.lightArmor> Sample Selectable Armor Item (Padded Light Armor)\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `AC: Dexterity Modifier + 11\n`
    + `Weight: 8lb\n`
    + `\n`
    + `Disadvantage on Stealth\n`
    + `::description-end::\n`
    + `\n`

    + `::property-start::\n`
    + `<acTypes.lightArmor> [+dexterityModifier] [+11]\n`
    + `::property-end::\n`
    + `\n`,

      `::title-start::\n`
    + `<itemTypes.mediumArmor> Sample Selectable Armor Item (Chain Shirt Armor)\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `AC: Dexterity Modifier (Max to 2) + 13\n`
    + `Weight: 20lb\n`
    + `::description-end::\n`
    + `\n`

    + `::property-start::\n`
    + `<acTypes.mediumArmor> [+dexterityModifier] [+13]\n`
    + `::property-end::\n`
    + `\n`,

      `::title-start::\n`
    + `<itemTypes.shield> Sample Selectable Shield Item (Arrow-Catching Shield)\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `Requires Attunement\n`
    + `\n`
    + `AC: +2, with bonus of +2 vs Ranged Attacks\n`
    + `Weight: 6lb\n`
    + `\n`
    + `Whenever an attacker makes a ranged attack against a target within 5ft of you, you can use your reaction to become the target of the attack instead.\n`
    + `::description-end::\n`
    + `\n`

    + `::property-start::\n`
    + `<attunement>\n`
    + `<acTypes.shield> [+2]\n`
    + `<acTypes.vsRangedBonus> [+2]\n`
    + `::property-end::\n`
    + `\n`,

      `::title-start::\n`
    + `<itemTypes.shield> Sample Selectable Shield Item (Shield +2)\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `AC: +2, with +2 bonus AC\n`
    + `Weight: 6lb\n`
    + `::description-end::\n`
    + `\n`

    + `::property-start::\n`
    + `<acTypes.shield> [+4]\n`
    + `::property-end::\n`
    + `\n`,

      `::title-start::\n`
    + `<itemTypes.ring> Sample Selectable Ring Item (Ring of the Ram)\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `Requires Attunement\n`
    + `\n`
    + `This ring has 3 charges, and regains 1d3 expended charges daily at dawn.\n`
    + `\n`
    + `While attuned to this ring, you can expend 1 to 3 charges to attack one creature that you can see and is within 60ft. Make an attack roll with +7 bonus to hit and each charge spent causes 2d10 force damage and pushes the target 5ft away from you.\n`
    + `\n`
    + `You can also expend 1 to 3 charges as an action to try to break an object you can see and is within 60 feet that isn't being worn or carried. Make a Strength check with a +5 bonus for each charge you spend.\n`
    + `::description-end::\n`
    + `\n`

    + `::property-start::\n`
    + `<attunement>\n`
    + `<charges> [3]\n`
    + `<recharge> [+1d3]\n`
    + `::property-end::\n`
    + `\n`,

      `::title-start::\n`
    + `<itemTypes.ring> Sample Selectable Ring Item (Ring of Three Wishes)\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `This ring has 3 charges, and becomes nonmagical when you use the last charge.\n`
    + `\n`
    + `While wearing to this ring, you can expend 1 to 3 charges to cast a wish spell.\n`
    + `::description-end::\n`
    + `\n`

    + `::property-start::\n`
    + `<charges> [3]\n`
    + `::property-end::\n`
    + `\n`,
  ],
  actionSamples: [
      `::title-start::\n`
    + `Sample Action\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `Action Description\n`
    + `::description-end::\n`
    + `\n`,

      `::title-start::\n`
    + `Sample Item's Roll-to-Hit Spell Interactive Action (Ring of the Ram)\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `Requires Attunement\n`
    + `\n`
    + `This ring has 3 charges, and regains 1d3 expended charges daily at dawn.\n`
    + `\n`
    + `While attuned to this ring, you can expend 1 to 3 charges to attack one creature that you can see and is within 60ft. Make an attack roll with +7 bonus to hit and each charge spent causes 2d10 force damage and pushes the target 5ft away from you.\n`
    + `\n`
    + `You can also expend 1 to 3 charges as an action to try to break an object you can see and is within 60 feet that isn't being worn or carried. Make a Strength check with a +5 bonus for each charge you spend.\n`
    + `::description-end::\n`
    + `\n`

    + `::hit-start::\n`
    + `[+1d20] [+7]\n`
    + `::hit-end::\n`
    + `\n`

    + `::damage-start::\n`
    + `<attackTypes.rangedSpells>\n`
    + `<damageTypes.force> [+2d10]\n`
    + `::damage-end::\n`
    + `\n`,

      `::title-start::\n`
    + `Sample Roll-to-Hit Ranged Interactive Action (Fire Bolt)\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `Cantrip: Evocation\n`
    + `Casting Time: 1 action\n`
    + `Range: 120 ft\n`
    + `Components: V, S\n`
    + `Duration: Instantaneous\n`
    + `\n`
    + `You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target.\n`
    + `\n`
    + `On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried.\n`
    + `\n`
    + `This spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).`
    + `::description-end::\n`
    + `\n`

    + `::hit-start::\n`
    + `[+1d20] [+spellAttackModifier]\n`
    + `::hit-end::\n`
    + `\n`

    + `::damage-start::\n`
    + `<attackTypes.rangedSpells>\n`
    + `<damageTypes.fire> [+1d10]\n`
    + `::damage-end::\n`
    + `\n`,

      `::title-start::\n`
    + `Sample vs. Saving Throw Interactive Action (Blade Barrier)\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `6th-level: Evocation\n`
    + `Casting Time: 1 action\n`
    + `Range: 90 ft\n`
    + `Components: V, S\n`
    + `Duration: Concentration, up to 10 minutes\n`
    + `\n`
    + `You create a vertical wall of whirling, razor-sharp blades made of magical energy. The wall appears within range and lasts for the duration.\n`
    + `\n`
    + `You can make a straight wall up to 100 feet long, 20 feet high, and 5 feet thick, or a ringed wall up to 60 feet in diameter, 20 feet high, and 5 feet thick.\n`
    + `\n`
    + `The wall provides three-quarters cover to creatures behind it, and its space is difficult terrain. When a creature enters the wall's area for the first time on a turn or starts its turn there, the creature must make a Dexterity saving throw.\n`
    + `\n`
    + `On a failed save, the creature takes 6d1O slashing damage. On a successful save, the creature takes half as much damage.\n`
    + `::description-end::\n`
    + `\n`

    + `::hit-start::\n`
    + `<vsSavingThrowDexterity> [+spellSaveDC]\n`
    + `::hit-end::\n`
    + `\n`

    + `::damage-start::\n`
    + `<attackTypes.rangedSpells>\n`
    + `<damageTypes.slashing> [+6d1O]\n`
    + `::damage-end::\n`
    + `\n`,
  ],
  statistics: [ ...formStatistics ],
  dependants: [
    (data, form) => [
      `proficiencyBonus`,
      (form.levels.filter((value) => value[0] === data.level)[0][1])
    ],

    (data, form) => [
      `xpNextLevel`,
      (form.levels.filter((value) => value[2] > data.xp).length)
        ? form.levels.filter((value) => value[2] > data.xp)[0][2] - data.xp
        : 0
    ],

    (data, form) => [
      `strengthModifier`,
      (Math.floor((data.strengthScore - 10) / 2))
    ],

    (data, form) => [
      `dexterityModifier`,
      (Math.floor((data.dexterityScore - 10) / 2))
    ],

    (data, form) => [
      `constitutionModifier`,
      (Math.floor((data.constitutionScore - 10) / 2))
    ],

    (data, form) => [
      `intelligenceModifier`,
      (Math.floor((data.intelligenceScore - 10) / 2))
    ],

    (data, form) => [
      `wisdomModifier`,
      (Math.floor((data.wisdomScore - 10) / 2))
    ],

    (data, form) => [
      `charismaModifier`,
      (Math.floor((data.charismaScore - 10) / 2))
    ],

    (data, form) => [
      `passivePerception`,
      (data.wisdomModifier + 10)
    ],

    (data, form) => [
      `initiativeBonus`,
      data.dexterityModifier
    ],

    (data, form) => [
      `acValue`,
      [[data.equippedArmor, `equipmentArmorList`], [data.equippedShield, `equipmentShieldList`]]
        .map((value) => [
          data[value[1]]
            .map((value) => value[1])
            .reduce((acc, value) => {
              acc = [...acc, ...value]

              return acc
            }, [])
            .map((value) => value[0])
            .indexOf(value[0]),
          data[value[1]]
            .map((value) => value[1])
            .reduce((acc, value) => {
              acc = [...acc, ...value]

              return acc
            }, [])
            .map((value) => value[1])
        ])
        .map((value) =>
          (value[0] === -1)
            ? 0
            : value[1][value[0]]
        )
        .reduce((acc, value, index, array) => {
          if (Number.isInteger(array[0]) && Number.isInteger(array[1])) {
            acc = data.dexterityModifier
          }
          else if (!Number.isInteger(value)) {
            value = value.acTypes
              .map((value) => {
                if (value[0].includes(`shield`)) {
                  value =
                    parseInt(
                      value[1]
                        .split(`[+`)[1]
                        .split(`]`)[0]
                    )
                }
                else if (value[0].includes(`lightArmor`)) {
                  value =
                    data.dexterityModifier
                    + parseInt(
                        value[1]
                          .split(`[+dexterityModifier]`)
                          .join(``)
                          .split(` `)
                          .join(``)
                          .split(`[+`)[1]
                          .split(`]`)[0]
                      )
                }
                else if (value[0].includes(`mediumArmor`)) {
                  value =
                    (
                      (data.dexterityModifier > 2)
                        ? 2
                        : data.dexterityModifier
                    )
                    + parseInt(
                        value[1]
                          .split(`[+dexterityModifier]`)
                          .join(``)
                          .split(` `)
                          .join(``)
                          .split(`[+`)[1]
                          .split(`]`)[0]
                      )
                }
                else if (value[0].includes(`heavyArmor`)) {
                  value =
                    parseInt(
                      value[1]
                        .split(`[+dexterityModifier]`)
                        .join(``)
                        .split(` `)
                        .join(``)
                        .split(`[+`)[1]
                        .split(`]`)[0]
                    )
                }
                else {
                  value = 0
                }

                return value
              })

            acc += (value[0] || 0)
          }

          return acc
        }, 0)
    ],

    (data, form) => [
      `acValueMelee`,
      [[data.equippedArmor, `equipmentArmorList`], [data.equippedShield, `equipmentShieldList`]]
        .map((value) => [
          data[value[1]]
            .map((value) => value[1])
            .reduce((acc, value) => {
              acc = [...acc, ...value]

              return acc
            }, [])
            .map((value) => value[0])
            .indexOf(value[0]),
          data[value[1]]
            .map((value) => value[1])
            .reduce((acc, value) => {
              acc = [...acc, ...value]

              return acc
            }, [])
            .map((value) => value[1])
        ])
        .map((value) =>
          (value[0] === -1)
            ? 0
            : value[1][value[0]]
        )
        .reduce((acc, value, index, array) => {
          if (Number.isInteger(array[0]) && Number.isInteger(array[1])) {
            acc = 0
          }
          else if (!Number.isInteger(value)) {
            value = value.acTypes
              .map((value) => {
                if (value[0].includes(`vsMeleeBonus`)) {
                  value =
                    parseInt(
                      value[1]
                        .split(`[+`)[1]
                        .split(`]`)[0]
                    )
                }
                else {
                  value = 0
                }

                return value
              })
              .reduce((acc, value) => {
                acc += value

                return acc
              }, 0)

            acc += value

          }

          if (acc === data.acValue && index === 1) {
            acc = 0
          }

          return acc
        }, data.acValue)
    ],

    (data, form) => [
      `acValueRanged`,
      [[data.equippedArmor, `equipmentArmorList`], [data.equippedShield, `equipmentShieldList`]]
        .map((value) => [
          data[value[1]]
            .map((value) => value[1])
            .reduce((acc, value) => {
              acc = [...acc, ...value]

              return acc
            }, [])
            .map((value) => value[0])
            .indexOf(value[0]),
          data[value[1]]
            .map((value) => value[1])
            .reduce((acc, value) => {
              acc = [...acc, ...value]

              return acc
            }, [])
            .map((value) => value[1])
        ])
        .map((value) =>
          (value[0] === -1)
            ? 0
            : value[1][value[0]]
        )
        .reduce((acc, value, index, array) => {
          if (Number.isInteger(array[0]) && Number.isInteger(array[1])) {
            acc = 0
          }
          else if (!Number.isInteger(value)) {
            value = value.acTypes
              .map((value) => {
                if (value[0].includes(`vsRangedBonus`)) {
                  value =
                    parseInt(
                      value[1]
                        .split(`[+`)[1]
                        .split(`]`)[0]
                    )
                }
                else {
                  value = 0
                }

                return value
              })
              .reduce((acc, value) => {
                acc += value

                return acc
              }, 0)

            acc += value

          }

          if (acc === data.acValue && index === 1) {
            acc = 0
          }

          return acc
        }, data.acValue)
    ],

    (data, form) => [
      `acValueSpells`,
      [[data.equippedArmor, `equipmentArmorList`], [data.equippedShield, `equipmentShieldList`]]
        .map((value) => [
          data[value[1]]
            .map((value) => value[1])
            .reduce((acc, value) => {
              acc = [...acc, ...value]

              return acc
            }, [])
            .map((value) => value[0])
            .indexOf(value[0]),
          data[value[1]]
            .map((value) => value[1])
            .reduce((acc, value) => {
              acc = [...acc, ...value]

              return acc
            }, [])
            .map((value) => value[1])
        ])
        .map((value) =>
          (value[0] === -1)
            ? 0
            : value[1][value[0]]
        )
        .reduce((acc, value, index, array) => {
          if (Number.isInteger(array[0]) && Number.isInteger(array[1])) {
            acc = 0
          }
          else if (!Number.isInteger(value)) {
            value = value.acTypes
              .map((value) => {
                if (value[0].includes(`vsSpellBonus`)) {
                  value =
                    parseInt(
                      value[1]
                        .split(`[+`)[1]
                        .split(`]`)[0]
                    )
                }
                else {
                  value = 0
                }

                return value
              })
              .reduce((acc, value) => {
                acc += value

                return acc
              }, 0)

            acc += value

          }

          if (acc === data.acValue && index === 1) {
            acc = 0
          }

          return acc
        }, data.acValue)
    ],

    // (data, form) => [
    //   `hpCurr`,
    //   (data.hpCurr === null)
    //     ? data.hpMax
    //     : data.hpCurr
    // ],

    (data, form) => [
      `savingThrowStrengthBonus`,
      (data.savingThrowList.includes(`savingThrowStrengthProficiency`))
        ? (data.strengthModifier + data.proficiencyBonus)
        : data.strengthModifier
    ],

    (data, form) => [
      `savingThrowDexterityBonus`,
      (data.savingThrowList.includes(`savingThrowDexterityProficiency`))
        ? (data.dexterityModifier + data.proficiencyBonus)
        : data.dexterityModifier
    ],

    (data, form) => [
      `savingThrowConstitutionBonus`,
      (data.savingThrowList.includes(`savingThrowConstitutionProficiency`))
        ? (data.constitutionModifier + data.proficiencyBonus)
        : data.constitutionModifier
    ],

    (data, form) => [
      `savingThrowIntelligenceBonus`,
      (data.savingThrowList.includes(`savingThrowIntelligenceProficiency`))
        ? (data.intelligenceModifier + data.proficiencyBonus)
        : data.intelligenceModifier
    ],

    (data, form) => [
      `savingThrowWisdomBonus`,
      (data.savingThrowList.includes(`savingThrowWisdomProficiency`))
        ? (data.wisdomModifier + data.proficiencyBonus)
        : data.wisdomModifier
    ],

    (data, form) => [
      `savingThrowCharismaBonus`,
      (data.savingThrowList.includes(`savingThrowCharismaProficiency`))
        ? (data.charismaModifier + data.proficiencyBonus)
        : data.charismaModifier
    ],

    (data, form) => [
      `spellSaveDC`,
      (data.class.length)
        ? (form.classes
            .map((value) => value[1])
            .reduce((acc, value) => [ ...acc, ...value ], [])
            [form.classes
              .map((value) => value[1])
              .reduce((acc, value) => [ ...acc, ...value ], [])
              .map((value) => value[0])
              .indexOf(data.class)
            ][2] !== null)
          ? (8 + data.proficiencyBonus + data[`${form.classes
              .map((value) => value[1])
              .reduce((acc, value) => [ ...acc, ...value ], [])
              [form.classes
                .map((value) => value[1])
                .reduce((acc, value) => [ ...acc, ...value ], [])
                .map((value) => value[0])
                .indexOf(data.class)
              ][2]}Modifier`
            ])
          : 0
        : 0
    ],

    (data, form) => [
      `spellAttackModifier`,
      (data.class.length)
        ? (form.classes
            .map((value) => value[1])
            .reduce((acc, value) => [ ...acc, ...value ], [])
            [form.classes
              .map((value) => value[1])
              .reduce((acc, value) => [ ...acc, ...value ], [])
              .map((value) => value[0])
              .indexOf(data.class)
            ][3] !== null)
          ? (data.proficiencyBonus + data[`${form.classes
              .map((value) => value[1])
              .reduce((acc, value) => [ ...acc, ...value ], [])
              [form.classes
                .map((value) => value[1])
                .reduce((acc, value) => [ ...acc, ...value ], [])
                .map((value) => value[0])
                .indexOf(data.class)
              ][3]}Modifier`
            ])
          : 0
        : 0
    ],

    (data, form) => [
      `skillAthleticsModifier`,
      (data.skillList.includes(`skillAthleticsNone`))
        ? data.strengthModifier
        : (data.skillList.includes(`skillAthleticsSkilled`))
          ? (data.strengthModifier + data.proficiencyBonus)
          : (data.strengthModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillAcrobaticsModifier`,
      (data.skillList.includes(`skillAcrobaticsNone`))
        ? data.dexterityModifier
        : (data.skillList.includes(`skillAcrobaticsSkilled`))
          ? (data.dexterityModifier + data.proficiencyBonus)
          : (data.dexterityModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillSleightOfHandModifier`,
      (data.skillList.includes(`skillSleightOfHandNone`))
        ? data.dexterityModifier
        : (data.skillList.includes(`skillSleightOfHandSkilled`))
          ? (data.dexterityModifier + data.proficiencyBonus)
          : (data.dexterityModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillStealthModifier`,
      (data.skillList.includes(`skillStealthNone`))
        ? data.dexterityModifier
        : (data.skillList.includes(`skillStealthSkilled`))
          ? (data.dexterityModifier + data.proficiencyBonus)
          : (data.dexterityModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillArcanaModifier`,
      (data.skillList.includes(`skillArcanaNone`))
        ? data.intelligenceModifier
        : (data.skillList.includes(`skillArcanaSkilled`))
          ? (data.intelligenceModifier + data.proficiencyBonus)
          : (data.intelligenceModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillHistoryModifier`,
      (data.skillList.includes(`skillHistoryNone`))
        ? data.intelligenceModifier
        : (data.skillList.includes(`skillHistorySkilled`))
          ? (data.intelligenceModifier + data.proficiencyBonus)
          : (data.intelligenceModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillInvestigationModifier`,
      (data.skillList.includes(`skillInvestigationNone`))
        ? data.intelligenceModifier
        : (data.skillList.includes(`skillInvestigationSkilled`))
          ? (data.intelligenceModifier + data.proficiencyBonus)
          : (data.intelligenceModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillNatureModifier`,
      (data.skillList.includes(`skillNatureNone`))
        ? data.intelligenceModifier
        : (data.skillList.includes(`skillNatureSkilled`))
          ? (data.intelligenceModifier + data.proficiencyBonus)
          : (data.intelligenceModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillReligionModifier`,
      (data.skillList.includes(`skillReligionNone`))
        ? data.intelligenceModifier
        : (data.skillList.includes(`skillReligionSkilled`))
          ? (data.intelligenceModifier + data.proficiencyBonus)
          : (data.intelligenceModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillAnimalHandlingModifier`,
      (data.skillList.includes(`skillAnimalHandlingNone`))
        ? data.wisdomModifier
        : (data.skillList.includes(`skillAnimalHandlingSkilled`))
          ? (data.wisdomModifier + data.proficiencyBonus)
          : (data.wisdomModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillInsightModifier`,
      (data.skillList.includes(`skillInsightNone`))
        ? data.wisdomModifier
        : (data.skillList.includes(`skillInsightSkilled`))
          ? (data.wisdomModifier + data.proficiencyBonus)
          : (data.wisdomModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillMedicineModifier`,
      (data.skillList.includes(`skillMedicineNone`))
        ? data.wisdomModifier
        : (data.skillList.includes(`skillMedicineSkilled`))
          ? (data.wisdomModifier + data.proficiencyBonus)
          : (data.wisdomModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillPerceptionModifier`,
      (data.skillList.includes(`skillPerceptionNone`))
        ? data.wisdomModifier
        : (data.skillList.includes(`skillPerceptionSkilled`))
          ? (data.wisdomModifier + data.proficiencyBonus)
          : (data.wisdomModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillSurvivalModifier`,
      (data.skillList.includes(`skillSurvivalNone`))
        ? data.wisdomModifier
        : (data.skillList.includes(`skillSurvivalSkilled`))
          ? (data.wisdomModifier + data.proficiencyBonus)
          : (data.wisdomModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillDeceptionModifier`,
      (data.skillList.includes(`skillDeceptionNone`))
        ? data.charismaModifier
        : (data.skillList.includes(`skillDeceptionSkilled`))
          ? (data.charismaModifier + data.proficiencyBonus)
          : (data.charismaModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillIntimidationModifier`,
      (data.skillList.includes(`skillIntimidationNone`))
        ? data.charismaModifier
        : (data.skillList.includes(`skillIntimidationSkilled`))
          ? (data.charismaModifier + data.proficiencyBonus)
          : (data.charismaModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillPerformanceModifier`,
      (data.skillList.includes(`skillPerformanceNone`))
        ? data.charismaModifier
        : (data.skillList.includes(`skillPerformanceSkilled`))
          ? (data.charismaModifier + data.proficiencyBonus)
          : (data.charismaModifier + (data.proficiencyBonus * 2))
    ],

    (data, form) => [
      `skillPersuasionModifier`,
      (data.skillList.includes(`skillPersuasionNone`))
        ? data.charismaModifier
        : (data.skillList.includes(`skillPersuasionSkilled`))
          ? (data.charismaModifier + data.proficiencyBonus)
          : (data.charismaModifier + (data.proficiencyBonus * 2))
    ],
  ],
  sortItems: [
    (data, form) => [
      `equipmentWeaponList`,
      data.itemList
        .reduce((acc, value) => {
          if (   (value.search(/<itemTypes\.(?:(?:meleeOne|meleeTwo|rangedOne|rangedTwo)HandedWeapon|staff|wand|rod)>/g) !== -1)
              && (value.search(/::title-start::/g) !== -1)
              && (value.search(/::title-end::/g) !== -1)
              && (value.search(/::description-start::/g) !== -1)
              && (value.search(/::description-end::/g) !== -1)
              && (value.search(/::property-start::/g) !== -1)
              && (value.search(/::property-end::/g) !== -1)
              && (value.search(/<attackTypes\.(meleeNonMagicalWeapon|meleeMagicalWeapons|meleeSpells|rangedNonMagicalWeapon|rangedMagicalWeapons|rangedSpells)>/g) !== -1)
            ) {
            acc.push([value, value, value])
          }

          return acc
        }, [])
        // Output:
        //   [STRING, STRING, STRING]
        .map((value) => [
          value[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`::title-start::`)[1]
            .split(`::title-end::`)[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`\n`)[0]
            .split(`<`)[1]
            .split(`> `),
          value[1]
            .replace(/^\n+|\n+$/g, ``)
            .split(`::description-start::`)[1]
            .split(`::description-end::`)[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`\n`)
            .join(`<br />`),
          value[2]
            .replace(/^\n+|\n+$/g, ``)
            .split(`::property-start::`)[1]
            .split(`::property-end::`)[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`\n`)
            .reduce((acc, value) => {
              if (value.length) {
                acc.push(value)
              }

              return acc
            }, [])
            .map((value) => 
              value
                .replace(/(>$)/g, match => `${match} `)
                .split(`<`)[1]
                .split(`> `)
            )
        ])
        // Output:
        //   [
        //     [ `itemTypes.meleeOneHandedWeapon` , `Shortsword` ],
        //     `DESCRIPTION<br />STRING`,
        //     [
        //       [ `attackTypes.meleeNonMagicalWeapon` , ``       ],
        //       [ `damageTypes.piercing`              , `[+1d6]` ],
        //     ],
        //   ]
        .reduce((acc, value) => {
          const handedness = value[0][0].split(`.`)
          
          handedness[0] = handedness[0]
            .replace(/itemTypes/g, match => `handedness`)
          
          handedness[1] = handedness[1]
            .replace(/(melee|ranged|Weapon)/g, match => ``)
            .replace(/(One|Two)/g, match => match.toLowerCase())

          value[2].unshift(handedness)
          acc.push(value)

          return acc
        }, [])
        // Output:
        //   [
        //     [ `itemTypes.meleeOneHandedWeapon` , `Shortsword` ],
        //     `DESCRIPTION<br />STRING`,
        //     [
        //       [ `handedness`                        , `oneHanded` ],
        //       [ `attackTypes.meleeNonMagicalWeapon` , ``          ],
        //       [ `damageTypes.piercing`              , `[+1d6]`    ],
        //     ],
        //   ]
        .map((value) => [
          [
            value[0][0]
              .split(`itemTypes.`)[1]
              .replace(/(^[a-z])/g, match => match.toUpperCase())
              .replace(/(Handed)/g, match => `-${match}`)
              .replace(/((One|Two|Weapon))/g, match => ` ${match}`)
              .split(` `)
              .reduce((acc, value) => {
                acc = (value.search(/(One-Handed|Two-Handed)/g) !== -1)
                  ? `${value} ${acc}`
                  : `${acc} ${value}`

                return acc
              }, ``)
              .concat(`s`),
            value[0][1]
              .trimStart()
              .trimEnd()
          ],
          value[1],
          value[2]
            .map((value) => [ ...(value[0].split(`.`)), value[1] ])
            .reduce((acc, value) => {
              if (value.length === 2) {
                value[1] = value[1].length ? value[1] : true
              }

              if (acc.hasOwnProperty(value[0])) {
                acc[value[0]].push([value[1], value[2]])
              }
              else if (value.length === 2) {
                acc[value[0]] = value[1]
              }
              else {
                acc[value[0]] = [[value[1], value[2]]]
              }

              return acc
            }, {})
        ])
        // Output:
        //   [
        //     [ `One Handed Melee Weapons` , `Shortsword` ],
        //     `DESCRIPTION<br />STRING`,
        //     {
        //       handedness: `oneHanded`,
        //       attackTypes: `meleeNonMagicalWeapon`,
        //       damageTypes: [
        //         [ `piercing` , `[+1d6]` ],
        //       ],
        //     },
        //   ]
        .reduce((acc, value) => {
          value[2][`description`] = value[1]
          value.splice(1, 1)

          acc.push(value)
          return acc
        }, [])
        // Output:
        //   [
        //     [ `One Handed Melee Weapons` , `Shortsword` ],
        //     {
        //       handedness: `oneHanded`,
        //       attackTypes: `meleeNonMagicalWeapon`,
        //       damageTypes: [
        //         [ `piercing` , `[+1d6]` ],
        //       ],
        //       description: `DESCRIPTION<br />STRING`,
        //     },
        //   ]
        .reduce((acc, value) => {
          const index = acc
            .map((value) => value[0])
            .indexOf(value[0][0])

          if (index > -1) {
            acc[index][1].push([value[0][1], value[1]])
          }
          else {
            acc.push([value[0][0], [[value[0][1], value[1]]]])
          }

          return acc
        }, [])
        // Output:
        //   [ `One Handed Melee Weapons`,
        //     [
        //       [
        //         `Shortsword`,
        //         {
        //           handedness: `oneHanded`,
        //           attackTypes: `meleeNonMagicalWeapon`,
        //           damageTypes: [
        //             [ `piercing` , `[+1d6]` ],
        //           ],
        //         },
        //       ],
        //     ],
        //   ]
    ],

    (data, form) => [
      `equipmentArmorList`,
      data.itemList
        .reduce((acc, value) => {
          if (   (value.search(/<itemTypes\.(lightArmor|mediumArmor|heavyArmor)>/g) !== -1)
              && (value.search(/::title-start::/g) !== -1)
              && (value.search(/::title-end::/g) !== -1)
              && (value.search(/::description-start::/g) !== -1)
              && (value.search(/::description-end::/g) !== -1)
              && (value.search(/::property-start::/g) !== -1)
              && (value.search(/::property-end::/g) !== -1)
              && (value.search(/<acTypes\.(lightArmor|mediumArmor|heavyArmor)>/g) !== -1)
            ) {
            acc.push([value, value, value])
          }

          return acc
        }, [])
        // Output:
        //   [STRING, STRING, STRING]
        .map((value) => [
          value[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`::title-start::`)[1]
            .split(`::title-end::`)[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`\n`)[0]
            .split(`<`)[1]
            .split(`> `),
          value[1]
            .replace(/^\n+|\n+$/g, ``)
            .split(`::description-start::`)[1]
            .split(`::description-end::`)[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`\n`)
            .join(`<br />`),
          value[2]
            .replace(/^\n+|\n+$/g, ``)
            .split(`::property-start::`)[1]
            .split(`::property-end::`)[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`\n`)
            .reduce((acc, value) => {
              if (value.length) {
                acc.push(value)
              }

              return acc
            }, [])
            .map((value) => 
              value
                .replace(/(>$)/g, match => `${match} `)
                .split(`<`)[1]
                .split(`> `)
            )
        ])
        // Output:
        //   [
        //     [ `itemTypes.lightArmor` , `Leather Armor` ],
        //     `DESCRIPTION<br />STRING`,
        //     [
        //       [ `acTypes.lightArmor` , `[+dexterityModifier] [+11]` ],
        //     ],
        //   ]
        .map((value) => [
          [
            value[0][0]
              .split(`itemTypes.`)[1]
              .replace(/(^[a-z])/g, match => match.toUpperCase())
              .replace(/((Armor))/g, match => ` ${match}`)
              .concat(`s`),
            value[0][1]
              .trimStart()
              .trimEnd()
          ],
          value[1],
          value[2]
            .map((value) => [ ...(value[0].split(`.`)), value[1] ])
            .reduce((acc, value) => {
              if (value.length === 2) {
                value[1] = value[1].length ? value[1] : true
              }

              if (acc.hasOwnProperty(value[0])) {
                acc[value[0]].push([value[1], value[2]])
              }
              else if (value.length === 2) {
                acc[value[0]] = value[1]
              }
              else {
                acc[value[0]] = [[value[1], value[2]]]
              }

              return acc
            }, {})
        ])
        // Output:
        //   [
        //     [ `Light Armors` , `Leather Armor` ],
        //     `DESCRIPTION<br />STRING`,
        //     {
        //       acTypes: [
        //         [ `lightArmor` , `[+dexterityModifier] [+11]` ],
        //       ],
        //     },
        //   ]
        .reduce((acc, value) => {
          value[2][`description`] = value[1]
          value.splice(1, 1)

          acc.push(value)
          return acc
        }, [])
        // Output:
        //   [
        //     [ `Light Armors` , `Leather Armor` ],
        //     {
        //       acTypes: [
        //         [ `lightArmor` , `[+dexterityModifier] [+11]` ],
        //       ],
        //       description: `DESCRIPTION<br />STRING`,
        //     },
        //   ]
        .reduce((acc, value) => {
          const index = acc
            .map((value) => value[0])
            .indexOf(value[0][0])

          if (index > -1) {
            acc[index][1].push([value[0][1], value[1]])
          }
          else {
            acc.push([value[0][0], [[value[0][1], value[1]]]])
          }

          return acc
        }, [])
        // Output:
        //   [ `Light Armors`,
        //     [
        //       [
        //         `Leather Armor`,
        //         {
        //           acTypes: [
        //             [ `lightArmor` , `[+dexterityModifier] [+11]` ],
        //           ],
        //         },
        //       ],
        //     ],
        //   ]
    ],

    (data, form) => [
      `equipmentShieldList`,
      data.itemList
        .reduce((acc, value) => {
          if (   (value.search(/<itemTypes\.shield>/g) !== -1)
              && (value.search(/::title-start::/g) !== -1)
              && (value.search(/::title-end::/g) !== -1)
              && (value.search(/::description-start::/g) !== -1)
              && (value.search(/::description-end::/g) !== -1)
              && (value.search(/::property-start::/g) !== -1)
              && (value.search(/::property-end::/g) !== -1)
            ) {
            acc.push([value, value, value])
          }

          return acc
        }, [])
        // Output:
        //   [STRING, STRING, STRING]
        .map((value) => [
          value[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`::title-start::`)[1]
            .split(`::title-end::`)[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`\n`)[0]
            .split(`<`)[1]
            .split(`> `),
          value[1]
            .replace(/^\n+|\n+$/g, ``)
            .split(`::description-start::`)[1]
            .split(`::description-end::`)[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`\n`)
            .join(`<br />`),
          value[2]
            .replace(/^\n+|\n+$/g, ``)
            .split(`::property-start::`)[1]
            .split(`::property-end::`)[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`\n`)
            .reduce((acc, value) => {
              if (value.length) {
                acc.push(value)
              }

              return acc
            }, [])
            .map((value) => 
              value
                .replace(/(>$)/g, match => `${match} `)
                .split(`<`)[1]
                .split(`> `)
            )
        ])
        // Output:
        //   [
        //     [ `itemTypes.shield` , `Arrow-Catching Shield` ],
        //     `DESCRIPTION<br />STRING`,
        //     [
        //       [ `attunement`            , ``     ],
        //       [ `acTypes.shield`        , `[+2]` ],
        //       [ `acTypes.vsRangedBonus` , `[+2]` ],
        //     ],
        //   ]
        .map((value) => [
          [
            value[0][0]
              .split(`itemTypes.`)[1]
              .replace(/(^[a-z])/g, match => match.toUpperCase())
              .concat(`s`),
            value[0][1]
              .trimStart()
              .trimEnd()
          ],
          value[1],
          value[2]
            .map((value) => [ ...(value[0].split(`.`)), value[1] ])
            .reduce((acc, value) => {
              if (value.length === 2) {
                value[1] = value[1].length ? value[1] : true
              }

              if (acc.hasOwnProperty(value[0])) {
                acc[value[0]].push([value[1], value[2]])
              }
              else if (value.length === 2) {
                acc[value[0]] = value[1]
              }
              else {
                acc[value[0]] = [[value[1], value[2]]]
              }

              return acc
            }, {})
        ])
        // Output:
        //   [
        //     [ `Shields` , `Arrow-Catching Shield` ],
        //     `DESCRIPTION<br />STRING`,
        //     {
        //       attunement: true,
        //       acTypes: [
        //         [ `shield`        , `[+2]` ],
        //         [ `vsRangedBonus` , `[+2]` ],
        //       ],
        //     },
        //   ]
        .reduce((acc, value) => {
          value[2][`description`] = value[1]
          value.splice(1, 1)

          acc.push(value)
          return acc
        }, [])
        // Output:
        //   [
        //     [ `Shields` , `Arrow-Catching Shield` ],
        //     {
        //       attunement: true,
        //       acTypes: [
        //         [ `shield`        , `[+2]` ],
        //         [ `vsRangedBonus` , `[+2]` ],
        //       ],
        //       description: `DESCRIPTION<br />STRING`,
        //     },
        //   ]
        .reduce((acc, value) => {
          const index = acc
            .map((value) => value[0])
            .indexOf(value[0][0])

          if (index > -1) {
            acc[index][1].push([value[0][1], value[1]])
          }
          else {
            acc.push([value[0][0], [[value[0][1], value[1]]]])
          }

          return acc
        }, [])
        // Output:
        //   [ `Shields`,
        //     [
        //       [
        //         `Arrow-Catching Shield`,
        //         {
        //           attunement: true,
        //           acTypes: [
        //             [ `shield`        , `[+2]` ],
        //             [ `vsRangedBonus` , `[+2]` ],
        //           ],
        //         },
        //       ],
        //     ],
        //   ]
    ],

    (data, form) => [
      `equipmentAccessoryList`,
      data.itemList
        .reduce((acc, value) => {
          if (   (value.search(/<itemTypes\.ring>/g) !== -1)
              && (value.search(/::title-start::/g) !== -1)
              && (value.search(/::title-end::/g) !== -1)
              && (value.search(/::description-start::/g) !== -1)
              && (value.search(/::description-end::/g) !== -1)
              && (value.search(/::property-start::/g) !== -1)
              && (value.search(/::property-end::/g) !== -1)
            ) {
            acc.push([value, value, value])
          }

          return acc
        }, [])
        // Output:
        //   [STRING, STRING, STRING]
        .map((value) => [
          value[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`::title-start::`)[1]
            .split(`::title-end::`)[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`\n`)[0]
            .split(`<`)[1]
            .split(`> `),
          value[1]
            .replace(/^\n+|\n+$/g, ``)
            .split(`::description-start::`)[1]
            .split(`::description-end::`)[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`\n`)
            .join(`<br />`),
          value[2]
            .replace(/^\n+|\n+$/g, ``)
            .split(`::property-start::`)[1]
            .split(`::property-end::`)[0]
            .replace(/^\n+|\n+$/g, ``)
            .split(`\n`)
            .reduce((acc, value) => {
              if (value.length) {
                acc.push(value)
              }

              return acc
            }, [])
            .map((value) => 
              value
                .replace(/(>$)/g, match => `${match} `)
                .split(`<`)[1]
                .split(`> `)
            )
        ])
        // Output:
        //   [
        //     [ `itemTypes.ring` , `Ring of the Ram` ],
        //     `DESCRIPTION<br />STRING`,
        //     [
        //       [ `attunement` , ``       ],
        //       [ `charges`    , `[3]`    ],
        //       [ `recharge`   , `[+1d3]` ],
        //     ],
        //   ]
        .map((value) => [
          [
            value[0][0]
              .split(`itemTypes.`)[1]
              .replace(/(^[a-z])/g, match => match.toUpperCase())
              .concat(`s`),
            value[0][1]
              .trimStart()
              .trimEnd()
          ],
          value[1],
          value[2]
            .map((value) => [ ...(value[0].split(`.`)), value[1] ])
            .reduce((acc, value) => {
              if (value.length === 2) {
                value[1] = value[1].length ? value[1] : true
              }

              if (acc.hasOwnProperty(value[0])) {
                acc[value[0]].push([value[1], value[2]])
              }
              else if (value.length === 2) {
                acc[value[0]] = value[1]
              }
              else {
                acc[value[0]] = [[value[1], value[2]]]
              }

              return acc
            }, {})
        ])
        // Output:
        //   [
        //     [ `Rings` , `Ring of the Ram` ],
        //     `DESCRIPTION<br />STRING`,
        //     {
        //       attunement: true,
        //       charges: `[3]`,
        //       recharge: `[+1d3]`,
        //     },
        //   ]
        .reduce((acc, value) => {
          value[2][`description`] = value[1]
          value.splice(1, 1)

          acc.push(value)
          return acc
        }, [])
        // Output:
        //   [
        //     [ `Rings` , `Ring of the Ram` ],
        //     {
        //       attunement: true,
        //       charges: `[3]`,
        //       recharge: `[+1d3]`,
        //       description: `DESCRIPTION<br />STRING`,
        //     },
        //   ]
        .reduce((acc, value) => {
          const index = acc
            .map((value) => value[0])
            .indexOf(value[0][0])

          if (index > -1) {
            acc[index][1].push([value[0][1], value[1]])
          }
          else {
            acc.push([value[0][0], [[value[0][1], value[1]]]])
          }

          return acc
        }, [])
        // Output:
        //   [ `Rings`,
        //     [
        //       [
        //         `Ring of the Ram`,
        //         {
        //           attunement: true,
        //           charges: `[3]`,
        //           recharge: `[+1d3]`,
        //         },
        //       ],
        //     ],
        //   ]
    ],
  ],
}

export const characterDefault = {
  id: null,
  owner: ``,
  name: `Character Name`,
  image: ``,
  level: 1,
  proficiencyBonus: 0,
  xp: 0,
  xpNextLevel: 0,
  class: `barbarian-pre`,
  race: `Hill Dwarf`,
  size: `Small`,
  alignment: `Unaligned`,
  characterInfo: ``
    + `Religion: ...\n`
    + `\n`

    + `Gender: ...\n`
    + `Age: ...\n`
    + `\n`

    + `Height: ...\n`
    + `Weight: ...\n`
    + `Eyes: ...\n`
    + `Hair: ...\n`
    + `\n`

    + `Background: ...\n`
    + `\n`

    + `Personality Traits: ...\n`
    + `\n`

    + `Ideals: ...\n`
    + `\n`

    + `Flaws: ...\n`
    + `\n`

    + `Bonds: ...\n`
    + `\n`
  + ``,
  strengthScore: 8,
  dexterityScore: 8,
  constitutionScore: 8,
  intelligenceScore: 8,
  wisdomScore: 8,
  charismaScore: 8,
  strengthModifier: 0,
  dexterityModifier: 0,
  constitutionModifier: 0,
  intelligenceModifier: 0,
  wisdomModifier: 0,
  charismaModifier: 0,
  passivePerception: 0,
  initiativeBonus: 0,
  // statusEffect: [],
  savingThrowList: [],
  savingThrowStrengthBonus: 0,
  savingThrowDexterityBonus: 0,
  savingThrowConstitutionBonus: 0,
  savingThrowIntelligenceBonus: 0,
  savingThrowWisdomBonus: 0,
  savingThrowCharismaBonus: 0,
  spellSaveDC: 0,
  spellAttackModifier: 0,
  skillList: [
    `skillAthleticsNone`,
    `skillAcrobaticsNone`,
    `skillSleightOfHandNone`,
    `skillStealthNone`,
    `skillArcanaNone`,
    `skillHistoryNone`,
    `skillInvestigationNone`,
    `skillNatureNone`,
    `skillReligionNone`,
    `skillAnimalHandlingNone`,
    `skillInsightNone`,
    `skillMedicineNone`,
    `skillPerceptionNone`,
    `skillSurvivalNone`,
    `skillDeceptionNone`,
    `skillIntimidationNone`,
    `skillPerformanceNone`,
    `skillPersuasionNone`,
  ],
  skillAthleticsModifier: 0,
  skillAcrobaticsModifier: 0,
  skillSleightOfHandModifier: 0,
  skillStealthModifier: 0,
  skillArcanaModifier: 0,
  skillHistoryModifier: 0,
  skillInvestigationModifier: 0,
  skillNatureModifier: 0,
  skillReligionModifier: 0,
  skillAnimalHandlingModifier: 0,
  skillInsightModifier: 0,
  skillMedicineModifier: 0,
  skillPerceptionModifier: 0,
  skillSurvivalModifier: 0,
  skillDeceptionModifier: 0,
  skillIntimidationModifier: 0,
  skillPerformanceModifier: 0,
  skillPersuasionModifier: 0,
  weaponProficiencyList: [],
  armorProficiencyList: [],
  toolProficiencyList: [],
  languageProficiencyList: [],
  itemList: [],
  equipmentWeaponList: [],
  equipmentArmorList: [],
  equipmentShieldList: [],
  equipmentAccessoryList: [],
  equippedWeaponList: [],
  equippedArmor: ``,
  equippedShield: ``,
  equippedAccessoryList: [],
  acValue: 1,
  acValueMelee: 0,
  acValueRanged: 0,
  acValueSpells: 0,
  hpMax: 1,
  // hpCurr: null,
  // savingThrowDeathSuccess: null,
  // savingThrowDeathFailure: null,
  speed: 0,
  coinCopper: 0,
  coinSilver: 0,
  coinElectrum: 0,
  coinGold: 0,
  coinPlatinum: 0,
  actionList: [],
  notes: ``,
}

export const characterBooleanKeys = []

export const characterArrayKeys = [
  `statusEffect`,
  `savingThrowList`,
  `skillList`,
  `weaponProficiencyList`,
  `armorProficiencyList`,
  `toolProficiencyList`,
  `languageProficiencyList`,
  `itemList`,
  `equipmentWeaponList`,
  `equipmentArmorList`,
  `equipmentShieldList`,
  `equipmentAccessoryList`,
  `equippedWeaponList`,
  `equippedAccessoryList`,
  `actionList`,
]

export const characterJSONKeys = [
  [`itemList`, `string`],
  [`actionList`, `string`],
]

export const characterNumberKeys = [
  `id`,
  `proficiencyBonus`,
  `xp`,
  `xpNextLevel`,
  `strengthModifier`,
  `dexterityModifier`,
  `constitutionModifier`,
  `intelligenceModifier`,
  `wisdomModifier`,
  `charismaModifier`,
  `passivePerception`,
  `initiativeBonus`,
  `savingThrowStrengthBonus`,
  `savingThrowDexterityBonus`,
  `savingThrowConstitutionBonus`,
  `savingThrowIntelligenceBonus`,
  `savingThrowWisdomBonus`,
  `savingThrowCharismaBonus`,
  `spellSaveDC`,
  `spellAttackModifier`,
  `skillAthleticsModifier`,
  `skillAcrobaticsModifier`,
  `skillSleightOfHandModifier`,
  `skillStealthModifier`,
  `skillArcanaModifier`,
  `skillHistoryModifier`,
  `skillInvestigationModifier`,
  `skillNatureModifier`,
  `skillReligionModifier`,
  `skillAnimalHandlingModifier`,
  `skillInsightModifier`,
  `skillMedicineModifier`,
  `skillPerceptionModifier`,
  `skillSurvivalModifier`,
  `skillDeceptionModifier`,
  `skillIntimidationModifier`,
  `skillPerformanceModifier`,
  `skillPersuasionModifier`,
  `acValueMelee`,
  `acValueRanged`,
  `acValueSpells`,
  `speed`,
  `coinCopper`,
  `coinSilver`,
  `coinElectrum`,
  `coinGold`,
  `coinPlatinum`,
  `level`,
  `acValue`,
  `hpMax`,
  `strengthScore`,
  `dexterityScore`,
  `constitutionScore`,
  `intelligenceScore`,
  `wisdomScore`,
  `charismaScore`,
]
