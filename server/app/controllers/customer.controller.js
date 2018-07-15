const Customer = require('../models/customer.model.js');

// Create and Save a new Customer
exports.create = (req, res) => {
  console.log(req);
  
  // Validate request
  if (!req.body.first) {
    return res.status(400).send({
      message: "Customer content can not be empty"
    });
  }

  // Create a Customer
  const customer = new Customer({
    name: {
      first: req.body.first,
      last: req.body.last
    },
    birthday: req.body.birthday,
    gender: req.body.gender,
    customerLifetimeValue: req.body.customerLifetimeValue
  });

  // Save Customer in the database
  customer.save()
    .then(data => {
      const newCustomer = {
        customerID : data._id,
        name       : {
          first    : data.name.first,
          last     : data.name.last
        },
        birthday   : data.birthday,
        gender     : data.gender,
        lastContact: data.updatedAt,
        customerLifetimeValue: data.customerLifetimeValue
      };            
      res.send(newCustomer);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Customer."
      });
    });
};

// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
  Customer.find()
    .then(customers => {
      let customersArr = customers.map( customer => {
        return {
          customerID: customer._id,
          name: {
            first: customer.name.first,
            last: customer.name.last
          },
          birthday: customer.birthday,
          gender: customer.gender,
          lastContact: customer.updatedAt,
          customerLifetimeValue: customer.customerLifetimeValue
        }
      });    
            
      res.send(customersArr);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
    });
};

// Find a single customer with a customerID
exports.findOne = (req, res) => {
  Customer.findById(req.params.customerID)
    .then(customer => {
      if (!customer) {
        return res
          .status(404)
          .send({
            message: "Customer not found with id " + req.params.customerID
          });
      }

      const resultRecord = {
        customerID: customer._id,
        name: {
          first: customer.name.first,
          last: customer.name.last
        },
        birthday: customer.birthday,
        gender: customer.gender,
        lastContact: customer.updatedAt,
        customerLifetimeValue: customer.customerLifetimeValue
      };    
      res.send(resultRecord);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .send({
            message: "Customer not found with id " + req.params.customerID
          });
      }
      return res
        .status(500)
        .send({
          message:
            "Error retrieving customer with id " + req.params.customerID
        });
    });
};

// Update a customer identified by the customerID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.first) {
    return res.status(400).send({
      message: "Customer content can not be empty"
    });
  }

  // Find customer and update it with the request body
  Customer.findByIdAndUpdate(req.params.customerID, {    
    name: {
      first: req.body.first,
      last: req.body.last
    },
    birthday: req.body.birthday,
    gender: req.body.gender,    
    customerLifetimeValue: req.body.customerLifetimeValue
  }, { new: true })
    .then(customer => {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.customerID
        });
      }

      const resultRecord = {
        customerID: customer._id,
        name: {
          first: customer.name.first,
          last: customer.name.last
        },
        birthday: customer.birthday,
        gender: customer.gender,
        lastContact: customer.updatedAt,
        customerLifetimeValue: customer.customerLifetimeValue
      };

      res.send(resultRecord);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.customerID
        });
      }
      return res.status(500).send({
        message: "Error updating customer with id " + req.params.customerID
      });
    });
};

// Delete a note with the specified customerID in the request
exports.delete = (req, res) => {
  Customer.findByIdAndRemove(req.params.customerID)
    .then(customer => {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.customerID
        });
      }
      res.send({ message: "Customer deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.customerID
        });
      }
      return res.status(500).send({
        message: "Could not delete customer with id " + req.params.customerID
      });
    });
};