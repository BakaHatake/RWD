const mongoose =require("mongoose")
const Item=require('../models/item')
require('dotenv').config();
const data=[{
    "name": "Masala Dosa",
    "price": 50,
    "category": "Quick Bites",
    "type": "Veg",
    "tags": ["breakfast", "south indian", "crispy"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764750553/Masala_dosa_i6rhom.jpg",
    "rating": 4.8,
    "available": true
  },
  {
    "name": "Samosa Plate (2pcs)",
    "price": 30,
    "category": "Quick Bites",
    "type": "Veg",
    "tags": ["snack", "spicy", "fried"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751066/76064f16de350ec971c370097da36705_otomvp.jpg",
    "rating": 4.5,
    "available": true
  },
  {
    "name": "Chicken Roll",
    "price": 80,
    "category": "Quick Bites",
    "type": "Non-Veg",
    "tags": ["wrap", "chicken", "spicy"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751302/chicken-kathi-roll-chicken-frankie_vdwwhe.jpg",
    "rating": 4.7,
    "available": true
  },
  {
    "name": "Paneer Grilled Sandwich",
    "price": 70,
    "category": "Quick Bites",
    "type": "Veg",
    "tags": ["sandwich", "cheese", "paneer"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751300/paneer-sandwich-featured_lzxwjg.jpg",
    "rating": 4.4,
    "available": true
  },
  {
    "name": "Chicken 65",
    "price": 110,
    "category": "Quick Bites",
    "type": "Non-Veg",
    "tags": ["starter", "chicken", "spicy"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751328/chicken-65-restaurant-style_ltrnfc.jpg",
    "rating": 4.8,
    "available": true
  },
  {
    "name": "Vada Pav",
    "price": 25,
    "category": "Quick Bites",
    "type": "Veg",
    "tags": ["mumbai style", "snack", "budget"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751366/Vada-Pav-500x500_xwasd9.jpg",
    "rating": 4.3,
    "available": true
  },
  {
    "name": "Veg Momos (Steam)",
    "price": 60,
    "category": "Quick Bites",
    "type": "Veg",
    "tags": ["tibetan", "steam", "healthy"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751514/veg-momos-recipe-5_wgvqpr.jpg",
    "rating": 4.5,
    "available": true
  },
  {
    "name": "French Fries",
    "price": 60,
    "category": "Quick Bites",
    "type": "Veg",
    "tags": ["sides", "crispy", "salted"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751533/Homemade-French-Fries_8_xlsdl2.jpg",
    "rating": 4.4,
    "available": true
  },
  {
    "name": "Veg Burger",
    "price": 75,
    "category": "Quick Bites",
    "type": "Veg",
    "tags": ["burger", "cheese", "snack"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751586/Untitled_20design_20-_202025-09-16T110643.939_tigb9a.jpg",
    "rating": 4.5,
    "available": true
  },

  {
    "name": "Veg Thali",
    "price": 100,
    "category": "Main Course",
    "type": "Veg",
    "tags": ["lunch", "rice", "curry", "meal"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751867/svgt_u9nbct.jpg",
    "rating": 4.6,
    "available": true
  },
  {
    "name": "Chicken Fried Rice",
    "price": 120,
    "category": "Main Course",
    "type": "Non-Veg",
    "tags": ["chinese", "rice", "lunch"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751796/chicken_fried_rice00032a-1200x1200-1_z6p814.jpg",
    "rating": 4.7,
    "available": true
  },
  {
    "name": "Rajma Chawal",
    "price": 90,
    "category": "Main Course",
    "type": "Veg",
    "tags": ["north indian", "comfort food", "rice"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751910/rajma-chawal-1_d4p0dr.jpg",
    "rating": 4.8,
    "available": true
  },
  {
    "name": "Aloo Paratha with Curd",
    "price": 70,
    "category": "Main Course",
    "type": "Veg",
    "tags": ["breakfast", "lunch", "stuffed bread"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751929/homemade-aloo-paratha-with-plain-curd-for-the-breakfast-v0-j7bt3tm71gmc1_xyvpec.jpg",
    "rating": 4.5,
    "available": true
  },
  {
    "name": "Chole Bhature",
    "price": 100,
    "category": "Main Course",
    "type": "Veg",
    "tags": ["punjabi", "heavy meal", "spicy"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751941/chole-bhature-4_xvycge.jpg",
    "rating": 4.9,
    "available": true
  },
  {
    "name": "Chicken Biryani",
    "price": 150,
    "category": "Main Course",
    "type": "Non-Veg",
    "tags": ["rice", "chicken", "spicy"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751963/Chicken-Biryani-Recipe_utaeny.jpg",
    "rating": 4.9,
    "available": true
  },
  {
    "name": "Veg Hakka Noodles",
    "price": 95,
    "category": "Main Course",
    "type": "Veg",
    "tags": ["chinese", "noodles", "dinner"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764751997/Veg-Hakka-Noodles-2-3_pjobe0.jpg",
    "rating": 4.3,
    "available": true
  },
  {
    "name": "Paneer Butter Masala",
    "price": 140,
    "category": "Main Course",
    "type": "Veg",
    "tags": ["curry", "creamy", "dinner"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764752010/roti-paneer-butter-masala_yq8jpf.jpg",
    "rating": 4.9,
    "available": true
  },
  {
    "name": "Curd Rice",
    "price": 60,
    "category": "Main Course",
    "type": "Veg",
    "tags": ["south indian", "light meal", "healthy"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764752026/curd-rice_tm3zcu.jpg",
    "rating": 4.2,
    "available": true
  },

  {
    "name": "Masala Chai",
    "price": 20,
    "category": "Beverages",
    "type": "Veg",
    "tags": ["tea", "hot", "refreshing"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764753171/Screenshot_2023-09-05_at_7.00.35_PM_nolyjy.png",
    "rating": 4.9,
    "available": true
  },
  {
    "name": "Cold Coffee",
    "price": 60,
    "category": "Beverages",
    "type": "Veg",
    "tags": ["coffee", "cold", "sweet"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764752056/SBX_2025_Crema_Collection_Frothed_Coffee_CAH_Recipe_Gradient_Image_bqevej.jpg",
    "rating": 4.7,
    "available": true
  },
  {
    "name": "Fresh Lime Soda",
    "price": 40,
    "category": "Beverages",
    "type": "Veg",
    "tags": ["drink", "fizzy", "lime"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764752103/sweety-salty-fresh-lime-soda-4_hj1p35.jpg",
    "rating": 4.5,
    "available": true
  },
  {
    "name": "Mango Lassi",
    "price": 70,
    "category": "Beverages",
    "type": "Veg",
    "tags": ["yogurt", "sweet", "mango"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764752113/Mango-Lassi-08589_dwhnjk.jpg",
    "rating": 4.8,
    "available": true
  },
  {
    "name": "Watermelon Juice",
    "price": 50,
    "category": "Beverages",
    "type": "Veg",
    "tags": ["fruit", "fresh", "healthy"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764752135/watermelon-pineapple-juice_jp52uc.jpg",
    "rating": 4.4,
    "available": true
  },

  {
    "name": "Chocolate Brownie",
    "price": 70,
    "category": "Sweet Tooth",
    "type": "Non-Veg",
    "tags": ["dessert", "chocolate", "cake"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764752158/Brownie-Recipe-with-Cocoa-Powder-821x821_ix3ubg.jpg",
    "rating": 4.8,
    "available": true
  },
  {
    "name": "Gulab Jamun (2pcs)",
    "price": 45,
    "category": "Sweet Tooth",
    "type": "Veg",
    "tags": ["indian sweet", "dessert", "hot"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764752204/293e3e16-0d3a-42fb-aa46-52bf243d67c3_bitghq.webp",
    "rating": 4.6,
    "available": true
  },
  {
    "name": "Vanilla Ice Cream",
    "price": 40,
    "category": "Sweet Tooth",
    "type": "Veg",
    "tags": ["frozen", "dessert", "sweet"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764752232/vanilla-bean-ice-cream-2_ragdps.jpg",
    "rating": 4.3,
    "available": true
  },
  {
    "name": "Fruit Salad with Ice Cream",
    "price": 85,
    "category": "Sweet Tooth",
    "type": "Veg",
    "tags": ["fruit", "healthy", "dessert"],
    "imageUrl": "https://res.cloudinary.com/dxijfcgpw/image/upload/v1764752263/fruit_cream_featured_hqpsz6.jpg",
    "rating": 4.7,
    "available": true
  }]

mongoose.connect(process.env.MONGO).then(
    async ()=>{
        try{
            await Item.insertMany(data);
            console.log("Inserted", data.length, "items");
        }
        catch (err){
             console.log("Error:", err);
        }
        process.exit();
    }
)