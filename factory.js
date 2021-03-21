const fs = require("fs")

const StoreData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  }
  catch (err) {
    console.log(err)
  }
}


function addID(arr) {
  const arrWithId = []
  for (let i = 0; i < arr.length; i++) {
    arrWithId.push({
      id: arr[i]._id,
      ...arr[i]._doc,
    })
  }
  return arrWithId
}

exports.StoreData = StoreData
exports.addID = addID