exports.inicializacijaVeza = function inicializacijaVeza(db){

    //veza više-na-više između tabela product i order preko tabele productOrder
    db.product.belongsToMany(db.order, { through: db.productOrder , foreignKey: 'orderId'});
    db.order.belongsToMany(db.product, { through: db.productOrder, foreignKey: 'productId' });

    //product i category tabele imaju vezu 1:1
    db.category.hasOne(db.product, {as: 'categoryId', foreignKey: 'categoryId'});

    //order i pos - 1:1
    db.order.hasOne(db.pos, {as: 'orderId', foreignKey: 'orderId'});

    //order i paymentType - 1:1
    db.paymentType.hasOne(db.order, {as: 'paymentTypeId', foreignKey: 'paymentTypeId'});

    //employee i order - 1:n
    db.employee.hasMany(db.order, {as: 'employeeId', foreignKey: 'employeeId'});

    //employee i user - 1:1
    db.user.hasOne(db.employee, {as: 'employeeId', foreignKey:'employeeId'});

    //user i role - m:n
    db.user.belongsToMany(db.role, { through: 'userRole' });
    db.role.belongsToMany(db.user, { through: 'userRole' });
}