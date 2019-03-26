/**
 * Module dependencies
 */

// PLACEHOLDER



/**
 * Set constants
 */

const monsterColumnsSQL = ``
  + `name = $name, `
  + `image = $image, `
  + `size = $size, `
  + `creatureTypeList = $creatureTypeList, `
  + `alignment = $alignment, `
  + `challengeRating = $challengeRating, `
  + `proficiencyBonus = $proficiencyBonus, `
  + `xpReward = $xpReward, `
  + `hpMax = $hpMax, `
  + `acValue = $acValue, `
  + `acType = $acType, `
  + `acShield = $acShield, `
  + `speedList = $speedList, `
  + `speedWalking = $speedWalking, `
  + `speedBurrowing = $speedBurrowing, `
  + `speedClimbing = $speedClimbing, `
  + `speedFlying = $speedFlying, `
  + `speedSwimming = $speedSwimming, `
  + `strengthScore = $strengthScore, `
  + `dexterityScore = $dexterityScore, `
  + `constitutionScore = $constitutionScore, `
  + `intelligenceScore = $intelligenceScore, `
  + `wisdomScore = $wisdomScore, `
  + `charismaScore = $charismaScore, `
  + `strengthModifier = $strengthModifier, `
  + `dexterityModifier = $dexterityModifier, `
  + `constitutionModifier = $constitutionModifier, `
  + `intelligenceModifier = $intelligenceModifier, `
  + `wisdomModifier = $wisdomModifier, `
  + `charismaModifier = $charismaModifier, `
  + `passivePerception = $passivePerception, `
  + `initiativeBonus = $initiativeBonus, `
  + `savingThrowList = $savingThrowList, `
  + `savingThrowStrengthBonus = $savingThrowStrengthBonus, `
  + `savingThrowDexterityBonus = $savingThrowDexterityBonus, `
  + `savingThrowConstitutionBonus = $savingThrowConstitutionBonus, `
  + `savingThrowIntelligenceBonus = $savingThrowIntelligenceBonus, `
  + `savingThrowWisdomBonus = $savingThrowWisdomBonus, `
  + `savingThrowCharismaBonus = $savingThrowCharismaBonus, `
  + `skillList = $skillList, `
  + `skillAthleticsModifier = $skillAthleticsModifier, `
  + `skillAcrobaticsModifier = $skillAcrobaticsModifier, `
  + `skillSleightOfHandModifier = $skillSleightOfHandModifier, `
  + `skillStealthModifier = $skillStealthModifier, `
  + `skillArcanaModifier = $skillArcanaModifier, `
  + `skillHistoryModifier = $skillHistoryModifier, `
  + `skillInvestigationModifier = $skillInvestigationModifier, `
  + `skillNatureModifier = $skillNatureModifier, `
  + `skillReligionModifier = $skillReligionModifier, `
  + `skillAnimalHandlingModifier = $skillAnimalHandlingModifier, `
  + `skillInsightModifier = $skillInsightModifier, `
  + `skillMedicineModifier = $skillMedicineModifier, `
  + `skillPerceptionModifier = $skillPerceptionModifier, `
  + `skillSurvivalModifier = $skillSurvivalModifier, `
  + `skillDeceptionModifier = $skillDeceptionModifier, `
  + `skillIntimidationModifier = $skillIntimidationModifier, `
  + `skillPerformanceModifier = $skillPerformanceModifier, `
  + `skillPersuasionModifier = $skillPersuasionModifier, `
  + `vulnerabilityList = $vulnerabilityList, `
  + `resistanceList = $resistanceList, `
  + `immunityList = $immunityList, `
  + `senseList = $senseList, `
  + `senseBlindsight = $senseBlindsight, `
  + `senseDarkvision = $senseDarkvision, `
  + `senseTremorsense = $senseTremorsense, `
  + `senseTruesight = $senseTruesight, `
  + `languageProficiencyList = $languageProficiencyList, `
  + `specialTraitList = $specialTraitList, `
  + `actionList = $actionList`

