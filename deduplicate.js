const fs = require("fs");

const fileType = "pedalboards";

const filename = `./public/data/${fileType}.json`;
const encoding = "utf8";

const fileContents = fs.readFileSync(filename, encoding);

// 1. Parse the JSON string into a JavaScript object
const data = JSON.parse(fileContents);

// 2. Create an empty object to store unique objects by name
const uniqueData = {};

// 3. Iterate through each object in the array
data.forEach((obj) => {
  const brand = obj.Brand;
  const name = obj.Name;

  // SE nome ou imagem igual
  if (uniqueData[brand + name]) {
    // prevalece a imagem em minúsculo
    if (
      !/[A-Z]/.test(obj.Image) &&
      /[A-Z]/.test(uniqueData[brand + name].Image)
    ) {
      uniqueData[brand + name] = obj;
    }
  } else {
    // 6. If an object with the same name does not exist, add it to the unique object store
    uniqueData[brand + name] = obj;
  }
});

// 7. Convert the unique object store back into an array
const uniqueArray = Object.values(uniqueData);

console.log(`Antes: ${data.length} agora ${uniqueArray.length}`);

// 8. Convert the resulting array back into a JSON string
const uniqueJsonString = JSON.stringify(uniqueArray);

fs.writeFile(`public/data/new-${fileType}.json`, uniqueJsonString, (err) => {
  if (err) throw err;
  console.log(`public/data/new-${fileType}.json has been saved`);
});
