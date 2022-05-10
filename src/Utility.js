export const totalDataCalc = (dailyData) => {
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
      calories: sumcalories,
      carbohydrates_total_g: sumcarbs,
      fat_total_g: sumfats,
      protein_g: sumproteins,
      serving_size_g: sumservingsizes,
      activity_time: sumActivityTime,
      activity_length: sumActivityLength,
    }
  }
}