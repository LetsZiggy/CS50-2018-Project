import { formSizes, formAlignments, formAbilities, formSavingThrowProficiencies, formSkills, formDamageTypes, formLanguageProficiencies, formStatistics } from './form-statistics'

export const monsterForm = {
  sizes: [ ...formSizes ],
  types: [
    `Aberration`,
    `Beast`,
    `Celestial`,
    `Construct`,
    `Dragon`,
    `Elemental`,
    `Fey`,
    `Fiend`,
    `Giant`,
    `Humanoid`,
    `Monstrosity`,
    `Ooze`,
    `Plant`,
    `Undead`,
  ],
  alignments: [ ...formAlignments ],
  challengeRatings: [
    [ 0     , `0`        ],
    [ 0.125 , `&frac18;` ],
    [ 0.25  , `&frac14;` ],
    [ 0.5   , `&frac12;` ],
    [ 1     , `1`        ],
    [ 2     , `2`        ],
    [ 3     , `3`        ],
    [ 4     , `4`        ],
    [ 5     , `5`        ],
    [ 6     , `6`        ],
    [ 7     , `7`        ],
    [ 8     , `8`        ],
    [ 9     , `9`        ],
    [ 10    , `10`       ],
    [ 11    , `11`       ],
    [ 12    , `12`       ],
    [ 13    , `13`       ],
    [ 14    , `14`       ],
    [ 15    , `15`       ],
    [ 16    , `16`       ],
    [ 17    , `17`       ],
    [ 18    , `18`       ],
    [ 19    , `19`       ],
    [ 20    , `20`       ],
    [ 21    , `21`       ],
    [ 22    , `22`       ],
    [ 23    , `23`       ],
    [ 24    , `24`       ],
    [ 25    , `25`       ],
    [ 26    , `26`       ],
    [ 27    , `27`       ],
    [ 28    , `28`       ],
    [ 29    , `29`       ],
    [ 30    , `30`       ],
  ],
  acTypes: [
    [`Natural Armor`,
      [
        [`naturalArmor`   , `has Natural Armor`            ],
      ],
    ],
    [`Light Armor`,
      [
        [`padded`         , `wearing Padded Armor`         ],
        [`leather`        , `wearing Leather Armor`        ],
        [`studdedLeather` , `wearing Studded Leather Armor`],
      ],
    ],
    [`Medium Armor`,
      [
        [`hide`           , `wearing Hide Armor`           ],
        [`chainShirt`     , `wearing Chain Shirt Armor`    ],
        [`scaleMail`      , `wearing Scale Mail Armor`     ],
        [`breastplate`    , `wearing Breastplate Armor`    ],
        [`halfPlate`      , `wearing Half Plate Armor`     ],
      ],
    ],
    [`Heavy Armor`,
      [
        [`ringMail`       , `wearing Ring Mail Armor`      ],
        [`chainMail`      , `wearing Chain Mail Armor`     ],
        [`splint`         , `wearing Splint Armor`         ],
        [`plate`          , `wearing Plate Armor`          ],
      ],
    ],
  ],
  speeds: [
    [`speedWalking`   , `walking`  ],
    [`speedBurrowing` , `burrowing`],
    [`speedClimbing`  , `climbing` ],
    [`speedFlying`    , `flying`   ],
    [`speedSwimming`  , `swimming` ],
  ],
  abilities:                [ ...formAbilities ],
  savingThrowProficiencies: [ ...formSavingThrowProficiencies ],
  skills:                   [ ...formSkills ],
  damageTypes:              [ ...formDamageTypes ],
  senses: [
    [`senseBlindsight`  , `Blindsight` ],
    [`senseDarkvision`  , `Darkvision` ],
    [`senseTremorsense` , `Tremorsense`],
    [`senseTruesight`   , `Truesight`  ],
  ],
  languageProficiencies:    [ ...formLanguageProficiencies ],
  specialTraitSamples: [
      `::title-start::\n`
    + `Sample Trait\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `Trait Description\n`
    + `::description-end::\n`
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
    + `Sample Roll-to-Hit Melee Interactive Action (Young Green Dragon's Bite)\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `Melee Weapon Attack: +7 to hit, reach 10ft, one target\n`
    + `Hit: 15 (2d10 + 4) piercing damage plus 7 (2d6) poison damage\n`
    + `::description-end::\n`
    + `\n`

    + `::hit-start::\n`
    + `[+1d20] [+7]\n`
    + `::hit-end::\n`
    + `\n`

    + `::damage-start::\n`
    + `<attackTypes.meleeNonMagical>\n`
    + `<damageTypes.piercing> [+2d10] [+4]\n`
    + `<damageTypes.poison> [+2d6]\n`
    + `::damage-end::\n`
    + `\n`,

      `::title-start::\n`
    + `Sample Roll-to-Hit Ranged Interactive Action (Green Slaad's Hurl Flame)\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `Ranged Spell Attack: +4 to hit, range 60ft, one target\n`
    + `Hit: 10 (3d6) fire damage\n`
    + `\n`
    + `The fire ignites flammable objects that aren't being worn or carried.\n`
    + `::description-end::\n`
    + `\n`

    + `::hit-start::\n`
    + `[+1d20] [+4]\n`
    + `::hit-end::\n`
    + `\n`

    + `::damage-start::\n`
    + `<attackTypes.rangedSpells>\n`
    + `<damageTypes.fire> [+3d6]\n`
    + `::damage-end::\n`
    + `\n`,

      `::title-start::\n`
    + `Sample vs. Saving Throw Interactive Action (Chimera's Fire Breath)\n`
    + `::title-end::\n`
    + `\n`

    + `::description-start::\n`
    + `The dragon exhales fire in a 15ft cone.\n`
    + `Each creature in that area must make a DC 15 Dexterity saving throw, taking 31 (7d8) fire damage on a failed save, or half as much damage on a successful one.\n`
    + `::description-end::\n`
    + `\n`

    + `::hit-start::\n`
    + `<vsSavingThrowDexterity> [+15]\n`
    + `::hit-end::\n`
    + `\n`

    + `::damage-start::\n`
    + `<damageTypes.fire> [+7d8]\n`
    + `::damage-end::\n`
    + `\n`,
  ],
  statistics: [ ...formStatistics ],
  xpRewards: [
    [0     , 10    ],
    [0.125 , 25    ],
    [0.25  , 50    ],
    [0.5   , 100   ],
    [1     , 200   ],
    [2     , 450   ],
    [3     , 700   ],
    [4     , 1100  ],
    [5     , 1800  ],
    [6     , 2300  ],
    [7     , 2900  ],
    [8     , 3900  ],
    [9     , 5000  ],
    [10    , 5900  ],
    [11    , 7200  ],
    [12    , 8400  ],
    [13    , 10000 ],
    [14    , 11500 ],
    [15    , 13000 ],
    [16    , 15000 ],
    [17    , 18000 ],
    [18    , 20000 ],
    [19    , 22000 ],
    [20    , 25000 ],
    [21    , 33000 ],
    [22    , 41000 ],
    [23    , 50000 ],
    [24    , 62000 ],
    [25    , 72000 ],
    [26    , 90000 ],
    [27    , 105000],
    [28    , 120000],
    [29    , 135000],
    [30    , 155000],
  ],
  dependants: [
    (data, form) => [
      `proficiencyBonus`,
      (data.challengeRating < 1)
        ? 2
        : (Math.ceil(data.challengeRating / 4) + 1)
    ],

    (data, form) => [
      `xpReward`,
      (form.xpRewards.filter((value) => value[0] === data.challengeRating)[0][1])
    ],

    // (data, form) => [
    //   `hpCurr`,
    //   (data.hpCurr === null)
    //     ? data.hpMax
    //     : data.hpCurr
    // ],

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
      `savingThrowStrengthBonus`,
      (data.strengthModifier > 0)
        ? (data.strengthModifier + data.proficiencyBonus)
        : data.proficiencyBonus
    ],

    (data, form) => [
      `savingThrowDexterityBonus`,
      (data.dexterityModifier > 0)
        ? (data.dexterityModifier + data.proficiencyBonus)
        : data.proficiencyBonus
    ],

    (data, form) => [
      `savingThrowConstitutionBonus`,
      (data.constitutionModifier > 0)
        ? (data.constitutionModifier + data.proficiencyBonus)
        : data.proficiencyBonus
    ],

    (data, form) => [
      `savingThrowIntelligenceBonus`,
      (data.intelligenceModifier > 0)
        ? (data.intelligenceModifier + data.proficiencyBonus)
        : data.proficiencyBonus
    ],

    (data, form) => [
      `savingThrowWisdomBonus`,
      (data.wisdomModifier > 0)
        ? (data.wisdomModifier + data.proficiencyBonus)
        : data.proficiencyBonus
    ],

    (data, form) => [
      `savingThrowCharismaBonus`,
      (data.charismaModifier > 0)
        ? (data.charismaModifier + data.proficiencyBonus)
        : data.proficiencyBonus
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
}

export const monsterDefault = {
  id: null,
  owner: ``,
  name: `Monster Name`,
  image: ``,
  size: `Tiny`,
  creatureTypeList: [ `Aberration` ],
  alignment: `Unaligned`,
  challengeRating: 0,
  proficiencyBonus: 0,
  xpReward: 0,
  hpMax: 1,
  // hpCurr: null,
  acValue: 1,
  acType: `naturalArmor`,
  acShield: false,
  speedList: [ `speedWalking` ],
  speedWalking: 0,
  speedBurrowing: 0,
  speedClimbing: 0,
  speedFlying: 0,
  speedSwimming: 0,
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
  vulnerabilityList: [],
  resistanceList: [],
  immunityList: [],
  senseList: [],
  senseBlindsight: 0,
  senseDarkvision: 0,
  senseTremorsense: 0,
  senseTruesight: 0,
  languageProficiencyList: [],
  specialTraitList: [],
  actionList: [],
}

export const monsterBooleanKeys = [
  `acShield`,
]

export const monsterArrayKeys = [
  `creatureTypeList`,
  `speedList`,
  `savingThrowList`,
  `skillList`,
  `vulnerabilityList`,
  `resistanceList`,
  `immunityList`,
  `senseList`,
  `languageProficiencyList`,
  `specialTraitList`,
  `actionList`,
]

export const monsterJSONKeys = [
  [`specialTraitList`, `string`],
  [`actionList`, `string`],
]

export const monsterNumberKeys = [
  `id`,
  `challengeRating`,
  `proficiencyBonus`,
  `xpReward`,
  `speedWalking`,
  `speedBurrowing`,
  `speedClimbing`,
  `speedFlying`,
  `speedSwimming`,
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
  `senseBlindsight`,
  `senseDarkvision`,
  `senseTremorsense`,
  `senseTruesight`,
  `hpMax`,
  `acValue`,
  `strengthScore`,
  `dexterityScore`,
  `constitutionScore`,
  `intelligenceScore`,
  `wisdomScore`,
  `charismaScore`,
]
