export const formSizes = [
  `Tiny`,
  `Small`,
  `Medium`,
  `Large`,
  `Huge`,
  `Gargantuan`,
]

export const formAlignments = [
  `Unaligned`,
  `Lawful Good`,
  `Neutral Good`,
  `Chaotic Good`,
  `Lawful Neutral`,
  `True Neutral`,
  `Chaotic Neutral`,
  `Lawful Evil`,
  `Neutral Evil`,
  `Chaotic Evil`,
]

export const formAbilities = [
  [ `strengthScore`     , `strength`     , `strengthModifier`     ],
  [ `dexterityScore`    , `dexterity`    , `dexterityModifier`    ],
  [ `constitutionScore` , `constitution` , `constitutionModifier` ],
  [ `intelligenceScore` , `intelligence` , `intelligenceModifier` ],
  [ `wisdomScore`       , `wisdom`       , `wisdomModifier`       ],
  [ `charismaScore`     , `charisma`     , `charismaModifier`     ],
]

export const formSavingThrowProficiencies = [
  [ `savingThrowStrengthProficiency`     , `savingThrowStrengthBonus`     , `strength`     ],
  [ `savingThrowDexterityProficiency`    , `savingThrowDexterityBonus`    , `dexterity`    ],
  [ `savingThrowConstitutionProficiency` , `savingThrowConstitutionBonus` , `constitution` ],
  [ `savingThrowIntelligenceProficiency` , `savingThrowIntelligenceBonus` , `intelligence` ],
  [ `savingThrowWisdomProficiency`       , `savingThrowWisdomBonus`       , `wisdom`       ],
  [ `savingThrowCharismaProficiency`     , `savingThrowCharismaBonus`     , `charisma`     ],
]

export const formSkills = [
  [ `skillAthletics`      , `Athletics`       , `skillAthleticsModifier`      , `strength`     ],
  [ `skillAcrobatics`     , `Acrobatics`      , `skillAcrobaticsModifier`     , `dexterity`    ],
  [ `skillSleightOfHand`  , `Sleight of Hand` , `skillSleightOfHandModifier`  , `dexterity`    ],
  [ `skillStealth`        , `Stealth`         , `skillStealthModifier`        , `dexterity`    ],
  [ `skillArcana`         , `Arcana`          , `skillArcanaModifier`         , `intelligence` ],
  [ `skillHistory`        , `History`         , `skillHistoryModifier`        , `intelligence` ],
  [ `skillInvestigation`  , `Investigation`   , `skillInvestigationModifier`  , `intelligence` ],
  [ `skillNature`         , `Nature`          , `skillNatureModifier`         , `intelligence` ],
  [ `skillReligion`       , `Religion`        , `skillReligionModifier`       , `intelligence` ],
  [ `skillAnimalHandling` , `Animal Handling` , `skillAnimalHandlingModifier` , `wisdom`       ],
  [ `skillInsight`        , `Insight`         , `skillInsightModifier`        , `wisdom`       ],
  [ `skillMedicine`       , `Medicine`        , `skillMedicineModifier`       , `wisdom`       ],
  [ `skillPerception`     , `Perception`      , `skillPerceptionModifier`     , `wisdom`       ],
  [ `skillSurvival`       , `Survival`        , `skillSurvivalModifier`       , `wisdom`       ],
  [ `skillDeception`      , `Deception`       , `skillDeceptionModifier`      , `charisma`     ],
  [ `skillIntimidation`   , `Intimidation`    , `skillIntimidationModifier`   , `charisma`     ],
  [ `skillPerformance`    , `Performance`     , `skillPerformanceModifier`    , `charisma`     ],
  [ `skillPersuasion`     , `Persuasion`      , `skillPersuasionModifier`     , `charisma`     ],
]

export const formDamageTypes = [
  [ `acid`             , `Acid`                         ],
  [ `cold`             , `Cold`                         ],
  [ `fire`             , `Fire`                         ],
  [ `force`            , `Force`                        ],
  [ `lightning`        , `Lightning`                    ],
  [ `necrotic`         , `Necrotic`                     ],
  [ `poison`           , `Poison`                       ],
  [ `psychic`          , `Psychic`                      ],
  [ `radiant`          , `Radiant`                      ],
  [ `thunder`          , `Thunder`                      ],
  [ `nonMagical`       , `Non-magical`                  ],
  [ `magicWeapons`     , `Magic Weapons`                ],
  [ `bludgeoning`      , `Bludgeoning`                  ],
  [ `slashing`         , `Slashing`                     ],
  [ `piercing`         , `Piercing`                     ],
  [ `spells`           , `Spells`                       ],
  [ `silverBypass`     , `Excluding Silver Weapons`     ],
  [ `adamantineBypass` , `Excluding Adamantine Weapons` ],
]

