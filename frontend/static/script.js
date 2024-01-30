let apiLink = "http://localhost:8000/api/cocktails/";
fetch(apiLink)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        data.forEach(cocktail => {
            fillGlass(cocktail)
            document.getElementById("CocktailName").innerHTML = cocktail.name
            document.getElementById("body").style.backgroundColor = averageHexColors(cocktail.ingredient_1.color, cocktail.ingredient_2.color, cocktail.ingredient_3.color, cocktail.ingredient_4.color)
        });

    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
function fillGlass(cocktail) {
    let totalHeight = cocktail.ingredient_1_amount + cocktail.ingredient_2_amount + cocktail.ingredient_3_amount + cocktail.ingredient_4_amount
    createGlassElement(cocktail.ingredient_4.color, cocktail.ingredient_4.name ,calculateHeight(totalHeight,cocktail.ingredient_4_amount) ,"top");
    createGlassElement(cocktail.ingredient_3.color, cocktail.ingredient_3.name ,calculateHeight(totalHeight,cocktail.ingredient_3_amount) ,"middle");
    createGlassElement(cocktail.ingredient_2.color, cocktail.ingredient_2.name ,calculateHeight(totalHeight,cocktail.ingredient_2_amount) ,"middle");
    createGlassElement(cocktail.ingredient_1.color, cocktail.ingredient_1.name ,calculateHeight(totalHeight,cocktail.ingredient_1_amount) ,"bottom");
}
function createGlassElement(cocktailColor, cocktailName , height, type) {
    let element = document.createElement("div")
    element.classList.add("insert")
    element.style.backgroundColor = cocktailColor;
    element.innerText = cocktailName
    if (type == "top") {
        element.style.borderRadius = "15px 15px 0 0"
    }
    else if (type == "bottom") {
        element.style.borderRadius = "0 0 15px 15px"
    }
    element.style.height = height + "%"
    console.log(height)
    document.getElementById("glass").appendChild(element)
}
function calculateHeight(totalHeight, currentHeight) {
    return (currentHeight / totalHeight) * 100;
}
function averageHexColors(...colors) {
    const hexToRgb = hex => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16)
    });
  
    const rgbToHex = rgb => 
      '#' + [rgb.r, rgb.g, rgb.b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
  
    const sumRgb = { r: 0, g: 0, b: 0 };
    colors.forEach(hex => {
      const rgb = hexToRgb(hex);
      sumRgb.r += rgb.r;
      sumRgb.g += rgb.g;
      sumRgb.b += rgb.b;
    });
  
    const averageRgb = {
      r: Math.round(sumRgb.r / colors.length),
      g: Math.round(sumRgb.g / colors.length),
      b: Math.round(sumRgb.b / colors.length)
    };
  
    return rgbToHex(averageRgb);
  }