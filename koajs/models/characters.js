/**
 * Module dependencies
 */

// PLACEHOLDER



/**
 * Set constants
 */

const characterColumnsSQL = ``
  + `name = $name, `
  + `image = $image, `
  + `level = $level, `
  + `proficiencyBonus = $proficiencyBonus, `
  + `xp = $xp, `
  + `xpNextLevel = $xpNextLevel, `
  + `class = $class, `
  + `race = $race, `
  + `size = $size, `
  + `alignment = $alignment, `
  + `characterInfo = $characterInfo, `
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
  + `spellSaveDC = $spellSaveDC, `
  + `spellAttackModifier = $spellAttackModifier, `
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
  + `weaponProficiencyList = $weaponProficiencyList, `
  + `armorProficiencyList = $armorProficiencyList, `
  + `toolProficiencyList = $toolProficiencyList, `
  + `languageProficiencyList = $languageProficiencyList, `
  + `itemList = $itemList, `
  + `equippedWeaponList = $equippedWeaponList, `
  + `equippedArmor = $equippedArmor, `
  + `equippedShield = $equippedShield, `
  + `equippedAccessoryList = $equippedAccessoryList, `
  + `acValue = $acValue, `
  + `acValueMelee = $acValueMelee, `
  + `acValueRanged = $acValueRanged, `
  + `acValueSpells = $acValueSpells, `
  + `hpMax = $hpMax, `
  + `speed = $speed, `
  + `coinCopper = $coinCopper, `
  + `coinSilver = $coinSilver, `
  + `coinElectrum = $coinElectrum, `
  + `coinGold = $coinGold, `
  + `coinPlatinum = $coinPlatinum, `
  + `actionList = $actionList, `
  + `notes = $notes`

const characterColumnsParam = [
  `name`,
  `image`,
  `level`,
  `proficiencyBonus`,
  `xp`,
  `xpNextLevel`,
  `class`,
  `race`,
  `size`,
  `alignment`,
  `characterInfo`,
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
  `spellSaveDC`,
  `spellAttackModifier`,
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
  `weaponProficiencyList`,
  `armorProficiencyList`,
  `toolProficiencyList`,
  `languageProficiencyList`,
  `itemList`,
  `equippedWeaponList`,
  `equippedArmor`,
  `equippedShield`,
  `equippedAccessoryList`,
  `acValue`,
  `acValueMelee`,
  `acValueRanged`,
  `acValueSpells`,
  `hpMax`,
  `speed`,
  `coinCopper`,
  `coinSilver`,
  `coinElectrum`,
  `coinGold`,
  `coinPlatinum`,
  `actionList`,
  `notes`,
]

function getParams (data) {
  let obj = {}

  characterColumnsParam.forEach((key) => {
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
      const character = await ctx.state.db
        .get(
          `SELECT id FROM characters WHERE (id == $assetid) AND (owner == $owner);`,
          {
            $assetid: ctx.request.body.assetid,
            $owner: ctx.cookies.get(`username`),
          }
        )
        .then((data) => data)

      if (character) {
        return character
      }

      return { error: `wrong credentials` }
    } catch (err) {
      next(err)
    }
  },
  getAll: async (ctx, next) => {
    try {
      const characters = await ctx.state.db
        .all(
          `SELECT * FROM characters WHERE (owner == $owner);`,
          {
            $owner: ctx.cookies.get(`username`),
          }
        )
        .then((data) => data)

      if (characters) {
        return characters
      }

      return { error: `wrong credentials` }
    } catch (err) {
      next(err)
    }
  },
  delete: async (ctx, next) => {
    try {
      const character = await ctx.state.db
        .get(
          `SELECT id FROM characters WHERE ((owner == $owner) AND (id == $id));`,
          {
            $owner: ctx.cookies.get(`username`),
            $id: ctx.request.body.assetid,
          }
        )
        .then((data) => data)

      if (character) {
        const result = await ctx.state.db.run(
          `DELETE FROM characters WHERE (id == $id);`,
          {
            $id: character.id,
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
      const character = await ctx.state.db
        .get(
          `SELECT id FROM characters WHERE (id == $id);`,
          {
            $id: ctx.request.body.character.id,
          }
        )
        .then((data) => data)

      if (character) {
        const sql = `UPDATE characters SET ${characterColumnsSQL} WHERE (id == $id);`
        const param = {
          $id: character.id,
          ...getParams(ctx.request.body.character),
        }

        await ctx.state.db.run(sql, param)

        return character
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