export const formLanguageProficiencies = [
  [ `Standard Languages`,
    [
      [ `common`      , `(PHB) Common`        ],
      [ `dwarvish`    , `(PHB) Dwarvish`      ],
      [ `elvish`      , `(PHB) Elvish`        ],
      [ `giant`       , `(PHB) Giant`         ],
      [ `gnomish`     , `(PHB) Gnomish`       ],
      [ `goblin`      , `(PHB) Goblin`        ],
      [ `halfling`    , `(PHB) Halfling`      ],
      [ `orc`         , `(PHB) Orc`           ],
    ],
  ],
  [ `Exotic Languages`,
    [
      [ `abyssal`     , `(PHB) Abyssal`       ],
      [ `celestial`   , `(PHB) Celestial`     ],
      [ `draconic`    , `(PHB) Draconic`      ],
      [ `deepSpeech`  , `(PHB) Deep Speech`   ],
      [ `infernal`    , `(PHB) Infernal`      ],
      [ `primodial`   , `(PHB) Primodial`     ],
      // [ `aquan`       , `Aquan`               ],
      // [ `auran`       , `Auran`               ],
      // [ `ignan`       , `Ignan`               ],
      // [ `terran`      , `Terran`              ],
      [ `sylvan`      , `(PHB) Sylvan`        ],
      [ `undercommon` , `(PHB) Undercommon`   ],
    ],
  ],
  [ `Race / Class-Specific Languages`,
    [
      // [ `aarakocra`   , `(VGtM) Aarakocra`    ],
      [ `druidic`     , `(PHB) Druidic`       ],
      // [ `gith`        , `(MToF) Gith`         ],
      [ `thievesCant` , `(PHB) Thieves' Cant` ],
    ],
  ],
  // [ `Forgotten Realms Human Languages`,
    // [
      // [ `dambrathan`  , `(SCAG) Dambrathan`   ],
      // [ `bedine`      , `(SCAG) Bedine`       ],
      // [ `alzhedo`     , `(SCAG) Alzhedo`      ],
      // [ `chondathan`  , `(SCAG) Chondathan`   ],
      // [ `damaran`     , `(SCAG) Damaran`      ],
      // [ `waelan`      , `(SCAG) Waelan`       ],
      // [ `guran`       , `(SCAG) Guran`        ],
      // [ `halruaan`    , `(SCAG) Halruaan`     ],
      // [ `illuskan`    , `(SCAG) Illuskan`     ],
      // [ `roushoum`    , `(SCAG) Roushoum`     ],
      // [ `chessentan`  , `(SCAG) Chessentan`   ],
      // [ `mulhorandi`  , `(SCAG) Mulhorandi`   ],
      // [ `untheric`    , `(SCAG) Untheric`     ],
      // [ `thayan`      , `(SCAG) Thayan`       ],
      // [ `rashemi`     , `(SCAG) Rashemi`      ],
      // [ `shaaran`     , `(SCAG) Shaaran`      ],
      // [ `shou`        , `(SCAG) Shou`         ],
      // [ `tuigan`      , `(SCAG) Tuigan`       ],
      // [ `turmic`      , `(SCAG) Turmic`       ],
      // [ `uluik`       , `(SCAG) Uluik`        ],
    // ],
  // ],
  // [ `Monstrous Languages`,
    // [
      // [ `blinkDog`    , `(MM) Blink Dog`      ],
      // [ `bullywug`    , `(MM) Bullywug`       ],
      // [ `giantEagle`  , `(MM) Giant Eagle`    ],
      // [ `giantElk`    , `(MM) Giant Elk`      ],
      // [ `giantOwl`    , `(MM) Giant Owl`      ],
      // [ `gnoll`       , `(MM) Gnoll`          ],
      // [ `grell`       , `(MM) Grell`          ],
      // [ `grung`       , `(VGtM) Grung`        ],
      // [ `hookHorror`  , `(MM) Hook Horror`    ],
      // [ `kruthik`     , `(MToF) Kruthik`      ],
      // [ `modron`      , `(MM) Modron`         ],
      // [ `otyugh`      , `(MM) Otyugh`         ],
      // [ `sahuagin`    , `(MM) Sahuagin`       ],
      // [ `slaad`       , `(MM) Slaad`          ],
      // [ `sphinx`      , `(MM) Sphinx`         ],
      // [ `thriKreen`   , `(MM) Thri-kreen`     ],
      // [ `tlincalli`   , `(VGtM) Tlincalli`    ],
      // [ `troglodyte`  , `(MM) Troglodyte`     ],
      // [ `umberHulk`   , `(MM) Umber Hulk`     ],
      // [ `vegepygmy`   , `(VGtM) Vegepygmy`    ],
      // [ `winterWolf`  , `(MM) Winter Wolf`    ],
      // [ `worg`        , `(MM) Worg`           ],
      // [ `yeti`        , `(MM) Yeti`           ],
    // ],
  // ],
]

