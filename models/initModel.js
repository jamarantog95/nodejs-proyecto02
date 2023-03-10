const Meal = require("./meals.model");
const Order = require("./order.model");
const Restaurant = require("./restaurants.model");
const Review = require("./review.model");
const User = require("./user.model");


const initModel = () => {
    // Relaciones

    // 1 User <-----> M Order
    User.hasMany(Order) // 1 a muchos
    Order.belongsTo(User); // le pertenece a tabla origen

    // 1 User <-----> M Review
    User.hasMany(Review);
    Review.belongsTo(User);

    // 1 Order <-----> 1 Meal
    Order.hasOne(Meal);
    Meal.belongsTo(Order);

    // 1 Restaurant <-----> M Review
    Restaurant.hasMany(Review);
    Review.belongsTo(Restaurant);

    // 1 Restaurant <-----> M Meal
    Restaurant.hasMany(Meal);
    Meal.belongsTo(Restaurant);


};

module.exports = initModel;