const monsterColumnsParam = [
  `name`,
  `image`,
  `size`,
  `creatureTypeList`,
  `alignment`,
  `challengeRating`,
  `proficiencyBonus`,
  `xpReward`,
  `hpMax`,
  `acValue`,
  `acType`,
  `acShield`,
  `speedList`,
  `speedWalking`,
  `speedBurrowing`,
  `speedClimbing`,
  `speedFlying`,
  `speedSwimming`,
  `strengthScore`,
  `dexterityScore`,
  `constitutionScore`,
  `intelligenceScore`,
  `wisdomScore`,
  `charismaScore`,
  `strengthModifier`,
  `dexterityModifier`,
  `constitutionModifier`,
  `intelligenceModifier`,
  `wisdomModifier`,
  `charismaModifier`,
  `passivePerception`,
  `initiativeBonus`,
  `savingThrowList`,
  `savingThrowStrengthBonus`,
  `savingThrowDexterityBonus`,
  `savingThrowConstitutionBonus`,
  `savingThrowIntelligenceBonus`,
  `savingThrowWisdomBonus`,
  `savingThrowCharismaBonus`,
  `skillList`,
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
  `vulnerabilityList`,
  `resistanceList`,
  `immunityList`,
  `senseList`,
  `senseBlindsight`,
  `senseDarkvision`,
  `senseTremorsense`,
  `senseTruesight`,
  `languageProficiencyList`,
  `specialTraitList`,
  `actionList`,
]

function getParams (data) {
  let obj = {}

  monsterColumnsParam.forEach((key) => {
    obj[`$${key}`] = data[key]
  })

  return obj
}



/**
 * Set model
 */

const Model = {
  setCookies: async (ctx, next) => {
    try {
      const monster = await ctx.state.db
        .get(
          `SELECT id FROM monsters WHERE (id == $assetid) AND (owner == $owner);`,
          {
            $assetid: ctx.request.body.assetid,
            $owner: ctx.cookies.get(`username`),
          }
        )
        .then((data) => data)

      if (monster) {
        return monster
      }

      return { error: `wrong credentials` }
    } catch (err) {
      next(err)
    }
  },
  getAll: async (ctx, next) => {
    try {
      const monsters = await ctx.state.db
        .all(
          `SELECT * FROM monsters WHERE (owner == $owner);`,
          {
            $owner: ctx.cookies.get(`username`),
          }
        )
        .then((data) => data)

      if (monsters) {
        return monsters
      }

      return { error: `wrong credentials` }
    } catch (err) {
      next(err)
    }
  },
  delete: async (ctx, next) => {
    try {
      const monster = await ctx.state.db
        .get(
          `SELECT id FROM monsters WHERE ((owner == $owner) AND (id == $id));`,
          {
            $owner: ctx.cookies.get(`username`),
            $id: ctx.request.body.assetid,
          }
        )
        .then((data) => data)

      if (monster) {
        const result = await ctx.state.db.run(
          `DELETE FROM monsters WHERE (id == $id);`,
          {
            $id: monster.id,
          }
        )

        return result
      }

    } catch (err) {
      next(err)
    }
  },
  update: async (ctx, next) => {
    try {
      const monster = await ctx.state.db
        .get(
          `SELECT id FROM monsters WHERE (id == $id);`,
          {
            $id: ctx.request.body.monster.id,
          }
        )
        .then((data) => data)

      if (monster) {
        const sql = `UPDATE monsters SET ${monsterColumnsSQL} WHERE (id == $id);`
        const param = {
          $id: monster.id,
          ...getParams(ctx.request.body.monster),
        }

        await ctx.state.db.run(sql, param)

        return monster
      }

      return { error: `wrong credentials` }
    } catch (err) {
      next(err)
    }
  }
}



/**
 * Export model
 */

module.exports = Model