export const formStatistics = [
  [ `To Hit`,
    [
      [ `[+1d20]`                     , `1d20`                         ],
      [ `<auto-hit>`                  , `Auto Hit`                     ],
      [ `<vsSavingThrowStrength>`     , `vs Strength Saving Throw`     ],
      [ `<vsSavingThrowDexterity>`    , `vs Dexterity Saving Throw`    ],
      [ `<vsSavingThrowConstitution>` , `vs Constitution Saving Throw` ],
      [ `<vsSavingThrowIntelligence>` , `vs Intelligence Saving Throw` ],
      [ `<vsSavingThrowWisdom>`       , `vs Wisdom Saving Throw`       ],
      [ `<vsSavingThrowCharisma>`     , `vs Charisma Saving Throw`     ],
      [ `[+spellSaveDC]`              , `Spell/Ki Save DC`             ],
      [ `[+spellAttackModifier]`      , `Spell Attack Modifier`        ],
    ],
  ],
  [ `Attack Types`,
    [
      [ `<attackTypes.meleeNonMagicalWeapon>`  , `Non-magical Melee Weapons`  ],
      [ `<attackTypes.meleeMagicalWeapons>`    , `Magical Melee Weapons`      ],
      [ `<attackTypes.meleeSpells>`            , `Melee Spells`               ],
      [ `<attackTypes.rangedNonMagicalWeapon>` , `Non-magical Ranged Weapons` ],
      [ `<attackTypes.rangedMagicalWeapons>`   , `Magical Ranged Weapons`     ],
      [ `<attackTypes.rangedSpells>`           , `Ranged Spells`              ],
    ],
  ],
  [ `Armor Types`,
    [
      [ `<acTypes.lightArmor>`    , `Light Armor`          ],
      [ `<acTypes.mediumArmor>`   , `Medium Armor`         ],
      [ `<acTypes.heavyArmor>`    , `Heavy Armor`          ],
      [ `<acTypes.shield>`        , `Shield`               ],
      [ `<acTypes.vsMeleeBonus>`  , `Bonus against Melee`  ],
      [ `<acTypes.vsRangedBonus>` , `Bonus against Ranged` ],
      [ `<acTypes.vsSpellsBonus>` , `Bonus against Spells` ],
    ],
  ],
  [ `Damage Types`,
    [
      [ `<damageTypes.acid>`        , `Acid`              ],
      [ `<damageTypes.cold>`        , `Cold`              ],
      [ `<damageTypes.fire>`        , `Fire`              ],
      [ `<damageTypes.force>`       , `Force`             ],
      [ `<damageTypes.lightning>`   , `Lightning`         ],
      [ `<damageTypes.necrotic>`    , `Necrotic`          ],
      [ `<damageTypes.poison>`      , `Poison`            ],
      [ `<damageTypes.psychic>`     , `Psychic`           ],
      [ `<damageTypes.radiant>`     , `Radiant`           ],
      [ `<damageTypes.thunder>`     , `Thunder`           ],
      [ `<damageTypes.bludgeoning>` , `Bludgeoning`       ],
      [ `<damageTypes.slashing>`    , `Slashing`          ],
      [ `<damageTypes.piercing>`    , `Piercing`          ],
      [ `<damageTypes.silver>`      , `Silver Weapon`     ],
      [ `<damageTypes.adamantine>`  , `Adamantine Weapon` ],
    ],
  ],
  [ `Dice`,
    [
      [ `[+Xd4]`   , `Xd4 (Change X to amount of dice)`   ],
      [ `[+Xd6]`   , `Xd6 (Change X to amount of dice)`   ],
      [ `[+Xd8]`   , `Xd8 (Change X to amount of dice)`   ],
      [ `[+Xd10]`  , `Xd10 (Change X to amount of dice)`  ],
      [ `[+Xd12]`  , `Xd12 (Change X to amount of dice)`  ],
      [ `[+Xd20]`  , `Xd20 (Change X to amount of dice)`  ],
      [ `[+Xd100]` , `Xd100 (Change X to amount of dice)` ],
    ],
  ],
  [ `Ability Modifiers`,
    [
      [ `[+strengthModifier]`     , `Strength Modifier`     ],
      [ `[+dexterityModifier]`    , `Dexterity Modifier`    ],
      [ `[+constitutionModifier]` , `Constitution Modifier` ],
      [ `[+intelligenceModifier]` , `Intelligence Modifier` ],
      [ `[+wisdomModifier]`       , `Wisdom Modifier`       ],
      [ `[+charismaModifier]`     , `Charisma Modifier`     ],
    ],
  ],
  [ `Proficiency Bonus`,
    [
      [ `[+proficiencyBonus]` , `Proficiency Bonus` ],
    ],
  ],
  [ `Skills`,
    [
      [ `[+skillAthleticsModifier]`      , `Athletics Modifier`       ],
      [ `[+skillAcrobaticsModifier]`     , `Acrobatics Modifier`      ],
      [ `[+skillSleightOfHandModifier]`  , `Sleight of Hand Modifier` ],
      [ `[+skillStealthModifier]`        , `Stealth Modifier`         ],
      [ `[+skillArcanaModifier]`         , `Arcana Modifier`          ],
      [ `[+skillHistoryModifier]`        , `History Modifier`         ],
      [ `[+skillInvestigationModifier]`  , `Investigation Modifier`   ],
      [ `[+skillNatureModifier]`         , `Nature Modifier`          ],
      [ `[+skillReligionModifier]`       , `Religion Modifier`        ],
      [ `[+skillAnimalHandlingModifier]` , `Animal Handling Modifier` ],
      [ `[+skillInsightModifier]`        , `Insight Modifier`         ],
      [ `[+skillMedicineModifier]`       , `Medicine Modifier`        ],
      [ `[+skillPerceptionModifier]`     , `Perception Modifier`      ],
      [ `[+skillSurvivalModifier]`       , `Survival Modifier`        ],
      [ `[+skillDeceptionModifier]`      , `Deception Modifier`       ],
      [ `[+skillIntimidationModifier]`   , `Intimidation Modifier`    ],
      [ `[+skillPerformanceModifier]`    , `Performance Modifier`     ],
      [ `[+skillPersuasionModifier]`     , `Persuasion Modifier`      ],
    ],
  ],
  [ `Item Types`,
    [
      // [ `<itemTypes.adventuringGear>`       , `Adventuring Gear`         ],
      [ `<itemTypes.meleeOneHandedWeapon>`  , `One-Handed Melee Weapon`  ],
      [ `<itemTypes.meleeTwoHandedWeapon>`  , `Two-Handed Melee Weapon`  ],
      [ `<itemTypes.rangedOneHandedWeapon>` , `One-Handed Ranged Weapon` ],
      [ `<itemTypes.rangedTwoHandedWeapon>` , `Two-Handed Ranged Weapon` ],
      // [ `<itemTypes.staff>`                 , `Staff`                    ],
      // [ `<itemTypes.wand>`                  , `Wand`                     ],
      // [ `<itemTypes.rod>`                   , `Rod`                      ],
      [ `<itemTypes.lightArmor>`            , `Light Armor`              ],
      [ `<itemTypes.mediumArmor>`           , `Medium Armor`             ],
      [ `<itemTypes.heavyArmor>`            , `Heavy Armor`              ],
      [ `<itemTypes.shield>`                , `Shield`                   ],
      [ `<itemTypes.ring>`                  , `Ring`                     ],
      // [ `<itemTypes.ammunition>`            , `Ammunition`               ],
      // [ `<itemTypes.potion>`                , `Potion`                   ],
      // [ `<itemTypes.scroll>`                , `Scroll`                   ],
      // [ `<itemTypes.wondrousItem>`          , `Wondrous Item`            ],
    ],
  ],
  [ `Item Properties`,
    [
      [ `<attunement>` , ` Requires Attunement` ],
      [ `<charges>`    , ` Charges / Day`       ],
      [ `<recharge>`   , ` Recharge / Day`      ],
    ],
  ],
  [ `Item Bonuses`,
    [
      [ `<bonusSavingThrowStrength>`     , ` Strength Saving Throw Bonus`     ],
      [ `<bonusSavingThrowDexterity>`    , ` Dexterity Saving Throw Bonus`    ],
      [ `<bonusSavingThrowConstitution>` , ` Constitution Saving Throw Bonus` ],
      [ `<bonusSavingThrowIntelligence>` , ` Intelligence Saving Throw Bonus` ],
      [ `<bonusSavingThrowWisdom>`       , ` Wisdom Saving Throw Bonus`       ],
      [ `<bonusSavingThrowCharisma>`     , ` Charisma Saving Throw Bonus`     ],
    ],
  ],
]