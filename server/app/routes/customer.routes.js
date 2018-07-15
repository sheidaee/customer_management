module.exports = (app) => {
  const customers = require('../controllers/customer.controller.js');

  // Create a new Customer
  app.post('/customers', customers.create);

  // Retrieve all Customers
  app.get('/customers', customers.findAll);

  // Retrieve a single Customer with noteId
  app.get('/customers/:customerID', customers.findOne);

  // Update a Customer with customerID
  app.put('/customers/:customerID', customers.update);

  // Delete a Customer with customerID
  app.delete('/customers/:customerID', customers.delete);
}