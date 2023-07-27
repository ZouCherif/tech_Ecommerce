const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/productsController");
const verifyUserRole = require("../../middlewares/verifyRole");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(verifyUserRole("admin"), productsController.addNewProduct);

router
  .route("/:id")
  .get(verifyUserRole("admin"), productsController.getProduct)
  .put(verifyUserRole("admin"), productsController.updateProduct)
  .delete(verifyUserRole("admin"), productsController.deleteProduct);

module.exports = router;
