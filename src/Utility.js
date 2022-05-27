export const calculateBCB = (lifestyle, weight, height, bdayDate, gender) => {
  let bcb
  const today = new Date()
  const bday = new Date(bdayDate)
  const age = today.getFullYear() - bday.getFullYear()

  if (age && gender === 0) {
    lifestyle && weight && height
      ? (bcb = (447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) * (lifestyle / 100 + 1))
      : bcb = 0
  } else {
    lifestyle && weight && height
      ? (bcb = (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) * (lifestyle / 100 + 1))
      : bcb = 0
  }

  return isNaN(bcb) ? 0 : parseInt(bcb)
}

export const totalDataCalc = (dailyData, type) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (dailyData.length > 0) {
    let sumcalories = dailyData
      .map((item) => (item.calories ? item.calories : (item.calories = 0)))
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(1)
    let sumcarbs = dailyData
      .map((item) => (item.carbohydrates_total_g ? item.carbohydrates_total_g : (item.carbohydrates_total_g = 0)))
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(1)
    let sumfats = dailyData
      .map((item) => (item.fat_total_g ? item.fat_total_g : (item.fat_total_g = 0)))
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(1)
    let sumproteins = dailyData
      .map((item) => (item.protein_g ? item.protein_g : (item.protein_g = 0)))
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(1)
    let sumservingsizes = dailyData
      .map((item) => (item.serving_size_g ? item.serving_size_g : (item.serving_size_g = 0)))
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(1)
    let sumActivityTime = dailyData
      .map((item) => (item.activity_time ? item.activity_time : (item.activity_time = 0)))
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(1)
    let sumActivityLength = dailyData
      .map((item) => (item.activity_length ? item.activity_length : (item.activity_length = 0)))
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(1)

    sumcarbs === '0.0' && (sumcarbs = null)
    sumfats === '0.0' && (sumfats = null)
    sumproteins === '0.0' && (sumproteins = null)
    sumservingsizes === '0.0' && (sumservingsizes = null)
    sumActivityTime === '0.0' && (sumActivityTime = null)
    sumActivityLength === '0.0' && (sumActivityLength = null)

    return {
      name: 'Total',
      calories: type === 'intake' ? parseInt(sumcalories) : parseInt(sumcalories) + calculateBCB(user.lifestyle, user.weight, user.height, user.birthdate, user.gender),
      carbohydrates_total_g: sumcarbs,
      fat_total_g: sumfats,
      protein_g: sumproteins,
      serving_size_g: sumservingsizes,
      activity_time: sumActivityTime,
      activity_length: sumActivityLength,
    }
  }
}